---
title: Project Portal
category: frontend
tags:
  - web
  - react
---

## The Portal

The application is designed to provide a comprehensive display of fusion applications,
tailored to the selected context and context type. By scoping the displayed applications,
users can gain a better understanding of the available options.

This solution will offer support for all fusion and custom context types, although the current version is
currently limited to the context type 'Project Master'.

### Goal

We aim to design a system that provides users with a streamlined workflow, by offering applications
in a sequence or based on the project timeline, and understanding the user's requirements, tasks, and goals within their workflow.
Identify the various applications or tools that can assist in completing these tasks.

## Work Surface

A work surface can be associated with different types of contexts but currently, the only work surface that can be utilized is the Project.
It is planned that there will be at least three work surfaces available: 'project', 'facility', and 'contract'.
The purpose behind this expansion is to enable us to more effectively scope and manage of applications.

### Project

The "Project" work surface serves as a platform for scoping applications and provides users with a project-centric perspective.
By utilizing this view, users can effectively manage and navigate through applications associated with different projects.
The corresponding context type for this work surface is "Project master," which signifies its awaitable nature.

### Facility

Similarly, the "Facility" work surface acts as another avenue for scoping applications.
This view empowers users to select the context type as "Facility" and seamlessly explore onboarded
applications based on this criterion. By leveraging the "Facility" work surface, users can easily
streamline their data management processes.

### Contract

Among the available work surfaces, the "Contract" view offers users the ability to examine data from a contractor's standpoint.
Although it may not be the initial active view, the "Contract" work surface allows users to gain insights into applications and
information that specifically pertain to contractors. This perspective aids in ensuring comprehensive coverage of the necessary data.

## Context

In order to enable of a context or application, both need to undergo the onboarding process.
Once a context is successfully onboarded, it becomes accessible across all work surfaces,
making it possible to view if the specific context type is supported in the current work surface.
This allows the given context to be readily available and usable throughout the project portal.

An application can be onboarded to specific contexts or to all available contexts. If a particular context is not onboarded,
the application will not be awaitable for that specific context. In such a case, if a user wants the application
to be awaitable for a specific context, they would need to request that the context be onboarded.

## Applications

Fusion will provide the applications that wil be awaitable int he project portal. To develop such application one
can follow the following guide here. [How to develop fusion application](https://equinor.github.io/fusion-framework/guide/app/getting-started.html)

If a user encounters a context that the application is not onboarded to, they would need to make a
specific request for that context to be onboarded. This request could be made to the application's
support team, developers, or any appropriate channel provided by the application.

## Authorization

Giving permission, rights, or access to someone or something. It involves verifying the identity and privileges of an individual or entity to ensure they have the necessary authority to perform a specific action or access certain resources.

In the context of software systems, authorization typically involves controlling and managing user access to various functionalities or data based on predefined permissions and roles. It ensures that only authorized individuals can perform certain actions or view specific information within the system.
