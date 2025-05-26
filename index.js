import express from "events";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";
import cors from "cors";
import { schema } from "./schema/index.js";
import { root } from "./root/index.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import appRouter from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(cors());

app.all(
  "/api",
  authMiddleware(),
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

app.use("/", appRouter);

app.listen(4000, () => {
  console.log("Server listening to port 4000");
});
