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
	var username = document.querySelectorAll('.loginform > input')[0]
	var password = document.querySelectorAll('.loginform > input')[1]
	
	if (username.reportValidity() && password.reportValidity())
	{
		//server
	}
}

function signup()
{
	var username = document.querySelectorAll('.signupform > input')[0]
	var password = document.querySelectorAll('.signupform > input')[2]
	var email = document.querySelectorAll('.signupform > input')[1]
	
	if (username.reportValidity() && email.reportValidity() && password.reportValidity())
	{
		//server
	}
}