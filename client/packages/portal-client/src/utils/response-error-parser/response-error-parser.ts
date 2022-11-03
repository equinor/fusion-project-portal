export const responseErrorParser = (res: Response) => {
  switch (res.status) {
    case 500: {
      return 'Server failed to respond';
    }
    case 401: {
      return 'Failed to authenticate, reload the page and try again';
    }

    case 403: {
      return 'It looks like you dont have permission to view this page';
    }

    default: {
      return 'We are not sure whats wrong';
    }
  }
};
