var inquirer = require('inquirer');
var mysql = require('mysql');
var connection;
var itemNum;

var startBamazon = function() {
	inquirer.prompt({
		name: "pickItem",
		type: "input",
		message: "What item would you like to purchase?  Choose by Item #\n",
	}).then(function(answer) {
		itemNum = Number(answer.pickItem);				
		var queryString = 'SELECT ItemID, ProductName, PriceCost, StockQuantity FROM products WHERE ItemID = ' + itemNum;
		connection.query(queryString, function(err, rows, fields) {
			if (err) { 
				throw err;
			}
			else {				
				console.log('you chose #' + rows[0].ItemID + ' ' + rows[0].ProductName + ' at $' + rows[0].PriceCost); 
				inquirer.prompt({ //to find out how many they want
					name: "howMany",
					type: "input",
					message: "How many of " + rows[0].ProductName + " do you wish?\n" 
					+ "We have " + rows[0].StockQuantity + " available\n",
				}).then(function(answer) {
					var numAvail = Number(rows[0].StockQuantity);
					var cost = Number(rows[0].PriceCost);
					if(answer.howMany <= numAvail) {
						console.log("That's $" + (answer.howMany * cost));
						var left = numAvail - answer.howMany;
						numLeft = Number(left);						
						var queryString = 'UPDATE products SET StockQuantity=' + numLeft + ' WHERE ItemID = ' + itemNum;						
						connection.query(queryString, function(err, rows, fields) {
							if (err) throw err;
							console.log("Updated ");
							connection.end();
						});
					}//if
				});//end of howMany
			}//else
		});//connection		
	});//then from inquirer
};//startBamazon

var showProducts = function(){	
	var queryString = 'SELECT ItemID, ProductName, DepartmentName, PriceCost FROM products';
	connection.query(queryString, function(err, rows, fields) {
		if (err) throw err;
		for (var i in rows) {
			console.log('Item #' + rows[i].ItemID + ', ' 
				+ rows[i].ProductName 
				+ ', Department: '  
				+ rows[i].DepartmentName 
				+ ', $' + rows[i].PriceCost);
		}
	});
	startBamazon();		
};

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
		showProducts();
	});// get username		
};//function getCreds()

getCreds();
