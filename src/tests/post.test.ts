import getNewDatabases from "../main/databases/inmemory/databases";
import { setup } from "../main/app";
import { createOneMunicipality } from "./utils/municipality";

export {}
const express = require('express');
const supertest = require("supertest");
const {validate: uuidValidate} = require("uuid");
let app : any;
describe("Post", () => {
    beforeEach(() => {
        app = setup(express(), getNewDatabases());
    });

    it("route should exist", async () => {
        const response = await callAPI().post("/municipality/routecheck/post").send({});

        expect(response.statusCode).toBe(200);
    });

    describe("given id of a municipality that doesn't exist", () => {
        it("should fail", async () => {
            const response = await callAPI().post("/municipality/6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b/post").send({});

            expect(response.statusCode).toBe(404);
        });
    });

    describe("given a created municipality", () => {
        let id = "";
        beforeEach(async () => {
            const response = await createOneMunicipality(callAPI) as any;
            id = response.id;
        });
        describe("and valid post", () => {
            const post = {
                title : "I like this municipality",
                content : "Yeah, this municipality has value to me"
            }
            let response : any;

            beforeEach(async () => {
                response = await callAPI().post(`/municipality/${id}/post`).send(post);
            });

            it("should succeed", async () => {
                expect(response.statusCode).toBe(200);
            });

            it("should create post", async () => {
                const body = JSON.parse(response.text);
        
                expect(body.title).toBe(post.title);
                expect(body.content).toBe(post.content);
            });

            it("should create id as uuid for created post", async () => {
                const body = JSON.parse(response.text);
        
                expect(uuidValidate(body.id)).toBeTruthy();
            });
        });

        describe("and post with invalid types", () => {
            const post = {
                title : 23,
                content : 23
            }
            let response : any;

            beforeEach(async () => {
                response = await callAPI().post(`/municipality/${id}/post`).send(post);
            });

            it("should fail", () => {
                expect(response.statusCode).toBe(400);
            });
        });

        describe("and post with extra arguments in body", () => {
            const post = {
                title : "My Little Title",
                content : "My Little Content",
                extraParameter : "My Extra Parameter",
            }
            let response : any;

            beforeEach(async () => {
                response = await callAPI().post(`/municipality/${id}/post`).send(post);
            });

            it("should fail", () => {
                expect(response.statusCode).toBe(400);
            });
        });
    });
});

function callAPI() {
    const call = supertest(app);
    return call;
}