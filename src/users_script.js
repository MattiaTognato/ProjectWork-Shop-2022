const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const category = urlParams.get('category');
const shopName= urlParams.get('shop');
const user=urlParams.get('email');                                          //parametro che corrisponde all'email immessa nel login
var userId;
fetch('https://dummyjson.com/users/search?q=' + /*user*/"kmeus4@upenn.edu") //email di un utente preso dall'API in attesa che venga implementato il login
    .then((response) => response.json())
    .then((user) => {
        userId=user.users[0].id;
        console.log(user);
        console.log(` ${user.users[0].firstName} ${user.users[0].lastName}`);
        document.getElementById('title').appendChild(document.createTextNode((` ${user.users[0].firstName} ${user.users[0].lastName}`).toUpperCase()));
        fetch('https://dummyjson.com/carts/user/' + userId)
            .then((response) => response.json())
            .then((data) => {
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
                } );
            });
})