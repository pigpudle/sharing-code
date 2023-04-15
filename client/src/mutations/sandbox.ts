import { gql } from "@apollo/client";

export const createSandbox = gql`
  mutation createSandbox($input: SandboxInput) {
    createSandbox(input: $input) {
      id
      title
      mod_date
      link
    }
  }
`;
