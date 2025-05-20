const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const { schema } = require("./schema");
const { root } = require("./root");
const { ruruHTML } = require("ruru/server");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.all("/api", createHandler({ schema, rootValue: root }));

app.get("/playground", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/api" }));
});

app.listen(4000, () => {
  console.log("Server listening to port 4000");
});
