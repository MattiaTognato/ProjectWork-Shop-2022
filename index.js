var map = L.map('map', {
    center: [51.505, -0.09],
    zoom: 2
});
var shopIcon = L.icon({
    iconUrl: 'store-2017.svg',

    iconSize: [40, 40], // size of the icon
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

async function getCategories() {
    //get categories
    const response = await fetch('https://dummyjson.com/products/categories')
    const categories = await response.json()

    return categories
}
async function addShops() {
    let categories = await getCategories()
    for (let i = 0; i < shopPosition.length; i++) {
        let position = L.latLng(shopPosition[i][0], shopPosition[i][1])
        let marker = L.marker(position, {icon:shopIcon}).addTo(map)
        let category = categories[i].toUpperCase()
        marker.bindPopup(`<b>${category}</b><br>I am a popup.`);
    }
    
}
addShops()