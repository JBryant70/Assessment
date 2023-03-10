const express = require('express');
const router = express.Router();
const swapi = require('swapi-node');

router.get('/character', async (req, res) => {
    const params = req.query;
    let char;
    try {
        if (params.name) {
            char = await getCharacterByName(params.name);
            const charID = char.url.replace(/\D+/gm, '')
            if (params.id && charID != params.id) {
                const newChar = await getCharacterById(params.id);

                return res.send(400, `Did you mean ${char.name} or ${newChar.name}?`);
            }
        } else if (params.id) {
            char = await getCharacterById(params.id);
        } else {
            return res.send(400, `Please give a character name or character ID.`)
        }
        const starships = []
        char.starships.forEach(starship => {
            const ship = getSWAPI(starship)
            starships.push(ship);
        });
        await Promise.all(starships).then(results => {
            return res.send(200, results);
        })

    } catch (e) {
        return res.send(404, e.message);
    }

})

const getCharacterByName = (name) => {
    return swapi.get(`https://swapi.dev/api/people/?search=${name}`).then((characters) => {
        return characters.results[0]
    })
}
const getCharacterById = (id) => {
    return swapi.people({
        id
    }).then((characters) => {
        return characters
    })
}
const getSWAPI = (link) => {
    return swapi.get(link).then((result) => {
        return result
    })
}

module.exports = router