const express = require('express');
const router = express.Router();
const swapi = require('swapi-node');

router.get('/totalPopulation', async (req, res) => {
    try {
        const planets = await getPlanets()
        let TotalPopulation = 0
        planets.forEach(p => {
            if (p.population !== 'unknown') {
                TotalPopulation = TotalPopulation + parseInt(p.population)
            }
        })

        res.send(200, {
            TotalPopulation
        });
    } catch (e) {
        res.send(404, e)
    }
})


const getPlanets = () => {
    let planets = [];
    return swapi.get('https://swapi.dev/api/planets/').then(async (result) => {
        planets = result.results.map(r => {
            return r
        });
        let nextPage = result.next
        while (nextPage) {
            const pageResults = await getSWAPI(nextPage);
            pageResults.results.forEach(r => {
                planets.push(r);
            });
            nextPage = pageResults.next;
        }
        return planets
    })
}
const getSWAPI = (link) => {
    return swapi.get(link).then((result) => {
        return result
    })
}

module.exports = router