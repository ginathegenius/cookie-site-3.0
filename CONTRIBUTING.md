# Contributing to the Cookie Catalog

This guide covers the yearly cookie update. Cookie details live in
`src/data/cookieData.js`; cookie images live in `public/images/cookies/`.

## Adding cookies for 2026

1. **Check for an existing cookie first.** If the same cookie appeared in an
   earlier year, update that record's `year` array to include `2026`. Keep its
   existing `id` and add a new record only for a genuinely different cookie.
2. **Add the image.** Copy the image into `public/images/cookies/`. Use a
   lowercase, hyphen-separated filename, and make sure the spelling and letter
   case exactly match the `imagePath`.
3. **Add a record** to the `cookieData` array. Keep the fields and formatting
   consistent with nearby records:

   ```js
   {
     id: "orange-cardamom-shortbread",
     name: "Orange Cardamom Shortbread",
     allergies: ["eggs", "gluten"],
     link: "https://example.com/recipe",
     imagePath: "images/cookies/orange-cardamom-shortbread.jpg",
     year: [2026],
     flavor: ["citrus", "spice"]
   },
   ```

   Replace the example values with the correct details. Use `link: ""` if there
   is no recipe link yet. Keep allergy and flavor entries as lowercase strings;
   filter options are generated from these values, so spelling variants (for
   example, `peanut` and `peanuts`) appear as separate options.
4. **Keep the ID stable.** IDs are used to remember browser-local favorites.
   Never derive them from array position, and don't change an existing ID when
   a cookie's name or recipe link changes.
5. **Check the result locally.** Start the dev server and inspect the catalog:

   ```sh
   npm run dev
   ```

   Stop the server with `Ctrl+C`, then run:

   ```sh
   npm run check
   ```

   Confirm the cookie appears, its image and recipe link work, the year and
   filters are correct, and its favorite toggle still works. The newest year
   and “New” badge are derived automatically; no separate filter configuration
   needs updating.
6. **Open a pull request.** Review the CI check before merging to `main`.
   Amplify builds and deploys the site from the source; do not commit `dist/`.

## Updating an existing record

- Add a year to `year` when the same cookie returns; don't duplicate the
  record.
- Keep `id` unchanged so existing favorites stay attached.
- Update allergy, flavor, image, and recipe details if they changed.
- New allergy and flavor values automatically become filter options. Keep
  their spelling consistent with equivalent values already in the catalog.
