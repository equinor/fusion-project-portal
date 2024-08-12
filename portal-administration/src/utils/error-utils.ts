import { FormattedError } from "../types";

export const DEFAULT_ERROR: FormattedError = {
  type: "Error",
  title: "Unable to connect to ServiceNow",
  status: -1,
};

export const formatError = (errorResponse: unknown, status: number) => {
  return DEFAULT_ERROR;
};
