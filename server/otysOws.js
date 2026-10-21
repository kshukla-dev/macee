import 'dotenv/config';
import dns from 'node:dns';

// Ensure IPv4 first to avoid IPv6 connect timeouts on ows.otys.nl
try {
  dns.setDefaultResultOrder('ipv4first');
} catch (e) {
  // Ignore in environments where this isn't supported
}

const OWS_RPC_ENDPOINT = 'https://ows.otys.nl/jservice.php';
const OWS_FILE_ENDPOINT = 'https://ows.otys.nl/fileService.php';

const DEFAULT_KEY = 'gv0MSr8EV3HovrVzLWcCQ0SkkA8PiortyNWZ2/zrih9IfsTZQ8y33Q==';

export function getOwsApiKey() {
  const apiKey =
    process.env.OTYS_API_KEY?.trim() ||
    process.env.VITE_OTYS_API_KEY?.trim() ||
    DEFAULT_KEY;
  return apiKey;
}

/**
 * Low-level JSON-RPC 2.0 caller for OTYS OWS.
 */
export async function callOwsRpc(method, params = [], id = 1) {
  const payload = {
    jsonrpc: '2.0',
    method,
    params,
    id,
  };

  const response = await fetch(OWS_RPC_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(`OWS HTTP error [${response.status}]: ${errorText}`);
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(`OWS RPC error on '${method}': ${data.error.message} (code ${data.error.code})`);
  }

  return data.result;
}

/**
 * Logs in with the API key and returns a valid session token.
 */
export async function loginOws() {
  const apiKey = getOwsApiKey();
  const sessionToken = await callOwsRpc('loginByUid', [apiKey]);
  if (!sessionToken) {
    throw new Error('OWS loginByUid returned empty session token.');
  }
  return sessionToken;
}

/**
 * Logs out and invalidates the session token.
 */
export async function logoutOws(sessionToken) {
  if (!sessionToken) return true;
  try {
    return await callOwsRpc('logout', [sessionToken]);
  } catch (err) {
    console.warn('[OWS Logout Warning]:', err.message);
    return false;
  }
}

/**
 * Uploads a file (CV) to https://ows.otys.nl/fileService.php
 * Returns the file's OUID on the OTYS server.
 */
export async function uploadFileToOws(sessionToken, fileContent, fileName = 'resume.pdf') {
  const formData = new FormData();
  formData.append('sessionId', sessionToken);

  if (typeof Blob !== 'undefined' && fileContent instanceof Blob) {
    formData.append('file', fileContent, fileName);
  } else if (Buffer.isBuffer(fileContent) || fileContent instanceof Uint8Array) {
    const blob = new Blob([fileContent], { type: 'application/pdf' });
    formData.append('file', blob, fileName);
  } else {
    formData.append('file', fileContent, fileName);
  }

  const response = await fetch(OWS_FILE_ENDPOINT, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(`OWS File Upload failed [${response.status}]: ${errorText}`);
  }

  const data = await response.json();
  console.log('[OWS File Upload Raw Response]:', JSON.stringify(data));

  // OWS returns: { "filename.pdf": { "ouid": "...", ... } }
  let fileOuid = '';
  if (data && typeof data === 'object') {
    const firstKey = Object.keys(data)[0];
    if (firstKey && data[firstKey]?.ouid) {
      fileOuid = data[firstKey].ouid;
    }
  }

  if (!fileOuid) {
    throw new Error(`OWS File upload did not return a valid OUID. Response: ${JSON.stringify(data)}`);
  }

  return fileOuid;
}

/**
 * Finds an existing candidate in OTYS by name or email.
 */
