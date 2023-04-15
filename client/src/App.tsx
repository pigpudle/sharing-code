import React, { useState, useEffect, useCallback } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useMutation, useQuery } from "@apollo/client";
import { getSandbox } from "./query/sandbox";
import { createSandbox } from "./mutations/sandbox";

function App() {
  const [id, setId] = useState<any>("");
  const { data, loading, error, refetch } = useQuery(getSandbox, {
    variables: { id },
  });
  const [newSandbox] = useMutation(createSandbox);
  const [sandbox, setSandbox] = useState<any>(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (data?.getSandbox && !loading) {
      setSandbox(data.getSandbox);
    }
  }, [data, loading]);

  const addSandbox = useCallback(() => {
    newSandbox({
      variables: { input: { title } },
    }).then(({ data }) => {
      if (data?.createSandbox) {
        setSandbox(data.createSandbox);
      }

      setTitle("");
    });
  }, [title, newSandbox]);

  return (
    <div className="App">
      <div>
        <input
          name="title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addSandbox}>Create</button>
      </div>
      <div>
        <input name="id" placeholder="id" id="id" />
        <button
          onClick={() => {
            const inp = document.getElementById("id") as HTMLInputElement;
            if (inp) {
              setId(inp.value);
            }
          }}
        >
          Get
        </button>
      </div>
      {sandbox ? (
        <div>
          Id: {sandbox.id}
          Title: {sandbox.title}
          Modification date: {sandbox.mod_date}
          Link: {sandbox.link}
        </div>
      ) : null}
    </div>
  );
}

export default App;
