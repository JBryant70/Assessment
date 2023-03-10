const app = require('../../server.js');
const supertest = require("supertest");

//title Given
test("GET /films/species", async () => {
    await supertest(app).get("/films/species")
        .query({
            title: 'A New Hope'
        })
        .expect(200)
        .then((res) => {
            expect(res.body[0]).toBe('mammal');
            expect(res.body[1]).toBe('artificial');
            expect(res.body[2]).toBe('sentient');
            expect(res.body[3]).toBe('gastropod')
        });
});
//Id Given
test("GET /films/species", async () => {
    await supertest(app).get("/films/species")
        .query({
            id: 1
        })
        .expect(200)
        .then((res) => {
            expect(res.body[0]).toBe('mammal');
            expect(res.body[1]).toBe('artificial');
            expect(res.body[2]).toBe('sentient');
            expect(res.body[3]).toBe('gastropod')
        });
});
//Both Given and Same
test("GET /films/species", async () => {
    await supertest(app).get("/films/species")
        .query({
            title: 'A New Hope',
            id: 1
        })
        .expect(200)
        .then((res) => {
            expect(res.body[0]).toBe('mammal');
            expect(res.body[1]).toBe('artificial');
            expect(res.body[2]).toBe('sentient');
            expect(res.body[3]).toBe('gastropod')
        });
});
//Both Given and different
test("GET /films/species", async () => {
    await supertest(app).get("/films/species")
        .query({
            title: 'A New Hope',
            id: 4
        })
        .expect(400)
        .then((res) => {
            expect(res.text).toBe('Did you mean A New Hope or The Phantom Menace?');
        });
});
//Neither Given
test("GET /films/species", async () => {
    await supertest(app).get("/films/species")
        .expect(400)
        .then((res) => {
            expect(res.text).toBe('Please give a Film Title or Film ID.');
        });
});