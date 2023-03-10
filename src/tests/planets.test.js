const app = require('../../server.js');
const supertest = require("supertest");

//totalPopulation
test("GET /planets/totalPopluation", async () => {
    await supertest(app).get("/planets/totalPopulation")
        .expect('Content-Type', /json/)
        .expect(200)
        .then((res) => {
            expect(res.body.TotalPopulation).toBe(1711401432500);
        });
});