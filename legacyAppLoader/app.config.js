// demo
export default () => ({
  "manifest": {
    "key": "meetings"
  },
  "environment": {
    "appKey": "meetings",
    "basename": "localhost:3000/apps/meetings",
    "client": {
    	"baseUri": "https://backend-fusion-project-portal-test.radix.equinor.com",
			"defaultScopes": [
				"api://02f3484c-cad0-4d1d-853d-3a9e604b38f3/access_as_user"
			],
      "portal": {
        "baseUri": "https://fusion-s-portal-ci.azurewebsites.net",
        "defaultScopes": [
          "5a842df8-3238-415d-b168-9f16a6a6031b/.default"
        ]
      }
		}
  },
  "endpoints": {
    "api": "https://foo.barz"
  },
  // override portal lookup
  "portalHost": undefined
});
