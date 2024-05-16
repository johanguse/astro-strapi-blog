import type { APIResponse } from "@interfaces/strapi";

export const STRAPI_URL = import.meta.env.STRAPI_URL || "";
const STRAPI_TOKEN = import.meta.env.STRAPI_TOKEN || "";
//export const STRAPI_TOKEN = process.env.STRAPI_TOKEN || "";

export const STRAPI_IMAGE_KEY_SIZE = {
  large: "large",
  medium: "medium",
  small: "small",
} as const;
export type STRAPI_IMAGE_KEY_SIZE_TYPE = (typeof STRAPI_IMAGE_KEY_SIZE)[keyof typeof STRAPI_IMAGE_KEY_SIZE];


export const getStrapiImageUrl = (
  image?: APIResponse<"plugin::upload.file"> | null,
  sizeKey?: STRAPI_IMAGE_KEY_SIZE_TYPE,
) => {
  if (!image?.data?.attributes) {
    return "/images/placeholder.svg";
  }
  // @ts-ignore
  if (sizeKey && image.data.attributes.formats && !!image.data.attributes.formats[sizeKey]) {
    // @ts-ignore
    return image.data.attributes.formats[sizeKey].url;
  }
  return image.data.attributes.url;
};

export const strapiGraphQLCall = async (query: String, variables?: any, signal?: AbortSignal) => {
  try {
    return await fetch(STRAPI_URL + "/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
      signal,
    })
      .then((res) =>
        res.json().catch((err) => {
          throw new Error("Error when transforming Strapi response to JSON " + err);
        }),
      )
      .then((res) => {
        if (res?.errors) {
          throw new Error(res?.errors[0]?.message);
        }
        return res?.data;
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (err) {
    throw new Error(err as string);
  }
};