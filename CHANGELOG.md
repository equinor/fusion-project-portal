# fusion-project-portal

## 6.0.0

### Major Changes

- 0a7119c: - **BREAKING CHANGE**: Migrate from the deprecated Fusion Portal API (for apps) to the new and separate Fusion Apps API.
  This results in breaking changes in the API contract. The reason for this is model changes in the new Fusion Apps API. And we prefer modelling 1-1 as best as possible instead of introducing remapping etc. on our end.
  - **BREAKING CHANGE**: Removal of the Fusion Portal Proxy. We no longer provide endpoints for this on the API. All calls to get bundles and app information from Fusion shall go through the ClientBackend
  - Fixed more tests
  - Refactoring has been done in multiple locations
- 2e486e0: - Updating to new app manifest types
  - Refactor and performance enhancements on portal configuration module
  - Update menu and favorites
  - loading router config from portal config service
  - filter portal service messages
  - Update all list laded from new app service.
  - user portal config to filter full applist
- e763969: BREAKING CHANGE:

  Updates the API endpoints that gives Portal Apps as list of objects:

  {portalId:guid}/apps
  {portalId:guid}/contexts/{contextId:guid}/apps
  Now instead, these endpoint returns a list of appKeys (strings).

  The old ones:

  {portalId:guid}/appkeys
  {portalId:guid}/contexts/{contextId:guid}/appkeys
  are now identical, and are deprecated and will be removed when front-end has adopted the updated endpoints.

  In addition some refactoring has been done. As a result, compiler warnings has been greatly reduced

### Minor Changes

- 7c7715e: - Menu is filtered with portal configuration form new endpoint
  - New portal class enabling hot-swapping of portal for development.
  - New portal app module for listing apps in portal landeplages.
  - Refactor of portal configuration.
- 159f911: - Adds a profile controller with an endpoint for validating user permission on frontend
- d814023: Renames Key to AppKey in ApiPortallApp and ApiPortalOnboardedApp models
- 27747de: - Implemented support for showing audit information on some API endpoints: ApiOnboardedApp, ApiPortal, ApiPortalConfiguration
- a905268: Align portal administration application with the new app management models

### Patch Changes

- 45d3433: - Admin app use new app manifest model
  - Update all fusion packages in admin app
- b875d89: update portal admin app release actions for new fusion cli
- 1cbc59e: Update url to the service message service
- 38b1b90: Update of all Fusion Classic URLs in codebase
- 9980ecf: Update to new apps endpoint for Application filter.

## 5.0.4

### Patch Changes

- bee97b4: Update key property in registerCurrentApps function call

## 5.0.3

### Patch Changes

- 6e599cf: Improve loading logic in LegacyAppContainer, by loading app from new app api with proxy

## 5.0.2

### Patch Changes

- c9b0ad5: providing the right env key to appLoader

## 5.0.1

### Patch Changes

- 0d4055d: - Remove unused import and code in app.config.ts
  - Update dev:appLoader script in package.json
  - Remove unused components in legacyAppLoader
- a59d1b5: fixing icon error and waring of div inside table

## 5.0.0

### Major Changes

- d96ab34: - BREAKING CHANGE: The previous proxy endpoint: `/bundles/apps/{appKey}/resources/{*resourcePath}` is no more. Instead use `/fusion-apps/{*wildcard*}` to make proxy calls against the whole Fusion Apps API. See Fusion Apps API Swagger documentation for more information about routes.
  - Migrated proxy from Fusion Portal to Fusion Apps API
  - Updated packages to latest version
  - Refactored and simplified code
  - Removed unused Project Portal variables in frontend
  - Update frontend to use the new proxy endpoints
  - Make frontend client use the new types provided by fusion core
  - Update the legacy app loader to use the new proxy endpoints and and fix types
  - Move legacy app code to apps folder for cleaner repository
  - Setup build of legacy app loader in build pipeline for constant build an deployment.
  - Update all Fusion dependencies for frontend client

### Patch Changes

- b3edf8a: Fix errors and add data owner on milestones
- cc5f76c: Rename meetings tab to meeting actions
- 4a4eba3: Update api version on meeting actions to the newest version.

## 4.1.4

### Patch Changes

- 915edf2: Add link to CC App sharepoint site in the Help section

## 4.1.3

### Patch Changes

