import { ApolloError } from "@apollo/client";

const formatErrorMessage = (errorMessage: string) => {
  return errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
};

type OriginalErrorShape = {
  message?: string | string[];
};

const extractErrorMessage = (err?: ApolloError): string | undefined => {
  const errorMessage =
    (err?.graphQLErrors?.[0]?.extensions?.originalError as OriginalErrorShape | undefined)
      ?.message;

  if (!errorMessage) return undefined;

  if (Array.isArray(errorMessage)) {
    return formatErrorMessage(errorMessage[0]);
  }

  return formatErrorMessage(errorMessage);
};

const extractAllErrors = (err?: ApolloError): string[] => {
  const originalMsg =
    (err?.graphQLErrors?.[0]?.extensions?.originalError as OriginalErrorShape | undefined)
      ?.message;

  if (originalMsg) {
    const msgs = Array.isArray(originalMsg) ? originalMsg : [originalMsg];
    return msgs.map(formatErrorMessage);
  }

  const gqlMsg = err?.graphQLErrors?.[0]?.message;
  if (gqlMsg) return [formatErrorMessage(gqlMsg)];

  if (err?.message) return [formatErrorMessage(err.message)];

  return [];
};

export { extractErrorMessage, extractAllErrors };