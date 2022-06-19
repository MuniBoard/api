import http from "http";
import { setup } from "./app";
import express from "express";
import getNewDatabases from "./databases/inmemory/databases";

const server = http.createServer(setup(express(), getNewDatabases()));
const PORT: any = process.env.PORT ?? 8000;
server.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
export default server;
