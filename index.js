var map = L.map('map', {
    center: [51.505, -0.09],
    zoom: 2
});
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

async function createShops() {
    //get categories
    const response = await fetch('https://dummyjson.com/products/categories')
    const categories = await JSON.stringify(response.json());

    let shops = []
    for (category in categories) {
        let response = await fetch(`https://dummyjson.com/products/category/${category}`)
        const products = await JSON.stringify(response.json());
        let shop = {
            category: category,
            products: products
        }
        shops.push(shop)
    }
    return shops
}
async function addShops() {
    let shops = await createShops()
    for (let i = 0; i < shopPosition.length; i++) {
        let position = L.latLng(shopPosition[i][0], shopPosition[i][1])
        let marker = L.marker(position).addTo(map)
        marker.bindPopup(`<b>${shops[i].category}</b><br>I am a popup.`);
    }
}
addShops()