import express, { Express } from "express";
import morgan from "morgan";
import MunicipalityRepository from "./repositories/municipality";
import routes from "./routes/all";
import { setMunicipalityRepository } from "./utils/datamanipulation";

function setup(router : Express) {
  const swaggerUI = require("swagger-ui-express");
  const swaggerJSDoc = require("swagger-jsdoc");
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "MuniBoard API",
        version: "1.0.0",
      },
    },
    apis: ["./src/main/routes/*.ts"],
  };
  const specs = swaggerJSDoc(options);
  
  /** Logging */
  router.use(morgan("dev"));
  /** Parse the request */
  router.use(express.urlencoded({ extended: false }));
  /** Takes care of JSON data */
  router.use(express.json());
  
  /** RULES OF OUR API */
  router.use((req, res, next) => {
    // set the CORS policy
    res.header("Access-Control-Allow-Origin", "*");
    // set the CORS headers
    res.header(
      "Access-Control-Allow-Headers",
      "origin, X-Requested-With,Content-Type,Accept, Authorization"
    );
    // set the CORS method headers
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
      return res.status(200).json({});
    }
    next();
  });
  
  /** Routes */
  router.use("/", routes);
  
  router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
  
  /** Error handling */
  router.use((req, res : any, next) => {
    const error = new Error("not found");
    return res.status(404).json({
      message: error.message,
    });
  });

  setMunicipalityRepository(new MunicipalityRepository());

  return router;
}

/** Server */
export {setup};
