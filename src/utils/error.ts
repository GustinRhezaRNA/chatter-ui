const formatErrorMessage = (errorMessage: string) => {
  return errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
};

// Returns the first error message as a string (for backward compat)
const extractErrorMessage = (err: any): string | undefined => {
  const errorMessage = err?.graphQLErrors?.[0]?.extensions?.originalError?.message;
  if (!errorMessage) return undefined;
  if (Array.isArray(errorMessage)) return formatErrorMessage(errorMessage[0]);
  return formatErrorMessage(errorMessage);
};

// Returns ALL validation messages as an array of formatted strings.
// Tries multiple error shapes that NestJS + Apollo can produce.
const extractAllErrors = (err: any): string[] => {
  // 1. NestJS class-validator errors → originalError.message (array or string)
  const originalMsg = err?.graphQLErrors?.[0]?.extensions?.originalError?.message;
  if (originalMsg) {
    const msgs = Array.isArray(originalMsg) ? originalMsg : [originalMsg];
    return msgs.map(formatErrorMessage);
  }

  // 2. Plain GraphQL error message (e.g. "Unauthorized")
  const gqlMsg = err?.graphQLErrors?.[0]?.message;
  if (gqlMsg) return [formatErrorMessage(gqlMsg)];

  // 3. Generic JS error message
  if (err?.message) return [formatErrorMessage(String(err.message))];

  return [];
};

export { extractErrorMessage, extractAllErrors };
