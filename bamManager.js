var inquirer = require('inquirer');
var prompt = require('prompt');
var mysql = require('mysql');
var connection;
var itemNum;
var dbName; //to hold database name

var managerList = function() {
	inquirer.prompt({
		name: "pickOperation",
		type: "rawlist",
		message: "What operation would you like to perform?  Use the Item # to select.\n",
		choices: [
		"View Products for Sale", 
		"View Low Inventory", 
		"Add to Inventory", 
		"Add New Product",
		"Quit"
		]
	}).then(function(answer) {
		//console.log(answer);
		//console.log(answer.pickOperation);
		switch(answer.pickOperation) {
			case 'View Products for Sale':
			manage.showProducts();
			break;
			case 'View Low Inventory':
			manage.showLowInv();
			break;
			case 'Add to Inventory':
			manage.newInv();
			break;
			case 'Add New Product':
			manage.addNewProduct();
			break;
			case 'Quit':
			manage.quit();				
			return;
			default:
			console.log("No item chosen\n");
			managerList();
      }//switch
  });
};//function
manage = {
	showProducts : function(){	
		var queryString = 'SELECT ItemID, ProductName, DepartmentName, Price, StockQuantity FROM ' + dbName + '.products';
		connection.query(queryString, function(err, rows, fields) {
			if (err) throw err;
			for (var i in rows) {
				console.log('Item #' + rows[i].ItemID + ', ' 
					+ rows[i].ProductName 
					+ ', Department: '  
					+ rows[i].DepartmentName 
					+ ', $' + rows[i].Price
					+ ', in stock: ' + rows[i].StockQuantity);
			}
			console.log("\n");
			managerList();	
		});	

	},
	showLowInv : function(){	
		var queryString = 'SELECT ItemID, ProductName, DepartmentName, Price, StockQuantity FROM ' + dbName + '.products';
		connection.query(queryString, function(err, rows, fields) {
			if (err) throw err;
			for (var i in rows) {
				if(rows[i].StockQuantity <= 5) {
					console.log('Item #' + rows[i].ItemID + ', ' 
						+ rows[i].ProductName 
						+ ', Department: '  
						+ rows[i].DepartmentName 
						+ ', $' + rows[i].Price
						+ ', in stock: ' + rows[i].StockQuantity);
				}
			}
			console.log("\n");
			managerList();	
		});		
	},
	newInv : function(){	
		var newQuan = 0;		
		if(newQuan <= 0){
			prompt.start();
			prompt.get(['ItemID_number','newQuan'], function(err, result) {
				newQuantity = result.newQuan;
				itemNum = result.ItemID_number;
				if (newQuantity <= 0){
					managerList();          
				}
				else{
					console.log("greater than zero " + newQuantity);
					var queryString = 'UPDATE ' + dbName + '.products SET StockQuantity = ' + newQuantity + 
					' where ItemID = ' + itemNum;
					//console.log(queryString);
					connection.query(queryString, function(err, rows, fields) {
						if (err) throw err;		
						//console.log("here");	
						manage.showProducts();																
					});//connection.query									
				}//else
			});//prompt.get
	    }//if	
	},
	addNewProduct : function(){	
		var newProd;		
		if(!newProd){
			prompt.start();
			prompt.get(['NewProductName', 'NewPrice', 'ProductInventory'], function(err, result) {
				var prodName = result.NewProductName;
				var newPrice = result.NewPrice;
				var stockQuan = result.ProductInventory;
				if (!prodName || !newPrice || !stockQuan){
					console.log("Whoops!  Didn't get that.");          
				}
				else {//now give the user the department choices
					inquirer.prompt({
						name: "pickDepartment",
						type: "rawlist",
						message: "Which department does your new item belong in?  Use the Item # to select.\n",
						choices: [
						"spam", 
						"sheep-aircraft", 
						"comestibles", 
						"torture devices"
						]
					}).then(function(answer) {
						switch(answer.pickDepartment) {
							case 'spam':
							var depName = 'spam';
							break;
							case 'sheep-aircraft':
							var depName = 'sheep-aircraft';
							break;
							case 'comestibles':
							var depName = 'comestibles';
							break;
							case 'torture devices':
							var depName = 'torture devices';
							break;
							default:
							console.log("No department chosen\n  Don't you like spam?\n");
							managerList();
				      	}//switch				      
					      var queryString = 'INSERT INTO ' + dbName + '.products ( ProductName, Price, StockQuantity, DepartmentName) '
					      + ' VALUES (' + prodName
					      + ', ' + newPrice
					      + ', ' + stockQuan
					      + ', ' + depName
					      + ');'
					      console.log("query " + queryString);
					      connection.query(queryString, function(err, rows, fields) {
							if (err) throw err;
					  	});	
					  	});								
				};
		});//if
	},
	quit : function(){
		console.log("Bye!\n");
		connection.end();
		return
	}
};//manage

var getCreds = function(){	
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
		dbName = answer.database;
		userName = answer.username;
		passWord = answer.pass;		
		connection = mysql.createConnection({
			host     : 'localhost',
			user     : userName,
			password : passWord,
			database : dbName
		});
		connection.connect();
		//start the program
		managerList();
	});// get username		
};//function getCreds()
getCreds();