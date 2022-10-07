fetch('https://dummyjson.com/products/categories')
    .then((response) => response.json())
    .then((data) => {
        const negozi=[
            {name: "Starmobile", category: data[0]},
            {name: "MasterTech", category: data[1]},
            {name: "Essences for Life", category: data[2]},
            {name: "Ageless Aesthetics", category: data[3]},
            {name: "The Pick ‘n’ Mix", category: data[4]},
            {name: "The Décor House", category: data[5]},
            {name: "Jordan’s Vintage", category: data[6]},
            {name: "Clover Clothing Co.", category: data[7]},
            {name: "Cinderella's Closet", category: data[8]},
            {name: "One Step Ahead", category: data[9]},
            {name: "Clothing Vault", category: data[10]},
            {name: "Simply Shoes", category: data[11]},
            {name: "Time For a Change", category: data[12]},
            {name: "Fine Wrists", category: data[13]},
            {name: "Bag Adventure", category: data[14]},
            {name: "Gems Galore", category: data[15]},
            {name: "Star Sun", category: data[16]},
            {name: "Auto Excel", category: data[17]},
            {name: "MotoWorld", category: data[18]},
            {name: "Ambient Light Co.", category: data[19]}
        ];
        $(document).ready( function () {
            $('#table_id').DataTable({
                data: negozi,
                columnDefs: [{
                    "defaultContent": "-",
                    "targets": "_all"
                  }],
                columns: [
                    {data: 'name'},
                    {data: 'category'},
                ]
            });
        } );
        $('#table_id').on('click', 'td', function(){
            window.location.href = 'datatable_items.html?category=' + getTdText($(this).closest('tr'), 1) + "&shop=" + getTdText($(this).closest('tr'), 0);
        })
        $('#table_id').on('mouseover', 'td', function(){
            document.getElementById("table_div").title="click to see the products offered by " + getTdText($(this).closest('tr'), 0);
        })
        function getTdText(line, index){
            var text=line.find('td:eq(' + index + ')').text()
            return text;
        }
    });