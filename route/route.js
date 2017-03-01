
var User=require('../app/controller/user.js');
var Book=require('../app/controller/book.js');

module.exports=function(app){
	app.get('/', User.sign);


	app.post('/user/signup', User.signup);
	app.post('/user/signin', User.signin);
	app.get('/logout', User.logout);


	app.post('/verifyName',User.verifyName);
	app.post('/verifyEmail',User.verifyEmail)

	app.get('/index', Book.index);

	app.get('/admin/entry', Book.entry);

	app.post('/admin/newBook', Book.newBook);

	app.get('/detail/:id', Book.detail);

	app.get('/admin/bookList', Book.bookList);
	app.get('/admin/userList', User.userList);

	app.delete('/admin/bookList/deleteBook', Book.deleteBook);

	app.get('/admin/bookList/updateBook/:id', Book.updateBook);

    app.delete('/admin/userList/deleteUser', User.deleteUser);

  
    app.get('/user/:name', User.user);
    app.post('/user/update', User.updateUser);
}

