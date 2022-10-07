const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const category = urlParams.get('category');
const shopName= urlParams.get('shop');
fetch('https://dummyjson.com/products/category/' + category)
    .then((response) => response.json())
    .then((data) => {
        $(document).ready( function () {
            $('#table_id').DataTable({
                data: data.products,
                columnDefs: [{
                    "defaultContent": "-",
                    "targets": "_all"
                  }],
                columns: [
                    {data: 'title'},
                    {data: 'brand'},
                    {data: 'stock'},
                    {data: 'price'}
                ]
            });
        } );
    });