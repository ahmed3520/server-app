import http from "http";
import app from "./app";

const server = http.createServer(app);

const PORT_API = process.env.API_PORT;
const port = process.env.PORT || PORT_API || 8000;

// server listening
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
