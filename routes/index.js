import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Param's Server");
});

router.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let closed = false;
  const closeConnection = () => {
    if (!closed) {
      clearInterval(interval);
      res.write("event: test\ndata: Connection closed\n\n");
      res.end();
      closed = true;
    }
  };

  const interval = setInterval(() => {
    res.write(`event: test\ndata: ${new Date().toISOString()}\n\n`);
  }, 1000);

  setTimeout(closeConnection, 10000);
  req.on("close", closeConnection);
});

router.get("/live-sub", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let closed = false;
  const closeConnection = () => {
    if (!closed) {
      clearInterval(interval);
      res.write("event: test\ndata: Connection closed\n\n");
      res.end();
      closed = true;
    }
  };

  const interval = setInterval(() => {
    const value = Math.floor(Math.random() * (250 - 200 + 1)) + 200;
    res.write(`event: test\ndata: ${value}\n\n`);
  }, 1000);

  setTimeout(closeConnection, 10000);
  req.on("close", closeConnection);
});

export default router;
