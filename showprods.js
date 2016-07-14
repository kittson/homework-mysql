module.exports = exports = showProducts = function(){	
	var queryString = 'SELECT ItemID, ProductName, DepartmentName, Price, StockQuantity FROM products';
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
	});
	if(!shown){
		startBamazon();
	}			
};

//exports.showProducts = showProducts;