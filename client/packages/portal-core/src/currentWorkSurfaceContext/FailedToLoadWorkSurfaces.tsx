import { Button } from '@equinor/eds-core-react';
import { FatalError } from '@equinor/portal-ui';
import { responseErrorParser } from '../../../portal-client/src/utils/response-error-parser/response-error-parser';

type FailedToLoadViewsProps = {
  error: Response;
};
export const FailedToLoadViews = ({ error }: FailedToLoadViewsProps) => {
  const description = responseErrorParser(error);
  return (
    <FatalError
      description={description}
      title="An error has occurred"
      actions={
        description ===
        'Failed to authenticate, reload the page and try again' ? (
          <Button onClick={() => (window.location.href = window.location.href)}>
            Reload page
          </Button>
        ) : (
          <></>
        )
      }
    />
  );
};
