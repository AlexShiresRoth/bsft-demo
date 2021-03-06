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
      token
    }
  }
`;

export const AUTHENTICATE = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      message
      success
      Account {
        email
        lastname
        firstname
      }
      token
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation updateCustomer($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      message
      success
    }
  }
`;
