import { Handlers } from "$fresh/server.ts";

// routes/myHandler.ts
export const handler: Handlers<unknown, { data: string }> = {
  GET(_req, ctx) {
    return new Response(ctx.state.data);
  },
};
