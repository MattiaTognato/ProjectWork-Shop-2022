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
})

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

async function getCategories() {
    const response = await fetch('https://dummyjson.com/products/categories')
    const categories = await response.json()

    return categories
}
async function getProductsFromCategory(category) {
    const response = await fetch(`https://dummyjson.com/products/category/${category}`)
    const products = await response.json()
    console.log(products)
    return products.products
}

(async function addShops() {
    // create shops on the map
    // and then bind the popUp to all the shop
    
    //for each category we need to create a shop
    let categories = await getCategories()
    
    for (let i = 0; i < categories.length; i++) {

        // get the shop position and place it on the map
        let position = L.latLng(shopPosition[i][0], shopPosition[i][1])
        let marker = L.marker(position, {icon:shopIcon}).addTo(map)

        //create popUp
        let popUpHTML = `<p class="text-center text-sm font-extrabold bg-transparent text-black" aria-current="page">${categories[i].toUpperCase()}</p>
        <a onclick="checkoutHandler('${categories[i]}')" class="self-center bg-fuchsia-500 hover:bg-fuchsia-600 hover:text-white visited:text-white text-white font-bold py-2 px-4 rounded-full">Buy Here</a>`
        //bind it to the marker
        marker.bindPopup(popUpHTML, {minWidth : 90, offset: L.point(0, -13)})
    }
    
})()

function createProductHTML(name, price, image, stock){
    return `<div class="flex font-sans">
    <div class="flex-none w-56 relative">
      <img src="${image}" alt="" class="absolute inset-0 w-full h-full object-cover rounded-lg" loading="lazy" />
    </div>
    <form class="flex-auto p-6">
      <div class="flex flex-wrap">
        <h1 class="flex-auto font-medium text-slate-900">
          ${name}
        </h1>
        <div class="w-full flex-none mt-2 order-1 text-3xl font-bold text-violet-600">
          ${price}€
        </div>
        <div class="text-sm font-medium text-slate-400">
          In stock: ${stock}
        </div>
      </div>
      <div class="flex space-x-4 mb-5 text-sm font-medium">
        <div class="flex-auto flex space-x-4">
          <button onclick="notificationHandler()" type="button" class="h-10 px-6 font-semibold rounded-full bg-violet-600 text-white">
            Buy now
          </button>
          <button class="h-10 px-6 font-semibold rounded-full border border-slate-200 text-slate-900" type="button">
            Add to cart
          </button>
        </div>
        <button class="flex-none flex items-center justify-center w-9 h-9 rounded-full text-violet-600 bg-violet-50" type="button">
          <svg width="20" height="20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
          </svg>
        </button>
      </div>
    </form>
    </div>`
}

const productsContainer = document.getElementById("dynamic-container")
async function createProductsHTML(category){
    //wait to get all the products
    let products = await getProductsFromCategory(category)
    //create title and container for the products
    const title = category.charAt(0).toUpperCase() + category.slice(1);
    productsContainer.innerHTML = `<p class="lg:text-4xl text-3xl font-black leading-10 text-gray-800 dark:text-white pt-3">${title}</p>
    <div id="products-container" class="space-y-5 mt-10"></div>`
    //add all the products
    for(let i = 0; i < products.length; i++){
        productsContainer.innerHTML += createProductHTML(products[i].title, products[i].price, products[i].images[0], products[i].stock)
    }
}
let checkout = document.getElementById("checkout")
let checdiv = document.getElementById("chec-div")
let flag = true

const checkoutHandler = (category) => {
    if (!flag) {
        //remove menu
        checkout.classList.add("translate-x-full")
        checkout.classList.remove("translate-x-0")
        setTimeout(function () {
            checdiv.classList.add("hidden")
        }, 300)
        flag = true
        productsContainer.innerHTML = ''
    } else {
        //open menu
        setTimeout(function () {
            checkout.classList.remove("translate-x-full")
            checkout.classList.add("translate-x-0")
        }, 200)
        checdiv.classList.remove("hidden")
        flag = false
        
        if(!category) return

        createProductsHTML(category)
    }
}
