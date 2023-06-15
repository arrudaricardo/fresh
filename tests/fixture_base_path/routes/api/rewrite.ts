import { Handlers } from "$fresh/server.ts";

export const handler: Handlers<unknown, { data: string }> = {
  GET() {
    return Response.redirect("/", 302);
  },
};
