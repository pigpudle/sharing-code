import { gql } from "@apollo/client";

import { sandboxMainInfo } from "../fragments/sandbox";

export const getSandbox = gql`
  ${sandboxMainInfo}

  query getSandbox($id: ID) {
    getSandbox(id: $id) {
      ...sandboxMainInfo
    }
  }
`;
