const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const category = urlParams.get('category');
const shopName= urlParams.get('shop');
fetch('https://dummyjson.com/carts/user/5')
    .then((response) => response.json())
    .then((data) => {
        data.carts.forEach(element => {
            console.log(element.products);
        });
        $(document).ready( function () {
            //document.getElementById("title").appendChild(document.createTextNode());
            $('#table_id').DataTable({
                data: data.products,
                columnDefs: [{
                    "defaultContent": "-",
                    "targets": "_all"
                  }],
                columns: [
                    {data: 'title'},
                    {data: 'price'},
                    {data: 'discountPercentage'},
                    {data: 'quantity'}
                ]
            });
        } );
    });