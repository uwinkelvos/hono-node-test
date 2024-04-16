import { test } from "node:test";
import assert from "node:assert";
import { app } from "./index.js";

await test("get-user-by-id", async () => {
  const res = await app.request("/users/1337");
  assert.ok(res.ok);
  assert.deepStrictEqual(await res.json(), {
    id: "1337",
    age: 20,
    name: "Ultra-man",
  });
});

await test("get-user-by-id_fails", async () => {
  const res = await app.request("/users/NA");
  assert.ok(!res.ok);
  assert.strictEqual(res.status, 400);
});
