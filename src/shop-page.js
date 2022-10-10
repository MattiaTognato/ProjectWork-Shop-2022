const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');
console.log(category);