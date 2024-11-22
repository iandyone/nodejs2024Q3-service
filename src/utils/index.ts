export const formatRequestLog = (
  method: string,
  url: string,
  body: any,
  query: any,
): string => {
  return `${method}: ${url} \nBODY: ${JSON.stringify(
    body,
    null,
    2,
  )} \nQUERY: ${JSON.stringify(query, null, 2)}`;
};
