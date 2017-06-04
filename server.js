var express = require('express');
var mustache = require('mustache');
var fs = require("fs");
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

var templates = {
	header_index: fs.readFileSync('template/header-index.html').toString(),
	header_logged: fs.readFileSync('template/header-logged.html').toString(),

	footer: fs.readFileSync('template/footer.html').toString(),

	index: fs.readFileSync('template/index.html').toString(),

	nav_admin: fs.readFileSync('template/nav-admin.html').toString(),
	nav_client: fs.readFileSync('template/nav-client.html').toString(),
	nav_index: fs.readFileSync('template/nav-index.html').toString(),

	page: fs.readFileSync('template/page.html').toString(),

	product: fs.readFileSync('template/product.html').toString(),
	cart: fs.readFileSync('template/cart.html').toString(),
	login: fs.readFileSync('template/login.html').toString(),
	service: fs.readFileSync('template/service.html').toString(),

	admin: fs.readFileSync('template/admin.html').toString(),
	user: fs.readFileSync('template/user.html').toString(),

	new_client: fs.readFileSync('template/new-client.html').toString(),
	new_admin: fs.readFileSync('template/new-admin.html').toString(),
	new_pet: fs.readFileSync('template/new-pet.html').toString(),
	new_product: fs.readFileSync('template/new-product.html').toString(),
	new_service: fs.readFileSync('template/new-service.html').toString()
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

var Users = [
	{
		user_id: 1,
		user_name: 'John Doe',
		user_username: 'john',
		user_password: 'john',
		user_img: '',
		user_tel: '34954820',
		user_email: 'johndoe@uol.com.br',
		user_address: {
			street: 'Rua dos Lobos',
			num: '0',
			city: 'Saint Charles',
			state: 'Saint Paul',
			zip: '40028-922',
		},
		cart_count: function() {
			let cart = getCart(this.user_id);
			return cart.cart.length
		},
		is_admin: false
	},
	{
		user_id: 2,
		user_name: 'Emily Hawkins',
		user_username: 'emily',
		user_password: '12345',
		user_img: '',
		user_tel: '284971920',
		user_email: 'emily@uol.com.br',
		user_address: {
			street: 'Rua dos Anjos',
			num: '0',
			city: 'Saint Christina',
			state: 'Saint Agatha',
			zip: '45127-125',
		},
		cart_count: function() {
			let cart = getCart(this.user_id);
			if(cart)
				return cart.cart.length;
			return 0;
		},
		is_admin: false
	},
	{
		user_id: 3,
		user_name: 'Administrador',
		user_username: 'admin',
		user_password: 'admin',
		user_img: '',
		user_tel: '90654280',
		user_email: 'adm@uol.com.br',
		is_admin: true
	}
];

var Products = [
	{
		product_id: 1, product_img: 'cat128.png',
		img_width: 128, img_height: 128,
		product_name: 'Ração para gato', product_price: 199.90,
		product_tag: ['cat', 'food'],
		product_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>',
		product_full_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio. Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>'
	},
	{
		product_id: 2, product_img: 'cat128.png',
		img_width: 128, img_height: 128,
		product_name: 'Brinquedo para gato', product_price: 29.90,
		product_tag: ['cat', 'accy'],
		product_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>',
		product_full_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio. Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>'
	},
	{
		product_id: 3, product_img: 'cat128.png',
		img_width: 128, img_height: 128,
		product_name: 'Cama para gato', product_price: 89.90,
		product_tag: ['cat', 'accy'],
		product_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>',
		product_full_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio. Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>'
	},
	{
		product_id: 4, product_img: 'cat128.png',
		img_width: 128, img_height: 128,
		product_name: 'Petisco para gato', product_price: 1.99,
		product_tag: ['cat', 'food'],
		product_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>',
		product_full_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio. Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>'
	},
	{
		product_id: 5, product_img: 'cat128.png',
		img_width: 128, img_height: 128,
		product_name: 'Coleira para gato', product_price: 35.90,
		product_tag: ['cat', 'accy'],
		product_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>',
		product_full_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio. Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>'
	}
];

var Carts = [
	{
		user_id: 1,
		cart: [
			{ product_id: 1, product_quantity: 1 },
			{ product_id: 2, product_quantity: 1 },
			{ product_id: 4, product_quantity: 4 }
		]
	},
	{
		user_id: 2,
		cart: [
			{ product_id: 1, product_quantity: 1 },
			{ product_id: 3, product_quantity: 1 }
		]
	}
];

var Pets = [
	{
		user_id: 1,
		pets: [
			{ pet_name: 'Garfield', pet_img: 'cat64.png', pet_breed: 'Gato Malhado', pet_age: 2 },
			{ pet_name: 'Lara', pet_img: 'cat64.png', pet_breed: 'Gato Persa', pet_age: 3 },
			{ pet_name: 'Ana', pet_img: 'cat64.png', pet_breed: 'Gato Siames', pet_age: 5 }
		]
	},
	{
		user_id: 2,
		pets: [
			{ pet_name: 'James', pet_img: 'cat64.png', pet_breed: 'Gato Siames', pet_age: 4 },
			{ pet_name: 'Tom', pet_img: 'cat64.png', pet_breed: 'Gato Malhado', pet_age: 1 }
		]
	}
];

var Services = [
	{
		service_id: 1, service_img: 'cat128.png',
		img_width: 128, img_height: 128,
		service_name: 'Tosa para gato', service_price: 69.90,
		service_tag: ['cat', 'shearing'],
		service_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>'
	},
	{
		service_id: 2, service_img: 'cat128.png',
		img_width: 128, img_height: 128,
		service_name: 'Banho para gato', service_price: 49.90,
		service_tag: ['cat', 'bath'],
		service_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>'
	}
];

var getUser = function(user, field) {
	let filtered_list = [];

	if(field == 'id')
		filtered_list = Users.filter((u) => { return u.user_id == user; });
	else if(field == 'username')
		filtered_list = Users.filter((u) => { return u.user_username == user; });
	else if(field == 'email')
		filtered_list = Users.filter((u) => { return u.user_email == user; });

	if(!filtered_list.length)
		return false;

	return filtered_list[0];
}

var getProducts = function(page, pageSize) {
	return { products: Products };
}

var getProduct = function(product_id) {
	let filtered_list = Products.filter((p) => { return p.product_id == product_id; });

	if(!filtered_list.length)
		return false;

	return filtered_list[0];
}

var getProductsByTag = function(tag) {
	var products = { products: [] };
	Products.forEach(function(product) {
		if(tag.constructor === Array) {
			var add = true;
			tag.forEach(function(current_tag) {
				if(product.product_tag.indexOf(current_tag) < 0) {
					add = false;
				}
			});
			if(add)
				products.products.push(product);
		} else {
			if(product.product_tag.indexOf(tag) >= 0) {
				products.products.push(product);
			}
		}
	});
	return products;
}

var getCart = function(user_id) {
	let filtered_list = Carts.filter((c) => { return c.user_id == user_id; });

	if(!filtered_list.length)
		return false;

	return filtered_list[0];
}

var getPets = function(user_id) {
	let filtered_list = Pets.filter((p) => { return p.user_id == user_id; });

	if(!filtered_list.length)
		return false;

	let pets = filtered_list[0];
	pets.pet_description = function() {
		return this.pet_name + ' - ' + this.pet_breed;
	}

	return pets;
}

var getService = function(service_id, user_id) {
	let filtered_list = Services.filter((s) => { return s.service_id == service_id; });

	if(!filtered_list.length)
		return false;

	let service = filtered_list[0];
	let pets = getPets(user_id);

	// This makes no sense
	service.pets = pets.pets;
	service.pet_description = pets.pet_description;
	return service;
}

app.get('/header', function (req, res) {
	console.log("GET request: header");

	var u = getUser(req.cookies.auth, 'id');
	if(u)
		var html = mustache.render(templates.header_logged, u);
	else
		var html = mustache.render(templates.header_index, u);

	res.send(html);
})

app.get('/nav', function (req, res) {
	console.log("GET request: nav");

	var u = getUser(req.cookies.auth, 'id');
	if(u){
		console.log("User is: \"" + u.user_username + "\" with is_admin: " + u.is_admin + ".");
		if(u.is_admin){
			html = mustache.render(templates.nav_admin, u);
		} else {
			html = mustache.render(templates.nav_client, u);
		}
	} else {
		console.log("No one's logged!");
		html = mustache.render(templates.nav_index, u);
	}
	res.send(html);
})

app.get('/footer', function (req, res) {
	console.log("GET request: footer");
	var html = mustache.render(templates.footer);
	res.send(html);
})

app.get('/index', function (req, res) {
	console.log("GET request: index");
	var page = req.query.page;
	var pageSize = req.query.page_size;
	var products = getProducts(page, pageSize);
	var html = mustache.render(templates.index, products);
	res.send(html);
})

app.get('/search_tag', function (req, res) {
	console.log("GET request: search_tag: " + req.query.tag);
	var products = getProductsByTag(req.query.tag);
	var html = mustache.render(templates.index, products);
	res.send(html);
})

app.get('/product', function (req, res) {
	console.log("GET request: product");
	var product = getProduct(req.query.product_id);
	var html = mustache.render(templates.product, product);
	res.send(html);
})

app.get('/cart', function (req, res) {
	console.log("GET request: cart");
	var html = mustache.render(templates.cart);
	res.send(html);
})

app.get('/login', function (req, res) {
	console.log("GET request: login");
	var html = mustache.render(templates.login);
	res.send(html);
})

app.post('/login', function (req, res) {
	console.log("POST request: login");

	var u = getUser(req.body.username, 'username');
	if (!u || (u.user_password != req.body.password)){
		res.send({ error: 1, message: "Usuário ou senha inválidos!" });
	} else {
		res.cookie('auth', u.user_id, { maxAge: 1000 * 3600, httpOnly: true });
		console.log("User \"" + u.user_username + "\" just logged in!");

		res.send({ error: 0, message: "Login efetuado com sucesso!" });
	}
})

app.delete('/login', function (req, res) {
	console.log("DELETE request: login");

	res.clearCookie('auth');
	res.status(204).send("No content");
})

app.get('/service', function (req, res) {
	console.log("GET request: service");
	var html = mustache.render(templates.service);
	res.send(html);
})

app.get('/new-client', function (req, res) {
	console.log("GET request: new-client");
	var html = mustache.render(templates.new_client);
	res.send(html);
})

app.post('/new-client', upload_user.single('client_img'), function (req, res) {
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
		Users.push(new_user);

		res.send({ error: 0, message: "Cliente cadastrado com sucesso!" });
	}
})

app.get('/', function (req, res) {
	console.log("GET request: /");
	var html = mustache.render(templates.page);
	res.send(html);
})

var server = app.listen(8081, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Petzzaria Pet Shop listening at http://%s:%s", host, port);
})