export async function findCandidateInOws(sessionToken, firstName, lastName, email = '') {
  try {
    const conditions = [];
    if (firstName && firstName.trim()) {
      conditions.push({
        type: 'COND',
        field: 'Person.firstName',
        op: 'EQ',
        param: firstName.trim(),
      });
    }
    if (lastName && lastName.trim()) {
      conditions.push({
        type: 'COND',
        field: 'Person.lastName',
        op: 'EQ',
        param: lastName.trim(),
      });
    }

    if (conditions.length === 0) return null;

    const result = await callOwsRpc('Otys.Services.CandidateService.getListEx', [
      sessionToken,
      {
        what: {
          uid: 1,
          Person: {
            firstName: 1,
            lastName: 1,
          },
        },
        condition: {
          type: 'AND',
          items: conditions,
        },
        sort: {
          uid: 'DESC',
        },
        limit: 1,
      },
    ]);

    if (result?.listOutput && result.listOutput.length > 0 && result.listOutput[0].uid) {
      return String(result.listOutput[0].uid).trim();
    }
  } catch (err) {
    console.warn('[OWS Find Candidate Warning]:', err.message);
  }
  return null;
}

/**
 * Creates a candidate in OTYS via OWS CandidateService.add.
 * Status ID -1 means "Via website".
 */
export async function createCandidateInOws(sessionToken, firstName, lastName) {
  const result = await callOwsRpc('Otys.Services.CandidateService.add', [
    sessionToken,
    {
      Person: {
        firstName: (firstName || 'Applicant').trim(),
        lastName: (lastName || '.').trim(),
      },
      statusId: -1, // -1 is "Via website" status in OTYS
    },
  ]);

  if (!result) {
    throw new Error('CandidateService.add did not return a valid candidate UID.');
  }

  return String(result);
}

/**
 * Ensures candidate exists in OTYS (finds existing or creates a new one).
 */
export async function getOrCreateCandidateOuid(sessionToken, firstName, lastName, email = '', phone = '') {
  const existingUid = await findCandidateInOws(sessionToken, firstName, lastName, email);
  if (existingUid) {
    console.log(`[OWS] Found existing candidate with UID: ${existingUid}`);
    return existingUid;
  }

  console.log(`[OWS] Creating new candidate for ${firstName} ${lastName}...`);
  const newUid = await createCandidateInOws(sessionToken, firstName, lastName, email, phone);
  console.log(`[OWS] Created candidate with UID: ${newUid}`);
  return newUid;
}

/**
 * Binds an uploaded file to the candidate's Dossier in OTYS Go!
 * Type '1' is the official standard OTYS document type for 'CV'.
 */
export async function attachDocumentToCandidateDossier(
  sessionToken,
  candidateUid,
  fileUid,
  candidateName = ''
) {
  const result = await callOwsRpc('Otys.Services.AttachedDocumentsService.add', [
    sessionToken,
    {
      candidateUid: String(candidateUid),
      fileUid: String(fileUid),
      typeId: '1', // '1' is 'CV' in AttachedDocumentsService option lists
      subject: `CV ${candidateName}`.trim(),
    },
  ]);

  console.log(`[OWS] Successfully attached CV to Candidate Dossier! Dossier ID: ${result}`);
  return String(result);
}

/**
 * Complete Workflow:
 * 1. Log in to OWS
 * 2. Upload file to OWS fileService
 * 3. Find or create candidate in OWS
 * 4. Attach CV to candidate's Dossier
 * 5. Log out
 */
export async function attachCvToCandidateDossierWorkflow(params) {
  const { fileContent, fileName, firstName, lastName, email, phone } = params;
  const candidateName = `${firstName || ''} ${lastName || ''}`.trim() || 'Applicant';

  const sessionToken = await loginOws();
  try {
    // 1. Upload file to OWS
    console.log(`[OWS Workflow] Uploading file '${fileName}' to OWS fileService...`);
    const fileUid = await uploadFileToOws(sessionToken, fileContent, fileName);
    console.log(`[OWS Workflow] File uploaded, OUID: ${fileUid}`);

    // 2. Resolve candidate UID (use provided or lookup/create)
    let cUid = params.candidateUid;
    if (!cUid) {
      cUid = await getOrCreateCandidateOuid(sessionToken, firstName, lastName, email, phone);
    }

    // 3. Attach file to Candidate Dossier
    console.log(`[OWS Workflow] Attaching file '${fileUid}' to candidate '${cUid}' dossier...`);
    const dossierId = await attachDocumentToCandidateDossier(
      sessionToken,
      cUid,
      fileUid,
      candidateName
    );

    return {
      candidateUid: cUid,
      fileUid,
      dossierId,
    };
  } finally {
    await logoutOws(sessionToken);
  }
}
