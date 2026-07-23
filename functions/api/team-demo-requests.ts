import { handleTeamDemoRequest } from '../../src/lib/team-demo-proxy.mjs';

type PagesContext = { request: Request };

export const onRequest = (context: PagesContext): Promise<Response> => handleTeamDemoRequest(context.request);
