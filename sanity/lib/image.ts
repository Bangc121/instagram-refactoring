import { dataset, projectId } from "../env";

import type { Image } from "sanity";
import ImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "./client";
import createImageUrlBuilder from "@sanity/image-url";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

export const urlForImage = (source: SanityImageSource) => {
  return imageBuilder.image(source).auto("format").fit("max").url();
};

const builder = ImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source).width(80).url();
}
