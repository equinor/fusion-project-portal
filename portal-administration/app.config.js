// demo
export default () => ({
  environment: {
    client: {
      baseUri: "https://backend-fusion-project-portal-test.radix.equinor.com",
      defaultScopes: [
        "api://02f3484c-cad0-4d1d-853d-3a9e604b38f3/access_as_user",
      ],
    },
  },
  // override portal lookup
  portalHost: undefined,
});
