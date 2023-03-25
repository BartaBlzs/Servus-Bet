function loginSignupToggle()
{
	if(getComputedStyle(document.querySelector('.login')).display == 'block')
	{
		document.querySelector('.login').style.display = 'none'
		document.querySelector('.signup').style.display = 'block'
	}
	else
	{
		document.querySelector('.login').style.display = 'block'
		document.querySelector('.signup').style.display = 'none'
	}
}

function login()
{
	var username = document.querySelectorAll('.login > input')[0]
	var password = document.querySelectorAll('.login > input')[1]
	
	if (username.reportValidity() && password.reportValidity())
	{
		fetch("http://localhost:3000/getxml",
		{
			method: "POST",
			headers: 
			{
				"Content-Type": "text/plain"
			}
		}).then(response => response.text())
		.then(data => {
				const xmlDocument = new DOMParser().parseFromString(data, "text/xml")
				xmlDocument.querySelectorAll('user').forEach(user => {
					if (user.children[0].innerHTML == username.value && 
					    CryptoJS.AES.decrypt(user.children[1].innerHTML, "nagyon titkos jelmondat").toString(CryptoJS.enc.Utf8) == password.value)
					{
						sessionStorage.setItem("username", user.children[0].innerHTML)
						sessionStorage.setItem("currency", user.children[3].innerHTML)
						location.href = "/servusbet"
					}
				})
		});
	}
}

function signup()
{
	var username = document.querySelectorAll('.signup > input')[0]
	var password = document.querySelectorAll('.signup > input')[2]
	var email = document.querySelectorAll('.signup > input')[1]
	
	if (username.reportValidity() && email.reportValidity() && password.reportValidity())
	{
		//setxml(username.value, email.value, password.value)
		console.log(email.value)
		fetch("http://localhost:3000/sendmail", 
		{
			method: "POST",
			headers: {
				"Content-Type": "text/plain",
			},
			body: email.value.toString()
		})
	}
}

function setxml(name, mail, pass)
{
	fetch("http://localhost:3000/getxml", {
	method: "POST",
	headers: {
		"Content-Type": "text/plain",
	}
	}).then(response => response.text())
  	  .then(data => {
			const xmlDocument = new DOMParser().parseFromString(data, "text/xml")
			var user = document.createElement('user')
			var username = document.createElement('username')
			var password = document.createElement('password')
			var email = document.createElement('email')
			var currency = document.createElement('currency')
			username.innerHTML = name
			password.innerHTML = CryptoJS.AES.encrypt(pass, "nagyon titkos jelmondat")
			email.innerHTML = mail
			currency.innerHTML = "0"
			user.appendChild(username)
			user.appendChild(password)
			user.appendChild(email)
			user.appendChild(currency)
			xmlDocument.querySelector('users').appendChild(user)
			fetch("http://localhost:3000/setxml", {
				method: "POST",
				headers: {
					"Content-Type": "text/plain",
				},
				body: new XMLSerializer().serializeToString(xmlDocument)
			}).then(location.href = "/")
    });
}