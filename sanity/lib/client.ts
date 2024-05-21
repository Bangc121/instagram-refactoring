import { apiVersion, dataset, projectId, token, useCdn } from "../env";

import { createClient } from "next-sanity";

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token,
});