- b04726c: Poratl Administration - scrollbar on portal edit page
- 548ab09: Fixing side sheet height for apps.
- b7efa93: fixing the route creation in the portal admin app
- b4c1939: Add context type name displayed on all context search results
- c3ecf06: Add milestones under feature flag default on

## 4.1.2

### Patch Changes

- a2f63b5: Release after build fail - old failing code removed

## 4.1.1

### Patch Changes

- 62cdf00: The portal administration now also allows onboarding applications with a specific context.
- 25deabf: Added extension and environment to portal configuration

  > [!IMPORTANT]
  > This change requires database migration.

- 9a652e7: Access admin check endpoint

## 4.1.0

### Minor Changes

- dee5213: Portal administration application. for managing portal configurations
- a4a6ebc: feat: add Configuration to Portal domain

  To enable the configuration of pages such as the project page, facility page, and root page, it should be possible to add a route configuration to the portal.

  A configuration model as been added, currently only with a router property (but designed to be exteded if needed in the future)

  The following endpoints has been added:

  - GET /portal/ID/configuration
  - PUT /portal/ID/configuration

  In addition the data is now included in the following endpoint:

  - GET /portal/ID

  > [!IMPORTANT]
  > This change requires database migration.

### Patch Changes

- 7c120c7: Order and IsLegacy is removed from Onboarded apps. Order is removed from Portal.

  > [!IMPORTANT]
  > This change requires database migration.

- f5b84fc: ContextTypes are returned as array of string
- 73b2e3f: Added endpoint to delete a portal
- a472034: Endpoint for Apps activated on portal combined with available apps for portal.
  Endpoint for Portal-app with reference to contextIds.
- 3e7ee5f: Added Fusion cli on build
- 8feb4f5: apps are now on separate build pipeline
- 0871598: Delete app now removes an app from a portal even if the app is contextual or global
- 97867dc: The portal administration now also allows onboarding applications with a specific context.
- 57de23f: Added extension and environment to portal configuration

  > [!IMPORTANT]
  > This change requires database migration.

## 4.0.8

### Patch Changes

- 26a492e: Bug Fix: The application list in the menu now features a scrollbar for better usability on smaller screens.
- 66114d6: Updated styled-components to version 5.3.11 to prevent critical vulnerability
- 8e44445: Now, when selecting context all text highlighted in the same way as we are used to in browsers.
- e190d97: The fusion feature logger will now not log when no context is selected.
- 8ac7ca1: Menu not closing when selecting a favorite.
- b0280d3: Set as default endpoint has been removed

  > [!IMPORTANT]
  > This change requires database migration.

- e4c4394: Context types updated on put
- a54f436: Context types can be added in OnboardedApp PUT endpoint

## 4.0.7

### Patch Changes

