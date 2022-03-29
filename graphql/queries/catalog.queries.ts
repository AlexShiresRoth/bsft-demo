import { gql } from "@apollo/client";

export const LOAD_CATALOG = gql`
  query getCatalog {
    getCatalog {
      message
      success
      catalog {
        name
        items {
          image
          title
          availability
          bsft_id
          price
        }
      }
    }
  }
`;
