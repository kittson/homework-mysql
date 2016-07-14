var inquirer = require('inquirer');
var mysql = require('mysql');
var connection;
var itemNum;

var managerList = function() {
	inquirer.prompt({
		name: "pickOperation",
		type: "rawlist",
		message: "What operation would you like to perform?  Use the Item #\n",
		choices: [
            "View Products for Sale", 
            "View Low Inventory", 
            "Add to Inventory", 
            "Add New Product"
        ]
	}).then(function(answer) {
		switch(answer) {
            case 'View Products for Sale':
                artistSearch();
            break;

            case 'View Low Inventory':
                multiSearch();
            break;

            case 'Add to Inventory':
                rangeSearch();
            break;

            case 'Add New Product':
                songSearch();
            break;


var getCreds = function(){
	var DB;
	var userName;
	var passWord;
	inquirer.prompt([{
		name: "database",
		type: "input",
		message: "Name of your mySQL database:\n"
	},{
		name: "username",
		type: "input",
		message: "Username for SQL database access:\n"
	},{
		name: "pass",
		type: "password",
		message: "Password:\n"		
	}]).then(function(answer) {
		DB = answer.database;
		userName = answer.username;
		passWord = answer.pass;		
		connection = mysql.createConnection({
			host     : 'localhost',
			user     : userName,
			password : passWord,
			database : 'bamazon'
		});
		connection.connect();
		//start the program
		managerList();
	});// get username		
};//function getCreds()
getCreds();