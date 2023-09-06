#  Contributing to Project Portal

Thanks for taking the time to contribute to this project! ❤️

##  1. Table of Contents

- [Contributing to Project Portal](#contributing-to-project-portal)
  - [1. Table of Contents](#1-table-of-contents)
  - [2. Code of Conduct](#2-code-of-conduct)
  - [3. Code Review and Contribution](#3-code-review-and-contribution)
    - [3.1.  Commit Messages](#31--commit-messages)
    - [3.2. Linting](#32-linting)
    - [3.3. Testing](#33-testing)
    - [3.4. Code Refactoring](#34-code-refactoring)
    - [3.5. Improving The Documentation](#35-improving-the-documentation)
  - [4. Bug reporting and Issues](#4-bug-reporting-and-issues)
    - [4.1. Bug report](#41-bug-report)
    - [4.2. Enhancement](#42-enhancement)
    - [4.3. New Functionality](#43-new-functionality)
  - [5. Project Structure](#5-project-structure)
  - [6. Core Project](#6-core-project)
  - [7. Feature App](#7-feature-app)


##  2. Code of Conduct

This project and everyone participating in it is governed by the
[Project Portal Code of Conduct](/blob//CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code.

##  3. Code Review and Contribution

When contributing to the codebase, it's essential to uphold coding standards that promote clean, maintainable code. Here are some key principles to follow, which will also guide code reviews and pull requests:

1. **Descriptive Naming**: Employ well-defined function and variable names that convey their purpose clearly. A clear name is superior to comments, which tend to become outdated.

2. **Function Clarity**: Ensure that function names effectively describe their actions. Avoid vague names like `onClick()` or `handleOnClick()`; instead, opt for names like `openMenu()` or `selectWorkSurfaceById` that explicitly state the function's purpose.

3. **Single Responsibility**: Maintain the single responsibility principle, where functions and classes perform one distinct task. If necessary, split complex functions into smaller, more focused sub-functions.

4. **Pure Functions**: Embrace pure functions to avoid hidden side effects. Not only does this simplify unit testing, but it also enhances code predictability and maintainability.

5. **Code Quality**: Be vigilant about eliminating code smells such as duplication, lengthy methods, extensive classes, and excessive parameter lists. Refactor to keep your code concise and readable.

6. **Constants**: Refrain from using magic numbers or strings; instead, define constants with meaningful names. For example, use `const millisecondsInTenMinutes = 10 * 60 * 1000` instead of `const time = 600000`.

7. **Type Safety**: Write code that leverages type checking to catch bugs during compilation. Avoid the use of `any` types and define variables as optional or nullable in interfaces.

8. **Separation of Concerns**: Aim to separate user interface (UI) components from the underlying logic. Ideally, UI elements should remain devoid of logic to facilitate unit testing.

9. **Functional Programming**: Prioritize functional programming constructs like `map`, `filter`, and `find` over traditional loops and conditionals. This promotes cleaner, more declarative code.

10. **Immutability**: Favor the use of immutable objects and interfaces, reducing the risk of unintended side effects and simplifying code reasoning.

11. **Optimization**: Resist the urge for premature optimization. Instead, benchmark and profile code before making performance improvements.

> Additionally, make sure to address all ESLint warnings and errors within your code files, and always strive to enhance the quality of the code you touch. Continuous improvement and adherence to these coding practices will contribute to a more robust and maintainable codebase.

### 3.1.  Commit Messages

The Conventional Commits specification is a lightweight convention on top of commit messages. It provides an easy set of rules for creating an explicit commit history; which makes it easier to write automated tools on top of. This convention dovetails with SemVer, by describing the features, fixes, and breaking changes made in commit messages.

> For a more in-depth understanding of Conventional Commits, I recommend exploring the official documentation, available here [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#specification). It provides valuable insights into this widely adopted convention for structured commit messages.


###  3.2. Linting

This project enforces a strict zero-tolerance linting policy to uphold code quality and consistency. Before any contribution can be merged into the `main` branch, it is essential that all linting warnings and errors are addressed. This practice not only fosters a cleaner and more maintainable codebase but also streamlines the review process, enabling our team to deliver higher-quality software.

###  3.3. Testing

When submitting new code or making modifications to existing code, it is crucial that all associated tests run without errors. We hold a strong commitment to maintaining robust test coverage throughout our codebase. If you identify any areas where code lacks sufficient test coverage, we strongly encourage you to take the initiative and create appropriate tests for that code. This collaborative effort ensures that our software remains reliable, and your contributions in this regard are highly valued in upholding our commitment to quality assurance and code reliability.
###  3.4. Code Refactoring

Code is a living entity, constantly evolving to meet the demands of our project. We encourage and value contributions from our team members who may feel that certain parts of the codebase require refactoring or find the code challenging to comprehend. Your insights and efforts in improving the codebase are highly appreciated, as they not only enhance its quality but also contribute to the overall success of our project.

###   3.5. Improving The Documentation

If your contribution requires documentation updates, kindly ensure that you make the necessary adjustments. Should you identify any gaps or missing information in the documentation, please don't hesitate to enhance and contribute to its improvement.

##  4. Bug reporting and Issues

> If you want to ask a question, we assume that you have read the available [Documentation](https://github.com/equinor/lighthouse/blob/main/docs/README.md).

Before submitting an bug or issue, it is best to search for existing [Issues](/issues) that might help you. In case you find a suitable issue and still need clarification, you can write your question in this issue.

### 4.1. Bug report
To ensure efficient bug resolution, please investigate the issue thoroughly and provide detailed information in your report. Completing these steps in advance helps expedite the bug-fixing process.

Please complete the following steps in advance to help us fix any potential bug as fast as possible:

1.  Determine if your bug is really a bug and not an error on your side e.g.
2.  To see if other users have experienced (and potentially already solved) the same issue you are having, check if there is not already a bug report existing for your bug or error in the [bug tracker](/issues?q=label%3Abug).
3.  Collect information about the bug:
    -   Stack trace (Traceback)
    -   OS, Platform and Version (Windows, Linux, macOS, x86, ARM)
    -   Possibly your input and the output
    -   Can you reliably reproduce the issue? 


### 4.2. Enhancement
To ensure efficient enhancement implementation, please thoroughly investigate the proposed changes and provide detailed information in your request. Completing these steps in advance helps expedite the enhancement process.

1. Use a **clear and descriptive title** for the issue to identify the suggestion.
2. Provide a **step-by-step description of the suggested enhancement** in as many details as possible.
3. **Describe the current behaviour** and **explain which behaviour you expected to see instead** and why. At this point you can also tell which alternatives do not work for you.
4. You may want to **include screenshots and animated GIFs** which help you demonstrate the steps or point out the part which the suggestion is related to.
5.  **Explain why this enhancement would be useful** to most Project Portal users. You may also want to point out the other projects that solved it better and which could serve as inspiration.
### 4.3. New Functionality

To facilitate the implementation of a new feature, please follow these guidelines when submitting your request:

1. **Clear and Descriptive Title**: Use a title that clearly identifies the proposed feature.
2. **Detailed Description**: Provide a step-by-step description of the feature you'd like to see, offering as much detail as possible.
3. **Current vs. Expected Behavior**: Describe the current behavior and explain what behavior you expect to see instead. Additionally, clarify why this new feature is necessary, and if applicable, mention any alternatives that were considered.
4. **Visual Aids**: If relevant, include screenshots and animated GIFs to illustrate the suggested feature and demonstrate the steps involved.
5. **User Benefit**: Explain why this new feature would be valuable to most Project Portal users. If other projects have successfully implemented similar features, please mention them as sources of inspiration.

Your cooperation in adhering to these guidelines will greatly assist in expediting the feature implementation process and ensuring that your valuable input is effectively incorporated into the Project Portal.

##  5. Project Structure

The project structure is organized to ensure clarity and efficiency in development. It follows a hierarchical layout as shown below:


```BASH
.
├── packages                       
│   ├── client                      
│   ├── core                        
│   ├── components                  
│   ├── ui                         
│   ├── utils                       
├── config                          
├── README.md                       
├── CODE_OF_CONDUCT.md              
├── CONTRIBUTING.md                 
├── package.Json                    
├── yarn.lock                       
└── README.md                       
```
- **packages**: This directory houses various subdirectories, each dedicated to a specific aspect of the project.
  - **client**: The "client" folder is reserved for the web client application, where the main frontend code resides.
  - **core**: In "core," you'll find the core functionality of the project, serving as a foundation for other components.
  - **components**: Here, you can locate individual components, which can be reused throughout the application for modularity and consistency.
  - **ui**: The "ui" directory is home to UI components, ensuring a consistent and visually appealing user interface.
  - **utils**: "Utils" contains global utility functions that can be utilized across different parts of the project.

- **config**: This directory holds configuration files and settings crucial for project configuration and setup.

- **README.md**: The project's main README file provides an overview of the project, its purpose, and instructions on getting started.

- **CODE_OF_CONDUCT.md**: This file outlines the code of conduct for contributors and community members, ensuring a respectful and inclusive environment.

- **CONTRIBUTING.md**: The contributing guidelines document assists potential contributors in understanding how to participate in the project effectively.

- **package.json**: The project's package.json file manages dependencies and scripts essential for running and building the project.

- **yarn.lock**: Yarn's lock file helps maintain consistent package versions across different development environments.

This well-structured project layout enhances maintainability, fosters collaboration among team members, and facilitates a clear understanding of the project's architecture. It also promotes reusability and scalability, making it easier to extend the project's functionality as needed.



## 6. Core Project

```BASH
.
├── src                             #
│   ├── features                    #
│   │   ├── app                     #
│   │   ├── context                 #
│   │   ├── framework               #
│   │   ├── work-surface            #
│   │   ├── header-actions          #
│   │   ├── error                   #
│   ├── components                  #
│   ├── hooks                       #
│   ├── utils                       #
│   ├── types                       #
├── index.ts                        #
├── config                          #
├── .vscode                         #
└── README.md                       #
```

## 7. Feature App

```BASH
.
├── src                             #
│   ├── components                  #
│   ├── api                         #
│   ├── hooks                       #
│   ├── pages                       #
│   ├── utils                       #
│   ├── error                       #
├── index.ts                        #
├── config                          #
├── .vscode                         #
└── README.md                       #
```
