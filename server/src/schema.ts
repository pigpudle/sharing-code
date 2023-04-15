import { buildSchema } from "graphql";

const schema = buildSchema(`
    scalar Date

    type Sandbox {
        id: ID
        title: String
        mod_date: Date
        link: String
        folders: [Folder]
    }

    type Folder {
        id: ID
        title: String!
        files: [File],
        sandboxId: ID
    }

    type File {
        id: ID
        title: String!
        content: String!
    }

    input SandboxInput {
        id: ID
        title: String
        folders: [FolderInput]
    }

    input FolderInput {
        id: ID
        title: String!
        files: [FileInput]
    }

    input FileInput {
        id: ID
        title: String!
        content: String!
    }

    type Query {
        getSandbox(id: ID): Sandbox
        getFolder(id: ID): Folder
    }

    type Mutation {
        createSandbox(input: SandboxInput): Sandbox
    }
`);

// DOCS: https://www.apollographql.com/docs/apollo-server/schema/custom-scalars/#providing-custom-scalars-to-apollo-server
// const dateScalar = new GraphQLScalarType({
//     // See definition above
//   });

//   const resolvers = {
//     Date: dateScalar
//     // ...other resolver definitions...
//   };

//   const server = new ApolloServer({
//     typeDefs,
//     resolvers
//   });

export default schema;
