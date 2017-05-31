var express = require('express');
var mustache = require('mustache');
var fs = require("fs");
var app = express();

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var upload = multer();

var templates = {
	header: fs.readFileSync('template/header.html').toString(),
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

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieParser());

var user = { cart: [
	{ product_id: 1, product_quantity: 1 },
	{ product_id: 2, product_quantity: 1 },
	{ product_id: 3, product_quantity: 4 }
], isAdmin: false, isClient: true};

var admin = { isAdmin: false, isClient: true };

var getUser = function(req) {
	return user;
}

var getProducts = function(page, pageSize) {
	return {
		products: [
			{ product_id: 1, product_img: 'cat128.png', img_width: 128, img_height: 128, product_name: 'Ração para gato', product_price: 199.90 },
			{ product_id: 2, product_img: 'cat128.png', img_width: 128, img_height: 128, product_name: 'Brinquedo para gato', product_price: 29.90 },
			{ product_id: 3, product_img: 'cat128.png', img_width: 128, img_height: 128, product_name: 'Cama para gato', product_price: 89.90 },
			{ product_id: 4, product_img: 'cat128.png', img_width: 128, img_height: 128, product_name: 'Petisco para gato', product_price: 1.99 },
			{ product_id: 5, product_img: 'cat128.png', img_width: 128, img_height: 128, product_name: 'Coleira para gato', product_price: 35.90 }
		]
	};
}

var getProduct = function(id) {
	return {
		product_id: 1, product_img: 'cat128.png',
		img_width: 128, img_height: 128,
		product_name: 'Ração para gato', product_price: 199.90,
		product_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>',
		product_full_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio. Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>'
	};
}

var getCart = function(user) {
	return {
		cart: [
			{ product_id: 1, product_img: 'cat128.png', product_name: 'Ração para gato', product_price: 199.90, product_quantity: 1 },
			{ product_id: 2, product_img: 'cat128.png', product_name: 'Brinquedo para gato', product_price: 29.90, product_quantity: 2 },
			{ product_id: 3, product_img: 'cat128.png', product_name: 'Cama para gato', product_price: 89.90, product_quantity: 1 },
			{ product_id: 4, product_img: 'cat128.png', product_name: 'Petisco para gato', product_price: 1.99, product_quantity: 5 },
		]
	};
}

var getPets = function(user) {
	return {
		pets: [
			{ pet_name: 'Garfield', pet_img: 'cat64.png', pet_breed: 'Gato Malhado', pet_age: 2 },
			{ pet_name: 'Lara', pet_img: 'cat64.png', pet_breed: 'Gato Persa', pet_age: 3 },
			{ pet_name: 'Ana', pet_img: 'cat64.png', pet_breed: 'Gato Siames', pet_age: 5 }
		],
		pet_description: function() {
			return this.pet_name + ' - ' + this.pet_breed;
		}
	};
}

var getService = function(id, user) {
	var service = {
		service_id: 1, service_img: 'cat128.png',
		img_width: 128, img_height: 128,
		service_name: 'Ração para gato', service_price: 199.90,
		service_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>'
	};
	var pets = getPets(user);
	service.pets = pets.pets;
	service.pet_description = pets.pet_description;
	return service;
}

app.get('/header', function (req, res) {
	console.log("GET request: header");
	var user = getUser(req);
	var html = mustache.render(templates.header, user);
	res.send(html);
})

app.get('/nav', function (req, res) {
	console.log("GET request: nav");
	var user = getUser(req);
	var html = "";
	if(user.isAdmin)
		html = mustache.render(templates.nav_admin, user);
	else if(user.isClient)
		html = mustache.render(templates.nav_client, user);
	else
		html = mustache.render(templates.nav_index, user);
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

app.get('/product', function (req, res) {
	console.log("GET request: product");
	var html = mustache.render(templates.product);
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

app.post('/new-client', function (req, res) {
	console.log("POST request: new-client");
	var html = mustache.render(templates.new_client);
	res.send(html);
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
