var express = require('express');
var fs = require("fs");
var db = require("./database");
var populate = require("./create_database");
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

var Index = fs.readFileSync('public/templates/page.html').toString();

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
	db.getUser(req.cookies.auth, '_id', (err, user) => {
		if(err)
			res.send(false);
		else
			res.send(JSON.stringify(user));
	});
});

app.get('/pets', (req, res) => {
	console.log("GET request: pets");
	db.getUser(req.cookies.auth, '_id', (err, user) => {
		if(!err){
			db.getPets(user._id, (err, pets) => {
				if(err)
					res.send(false);
				else
					res.send(JSON.stringify(pets.pets));
			});
		} else {
			res.send(false);
		}
	});
});

app.get('/transactions', (req, res) => {
	console.log("GET request: transactions");
	let transactions = db.getTransactions();
	res.send(JSON.stringify(transactions));
});

app.get('/cart', (req, res) => {
	console.log("GET request: cart");
	db.getUser(req.cookies.auth, '_id', (err, user) => {
		if(!err){
			db.getCart(user._id, (err, cart) => {
				if(err)
					res.send(false);
				else
					res.send(JSON.stringify(cart.cart));
			});
		}
	});
});

app.get('/items', (req, res) => {
	console.log("GET request: items");
	let page = req.query.page;
	let pageSize = req.query.page_size;

	db.getIndexItems(page, pageSize, (err, items) => {
		if(err)
			res.send(false)
		else
			res.send(JSON.stringify(items));
	});
});

app.post('/login', (req, res) => {
	console.log("POST request: login");

	db.getUser(req.body.username, '_id', (err, user) => {
		if(err){
			res.send({ error: 1, message: "Usuário ou senha inválidos!" });
		} else {
			if(user.user_password != req.body.password){
				res.send({ error: 1, message: "Usuário ou senha inválidos!" });
			} else {
				res.cookie('auth', user._id, { maxAge: 1000 * 3600, httpOnly: true });
				console.log("User \"" + user._id + "\" just logged in!");

				res.send(JSON.stringify({ error: 0, message: "Login efetuado com sucesso!", user: user }));
			}
		}
	});
});

app.get('/items-by-tag', (req, res) => {
	console.log("GET request: items-by-tag: " + req.query.tag);
	let page = req.query.page;
	let pageSize = req.query.page_size;

	db.getIndexItemsByTag(req.query.tag, (err, items) => {
		if(err)
			res.send(false)
		else
			res.send(JSON.stringify(items));
	});
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
	db.getProduct(req.query.product_id, (err, product) => {
		if(err)
			res.send(false);
		else
			res.send(JSON.stringify(product));
	});
});

app.get('/service', (req, res) => {
	console.log("GET request: service");
	db.getService(req.query.service_id, (err, service) => {
		if(err)
			res.send(false);
		else
			res.send(JSON.stringify(service));
	});
});

app.get('/cart-clear', (req, res) => {
	console.log("GET request: cart(clear)");
	let user = db.getUser(req.cookies.auth, '_id');
	let cart = {};
	if(user) {
		db.getCart(user.user_id).length = 0;
	}
	res.send({ message: "nice" });
})

app.post('/buy-product', (req, res) => {
	console.log("POST request: buy-product");
	let product_id = parseInt(req.body.product_id);
	let product_quantity = parseInt(req.body.product_quantity);
	let user = db.getUser(req.cookies.auth, '_id');
	let cart = {};
	let added = false;
	if(user) {
		cart = db.getCart(user.user_id);
		cart.forEach((buyItem) => {
			if(buyItem.product_id == product_id) {
				buyItem.product_quantity = buyItem.product_quantity + product_quantity;
				added = true;
			}
		});
		if(!added) {
			cart.push({
				product_id: product_id,
				product_quantity: product_quantity
			});
		}
	}
	res.send(JSON.stringify(cart));
});

