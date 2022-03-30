import { gql } from "@apollo/client";

export const FIRE_BSFT_EVENT = gql`
  mutation fireEvent($input: BSFTEventInput!) {
    fireBSFTEvent(input: $input) {
      message
      success
    }
  }
`;
