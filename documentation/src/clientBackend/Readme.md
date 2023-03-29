---
title: Client Backend
category: backend
tags:
  - client
  - dotnet
  - core
---

# Introduction

The purpose of this project is to serve the generated Project Portal client and handle the authorization.
It also serves as a proxy API for Fusion Portal and serving application bundles.

# Getting Started

WIP.

## Building and bundling

Building and bundling the Client backend requires a few steps:

- Build the `client` application
- Copy the bundle to the `ClientBackend` application, so that it can be statically served by the backend
- Publish this as a bundle

To automate this, we use Docker with the Dockerfile `clientBackend.Dockerfile` located at the root of the project.

Run `docker build -f clientBackend.Dockerfile .` to build the Docker image.
