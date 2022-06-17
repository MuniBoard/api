"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const base_1 = __importDefault(require("./routes/base"));
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const router = (0, express_1.default)();
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "MuniBoard API",
            version: "1.0.0",
        },
    },
    apis: ["./source/routes/*.ts"],
};
const specs = swaggerJSDoc(options);
/** Logging */
router.use((0, morgan_1.default)("dev"));
/** Parse the request */
router.use(express_1.default.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express_1.default.json());
/** RULES OF OUR API */
router.use((req, res, next) => {
    // set the CORS policy
    res.header("Access-Control-Allow-Origin", "*");
    // set the CORS headers
    res.header("Access-Control-Allow-Headers", "origin, X-Requested-With,Content-Type,Accept, Authorization");
    // set the CORS method headers
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
        return res.status(200).json({});
    }
    next();
});
/** Routes */
router.use("/", base_1.default);
router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
/** Error handling */
router.use((req, res, next) => {
    const error = new Error("not found");
    return res.status(404).json({
        message: error.message,
    });
});
/** Server */
exports.default = router;
