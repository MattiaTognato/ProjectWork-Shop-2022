const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const category = urlParams.get('category');
const shopName= urlParams.get('shop');
var userId;
fetch('https://dummyjson.com/users/search?q=kmeus4@upenn.edu')
    .then((response) => response.json())
    .then((user) => {
        userId=user.users[0].id;
        
    
fetch('https://dummyjson.com/carts/user/' + userId)
    .then((response) => response.json())
    .then((data) => {
        console.log(data.carts[0].products);
        /*console.log(data);
        data.carts.forEach(element => {
            console.log(element.products);
        });
        $(document).ready( function () {
            $('#table_id').DataTable({
                data: data.carts[0].products,
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
        } );*/
    });
})