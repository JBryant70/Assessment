# Assessment
Mission parameters: Create a REST API that has 3 routes
1. get a list of Starships that a character can pilot
2. Find the Classifications for species for each film
3. Get the Total populations across all the planets in the galaxy. 

# Routes
1. /starships/character?name=Luke%20Skywalker&id=1
    This route can take a name of a character from Star Wars, or the id of the character in the Star Wars API. It will return all the starships that the character pilots during the Star Wars Series. Note that the query param is an either, or , both param. It will look up using either paramater. 
2. /films/species?title=A%20new%20Hope&id=1
    This route can take a title of a film from Star Wars, or the id of the film in the Star Wars API. It return the classifications of species seen in the film. This classification list is exclusive, and will not repeat if there are multiple. 
3. /planets/totalPopulation
    This route has no params and returns the total population sumed over all the planets in the galaxy. It removes plantes that the population is unknown. 

### Project Setup
Install Npm
'''
npm install
'''
Run App
'''
npm start
'''
This will run the server on port 8080. 

To run Tests 
'''
npm test
'''

