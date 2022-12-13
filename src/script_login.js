function getCategories() {
	var user = document.getElementById("id-login").value;
	var password = document.getElementById("password-login").value;
	var verificaPw = "";
	fetch(`https://dummyjson.com/users/filter?key=username&value=${user}`)
	.then((risultato) => risultato.json())
	.then((data) => {
		verificaPw = data.users[0].password;
		if (password == verificaPw)
		{
			window.location.href = `../pages/users_datatables.html?email=${data.users[0].email}`;
		}

		else 
		{
			console.log("cacca");
		}
	})
}
	



