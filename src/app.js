var express = require('express');
var app = express();
var fs = require('fs');

var bodyParser = require("body-parser");

var JsonReadModule = require('./../JsonReadModule')

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('../public'));
app.use(bodyParser.urlencoded({extended:true}));

var JsonReadModule = require('../JsonReadModule.js');
var filename = '../users.json';


app.get('/', function(reqAll,resAll){
	JsonReadModule.JsonReadModule(filename, function(usersJson){
		resAll.render('index',{
			userData: usersJson
		});
	});
});

//search bar

app.get('/search', function(reqSearch, resSearch){

	resSearch.render('search.pug')
})

app.post('/searchName', function(reqPost, resPost, next){
	
	let name = reqPost.body.name;
	let input = name.toLowerCase();
	console.log(input);

	JsonReadModule.JsonReadModule(filename, function(usersJson){
		
        
		for(let i = 0; i < usersJson.length; i++){


			if(usersJson[i].firstname.toLowerCase() === input || usersJson[i].lastname.toLowerCase() === name){
				
				let userDetails = ` Firstname: ${usersJson[i].firstname}  Lastname: ${usersJson[i].lastname}  Email: ${usersJson[i].email}` ;
				resPost.render('search.pug', {
					usersJson: userDetails
				})
				return next();
			}
		}
		resPost.render('search.pug', {
			usersJson: `${name} not found. please check!`
		})
	})
})

//login page
app.get('/login', function(reqLogin,resLogin){
	 resLogin.render('login.pug')
})

app.post('/register', function(reqRegister,resRegister){
	
	var details = {
		firstname: reqRegister.body.firstName,
		lastname: reqRegister.body.lastName,
		email: reqRegister.body.eMail
	}

	JsonReadModule.JsonReadModule(filename, function(usersJson){
		usersJson.push(details)


		var userData = JSON.stringify(usersJson);  
		fs.writeFile('../users.json', userData); 

	})

	var successMessage = `Hi ${reqRegister.body.firstName}! Hooray!!! Welcome to my Page :)`
		resRegister.render('login.pug', {

		userDetails: successMessage

	}) 
})



app.listen(3000,function(){
	console.log("Your app is listening at port 3000");
})


