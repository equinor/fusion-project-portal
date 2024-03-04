# fusion-project-portal

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
