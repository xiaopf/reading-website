
var User=require('../app/controller/user.js');
var Book=require('../app/controller/book.js');
var multiparty=require('connect-multiparty')();

module.exports=function(app){

	app.get('/', User.sign);
	app.get('/index', User.loggedIn, Book.index);
    app.get('/user/:name', User.loggedIn, User.user);
	app.get('/detail/:id', User.loggedIn, Book.detail);
	app.get('/search', User.loggedIn, Book.search);

	app.post('/addDiscuss', User.loggedIn, Book.addDiscuss);
	app.get('/upadateLike', User.loggedIn, Book.upadateLike);
	app.get('/upadateUnlike', User.loggedIn, Book.upadateUnlike);

	app.get('/admin/entry', User.loggedIn, User.adminR, Book.entry);		
	app.get('/admin/bookList', User.loggedIn, User.adminR, Book.bookList);
	app.get('/admin/userList', User.loggedIn, User.adminR, User.userList);
	app.get('/admin/bookList/updateBook/:id', User.loggedIn, User.adminR, Book.updateBook);


	app.post('/verifyName' , User.verifyName);
	app.post('/verifyEmail', User.verifyEmail);

	app.post('/user/signup', User.signup);
	app.post('/user/signin', User.signin);
	app.get('/logout', User.logout);

	app.post('/admin/newUpdateBook', User.loggedIn, User.adminR, Book.newUpdateBook);
	app.delete('/admin/bookList/deleteBook', User.loggedIn, User.adminR, Book.deleteBook);
    app.delete('/admin/userList/deleteUser', User.loggedIn, User.adminR, User.deleteUser);

 
    app.post('/user/updateUser' , User.loggedIn, User.updateUser);
    app.post('/user/updateImage', User.loggedIn, multiparty, User.updateImage);
}

