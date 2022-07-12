import getNewDatabases from "../main/databases/inmemory/databases";
import { setup } from "../main/app";
import { createOneMunicipality, createSecondMunicipality } from "./utils/municipality";

export {}
const express = require('express');
const supertest = require("supertest");
const {validate: uuidValidate} = require("uuid");
let app : any;
describe("Post", () => {
    beforeEach(() => {
        app = setup(express(), getNewDatabases());
    });

    describe("Create Post", () => {
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

    describe("View Posts", () => {
        it("route should exist", async () => {
            const response = await callAPI().get("/municipality/routecheck/post");
    
            expect(response.statusCode).toBe(200);
        });

        describe("given id of a municipality that doesn't exist", () => {
            it("should fail", async () => {
                const response = await callAPI().get("/municipality/6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b/post").send({});
    
                expect(response.statusCode).toBe(404);
            });
        });

        describe("given a created municipality", () => {
            let id = "";
            beforeEach(async () => {
                const response = await createOneMunicipality(callAPI) as any;
                id = response.id;
            });

            describe("and no posts", () => {
                it("should return empty list", async () => {
                    const response = await callAPI().get(`/municipality/${id}/post`);

                    const body = JSON.parse(response.text);

                    expect(body.posts).toHaveLength(0);
                });
            });

            describe("and one post", () => {
                const post = {
                    title : "I like this municipality",
                    content : "Yeah, this municipality has value to me"
                }
                beforeEach(async () => {
                    await createPost(id, post);
                });

                it("should return a list including the post", async () => {
                    const response = await callAPI().get(`/municipality/${id}/post`);

                    const body = JSON.parse(response.text);

                    expect(body.posts).toHaveLength(1);
                    expect(body.posts[0].title).toEqual(post.title);
                    expect(body.posts[0].content).toEqual(post.content);
                });
            });

            describe("and two posts", () => {
                const post1 = {
                    title : "I like this municipality",
                    content : "Yeah, this municipality has value to me"
                }
                const post2 = {
                    title : "I do not like this municipality",
                    content : "Yeah, this municipality sucks"
                }
                beforeEach(async () => {
                    await createPost(id, post1);
                    await createPost(id, post2);
                });

                it("should return a list including both posts", async () => {
                    const response = await callAPI().get(`/municipality/${id}/post`);

                    const body = JSON.parse(response.text);

                    expect(body.posts).toHaveLength(2);
                    expect(body.posts[0].title).toEqual(post1.title);
                    expect(body.posts[0].content).toEqual(post1.content);
                    expect(body.posts[1].title).toEqual(post2.title);
                    expect(body.posts[1].content).toEqual(post2.content);
                });
            });

            describe("and created another municipality", () => {
                let secondId : any
                beforeEach(async() => {
                    const response = await createSecondMunicipality(callAPI) as any;
                    secondId = response.id;
                });

                describe("and other municipality has posts", () => {
                    const post = {
                        title : "Another municipality's post title",
                        content : "Another municipality's post content"
                    }
                    beforeEach(async () => {
                        await createPost(secondId, post);
                    });

                    it("should not get the other municipality's posts", async () => {
                        const response = await callAPI().get(`/municipality/${id}/post`);

                        const body = JSON.parse(response.text);
                        expect(body.posts).toHaveLength(0);
                    });
                });
            });
        });
    });

    describe("View Single Post", () => {
        it("route should exist", async () => {
            const response = await callAPI().get("/municipality/routecheck/post/routecheck");

            expect(response.statusCode).toBe(200);
        });

        describe("given id of a municipality that doesn't exist", () => {
            it("should fail", async () => {
                const response = await callAPI().get("/municipality/6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b/post/routecheck");

                expect(response.statusCode).toBe(404);
            });
        });

        describe("given id of a post that doesn't exist", () => {
            it("should fail", async () => {
                const response = await callAPI().get("/municipality/routecheck/post/6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b");

                expect(response.statusCode).toBe(404);
            });
        });

        describe("given created municipality", () => {
            let municipalityId : any;
            beforeEach(async () => {
                const response = await createOneMunicipality(callAPI);
                municipalityId = response.id;
            });

            describe("and created post", () => {
                let postId : any;
                const post = {
                    title : "I like this municipality",
                    content : "Yeah, this municipality has value to me"
                }
                beforeEach(async () => {
                    const response = await createPost(municipalityId, post);
                    postId = response.id;
                });

                describe("and getting with municipality and post ids", () => {
                    let response : any;
                    beforeEach(async () => {
                        response = await callAPI().get(`/municipality/${municipalityId}/post/${postId}`);
                    });

                    it("should succeed", async () => {
                        expect(response.statusCode).toBe(200);
                    });

                    it("should return same post as the one that was created", () => {
                        response = JSON.parse(response.text);

                        expect(response.id).toEqual(postId);
                        expect(response.municipalityId).toEqual(municipalityId);
                        expect(response.title).toEqual(post.title);
                        expect(response.content).toEqual(post.content);
                    });
                })
            })
        });
    });
});

async function createPost(municipalityId : string, post : object) {
    const response = await callAPI().post(`/municipality/${municipalityId}/post`).send(post);
    return JSON.parse(response.text);
};

function callAPI() {
    const call = supertest(app);
    return call;
}