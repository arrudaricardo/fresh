import { Status } from "$fresh/server.ts";
import { assertMatch } from "https://deno.land/std@0.190.0/testing/asserts.ts";
import { assert, assertEquals, delay } from "./deps.ts";
import { startFreshServer } from "./test_utils.ts";

Deno.test("redirects on incomplete base path in url", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
  const { serverProcess, lines, address } = await startFreshServer({
    args: ["run", "-A", "./tests/fixture_base_path/main.ts"],
  });

  await delay(100);

  const res = await fetch(address);
  assert(res.redirected, "did not redirect");
  assert(res.url.endsWith("/foo/bar"), "didn't redirect to base path");
  assertEquals(res.status, Status.OK);

  await lines.cancel();
  serverProcess.kill("SIGTERM");
});

Deno.test("shows full address with base path in cli", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
  const { serverProcess, lines, address } = await startFreshServer({
    args: ["run", "-A", "./tests/fixture_base_path/main.ts"],
  });

  assertMatch(address, /^http:\/\/localhost:\d+\/foo\/bar$/);
  await lines.cancel();
  serverProcess.kill("SIGTERM");
});

Deno.test("rewrites middleware request", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
  const { serverProcess, lines, address } = await startFreshServer({
    args: ["run", "-A", "./tests/fixture_base_path/main.ts"],
  });

  const res = await fetch(`${address}/api`);
  const body = await res.text();
  assertEquals(body, "it works");

  await lines.cancel();
  serverProcess.kill("SIGTERM");
});

Deno.test("rewrites root relative middleware redirects", {
  sanitizeOps: false,
  sanitizeResources: false,
}, async () => {
  const { serverProcess, lines, address } = await startFreshServer({
    args: ["run", "-A", "./tests/fixture_base_path/main.ts"],
  });

  console.log(`${address}/api/rewrite`);
  const res = await fetch(`${address}/api/rewrite`);
  console.log(res);
  assertEquals(res.status, Status.OK);

  await lines.cancel();
  serverProcess.kill("SIGTERM");
});
