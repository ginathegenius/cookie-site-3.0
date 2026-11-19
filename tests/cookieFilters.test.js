import assert from "node:assert/strict";
import test from "node:test";
import { getCookieFilterOptions } from "../src/data/cookieFilters.js";

test("derives unique, sorted filter choices and tolerates missing optional fields", () => {
  const cookies = [
    { year: [2025, 2024], allergies: ["almond", "eggs"], flavor: ["nutty"] },
    { year: [2025], flavor: ["fruit"] },
    { year: [2023] },
  ];

  assert.deepEqual(getCookieFilterOptions(cookies), {
    years: [2025, 2024, 2023],
    allergies: ["almond", "eggs"],
    flavors: ["fruit", "nutty"],
  });
});
