import http from "http";
import router from "./app";

const server = http.createServer(router);
const PORT: any = process.env.PORT ?? 8000;
server.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
export default server;
