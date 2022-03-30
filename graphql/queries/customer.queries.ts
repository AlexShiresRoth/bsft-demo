import { gql } from "@apollo/client";

export const LOAD_MY_ACCOUNT = gql`
  query loadUser {
    getCustomerInfo {
      message
      success
      customer {
        lastname
        firstname
        email
        orders {
          price
          name
          image
          bsft_id
        }
      }
    }
  }
`;
