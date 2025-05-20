const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const { schema } = require("./schema");
const { root } = require("./root");
const { ruruHTML } = require("ruru/server");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const IS_AUTHENTICATED = true;
// could check if jwt token is genuine or not
const authMiddleware = () => (req, res, next) => {
  if (IS_AUTHENTICATED) {
    req.user = { name: "test" };
  } else {
    req.user = null;
  }
  next();
};

app.use(authMiddleware());

app.all(
  "/api",
  createHandler({
    schema: schema,
    rootValue: root,
    context: (req) => ({ user: req.raw.user }),
  })
);

app.get("/playground", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/api" }));
});

app.listen(4000, () => {
  console.log("Server listening to port 4000");
});