- 3d38a1d: Fixing application side-sheets so they display correctly under the top bar.
  [RITM3381912 | Requested Item | ServiceNow Equinor Production System (service-now.com)](https://eur03.safelinks.protection.outlook.com/?url=https%3A%2F%2Fequinor.service-now.com%2Fnow%2Fnav%2Fui%2Fclassic%2Fparams%2Ftarget%2Fsc_req_item.do%253Fsys_id%253D5ec5a41c8377ca50b14992b5eeaad3b0%2526sysparm_view%253D%2526sysparm_domain%253Dnull%2526sysparm_domain_scope%253Dnull&data=05%7C02%7CCHBH%40equinor.com%7C580c6048428e4d2b841d08dcb53d496b%7C3aa4a235b6e248d591957fcf05b459b0%7C0%7C0%7C638584522033627619%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C0%7C%7C%7C&sdata=Vdw9R6FuwNjc2aC4D6rkq5qXpAYOlXtzGla%2B0V8UO3k%3D&reserved=0)
- 8f29069: Es lint update for better code quality.
- ee4197e: Updating radixconfig with useBuildKit and useBuildCache
- c66bacd: Change Node version for client build

## 4.0.6

### Patch Changes

- f512441: CRUD for context type

## 4.0.5

### Patch Changes

- d43dd84: Removed app-groups from backend

  > [!IMPORTANT]
  > This change requires database migration.

## 4.0.4

### Patch Changes

- 171ee82: Deleted unused portal domain entity

  > [!IMPORTANT]
  > This change requires database migration.

- 171ee82: All worksurface references has been renamed to portal,

  > [!IMPORTANT]
  > This change requires database migration.

- 69065ef: Update packages

## 4.0.3

### Patch Changes

- d7d86b0: Fixed app sorting in project portal

## 4.0.2

### Patch Changes

- 7f99a05: Deleted unused portal domain entity

  > [!IMPORTANT]
  > This change requires database migration.

## 4.0.1

### Patch Changes

- 5373870: Change from msal to default token

## 4.0.0

### Major Changes

- fff93ed: Dotnet version updated to dotnet 8
  Nuget packages updated

## 3.0.6

### Patch Changes

- 1cd5fae: Updating axios version to 1.6.7

  Bumps [axios](https://github.com/axios/axios) from 1.4.0 to 1.6.7.
  <details>
  <summary>Release notes</summary>
  <p><em>Sourced from <a href="https://github.com/axios/axios/releases">axios's releases</a>.</em></p>
  <blockquote>
  <h2>Release v1.6.7</h2>
  <h2>Release notes:</h2>
  <h3>Bug Fixes</h3>
  <ul>
  <li>capture async stack only for rejections with native error objects; (<a href="https://redirect.github.com/axios/axios/issues/6203">#6203</a>) (<a href="https://github.com/axios/axios/commit/1a08f90f402336e4d00e9ee82f211c6adb1640b0">1a08f90</a>)</li>
  </ul>
  <h3>Contributors to this release</h3>
  <ul>
  <li> <a href="https://github.com/DigitalBrainJS" title="+30/-26 ([#6203](https://github.com/axios/axios/issues/6203) )">Dmitriy Mozgovoy</a></li>
  <li> <a href="https://github.com/zh-lx" title="+0/-3 ([#6186](https://github.com/axios/axios/issues/6186) )">zhoulixiang</a></li>
  </ul>
  <h2>Release v1.6.6</h2>
  <h2>Release notes:</h2>
  <h3>Bug Fixes</h3>
  <ul>
  <li>fixed missed dispatchBeforeRedirect argument (<a href="https://redirect.github.com/axios/axios/issues/5778">#5778</a>) (<a href="https://github.com/axios/axios/commit/a1938ff073fcb0f89011f001dfbc1fa1dc995e39">a1938ff</a>)</li>
  <li>wrap errors to improve async stack trace (<a href="https://redirect.github.com/axios/axios/issues/5987">#5987</a>) (<a href="https://github.com/axios/axios/commit/123f354b920f154a209ea99f76b7b2ef3d9ebbab">123f354</a>)</li>
  </ul>
  <h3>Contributors to this release</h3>
  <ul>
  <li> <a href="https://github.com/ikonst" title="+91/-8 ([#5987](https://github.com/axios/axios/issues/5987) )">Ilya Priven</a></li>
  <li> <a href="https://github.com/zaosoula" title="+6/-6 ([#5778](https://github.com/axios/axios/issues/5778) )">Zao Soula</a></li>
  </ul>
  <h2>Release v1.6.5</h2>
  <h2>Release notes:</h2>
  <h3>Bug Fixes</h3>
  <ul>
  <li><strong>ci:</strong> refactor notify action as a job of publish action; (<a href="https://redirect.github.com/axios/axios/issues/6176">#6176</a>) (<a href="https://github.com/axios/axios/commit/0736f95ce8776366dc9ca569f49ba505feb6373c">0736f95</a>)</li>
  <li><strong>dns:</strong> fixed lookup error handling; (<a href="https://redirect.github.com/axios/axios/issues/6175">#6175</a>) (<a href="https://github.com/axios/axios/commit/f4f2b039dd38eb4829e8583caede4ed6d2dd59be">f4f2b03</a>)</li>
  </ul>
  <h3>Contributors to this release</h3>
  <ul>
  <li> <a href="https://github.com/DigitalBrainJS" title="+41/-6 ([#6176](https://github.com/axios/axios/issues/6176) [#6175](https://github.com/axios/axios/issues/6175) )">Dmitriy Mozgovoy</a></li>
  <li> <a href="https://github.com/jasonsaayman" title="+6/-1 ()">Jay</a></li>
  </ul>
  <h2>Release v1.6.4</h2>
  <h2>Release notes:</h2>
  <h3>Bug Fixes</h3>
  <ul>
  <li><strong>security:</strong> fixed formToJSON prototype pollution vulnerability; (<a href="https://redirect.github.com/axios/axios/issues/6167">#6167</a>) (<a href="https://github.com/axios/axios/commit/3c0c11cade045c4412c242b5727308cff9897a0e">3c0c11c</a>)</li>
  <li><strong>security:</strong> fixed security vulnerability in follow-redirects (<a href="https://redirect.github.com/axios/axios/issues/6163">#6163</a>) (<a href="https://github.com/axios/axios/commit/75af1cdff5b3a6ca3766d3d3afbc3115bb0811b8">75af1cd</a>)</li>
  </ul>
  <h3>Contributors to this release</h3>
  <ul>
  <li> <a href="https://github.com/jasonsaayman" title="+34/-6 ()">Jay</a></li>
  <li> <a href="https://github.com/DigitalBrainJS" title="+34/-3 ([#6172](https://github.com/axios/axios/issues/6172) [#6167](https://github.com/axios/axios/issues/6167) )">Dmitriy Mozgovoy</a></li>
  <li> <a href="https://github.com/gnesher" title="+10/-10 ([#6163](https://github.com/axios/axios/issues/6163) )">Guy Nesher</a></li>
  </ul>
  <h2>Release v1.6.3</h2>
  <h2>Release notes:</h2>

  </blockquote>
  <p>... (truncated)</p>
  </details>
  <details>
  <summary>Changelog</summary>
  <p><em>Sourced from <a href="https://github.com/axios/axios/blob/v1.x/CHANGELOG.md">axios's changelog</a>.</em></p>
  <blockquote>
  <h2><a href="https://github.com/axios/axios/compare/v1.6.6...v1.6.7">1.6.7</a> (2024-01-25)</h2>
  <h3>Bug Fixes</h3>
  <ul>
  <li>capture async stack only for rejections with native error objects; (<a href="https://redirect.github.com/axios/axios/issues/6203">#6203</a>) (<a href="https://github.com/axios/axios/commit/1a08f90f402336e4d00e9ee82f211c6adb1640b0">1a08f90</a>)</li>
  </ul>
  <h3>Contributors to this release</h3>
  <ul>
  <li> <a href="https://github.com/DigitalBrainJS" title="+30/-26 ([#6203](https://github.com/axios/axios/issues/6203) )">Dmitriy Mozgovoy</a></li>
  <li> <a href="https://github.com/zh-lx" title="+0/-3 ([#6186](https://github.com/axios/axios/issues/6186) )">zhoulixiang</a></li>
  </ul>
  <h2><a href="https://github.com/axios/axios/compare/v1.6.5...v1.6.6">1.6.6</a> (2024-01-24)</h2>
  <h3>Bug Fixes</h3>
  <ul>
  <li>fixed missed dispatchBeforeRedirect argument (<a href="https://redirect.github.com/axios/axios/issues/5778">#5778</a>) (<a href="https://github.com/axios/axios/commit/a1938ff073fcb0f89011f001dfbc1fa1dc995e39">a1938ff</a>)</li>
  <li>wrap errors to improve async stack trace (<a href="https://redirect.github.com/axios/axios/issues/5987">#5987</a>) (<a href="https://github.com/axios/axios/commit/123f354b920f154a209ea99f76b7b2ef3d9ebbab">123f354</a>)</li>
  </ul>
  <h3>Contributors to this release</h3>
  <ul>
  <li> <a href="https://github.com/ikonst" title="+91/-8 ([#5987](https://github.com/axios/axios/issues/5987) )">Ilya Priven</a></li>
  <li> <a href="https://github.com/zaosoula" title="+6/-6 ([#5778](https://github.com/axios/axios/issues/5778) )">Zao Soula</a></li>
  </ul>
  <h2><a href="https://github.com/axios/axios/compare/v1.6.4...v1.6.5">1.6.5</a> (2024-01-05)</h2>
  <h3>Bug Fixes</h3>
  <ul>
  <li><strong>ci:</strong> refactor notify action as a job of publish action; (<a href="https://redirect.github.com/axios/axios/issues/6176">#6176</a>) (<a href="https://github.com/axios/axios/commit/0736f95ce8776366dc9ca569f49ba505feb6373c">0736f95</a>)</li>
  <li><strong>dns:</strong> fixed lookup error handling; (<a href="https://redirect.github.com/axios/axios/issues/6175">#6175</a>) (<a href="https://github.com/axios/axios/commit/f4f2b039dd38eb4829e8583caede4ed6d2dd59be">f4f2b03</a>)</li>
  </ul>
  <h3>Contributors to this release</h3>
  <ul>
  <li> <a href="https://github.com/DigitalBrainJS" title="+41/-6 ([#6176](https://github.com/axios/axios/issues/6176) [#6175](https://github.com/axios/axios/issues/6175) )">Dmitriy Mozgovoy</a></li>
  <li> <a href="https://github.com/jasonsaayman" title="+6/-1 ()">Jay</a></li>
  </ul>
  <h2><a href="https://github.com/axios/axios/compare/v1.6.3...v1.6.4">1.6.4</a> (2024-01-03)</h2>
  <h3>Bug Fixes</h3>
  <ul>
  <li><strong>security:</strong> fixed formToJSON prototype pollution vulnerability; (<a href="https://redirect.github.com/axios/axios/issues/6167">#6167</a>) (<a href="https://github.com/axios/axios/commit/3c0c11cade045c4412c242b5727308cff9897a0e">3c0c11c</a>)</li>
  <li><strong>security:</strong> fixed security vulnerability in follow-redirects (<a href="https://redirect.github.com/axios/axios/issues/6163">#6163</a>) (<a href="https://github.com/axios/axios/commit/75af1cdff5b3a6ca3766d3d3afbc3115bb0811b8">75af1cd</a>)</li>
  </ul>
  <h3>Contributors to this release</h3>
  <ul>
  <li> <a href="https://github.com/jasonsaayman" title="+34/-6 ()">Jay</a></li>
  <li> <a href="https://github.com/DigitalBrainJS" title="+34/-3 ([#6172](https://github.com/axios/axios/issues/6172) [#6167](https://github.com/axios/axios/issues/6167) )">Dmitriy Mozgovoy</a></li>
  </ul>

  </blockquote>
  <p>... (truncated)</p>
  </details>
  <details>
  <summary>Commits</summary>
  <ul>
  <li><a href="https://github.com/axios/axios/commit/a52e4d9af51205959ef924f87bcf90c605e08a1e"><code>a52e4d9</code></a> chore(release): v1.6.7 (<a href="https://redirect.github.com/axios/axios/issues/6204">#6204</a>)</li>
  <li><a href="https://github.com/axios/axios/commit/2b69888dd5601bbc872452ccd24010219fb6e41a"><code>2b69888</code></a> chore: remove unnecessary check (<a href="https://redirect.github.com/axios/axios/issues/6186">#6186</a>)</li>
  <li><a href="https://github.com/axios/axios/commit/1a08f90f402336e4d00e9ee82f211c6adb1640b0"><code>1a08f90</code></a> fix: capture async stack only for rejections with native error objects; (<a href="https://redirect.github.com/axios/axios/issues/6203">#6203</a>)</li>
  <li><a href="https://github.com/axios/axios/commit/104aa3f65dc30d70273798dff413fb44edd1c9e6"><code>104aa3f</code></a> chore(release): v1.6.6 (<a href="https://redirect.github.com/axios/axios/issues/6199">#6199</a>)</li>
  <li><a href="https://github.com/axios/axios/commit/a1938ff073fcb0f89011f001dfbc1fa1dc995e39"><code>a1938ff</code></a> fix: fixed missed dispatchBeforeRedirect argument (<a href="https://redirect.github.com/axios/axios/issues/5778">#5778</a>)</li>
  <li><a href="https://github.com/axios/axios/commit/123f354b920f154a209ea99f76b7b2ef3d9ebbab"><code>123f354</code></a> fix: wrap errors to improve async stack trace (<a href="https://redirect.github.com/axios/axios/issues/5987">#5987</a>)</li>
  <li><a href="https://github.com/axios/axios/commit/6d4c421ee157d93b47f3f9082a7044b1da221461"><code>6d4c421</code></a> chore(release): v1.6.5 (<a href="https://redirect.github.com/axios/axios/issues/6177">#6177</a>)</li>
  <li><a href="https://github.com/axios/axios/commit/0736f95ce8776366dc9ca569f49ba505feb6373c"><code>0736f95</code></a> fix(ci): refactor notify action as a job of publish action; (<a href="https://redirect.github.com/axios/axios/issues/6176">#6176</a>)</li>
  <li><a href="https://github.com/axios/axios/commit/f4f2b039dd38eb4829e8583caede4ed6d2dd59be"><code>f4f2b03</code></a> fix(dns): fixed lookup error handling; (<a href="https://redirect.github.com/axios/axios/issues/6175">#6175</a>)</li>
  <li><a href="https://github.com/axios/axios/commit/1f73dcbbe0bb37f9e9908abb46a3c252536655c8"><code>1f73dcb</code></a> docs: update sponsor links</li>
  <li>Additional commits viewable in <a href="https://github.com/axios/axios/compare/v1.4.0...v1.6.7">compare view</a></li>
  </ul>
  </details>
  <br />

  [![Dependabot compatibility score](https://dependabot-badges.githubapp.com/badges/compatibility_score?dependency-name=axios&package-manager=npm_and_yarn&previous-version=1.4.0&new-version=1.6.7)](https://docs.github.com/en/github/managing-security-vulnerabilities/about-dependabot-security-updates#about-compatibility-scores)

  You can trigger a rebase of this PR by commenting `@dependabot rebase`.

  [//]: # "dependabot-automerge-start"
  [//]: # "dependabot-automerge-end"

  ***

  <details>
  <summary>Dependabot commands and options</summary>
  <br />

  You can trigger Dependabot actions by commenting on this PR:

  - `@dependabot rebase` will rebase this PR
  - `@dependabot recreate` will recreate this PR, overwriting any edits that have been made to it
  - `@dependabot merge` will merge this PR after your CI passes on it
  - `@dependabot squash and merge` will squash and merge this PR after your CI passes on it
  - `@dependabot cancel merge` will cancel a previously requested merge and block automerging
  - `@dependabot reopen` will reopen this PR if it is closed
  - `@dependabot close` will close this PR and stop Dependabot recreating it. You can achieve the same result by closing it manually
  - `@dependabot show <dependency name> ignore conditions` will show all of the ignore conditions of the specified dependency
  - `@dependabot ignore this major version` will close this PR and stop Dependabot creating any more for this major version (unless you reopen the PR or upgrade to it yourself)
  - `@dependabot ignore this minor version` will close this PR and stop Dependabot creating any more for this minor version (unless you reopen the PR or upgrade to it yourself)
  - `@dependabot ignore this dependency` will close this PR and stop Dependabot creating any more for this dependency (unless you reopen the PR or upgrade to it yourself)
    You can disable automated security fix PRs for this repo from the [Security Alerts page](https://github.com/equinor/fusion-project-portal/network/alerts).

  </details>

  > **Note**
  > Automatic rebases have been disabled on this pull request as it has been open for over 30 days.

## 3.0.5

### Patch Changes

- 4514a8f: App and Context expansion message.

## 3.0.4

### Patch Changes

- d3b86ff: Introduced managed Identity

## 3.0.3

### Patch Changes

- 9029eb4: fix fusion link

## 3.0.2

### Patch Changes

- a3f42ca: Environment variable update

## 3.0.1

### Patch Changes

- bce448f: Small inital setup bug fixed

## 3.0.0

### Major Changes

- b6994c7: The project portal has undergone a major rewrite for both frontend and portal api to accommodate for this release of the portal, now supporting `facility` context selection.

  - Portal Landing page, has undergone some minor styling changes, user card and portal info card is added.
  - The portal now supports facility context.
  - The portal now is open to all context, this allows the user to select all contexts but all applications may not be available for all context.
  - All contexts will display global applications
  - When selecting a project, the portal will navigate the user to a project page
  - When selecting a facility the portal will navigate the user to a facility page
  - Updates to the underlying portal configuration. This will not impact the user but simplify portal configurations for developers.
  - Portal now utilizes application manifest as defined in fusion, this allows application admins to change application category from the application admin interface.

  Project page:

  - Added navigation to the corresponding facilities of the selected project.
  - Minor layout update to accommodate for smaller screens.
  - Added icon to header for easier context identification.
  - Added context type to header for easier context identification.

  Facility page:

  - Added navigation to the corresponding projects of the selected facility.
  - Facility page shows the same my work assigned section.
  - All corresponding project phases / DG phases will be de shown if data is available.
  - Added icon to header for easier context identification.
  - Added context type to header for easier context identification.
  - Favorites are the same as on project page.
  - Facility may show less applications as there are less applications supporting the context type.

  > [!IMPORTANT]
  > This change requires database migration.

### Minor Changes

- bdfd7bb: Project prediction on landing page

## 2.0.1

### Patch Changes

- b6c165e: Scoping for landing page.

## 2.0.0

### Major Changes

- 1c607e3: Project Landing Page Update: Design and User Experience Enhancements
  - Enhanced the project landing page by integrating a full-width header containing essential project information, aligning it with the Fusion landing page.
  - Introduced a new Overview tab with a new layout.
  - Users can now view their project allocation, with a direct link to the project organization application in Fusion.
  - Displayed the project director prominently on the project landing page.
  - Implemented a project phase indicator on the Overview tab, showcasing DG dates and the current DG phase of the project.
  - Aligned the design of pinned apps with Fusion while maintaining content stored in local storage.
  - Implemented cleanup functionality for removing deleted apps within pinned apps.
  - Redesigned the contract list to feature cards instead of a table, categorizing contracts into active and closed groups based on closing date.
  - Introduced a Project Portal Info section with quick facts.
  - Implemented a Construction and Commissioning tab featuring milestones and CC-Application KPIs, accessible behind a feature flag.
  - Developed a new menu design, also accessible behind a feature flag, in alignment with the all-apps list.
  - Added functionality for feature flagging with local storage implementation utilizing the new feature flag module in Fusion.
  - Introduced a "My Features" tab under the user's account to enable feature flags.
  - Global app search and navigation behind feature flag.

### Minor Changes

- b96c30e: The top-bat extensions settings are moved to portal settings.
  - Fix on the fullscreen button
  - Added production scope for data gateway apo used on cc-tab
  - Fixing new menu, now closing when selecting application
  - Added no content message to my features tabs
- 10cc29d: Portal now integrates with the Fusion feature logging system, enhancing the visibility of logged applicaion and context selected in the Fusion User Statistics report.

## 1.13.2

### Patch Changes

- 7bb99f8: fix notification scrollbar

## 1.13.1

### Patch Changes

- d9545a9: update fusion dependesies.

## 1.13.0

### Minor Changes

- 38d7a5b: The task has undergone significant changes, featuring improved grouping and enhanced interactivity. External links are now visually marked with an icon, and overdue tasks have been organized to appear prominently at the top, sorted by their respective dates.

### Patch Changes

- 80ce0b0: fixing the landing of review and url handling for legacy applications
- d213ad8: fix loading spinner on all my assignments

## 1.12.1

### Patch Changes

- 1b82f89: Fixing add bookmark button and loading in bookamrks

## 1.12.0

### Minor Changes

- 2129dc5: When no bookmarks exist, the system provides user message.
  And updated to the newest side-sheet, no visible update here.

## 1.11.1

### Patch Changes

- 3cbab0b: Providing proper client id for legacy applications. This to ensure propper loading of applications.

## 1.11.0

### Minor Changes

- 2c2f819: Users now have the ability to customize and update their notification settings directly within the project portal.
  Additionally, notifications will now appear seamlessly within the Fusion interface, and notification actions have been relocated to vertical menus.
- 116457b: When a user lacks access to view the underlying data for a milestone, a message will be displayed. This message is also shown in cases where no content is available, or when an error occurs.

### Patch Changes

- 0f7cb08: When the user doesn't have any notifications, they will see a message indicating that there is no notification available.
- 948900d: Move the service message info to action bar in side sheet.
- bb0d893: Fixed focus on app breadcrumb now not focusing on last app
- 872474f: Milestones on the project home page are now sorted by date and then by milestone title.

## 1.10.0

### Minor Changes

- fd738d1: The notification system has been refined to ensure users receive notifications selectively. Now, notifications will be triggered only when the "notify user" option is explicitly set on a service message item.

## 1.9.2

### Patch Changes

- dd10a0d: Improved user experience by resolving the issue of a duplicated scrollbar in the side sheet on the assigned work page.
- 809e29e: Fixed Styles on Button in notification and fixed text overflow, ensuring that text content within elements will gracefully truncate with an ellipsis (...) when exceeding the available space. This enhancement improves readability and maintains a polished interface.

## 1.9.1

### Patch Changes

- 8206e71: Now display a legend for service message types in the side sheet.

## 1.9.0

### Minor Changes

- 4f66182: When there are no messages present in the service messages side sheet, a clear and user-friendly "No content" message will be displayed.

## 1.8.0

### Minor Changes

- 3b149f5: Service messages are now specifically tailored to the selected project's application. Only service messages relevant to the chosen application will be displayed, ensuring that users are not confused by messages unrelated to their concerns.

## 1.7.1

### Patch Changes

- 5d437c5: Revise help text for clarity and correct typos.

## 1.7.0

### Minor Changes

- f1184a4: Incorporated the following enhancements:
  - Implemented a help menu accessible from the top bar for user guidance.
  - Introduced the capability to report errors seamlessly through Service Now.
  - Included a link for enhancement suggestions within the Service Now interface.
  - Integrated a link to the changelog for users to stay informed about updates.
  - Provided a direct link to the portal documentation for easy reference.

## 1.6.0

### Minor Changes

- 823b42e: The my allocations tab will now show no content message if no allocations are available

## 1.5.0

### Minor Changes

- e365183: Added `@portal/components` project for ui components utilising components and functionality form `@portal/ui` and `@portal/core`.
- e365183: Added `@portal/ui` project for ui components used in the portal.
- e365183: Added `@portal/core` project for core functionality. Added the new functionality, and is now ready for migration.
- e365183: Adding user info side-sheet with contact details, roles and my allocations.
- 414c0b7: My Roles will display no content information if no roles are available to the user.
- e365183: Added `@portal/types` project for global portal types.

### Patch Changes

- e365183: Added `@portal/utils` project for utile functions and moved old utils to new project. `@equinor/portal-utils` has now been deleted.

## 1.4.3

### Patch Changes

- 6cae79b: Fixing bookmark resolve path for bookmark navigation

## 1.4.2

### Patch Changes

- a922c04: Add expression to fi check in gitHub Action.
- ba3e9bc: The fusionLegacyEnvIdentifier should always be returned in capital letters , some application check this and are case sensitive

## 1.4.1

### Patch Changes

- 4766dde: Fixing auth issue on legacy application, by providing fusion clientId #419

## 1.4.0

### Minor Changes

- 0c44d27: Add support for Fusion asset paths

## 1.3.0

### Minor Changes

- 6c3c922: In order to utilize any application within the project portal, the user must now select an activated context.

### Patch Changes

- 18be2c9: This pull request is for demo purpose and will include an incomplete feature that will be removed after demo.
- 6cda52d: Update pr templat with a linebreake
- 054571e: Changeset action will now only run review not draft
- 8c585b2: The get changeset workflow should not be triggered on the release branch

## 1.2.0

### Minor Changes

- b156de5: Title, obtained from Fusion.Integration, has been added to OnboardedContext-endpoint.

  > [!IMPORTANT]
  > This change requires database migration.

### Patch Changes

- e369ed8: Change will remove all comments in change set. This will enforce that developer needs wo write a change set if not `none` is checked.

## 1.1.0

### Minor Changes

- 8fd9be4: Extending the changeset action to handle relations. For now this is only for database migration but more can be added in the future.

  <!--- Write your changeset here -->

  > [!IMPORTANT]
  > This change requires database migration.

## 1.0.0

### Major Changes

- 903fee7: Initial Release of the Fusion Project Portal

  The application is designed to provide a comprehensive display of fusion applications, tailored to the selected context and context type. By scoping the displayed applications, users can gain a better understanding of the available options.
  This solution will offer support for all fusion and custom context types, although the current version is currently limited to the context type 'Project Master'.

  > We aim to design a system that provides users with a streamlined workflow, by offering applications in a sequence or based on the project timeline, and understanding the user's requirements, tasks, and goals within their workflow. Identify the various applications or tools that can assist in completing these tasks.

### Minor Changes

- 903fee7: Implemented a refined changeset and release workflow.

  We've introduced a streamlined changeset and release workflow to make our release process more efficient. This workflow includes careful management of code changes, rigorous quality checks, automated testing, and seamless integration with our deployment system. It aims to ensure smoother releases, fewer errors, better code quality, and improved teamwork among different departments. This change is part of our ongoing commitment to delivering top-notch software while simplifying our release process.

- 903fee7: Incorporated an automatically generated changeset utilizing information from the pull request body.
  - Adde custom action
  - Update of pull request template
  - Pr workflow
