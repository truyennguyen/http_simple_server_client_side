'use strict';

var welcome = require("./welcome");
var request = require("superagent");

document.write(welcome());

var postBookBtn = document.getElementById("postBookBtn");
var listBooks = document.getElementById("listBooks");
var getBooksBtn = document.getElementById("getBooksBtn");
var delBooksBtn = document.getElementById("delBooksBtn");

function deleteBook() {
  var bookNameDel = document.getElementById("bookNameDelete").value;
  console.log(bookNameDel);
  request
  .del("/api/books/deletebook/" + bookNameDel)
  .end(function(err, res) {
    if(err)
    	return console.log(err);
  });
}
function postBooks(){
	var bookName = document.getElementById("bookName").value;
	var bookAuthor = document.getElementById("bookAuthor").value;
	var bookPrice = document.getElementById("bookPrice").value;

	var newBook = {
		name: bookName,
		author: bookAuthor,
		price: bookPrice
	};
	request
		.post("/api/books")
		.send(newBook)
		.end(function(err, res){
			if(err)
				return console.log(err);
		});
}

function getBooks(){
	request
		.get("/api/books")
		.end(function(err, res){
			console.log(res);
			if(err)
				return console.log(err);
			var books = JSON.parse(res.text);
			books.forEach(function(book){
				var bookEl = document.createElement("ul");
				bookEl.innerHTML =
					"<ul><li> name: " + book.name +
					"</li><li> author: " + book.author +
					"</li><li> price: " + book.price +
					"</li></ul>";
				listBooks.appendChild(bookEl);
			});
		})
}

postBookBtn.addEventListener("click", postBooks, false);
getBooksBtn.addEventListener("click", getBooks, false);
delBooksBtn.addEventListener("click", deleteBook, false);