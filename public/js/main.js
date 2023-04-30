if (sessionStorage.getItem("username") != "" && sessionStorage.getItem("username") != null)
{
	location.href = "/servusbet"
}

function loginSignupToggle()
{
	if (getComputedStyle(document.querySelector('.login')).display == 'block')
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

//login on enter press
document.querySelector('body').addEventListener('keypress', (e) =>
{
	if (e.key == 'Enter')
	{
		if (getComputedStyle(document.querySelector('.login')).display == 'block')
		{
			login()
		}
		else
		{
			signup()
		}
	}
})

function revealPass()
{
	document.querySelector('.userinfo > :nth-child(4)').type = 'text'
	document.querySelector('.fa-eye').classList.replace( 'fa-eye', 'fa-eye-slash')

}

function hidePass()
{
	document.querySelector('.userinfo > :nth-child(4)').type = 'password'
	try
	{
		document.querySelector('.fa-eye-slash').classList.replace('fa-eye-slash', 'fa-eye')
	}
	catch{}
}

function login()
{
	var username = document.querySelectorAll('.login > input')[0]
	var password = document.querySelectorAll('.login > input')[1]
	
	if (username.reportValidity() && password.reportValidity())
	{
		fetch("/getxml",
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
					if (user.children[0].innerHTML == username.value && user.children[1].innerHTML == password.value)
					{
						sessionStorage.setItem("username", user.querySelector("username").innerHTML)
						sessionStorage.setItem("emailadress", user.querySelector("email").innerHTML)
						sessionStorage.setItem("currency", user.querySelector("currency").innerHTML)
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
		setxml(username.value, email.value, password.value)
		console.log(email.value)
		fetch("/sendmail", 
		{
			method: "POST",
			headers: {
				"Content-Type": "text/plain",
			},
			body: username.value+";"+email.value
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
			password.innerHTML = pass
			email.innerHTML = mail.toLowerCase()
			currency.innerHTML = "20000"
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

function forgotPasswordToggle()
{
	document.querySelector('.login').style.display = 'none'
	document.querySelector('.forgotpass').style.display = 'block'
}

var curmail = ""
function forgotPassword()
{
	var email = document.querySelector('.forgotpass > input')

	if (email.reportValidity())
	{
		fetch("/getxml",
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
					if (user.children[2].innerHTML == email.value.toLowerCase())
					{
						user.querySelectorAll('code').forEach(c => c.remove())
						curmail = user.children[2].innerHTML
						code = document.createElement('code')
						code.innerHTML = Math.floor(Math.random()*90000) + 10000
						user.appendChild(code)
						fetch("/setxml", {
							method: "POST",
							headers: {
								"Content-Type": "text/plain",
							},
							body: new XMLSerializer().serializeToString(xmlDocument)
						})
						fetch("/sendforgotmail",
						{
							method: "POST",
							headers:
							{
								"Content-Type": "text/plain"
							},
							body: code.innerHTML+";"+email.value+";"+user.children[0].innerHTML
						})
						document.querySelector('.codein').style.display = 'block'
					}
					
				})
			})
		
	}
}

function forgotPasswordOK()
{
	var code = document.querySelector('.codein > input')
	if (code.reportValidity())
	{
		fetch("/getxml",
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
					if (user.children[2].innerHTML == curmail)
					{
						if(code.value == user.children[4].innerHTML)
						{
							user.removeChild(user.children[4])
							fetch("/setxml", {
								method: "POST",
								headers: {
									"Content-Type": "text/plain",
								},
								body: new XMLSerializer().serializeToString(xmlDocument)
							})
							sessionStorage.setItem("setpass", "ok")
							sessionStorage.setItem("email", curmail)
							location.href = "/setpass"
						}
					}
					
				})
			})
	}
}

//b25e3a7fe07a1fdc170388e55c4fec3a:a3191eadfb8c2e56f668dc6350f298