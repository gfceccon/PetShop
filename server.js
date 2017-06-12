var express = require('express');
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
var upload_service = multer({
	dest: './public/img/service',
	limits: { fileSize: 1048576, files: 1}
});
var upload_pet = multer({
	dest: './public/img/pet',
	limits: { fileSize: 1048576, files: 1}
});


var Index = fs.readFileSync('public/templates/page.html').toString()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));


app.get('/', (req, res) => {
	console.log("GET request: index");
	let html = Index;
	res.send(html);
});

app.get('/user', (req, res) => {
	console.log("GET request: user");
	let user = db.getUser(req.cookies.auth, 'id');
	res.send(JSON.stringify(user));
});

app.get('/pets', (req, res) => {
	console.log("GET request: pets");
	let user = db.getUser(req.cookies.auth, 'id');
	let pets = db.getPets(user.user_id);
	res.send(JSON.stringify(pets));
});

app.get('/cart', (req, res) => {
	console.log("GET request: cart");
	let user = db.getUser(req.cookies.auth, 'id');
	let cart = {};
	if(user)
		cart = db.getCart(user.user_id);
	res.send(JSON.stringify(cart));
});

app.get('/items', (req, res) => {
	console.log("GET request: items");
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

		res.send(JSON.stringify({ error: 0, message: "Login efetuado com sucesso!", user: u }));
	}
});

app.get('/items-by-tag', (req, res) => {
	console.log("GET request: items-by-tag: " + req.query.tag);
	let page = req.query.page;
	let pageSize = req.query.page_size;
	let items = db.getIndexItemsByTag(req.query.tag);
	res.send(JSON.stringify(items));
});


app.get('/items-by-search', (req, res) => {
	console.log("GET request: items-by-search: " + req.query.query);
	let page = req.query.page;
	let pageSize = req.query.page_size;
	let items = db.getIndexItembsByString(req.query.query.toLowerCase());
	res.send(JSON.stringify(items));
});

app.get('/product', (req, res) => {
	console.log("GET request: product");
	let product = db.getProduct(req.query.product_id);
	res.send(JSON.stringify(product));
});

app.get('/service', (req, res) => {
	console.log("GET request: service");
	let service = db.getService(req.query.service_id);
	res.send(JSON.stringify(service));
});

app.delete('/login', (req, res) => {
	console.log("DELETE request: login");

	res.clearCookie('auth');
	res.status(204).send("No content");
});

