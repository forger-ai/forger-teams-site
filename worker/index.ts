import { handleTeamDemoRequest } from '../src/lib/team-demo-proxy.mjs';

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/team-demo-requests') {
      return handleTeamDemoRequest(request);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
