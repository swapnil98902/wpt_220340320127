
const express = require('express');
const mysql = require('mysql2');

let dbparams = {
	host:'localhost',
	user:'swapnil',
	password:'cdac',
	database:'node',
	port:'3306'
};
const app = express();
app.use(express.static('statics'));

let con = mysql.createConnection(dbparams);
app.listen(4000,()=>{
	console.log('server is running on 4000...');
})
app.get('/addbook',(req, res)=>{
	let bookid = req.query.bookid;
	let bookname = req.query.bookname;
	let price = req.query.price;
	
	let output = {status:false, bookdetail:{bookid:'',bookname:'',price:''}};
	console.log(bookid);
	con.query('insert into book values(?,?,?)',[bookid,bookname,price],
    (error,rows)=>{
		if(error){
			console.log('error occured');
		}
		else{
			if(rows.affectedRows>0){
				output.status=true;
				output.bookdetail=rows[0];
				console.log(rows);
			}
			else
			{
				console.log('insert failed');
			}
		}
		res.send(output)
	}
	


	)

});




