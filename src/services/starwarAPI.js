const STARWAR_PLANETS = 'https://swapi-trybe.herokuapp.com/api/planets/?format=json';

export function getStarWarsPlanets() {
    fetch(STARWAR_PLANETS)
    .then((response) => response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    )
}
