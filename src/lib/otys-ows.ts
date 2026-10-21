/**
 * OTYS Web Services (OWS) Client & Types
 *
 * Implements the official OTYS Web Services (OWS) v1.5 protocol for:
 * 1. JSON-RPC 2.0 communication (https://ows.otys.nl/jservice.php)
 * 2. Session management (loginByUid, logout)
 * 3. Candidate creation & lookup (Otys.Services.CandidateService)
 * 4. File uploads to OWS fileService (https://ows.otys.nl/fileService.php)
 * 5. Dossier file binding (Otys.Services.AttachedDocumentsService.add)
 *
 * This ensures that uploaded CVs appear directly in the Candidate's Dossier in OTYS Go!
 */

export const OWS_RPC_ENDPOINT = 'https://ows.otys.nl/jservice.php';
export const OWS_FILE_ENDPOINT = 'https://ows.otys.nl/fileService.php';

export interface OwsRpcResponse<T = unknown> {
  result?: T;
  error?: {
    message: string;
    code: number;
    data?: unknown;
  };
  id: number | string;
}

export interface OwsDossierAttachmentResult {
  candidateUid: string;
  fileUid: string;
  dossierId: string;
}

export interface CandidateDossierWorkflowParams {
  fileContent: Blob | Buffer | Uint8Array;
  fileName: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  candidateUid?: string | null;
}
