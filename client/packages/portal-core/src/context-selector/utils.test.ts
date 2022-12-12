import {getContextPageUrl} from "./utils"

describe('context url utils', () => {
    it('it should return url with context', () => {
      const url = getContextPageUrl("1234");
      expect(url).toBe("context-page/$contextId=1234");
    });
    it('it should return url with no context', () => {
      const url = getContextPageUrl(undefined);
      expect(url).toBe("context-page/");

    });
  });
  