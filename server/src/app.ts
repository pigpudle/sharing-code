import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";

import schema from "./schema";
import { ID } from "../../shared/types";

const sandboxes = [
  {
    id: 1,
    title: "Sandbox 1",
    mod_date: new Date(),
    link: "google.com",
  },
  {
    id: 2,
    title: "Sandbox 2",
    mod_date: new Date(),
    link: "github.com",
  },
];

const folders = [
  {
    id: 1,
    title: "Folder 1",
    sandboxId: 1,
  },
  {
    id: 2,
    title: "Folder 2",
    sandboxId: 2,
  },
];

const app = express();
app.use(cors());
const port = 3000;

const root = {
  getSandbox: ({ id }: { id: ID }) => {
    const sandbox = sandboxes.find((sandbox) => sandbox.id == id);
    if (sandbox) {
      const sandboxFolders = folders.filter(
        ({ sandboxId }) => sandboxId === sandbox.id
      );
      return { ...sandbox, folders: sandboxFolders };
    }
    return sandbox;
  },
  getFolder: ({ id }: { id: ID }) => {
    return folders.find((folder) => folder.id == id);
  },
  createSandbox: ({ input }) => {
    const id = sandboxes.at(-1)?.id + 1 || 1;
    const sandbox = {
      id,
      ...input,
    };
    sandboxes.push(sandbox);
    return sandbox;
  },
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  })
);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
