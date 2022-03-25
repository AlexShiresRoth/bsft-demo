import { gql } from "@apollo/client";

export const CREATE_CUSTOMER = gql`
  mutation createCustomer($input: CustomerInput!) {
    createCustomer(input: $input) {
      message
      success
      customer {
        lastname
        firstname
        customer_id
        email
      }
    }
  }
`;
