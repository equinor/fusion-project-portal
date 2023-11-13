# fusion-project-portal

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
