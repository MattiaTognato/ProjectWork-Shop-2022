fetch('https://dummyjson.com/products')
    .then((response) => response.json())
    .then((data) => {
        console.log(data.products);
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
                    {data: 'category'},
                    {data: 'stock'},
                    {data: 'price'}
                ]
            });
        } );
        console.log(data.products[0]);
    });