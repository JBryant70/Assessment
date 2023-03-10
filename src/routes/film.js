const express = require('express');
const router = express.Router();
const swapi = require('swapi-node');

router.get('/species', async (req, res) => {
    const params = req.query;
    let film;
    try {
        if (params.title) {
            film = await getFilmByTitle(params.title);
            const filmID = film.url.replace(/\D+/gm, '')
            if (params.id && filmID != params.id) {
                const newfilm = await getFilmById(params.id);

                return res.send(400, `Did you mean ${film.title} or ${newfilm.title}?`);
            }
        } else if (params.id) {
            film = await getFilmById(params.id);
        } else {
            return res.send(400, `Please give a Film Title or Film ID.`)
        }
        const races = []
        film.species.forEach(species => {
            const race = getSWAPI(species)
            races.push(race);
        });
        await Promise.all(races).then(results => {
            const classification = []
            results.forEach(r => {
                if (!classification.includes(r.classification)) {
                    classification.push(r.classification);
                }
            })
            return res.send(200, classification);
        })

    } catch (e) {
        console.log(e)
        return res.send(404, e.message);
    }

})

const getFilmByTitle = (title) => {
    return swapi.get(`https://swapi.dev/api/films/?search=${title}`).then((film) => {
        return film.results[0]
    })
}
const getFilmById = (id) => {
    return swapi.films({
        id
    }).then((film) => {
        return film
    })
}
const getSWAPI = (link) => {
    return swapi.get(link).then((result) => {
        return result
    })
}

module.exports = router