app.post('/new-client', upload_user.single('client_img'), (req, res) => {
	console.log("POST request: new-client");

	if(db.getUser(req.body.client_user, 'username')){
		res.send({ error: 1, message: "Este usuário já existe!" });
	} else if(db.getUser(req.body.client_email, 'email')){
		res.send({ error: 2, message: "Este email já está sendo utilizado!" });
	} else {
		let new_user = {};
		new_user['user_id'] = db.Users.length + 1;
		new_user['user_name'] = req.body.client_name;
		new_user['user_username'] = req.body.client_user;
		new_user['user_password'] = req.body.client_password;
		new_user['user_tel'] = req.body.client_tel;
		new_user['user_email'] = req.body.client_email;
		new_user['user_img'] = req.file.path.replace(/^.*public\//, "");
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

app.post('/new-admin', upload_user.single('admin_img'), (req, res) => {
	console.log("POST request: new-admin");

	let user = db.getUser(req.cookies.auth, 'id');
	let allow = false;
	if(user && user.is_admin)
		allow = true;
	if(allow)
	{
		if(db.getUser(req.body.client_user, 'username')){
			res.send({ error: 1, message: "Este usuário já existe!" });
		} else if(db.getUser(req.body.client_email, 'email')){
			res.send({ error: 2, message: "Este email já está sendo utilizado!" });
		} else {
			let new_user = {};
			new_user['user_id'] = db.Users.length + 1;
			new_user['user_name'] = req.body.admin_name;
			new_user['user_username'] = req.body.admin_user;
			new_user['user_password'] = req.body.admin_password;
			new_user['user_tel'] = req.body.admin_tel;
			new_user['user_email'] = req.body.admin_email;
			new_user['user_img'] = req.file.path.replace(/^.*public\//, "");
			new_user['is_admin'] = true;
			new_user['user_address'] = {};
			db.Users.push(new_user);

			res.send({ error: 0, message: "Cliente cadastrado com sucesso!" });
		}
	}
	else
		res.send({ error: 3, message: "Operação não autorizada!" });
});

app.post('/new-product', upload_product.single('product_img'), (req, res) => {
	console.log("POST request: new-product");

	let user = db.getUser(req.cookies.auth, 'id');
	let allow = false;
	if(user && user.is_admin)
		allow = true;
	if(allow)
	{
		let new_product = {};
		let tags = req.body.product_tag.split(/\s*,\s*/);
		let list = [];
		for (let tag of tags)
			list.push(tag);

		new_product['product_id'] = parseInt(req.body.product_id);
		new_product['product_img'] = req.file.path.replace(/^.*public\//, "");
		new_product['img_width'] = 128;
		new_product['img_height'] = 128;
		new_product['product_name'] = req.body.product_name;
		new_product['product_price'] = parseFloat(req.body.product_price);
		new_product['product_description'] = req.body.product_description;
		new_product['product_full_description'] = req.body.product_full_description;
		new_product['product_tag'] = list;
		db.Products.push(new_product);

		res.send({ error: 0, message: "Produto cadastrado com sucesso!" });
	}
	else
		res.send({ error: 2, message: "Operação não autorizada!" });
});

app.post('/new-service', upload_service.single('service_img'), (req, res) => {
	console.log("POST request: new-service");

	let user = db.getUser(req.cookies.auth, 'id');
	let allow = false;
	if(user && user.is_admin)
		allow = true;
	if(allow)
	{
		let new_service = {};
		let tags = req.body.service_tag.split(/\s*,\s*/);
		let list = [];
		for (let tag of tags)
			list.push(tag);

		new_service['service_id'] = parseInt(req.body.service_id);
		new_service['service_img'] = req.file.path.replace(/^.*public\//, "");
		new_service['img_width'] = 128;
		new_service['img_height'] = 128;
		new_service['service_name'] = req.body.service_name;
		new_service['service_price'] = parseFloat(req.body.service_price);
		new_service['service_tag'] = list;
		new_service['service_description'] = req.body.service_description;
		db.Services.push(new_service);

		res.send({ error: 0, message: "Serviço cadastrado com sucesso!" });
	}
	else
		res.send({ error: 2, message: "Operação não autorizada!" });
});

app.post('/new-pet', upload_pet.single('pet_img'), (req, res) => {
	console.log("POST request: new-pet");

	let user = db.getUser(req.cookies.auth, 'id');
	if(user != false)
	{
		let new_pet = {};

		let user_pets = db.getPets(user.user_id);
		let exists = true;
		if(!user_pets)
		{
			user_pets = { user_id: user.user_id, pets: [] };
			exists = false;
		}

		new_pet['pet_id'] = user_pets.pets.length + 1;
		new_pet['pet_img'] = req.file.path.replace(/^.*public\//, "");
		new_pet['img_width'] = 128;
		new_pet['img_height'] = 128;
		new_pet['pet_name'] = req.body.pet_name;
		new_pet['pet_breed'] = req.body.pet_breed;
		new_pet['pet_age'] = parseInt(req.body.pet_age);
		new_pet['pet_status'] = 'Em casa';

		if(!exists)
			db.Pets.push(user_pets);

		res.send({ error: 0, message: "Pet cadastrado com sucesso!" });
	}
	else
		res.send({ error: 1, message: "Nenhum usuário logado!" });
});

var server = app.listen(8081, () => {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Petzzaria Pet Shop listening at http://%s:%s", host, port);
});
