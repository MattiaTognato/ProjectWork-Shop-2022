// defining bounds of the map
const cornerUpSx = L.latLng(73.167946, -165.806437) //73
const cornerDwDx = L.latLng(-40.416937,186.310441)
const mapBounds = L.latLngBounds( cornerDwDx, cornerUpSx)

var map = L.map('map', {
    center: [51.505, -0.09],
    minZoom: 3,
    maxZoom: 3,
    zoom: 3,
    zoomControl: false,
    attributionControl: false,
    maxBounds: mapBounds
})
var shopIcon = L.icon({
    iconUrl: '../assets/store-2017.png',
    iconSize: [40, 40], // size of the icon
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

async function getCategories() {
    const response = await fetch('https://dummyjson.com/products/categories')
    const categories = await response.json()

    return categories
}
async function getProductFromCategory(category) {
    const response = await fetch(`https://dummyjson.com/products/category/${category}`)
    const products = await response.json()

    return products
}
(async function addShops() {
    // create shops on the map
    // and then bind the popUp to all the shop
    
    //for each category we need to create a shop
    let categories = await getCategories()
    
    for (let i = 0; i < shopPosition.length; i++) {

        // get the shop position and place it on the map
        let position = L.latLng(shopPosition[i][0], shopPosition[i][1])
        let marker = L.marker(position, {icon:shopIcon}).addTo(map)

        //create popUp
        let popUpHTML = `<p class="text-center text-sm font-extrabold bg-transparent text-black" aria-current="page">${categories[i].toUpperCase()}</p>
        <a onclick="checkoutHandler(false)" class="self-center bg-fuchsia-500 hover:bg-fuchsia-600 hover:text-white visited:text-white text-white font-bold py-2 px-4 rounded-full">Buy Here</a>`
        //bind it to the marker
        marker.bindPopup(popUpHTML, {minWidth : 90, offset: L.point(0, -13)})
    }
    
})()


let checkout = document.getElementById("checkout");
let checdiv = document.getElementById("chec-div");
let flag3 = true;
const checkoutHandler = () => {
    if (!flag3) {
        checkout.classList.add("translate-x-full");
        checkout.classList.remove("translate-x-0");
        setTimeout(function () {
            checdiv.classList.add("hidden");
        }, 300);
        flag3 = true;
    } else {
        setTimeout(function () {
            checkout.classList.remove("translate-x-full");
            checkout.classList.add("translate-x-0");
        }, 200);
        checdiv.classList.remove("hidden");
        flag3 = false;
    }
};