var express = require('express');
var mustache = require('mustache');
var fs = require("fs");
var db = require("./database");
var app = express();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var upload_user = multer({
	dest: './public/img/user',
	limits: { fileSize: 1048576, files: 1}
});
var upload_product = multer({
	dest: './public/img/product',
	limits: { fileSize: 1048576, files: 1}
});

var Index = fs.readFileSync('public/templates/page.html').toString()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));


app.get('/', (req, res) => {
	console.log("GET request: /");
	let html = Index;
	res.send(html);
});

app.get('/getUser', (req, res) => {
	console.log("GET request: /getUser");
	let user = db.getUser(req.cookies.auth, 'id');
	res.send(JSON.stringify(user));
});

app.get('/getCart', (req, res) => {
	console.log("GET request: /getCart");
	let user = db.getUser(req.cookies.auth, 'id');
	let cart = {};
	if(user)
		cart = db.getCart(user.user_id);
	res.send(JSON.stringify(cart));
});

app.get('/getItems', (req, res) => {
	console.log("GET request: /getCart");
	let page = req.query.page;
	let pageSize = req.query.page_size;
	let items = db.getIndexItems(page, pageSize);
	res.send(JSON.stringify(items));
});

app.post('/login', (req, res) => {
	console.log("POST request: login");

	let u = db.getUser(req.body.username, 'username');
	if (!u || (u.user_password != req.body.password)){
		res.send({ error: 1, message: "Usuário ou senha inválidos!" });
	} else {
		res.cookie('auth', u.user_id, { maxAge: 1000 * 3600, httpOnly: true });
		console.log("User \"" + u.user_username + "\" just logged in!");

		res.send({ error: 0, message: "Login efetuado com sucesso!" });
	}
});

app.get('/getItemsByTag', (req, res) => {
	console.log("GET request: search_tag: " + req.query.tag);
	let page = req.query.page;
	let pageSize = req.query.page_size;
	let items = db.getIndexItemsByTag(req.query.tag);
	res.send(JSON.stringify(items));
});

app.get('/getProduct', (req, res) => {
	console.log("GET request: product");
	let product = db.getProduct(req.query.product_id);
	res.send(JSON.stringify(product));
});

app.get('/getService', (req, res) => {
	console.log("GET request: service");
	let u = db.getUser(req.cookies.auth, 'id');
	let service = db.getService(req.query.service_id, u.user_id);
	res.send(service);
});

app.delete('/login', (req, res) => {
	console.log("DELETE request: login");

	res.clearCookie('auth');
	res.status(204).send("No content");
});

app.post('/newClient', upload_user.single('client_img'), (req, res) => {
	console.log("POST request: new-client");

	if(getUser(req.body.client_user, 'username')){
		res.send({ error: 1, message: "Este usuário já existe!" });
	} else if(getUser(req.body.client_email, 'email')){
		res.send({ error: 2, message: "Este email já está sendo utilizado!" });
	} else {
		let new_user = {};
		new_user['user_id'] = Users.length + 1;
		new_user['user_name'] = req.body.client_name;
		new_user['user_username'] = req.body.client_user;
		new_user['user_password'] = req.body.client_password;
		new_user['user_tel'] = req.body.client_tel;
		new_user['user_email'] = req.body.client_email;
		new_user['user_img'] = req.file.path;
		new_user['is_admin'] = false;

		let user_address = {};
		user_address['street'] = req.body.client_street;
		user_address['num'] = req.body.client_num;
		user_address['city'] = req.body.client_city;
		user_address['state'] = req.body.client_state;
		user_address['zip'] = req.body.client_zip;

		new_user['user_address'] = user_address;
		db.Users.push(new_user);

		res.send({ error: 0, message: "Cliente cadastrado com sucesso!" });
	}
});

var server = app.listen(8081, () => {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Petzzaria Pet Shop listening at http://%s:%s", host, port);
});
