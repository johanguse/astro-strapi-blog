import { strapiGraphQLCall } from "@lib/strapiClient";
import { safeReturnStrapiEntities, safeReturnStrapiEntity } from "@lib/strapiArrayUtils";
import type { APIResponseCollection, APIResponseData } from "@interfaces/strapi";
import {
  AideDecisionEtapeHistory,
  solutionRetourExperienceFilter,
  StrapiFilter,
} from "@lib/commonStrapiFilters";
import { STRAPI_IMAGE_FRAGMENT } from "@lib/strapiFragments";

export const GET_ALL_BLOG_POSTS = (strapiFilter: StrapiFilter) => `query {
  posts {
    data {
      attributes {
        title
        slug
        excerpt
        category {
          data {
            id
            attributes {
              name
            }
          }
        }
        author {
          data {
            id
            attributes {
              name
              bioImage {
                data {
                  attributes {
                    name
                    width
                    height
                    url
                  }
                }
              }
            }
          }
        }
        featuredImage {
          data {
            attributes {
              name
              width
              height
              url
            }
          }
        }
      }
    }
    meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
  }
}`;

export const GET_BLOG_POSTS_BY_SLUG_NAME = (
  strapiFilter: StrapiFilter,
) => `query Posts {
  posts(filters: { slug: { eq: "first-one" } }) {
      data {
          attributes {
              title
              content
              excerpt
              visibility
              readingTime
              slug
              createdAt
              updatedAt
              publishedAt
              featuredImage {
                  data {
                      id
                      attributes {
                          url
                          alternativeText
                      }
                  }
              }
              author {
                  data {
                      id
                      attributes {
                          name
                          bioImage {
                              data {
                                  attributes {
                                      url
                                      alternativeText
                                  }
                              }
                          }
                      }
                  }
              }
          }
      }
  }
}
`;

const query = `
{
  posts {
    data {
      attributes {
        title
        slug
        excerpt
        category {
          data {
            id
            attributes {
              name
            }
          }
        }
        author {
          data {
            id
            attributes {
              name
              bioImage {
                data {
                  attributes {
                    name
                    width
                    height
                    url
                  }
                }
              }
            }
          }
        }
        featuredImage {
          data {
            attributes {
              name
              width
              height
              url
            }
          }
        }
      }
    }
    meta {
      pagination {
        total
        page
        pageSize
        pageCount
      }
    }
  }
}`;
/*
export async function getBlogPostBySlug(): Promise<
  APIResponseData<"api::post.post">[]
> {
  const filter = new StrapiFilter(true, []);
  const apiResponse = (await strapiGraphQLCall(GET_FILTERED_BLOG_POSTS_BY_SLUG_NAME(filter)))
    ?.aideDecisionEtapes as APIResponseCollection<"api::post.post">;
  return safeReturnStrapiEntities(apiResponse);
}
*/
export async function getAllBlogPosts(): Promise<APIResponseData<"api::post.post"> | null> {
  const filter = new StrapiFilter(true, []);
  const apiResponse = (await strapiGraphQLCall(GET_ALL_BLOG_POSTS(filter)))
    ?.posts as APIResponseCollection<"api::post.post">;
  return safeReturnStrapiEntity(apiResponse);
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<APIResponseData<"api::post.post"> | null> {
  const filter = new StrapiFilter(true, [{ attribute: "slug", operator: "eq", value: slug, relation: false }]);
  const apiResponse = (await strapiGraphQLCall(GET_BLOG_POSTS_BY_SLUG_NAME(filter)))
    ?.posts as APIResponseCollection<"api::post.post">;
  return safeReturnStrapiEntity(apiResponse);
}