const app = require('../../server.js');
const supertest = require("supertest");

//Name Given
test("GET /starships/character", async () => {
    await supertest(app).get("/starships/character")
        .query({
            name: 'Luke Skywalker'
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            expect(res.body[0].name).toBe('X-wing');
            expect(res.body[1].name).toBe('Imperial shuttle');
        });
});
//Id Given
test("GET /starships/character", async () => {
    await supertest(app).get("/starships/character")
        .query({
            id: 1
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            expect(res.body[0].name).toBe('X-wing');
            expect(res.body[1].name).toBe('Imperial shuttle');
        });
});
//Both Given and Same
test("GET /starships/character", async () => {
    await supertest(app).get("/starships/character")
        .query({
            name: 'Luke Skywalker',
            id: 1
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            expect(res.body[0].name).toBe('X-wing');
            expect(res.body[1].name).toBe('Imperial shuttle');
        });
});
//Both Given and different
test("GET /starships/character", async () => {
    await supertest(app).get("/starships/character")
        .query({
            name: 'Luke Skywalker',
            id: 2
        })
        .expect(400)
        .then((res) => {
            expect(res.text).toBe('Did you mean Luke Skywalker or C-3PO?');
        });
});
//Neither Given
test("GET /starships/character", async () => {
    await supertest(app).get("/starships/character")
        .expect(400)
        .then((res) => {
            expect(res.text).toBe('Please give a character name or character ID.');
        });
});