// const request = require("request");
const rp = require("request-promise");

rp('https://jsonplaceholder.typicode.com/users/1')
    .then((body) => {
        const data = JSON.parse(body);
        console.log(`${data.name} lives in ${data.address.city}`);
    })
    .catch((error) => {
        console.log(`Error! ${error}`)
    });