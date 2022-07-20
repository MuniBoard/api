import getNewDatabases from "../main/databases/inmemory/databases";
import { setup } from "../main/app";
import { getOneMunicipality, getSecondMunicipality, createMunicipality } from "./utils/municipality";

export {}
const express = require('express');
const supertest = require("supertest");
let app : any;
const {validate: uuidValidate} = require("uuid");
describe("Municipality", () => {
    beforeEach(() => {
        app = setup(express(), getNewDatabases());
    });

    describe("Create Municipality", () => {
        it("route should exist", async () => {
            const response = await callAPI().post("/municipality").send({routecheck: true});

            expect(response.statusCode).toBe(200);
        });

        describe("with bad inputs", () => {
            it("should not succeed", async () => {
                const response = await callAPI().post("/municipality").send({randomGarbage: "randomGarbage"});
                const response2 = await callAPI().post("/municipality").send({});
                const response3 = await callAPI().post("/municipality");

                expect(response.statusCode).toBe(400);
                expect(response2.statusCode).toBe(400);
                expect(response3.statusCode).toBe(400);
            });
        });

        describe("with bad name type", () => {
            const municipality = {
                name: 12345,
                coordinates: {
                    lat: 46.8565177,
                    long: -71.4817748
                }
            }
            it("should not succeed", async() => {
                const response = await callAPI().post("/municipality").send(municipality);

                expect(response.statusCode).toBe(400);

            });
        });

        describe("with bad coordinates type", () => {
            const municipality = {
                name: "Québec",
                coordinates: "",
            }
            it("should not succeed", async() => {
                const response = await callAPI().post("/municipality").send(municipality);

                expect(response.statusCode).toBe(400);

            });
        });

        describe("with bad latitude type", () => {
            const municipality = {
                name: "Québec",
                coordinates: {
                    lat: "Brioches",
                    long: -71.4817748
                }
            }
            it("should not succeed", async() => {
                const response = await callAPI().post("/municipality").send(municipality);

                expect(response.statusCode).toBe(400);

            });
        });

        describe("with bad longitude type", () => {
            const municipality = {
                name: "Québec",
                coordinates: {
                    lat: 46.8565177,
                    long: "Brioches"
                }
            }
            it("should not succeed", async() => {
                const response = await callAPI().post("/municipality").send(municipality);

                expect(response.statusCode).toBe(400);

            });
        });

        describe("with bad website type", () => {
            const municipality = {
                name: "Québec",
                coordinates: {
                    lat: 46.8565177,
                    long: -71.4817748
                },
                website: 12345
            }
            it("should not succeed", async() => {
                const response = await callAPI().post("/municipality").send(municipality);

                expect(response.statusCode).toBe(400);

            });
        });

        describe("with extra inputs", () => {
            const municipality = {
                name: "Québec",
                coordinates: {
                    lat: 46.8565177,
                    long: -71.4817748
                },
                website: "https://www.ville.quebec.qc.ca/",
                randomGarbage: "Brioches"
            }
            it("should not succeed", async() => {
                const response = await callAPI().post("/municipality").send(municipality);

                expect(response.statusCode).toBe(400);

            });
        });

        describe("with extra coordinates inputs", () => {
            const municipality = {
                name: "Québec",
                coordinates: {
                    lat: 46.8565177,
                    long: -71.4817748,
                    george: 0,
                },
                website: "https://www.ville.quebec.qc.ca/"
            }
            it("should not succeed", async() => {
                const response = await callAPI().post("/municipality").send(municipality);

                expect(response.statusCode).toBe(400);

            });
        });

        describe("with invalid website protocol", () => {
            const municipality = {
                name: "Québec",
                coordinates: {
                    lat: 46.8565177,
                    long: -71.4817748
                },
                website: "www.ville.quebec.qc.ca/"
            }
            it("should not succeed", async() => {
                const response = await callAPI().post("/municipality").send(municipality);

                expect(response.statusCode).toBe(400);

            });
        });

        describe("with only required valid inputs", () => {
            const municipality = {
                name: "Québec"
            }
            it("should succeed", async () => {
                const response = await callAPI().post("/municipality").send(municipality);

                expect(response.statusCode).toBe(201);
            });
        });

        describe("with required and optional valid inputs", () => {
            const municipality = {
                name: "Québec",
                coordinates: {
                    lat: 46.8565177,
                    long: -71.4817748
                },
                website: "https://www.ville.quebec.qc.ca/"
            }
            it("should succeed", async () => {
                const response = await callAPI().post("/municipality").send(municipality);

                expect(response.statusCode).toBe(201);
            })
        });

        describe("with required and optional valid inputs with null-like values", () => {
            const municipality = {
                name: "",
                coordinates: {
                    lat: 0,
                    long: 0
                },
                website: ""
            }
            it("should succeed", async () => {
                const response = await callAPI().post("/municipality").send(municipality);

                expect(response.statusCode).toBe(201);
            })
        });

        describe("with valid inputs", () => {
            const municipality = {
                name: "Québec",
                coordinates: {
                    lat: 46.8565177,
                    long: -71.4817748
                },
                website: "https://www.ville.quebec.qc.ca/"
            }

            it("should create municipality", async () => {
                const response = await callAPI().post("/municipality").send(municipality);
                const body = JSON.parse(response.text);

                expect(body.name).toBe(municipality.name);
                expect(body.coordinates).toEqual(municipality.coordinates);
                expect(body.website).toBe(municipality.website);
            });

            it("should create id as uuid for created municipality", async () => {
                const response = await callAPI().post("/municipality").send(municipality);
                const body = JSON.parse(response.text);

                expect(uuidValidate(body.id)).toBeTruthy();
            });
        });
    });
    describe("View Municipalities", () => {
        it("route should exist", async () => {
            const response = await callAPI().get("/municipality");

            expect(response.statusCode).toBe(200);
        });

        describe("with no municipality", () => {
            it("should succeed", async () => {
                const response = await callAPI().get("/municipality");

                expect(response.statusCode).toBe(200);
            });
            it("should return empty list", async () => {
                const response = await callAPI().get("/municipality");
                const body = JSON.parse(response.text);

                expect(body.municipalities).not.toBe(undefined);
                expect(body.municipalities.length).toBe(0);
            });
        });

        describe("when given params", () => {
            it("should not succeed", async () => {
                const response = await callAPI().get("/municipality").send({ parameter : "ha" });

                expect(response.statusCode).toBe(400);
            });
        });

        describe("when one municipality", () => {
            it("should succeed", async () => {
                await createMunicipality(getOneMunicipality(), callAPI);

                const response = await callAPI().get("/municipality");

                expect(response.statusCode).toBe(200);
            });
            it("should return list with one municipality", async () => {
                const municipalityResponseBody = await createMunicipality(getOneMunicipality(), callAPI);

                const response = await callAPI().get("/municipality");
                const body = JSON.parse(response.text);

                expect(body.municipalities).not.toBe(undefined);
                expect(body.municipalities.length).toBe(1);
                expect(body.municipalities[0]).toEqual(municipalityResponseBody);
            });
        });

        describe("when multiple municipalities", () => {
            it("should succeed", async () => {
                await createMunicipality(getOneMunicipality(), callAPI);
                await createMunicipality(getSecondMunicipality(), callAPI);

                const response = await callAPI().get("/municipality");

                expect(response.statusCode).toBe(200);
            });
            it("should return list with multiple municipalities", async () => {
                const oneMunicipalityResponseBody = await createMunicipality(getOneMunicipality(), callAPI);
                const secondMunicipalityResponseBody = await createMunicipality(getSecondMunicipality(), callAPI);

                const response = await callAPI().get("/municipality");
                const body = JSON.parse(response.text);

                expect(body.municipalities).not.toBe(undefined);
                expect(body.municipalities.length).toBe(2);
                expect(body.municipalities).toContainEqual(oneMunicipalityResponseBody);
                expect(body.municipalities).toContainEqual(secondMunicipalityResponseBody);
            });
        });
    });
    describe("View Single Municipality", () => {
        it("route should exist", async () => {
            const response = await callAPI().get("/municipality/routecheck");

            expect(response.statusCode).toBe(200);
        });

        describe("when given params in body", () => {
            it("should not succeed", async () => {
                const response = await callAPI().get("/municipality/routecheck").send({ parameter : "ha" });

                expect(response.statusCode).toBe(400);
            });
        });

        describe("when given id of municipality that doesn't exist", () => {
            it("should not succeed", async () => {
                const response = await callAPI().get("/municipality/6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b");

                expect(response.statusCode).toBe(404);
            })
        });

        describe("when given id of municipality that does exist", () => {

            it("should succeed", async () => {
                const municipalityBody = await createMunicipality(getOneMunicipality(), callAPI);

                const response = await callAPI().get("/municipality/" + municipalityBody.id);

                expect(response.statusCode).toBe(200);
            });

            it("should return municipality with specified id", async () => {
                const municipalityBody = await createMunicipality(getOneMunicipality(), callAPI);

                const response = await callAPI().get("/municipality/" + municipalityBody.id);
                const body = JSON.parse(response.text);

                expect(body).toEqual(municipalityBody);
            });
        })
    });
});

function callAPI() {
    const call = supertest(app);
    return call;
}