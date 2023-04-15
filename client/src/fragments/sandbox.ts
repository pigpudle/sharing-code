import { gql } from "@apollo/client";

export const sandboxMainInfo = gql`
  fragment sandboxMainInfo on Sandbox {
    id
    title
    mod_date
    link
  }
`;
