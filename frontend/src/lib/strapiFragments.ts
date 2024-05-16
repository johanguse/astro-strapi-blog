export const STRAPI_IMAGE_FRAGMENT = `fragment ImageInfo on UploadFileEntityResponse {
  data {
    attributes {
      url
      formats
      caption
    }
  }
}`;
