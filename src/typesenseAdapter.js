import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";

let TYPESENSE_SERVER_CONFIG = {
  apiKey: process.env.REACT_APP_TYPESENSE_SEARCH_ONLY_API_KEY,
  nodes: [
    {
      host: process.env.REACT_APP_TYPESENSE_HOST,
      port: process.env.REACT_APP_TYPESENSE_PORT,
      protocol: process.env.REACT_APP_TYPESENSE_PROTOCOL,
    },
  ],
  connectionTimeoutSeconds: 60,
  numRetries: 10,
};

export const typesenseAdapter = new TypesenseInstantsearchAdapter({
  server: TYPESENSE_SERVER_CONFIG,
  additionalSearchParameters: {
    queryBy: "links",
    queryByWeights: "1",
    numTypos: 3,
    typoTokensThreshold: 6,
  }
});

export const searchClient = typesenseAdapter.searchClient;