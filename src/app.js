var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');

var app  = express();

app.set('view engine', 'pug');
app.set('views','./views');


app.use(express.static('../public'));
app.use(express.static('../public/images'));
app.use(express.static('../public/css'));
app.use(express.static('../public/js'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

//json reader module
const jsonReaderModule = require('../jsonReaderModule.js');
var filename = '../users.json';

//default homepage
app.get('/',function(req,res){
	res.render('index.pug')
})
//index page
app.get('/index.pug',function(req,res){
	res.render('index.pug')
})
//search page
app.get('/search.pug',function(req,res){
	res.render('search.pug')
})

//ajax request search bar
app.get('/suggest',function(req,res){
	var text = req.query.text;
	console.log(text);
	fs.readFile('../users.json', function(err,data){
		if(err){
			throw err
		}
		var parsedData = JSON.parse(data);
		var output = parsedData.filter( function(element){   
			return element.firstname.toLowerCase().startsWith(text.toLowerCase());
		})	
		res.send({output : output})		
	})

})
//send all users info 
app.get('/users.pug', function(req,res){
	jsonReaderModule.jsonFileReader(filename, function(usersJson){
		res.render('users.pug',{
			userData: usersJson
		});
	});
	 
})

//route for new sing users
app.get('/signup.pug', function(reqLogin,resLogin){
	 resLogin.render('signup.pug')
}) 
//route for new sign-in
app.post('/register', function(reqRegister,resRegister){
	
	let details = {
		firstname: reqRegister.body.firstName,
		lastname: reqRegister.body.lastName,
		email: reqRegister.body.eMail
	}

	jsonReaderModule.jsonFileReader(filename, function(usersJson){
		usersJson.push(details)
		let userData = JSON.stringify(usersJson);  
		fs.writeFile('../users.json', userData); 
    })
    const message = "Welcome to! Your registered succesfully"
	resRegister.render('signup.pug',{
		message:message

	})
});

app.listen(3000,()=>{
	console.log('Your app is listening at port 3000')
})


