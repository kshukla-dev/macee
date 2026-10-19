import { handleOtysProxy } from '../server/otysProxy.js';

export default async function handler(req, res) {
  const subPath = (req.url || '').replace(/^\/api\/otys/, '') || '/';
  return handleOtysProxy(req, res, subPath);
}