app.delete('/login', (req, res) => {
	console.log("DELETE request: login");

	res.clearCookie('auth');
	res.status(204).send("No content");
});

var searchUserId = function(req, res, admin) {
	db.getUser(req.body.client_user, '_id', (err, user) => {
		if(!err){
			res.send({ error: 1, message: "Este usuário já existe!" });
		} else {
			searchUserEmail(req, res, admin);
		}
	});
};

var searchUserEmail = function(req, res, admin) {
	db.getUser(req.body.client_email, 'user_email', (err, user) => {
		if(!err){
			res.send({ error: 2, message: "Este email já está sendo utilizado!" });
		} else {
			addNewUser(req, res, admin);
		}
	});
};

var addNewUser = function(req, res, admin) {
	let new_user = {};
	new_user['user_name'] = req.body.client_name;
	new_user['user_password'] = req.body.client_password;
	new_user['user_tel'] = req.body.client_tel;
	new_user['user_email'] = req.body.client_email;
	new_user['user_img'] = req.file.path.replace(/^.*public\//, "");
	new_user['is_admin'] = admin;

	let user_address = {};
	if(!admin)
	{
		user_address['street'] = req.body.client_street;
		user_address['num'] = req.body.client_num;
		user_address['city'] = req.body.client_city;
		user_address['state'] = req.body.client_state;
		user_address['zip'] = req.body.client_zip;
	}
	new_user['user_address'] = user_address;

	db.addUser(new_user, req.body.client_user, (err, body) => {
		if(!err){
			res.send({ error: 0, message: "Cliente cadastrado com sucesso!" });
		} else {
			console.log(err);
			console.log(body);
		}
	});
}

app.post('/new-client', upload_user.single('client_img'), (req, res) => {
	console.log("POST request: new-client");
	searchUserId(req, res, false);
});

app.post('/new-admin', upload_user.single('client_img'), (req, res) => {
	console.log("POST request: new-admin");

	db.getUser(req.cookies.auth, '_id', (err, user) => {
		if(err)
			res.send({ error: 1, message: "Operação não autorizada!" });
		else if(user && user.is_admin)
			searchUserId(req, res, true);
		else
			res.send({ error: 3, message: "Operação não autorizada!" });
	});
});

app.post('/new-product', upload_product.single('product_img'), (req, res) => {
	console.log("POST request: new-product");

	db.getUser(req.cookies.auth, '_id', (err, user) => {
		if(user && user.is_admin)
		{
			let new_product = {};
			let tags = req.body.product_tag.split(/\s*,\s*/);
			let list = [];
			for (let tag of tags)
				list.push(tag);

			db.getNextProductId((err, id) => {
				new_product['product_id'] = id;
				new_product['product_img'] = req.file.path.replace(/^.*public\//, "");
				new_product['img_width'] = 128;
				new_product['img_height'] = 128;
				new_product['product_name'] = req.body.product_name;
				new_product['product_price'] = parseFloat(req.body.product_price);
				new_product['product_description'] = req.body.product_description;
				new_product['product_full_description'] = req.body.product_full_description;
				new_product['product_tag'] = list;
				db.addProduct(new_product, (err, product) => {
					
				});

			});
		}
		else
			res.send({ error: 2, message: "Operação não autorizada!" });
	});
});

app.post('/new-service', upload_service.single('service_img'), (req, res) => {
	console.log("POST request: new-service");

	let user = db.getUser(req.cookies.auth, '_id');
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

		new_service['service_id'] = db.Services.length + 1;
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

app.put('/edit-product', upload_product.single('product_img'), (req, res) => {
	console.log("PUT request: edit-product");

	let user = db.getUser(req.cookies.auth, '_id');
	let allow = false;
	if(user && user.is_admin)
		allow = true;
	if(allow)
	{
		let product = db.getProduct(parseInt(req.body.product_id));
		if(product)
		{
			if(typeof req.file != typeof undefined && req.file != false)
			{
				fs.unlink('./public/' + product['product_img'], function() { });
				product['product_img'] = req.file.path.replace(/^.*public\//, "");
			}
			let tags = req.body.product_tag.split(/\s*,\s*/);
			let list = [];
			for (let tag of tags)
				list.push(tag);

			product['img_width'] = 128;
			product['img_height'] = 128;
			product['product_name'] = req.body.product_name;
			product['product_price'] = parseFloat(req.body.product_price);
			product['product_description'] = req.body.product_description;
			product['product_full_description'] = req.body.product_full_description;
			product['product_tag'] = list;

			res.send({ error: 0, message: "Produto cadastrado com sucesso!" });
		}
		else
			res.send({ error: 1, message: "Produto não encontrado!" });
	}
	else
		res.send({ error: 2, message: "Operação não autorizada!" });
});

app.put('/edit-service', upload_service.single('service_img'), (req, res) => {
	console.log("PUT request: edit-service");

	let user = db.getUser(req.cookies.auth, '_id');
	let allow = false;
	if(user && user.is_admin)
		allow = true;
	if(allow)
	{
		let service = db.getService(parseInt(req.body.service_id));
		if(service)
		{
			if(typeof req.file != typeof undefined && req.file != false)
			{
				fs.unlink('./public/' + product['service_img'], function() { });
				service['service_img'] = req.file.path.replace(/^.*public\//, "");
			}
			let tags = req.body.service_tag.split(/\s*,\s*/);
			let list = [];
			for (let tag of tags)
				list.push(tag);

			service['img_width'] = 128;
			service['img_height'] = 128;
			service['service_name'] = req.body.service_name;
			service['service_price'] = parseFloat(req.body.service_price);
			service['service_tag'] = list;
			service['service_description'] = req.body.service_description;

			res.send({ error: 0, message: "Serviço cadastrado com sucesso!" });
		}
		else {
			res.send({ error: 1, message: "Serviço não encontrado!" });
		}
	}
	else
		res.send({ error: 2, message: "Operação não autorizada!" });
});

app.post('/transaction', (req, res) => {
	console.log("POST request: transaction");

	let credit_card = req.body.credit_card;
	let user = db.getUser(req.cookies.auth, '_id');
	let cart = {};
	if(user) {
		cart = db.getCart(user.user_id);
		cart.forEach((buyItem) => {
			let transaction = {};
			product = db.getProduct(buyItem.product_id);

			transaction['product_id'] = product.product_id;

			transaction['price'] = product.product_price;
			transaction['quantity'] = buyItem.product_quantity;

			transaction['is_product'] = true;
			db.Transactions.push(transaction);

			product.product_stkamt = product.product_stkamt - buyItem.product_quantity;
			product.product_soldamt = product.product_soldamt + buyItem.product_quantity;
		});
		cart.length = 0;
		res.send({ error: 0, message: "Compra realizada com sucesso!" });
	}
	else
		res.send({ error: 2, message: "Operação não autorizada!" });
});

app.post('/transaction-service', (req, res) => {
	console.log("POST request: transaction");
	let user = db.getUser(req.cookies.auth, '_id');
	if(user) {
		let transaction = {};
		service = db.getService(parseInt(req.body.service_id));

		transaction['service_id'] = service.service_id;
		transaction['quantity'] = 1;
		transaction['price'] = service.service_price;
		transaction['pet_id'] = parseInt(req.body.pet_id);
		transaction['is_product'] = false;
		db.Transactions.push(transaction);

		res.send({ error: 0, message: "Compra realizada com sucesso!" });
	}
	else
		res.send({ error: 2, message: "Operação não autorizada!" });
});

app.post('/new-pet', upload_pet.single('pet_img'), (req, res) => {
	console.log("POST request: new-pet");

	let user = db.getUser(req.cookies.auth, '_id');
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
		user_pets.pets.push(new_pet);

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
	populate.create();
	console.log("Petzzaria Pet Shop listening at http://%s:%s", host, port);
});
