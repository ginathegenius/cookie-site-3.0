# Cookie Catalog

A React and Vite site for browsing the yearly cookie catalog.

## Local development

Use Node.js 24 (see `.nvmrc`) and npm:

```sh
npm ci
npm run dev
```

Before opening a pull request, run:

```sh
npm run check
```

This runs ESLint, the Node test suite, and a production build. Use `npm run preview` to preview the built site locally.

## Updating the catalog

1. Add cookie details to `src/data/cookieData.js`.
2. Add the image under `public/images/cookies/` and set `imagePath` to a path relative to `public`, such as `images/cookies/new-cookie.jpg`.
3. Keep the name, year, recipe link, allergy, and flavor values accurate. Year, allergy, and flavor filter choices are derived from this data.
4. Run `npm run check`, then open a pull request and review the CI result before merging.

For the annual Q4 update, check recipe links and image paths, confirm the latest-year filter and catalog content, and verify the deployed site after the production deployment completes.

## CI and hosting

GitHub Actions runs `npm ci` and `npm run check` for pull requests and pushes to `main`. Amplify Hosting uses `amplify.yml` to install dependencies, build the Vite app, and publish `dist/`.

To enable deployments, connect this GitHub repository to the existing Amplify Hosting app and configure `main` as the production branch. Add any preview/staging branches in Amplify before relying on them. Amplify handles hosting deployments from connected branches; GitHub Actions does not need AWS credentials. Confirm the existing Amplify app and branch settings before changing production.

The current deployment configuration is frontend-only. A separate `amplify` branch contains an Amplify Gen 2 starter backend (email auth and a Todo model); it is not part of this branch's build or rating functionality and should be reviewed before any future integration.
