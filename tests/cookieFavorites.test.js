import assert from "node:assert/strict";
import test from "node:test";
import { cookieData } from "../src/data/cookieData.js";
import {
  FAVORITES_STORAGE_KEY,
  filterFavoriteCookies,
  readFavoriteIds,
  toggleFavoriteId,
  writeFavoriteIds,
} from "../src/data/cookieFavorites.js";

function createStorage(initialValue = null) {
  const values = new Map();
  if (initialValue !== null) {
    values.set(FAVORITES_STORAGE_KEY, initialValue);
  }

  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
}

test("cookie IDs are present and unique", () => {
  const ids = cookieData.map((cookie) => cookie.id);
  assert.ok(ids.every((id) => typeof id === "string" && id.length > 0));
  assert.equal(new Set(ids).size, ids.length);
});

test("reads missing and valid favorites, removing duplicate IDs", () => {
  assert.deepEqual(readFavoriteIds(createStorage()), []);
  assert.deepEqual(readFavoriteIds(createStorage('["pignoli","pignoli"]')), [
    "pignoli",
  ]);
});

test("rejects malformed or invalid saved favorites", () => {
  assert.throws(() => readFavoriteIds(createStorage("{")), SyntaxError);
  assert.throws(
    () => readFavoriteIds(createStorage('["pignoli", null]')),
    /array of cookie IDs/
  );
});

test("surfaces browser storage read and write failures", () => {
  const unavailableStorage = {
    getItem() {
      throw new Error("Storage is unavailable.");
    },
    setItem() {
      throw new Error("Storage is unavailable.");
    },
  };

  assert.throws(() => readFavoriteIds(unavailableStorage), /unavailable/);
  assert.throws(
    () => writeFavoriteIds(["pignoli"], unavailableStorage),
    /unavailable/
  );
});

test("writes unique favorites under the versioned storage key", () => {
  const storage = createStorage();
  writeFavoriteIds(["pignoli", "pignoli"], storage);
  assert.equal(storage.getItem(FAVORITES_STORAGE_KEY), '["pignoli"]');
});

test("toggles favorite IDs and filters the catalog without mutating it", () => {
  const favorites = toggleFavoriteId(["pignoli"], "gochujang-caramel");
  assert.deepEqual(favorites, ["pignoli", "gochujang-caramel"]);
  assert.deepEqual(toggleFavoriteId(favorites, "pignoli"), [
    "gochujang-caramel",
  ]);
  assert.deepEqual(
    filterFavoriteCookies(cookieData, favorites, true).map((cookie) => cookie.id),
    ["gochujang-caramel", "pignoli"]
  );
  assert.equal(filterFavoriteCookies(cookieData, favorites, false), cookieData);
});
