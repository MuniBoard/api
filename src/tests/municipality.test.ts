export {}
const supertest = require("supertest");
const app = require("../main/app").default;
const {validate: uuidValidate} = require("uuid");
describe("Municipality", () => {
    let apiCall : any;
    beforeEach(() => {
        apiCall = supertest(app);
    })
    describe("Create Municipality", () => {
        it("route should exist", async () => {
            const response = await apiCall.post("/municipality").send({});
            expect(response.statusCode).not.toBe(404);
        });

        describe("with bad inputs", () => {
            it("should not succeed", async () => {
                const response = await apiCall.post("/municipality").send({randomGarbage: "randomGarbage"});
                const response2 = await apiCall.post("/municipality").send({});
                const response3 = await apiCall.post("/municipality");

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
                const response = await apiCall.post("/municipality").send(municipality);

                expect(response.statusCode).toBe(400);

            });
        });

        describe("with bad coordinates type", () => {
            const municipality = {
                name: "Québec",
                coordinates: "",
            }
            it("should not succeed", async() => {
                const response = await apiCall.post("/municipality").send(municipality);

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
                const response = await apiCall.post("/municipality").send(municipality);

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
                const response = await apiCall.post("/municipality").send(municipality);

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
                const response = await apiCall.post("/municipality").send(municipality);

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
                const response = await apiCall.post("/municipality").send(municipality);

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
                const response = await apiCall.post("/municipality").send(municipality);

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
                const response = await apiCall.post("/municipality").send(municipality);

                expect(response.statusCode).toBe(400);

            });
        });

        describe("with only required valid inputs", () => {
            it("should succeed", async () => {
                const municipality = {
                    name: "Québec"
                }
                const response = await apiCall.post("/municipality").send(municipality);
                expect(response.statusCode).toBe(201);
            });
        });

        describe("with required and optional valid inputs", () => {
            it("should succeed", async () => {
                const municipality = {
                    name: "Québec",
                    coordinates: {
                        lat: 46.8565177,
                        long: -71.4817748
                    },
                    website: "https://www.ville.quebec.qc.ca/"
                }
                const response = await apiCall.post("/municipality").send(municipality);
                expect(response.statusCode).toBe(201);
            })
        });

        describe("with valid inputs", () => {
            it("should create municipality", async () => {
                const municipality = {
                    name: "Québec",
                    coordinates: {
                        lat: 46.8565177,
                        long: -71.4817748
                    },
                    website: "https://www.ville.quebec.qc.ca/"
                }

                const response = await apiCall.post("/municipality").send(municipality);
                const body = JSON.parse(response.text);

                expect(body.name).toBe(municipality.name);
                expect(body.coordinates).toEqual(municipality.coordinates);
                expect(body.website).toBe(municipality.website);
            });

            it("should create id as uuid for created municipality", async () => {
                const municipality = {
                    name: "Québec",
                    coordinates: {
                        lat: 46.8565177,
                        long: -71.4817748
                    },
                    website: "https://www.ville.quebec.qc.ca/"
                }

                const response = await apiCall.post("/municipality").send(municipality);
                const body = JSON.parse(response.text);
                expect(uuidValidate(body.id)).toBeTruthy();

            });
        })
    });
});