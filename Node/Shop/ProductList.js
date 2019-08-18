var shop = require("faker");


for (let index = 0; index < 10; index++) {
    console.log(shop.commerce.productName() + " - " + shop.commerce.price());
}