function loginSignupToggle()
{
	if(getComputedStyle(document.querySelector('.loginform')).display == 'flex')
	{
		document.querySelector('.loginform').style.display = 'none'
		document.querySelector('.signupform').style.display = 'flex'
	}
	else
	{
		document.querySelector('.loginform').style.display = 'flex'
		document.querySelector('.signupform').style.display = 'none'
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