# fusion-project-portal

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
