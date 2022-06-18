import http from "http";
import { setup } from "./app";
import express from "express";

const server = http.createServer(setup(express()));
const PORT: any = process.env.PORT ?? 8000;
server.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
export default server;
