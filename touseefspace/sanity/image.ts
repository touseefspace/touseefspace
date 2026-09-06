import { createImageUrlBuilder, type ImageUrlBuilder } from "@sanity/image-url";
import { projectId, dataset } from "./client";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "52hp81x4",
  dataset: dataset || "production",
});

export const urlForImage = (source: any): ImageUrlBuilder | undefined => {
  if (!source || (!source.asset && !source._ref)) {
    return undefined;
  }
  return imageBuilder.image(source).auto("format").fit("max");
};

