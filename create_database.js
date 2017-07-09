var nano = require('nano')('http://admin:admin@localhost:5984');
var exports = module.exports = {};
var views = require("./views");

var Users = [
	{
		user_id: 1,
		user_name: 'John Doe',
		user_username: 'john',
		user_password: 'john',
		user_img: 'img/',
		user_tel: '34954820',
		user_email: 'johndoe@uol.com.br',
		user_address: {
			street: 'Rua dos Lobos',
			num: '0',
			city: 'Saint Charles',
			state: 'Saint Paul',
			zip: '40028-922',
		},
		is_admin: false
	},
	{
		user_id: 2,
		user_name: 'Emily Hawkins',
		user_username: 'emily',
		user_password: '12345',
		user_img: 'img/',
		user_tel: '284971920',
		user_email: 'emily@uol.com.br',
		user_address: {
			street: 'Rua dos Anjos',
			num: '0',
			city: 'Saint Christina',
			state: 'Saint Agatha',
			zip: '45127-125',
		},
		is_admin: false
	},
	{
		user_id: 3,
		user_name: 'Administrador',
		user_username: 'admin',
		user_password: 'admin',
		user_img: 'img/',
		user_tel: '90654280',
		user_email: 'adm@uol.com.br',
		is_admin: true
	}
]

var Products = [
	{
		product_id: 1, product_img: 'img/product/cat-food.jpg',
		img_width: 128, img_height: 128,
		product_name: 'Ração para gato', product_price: 199.90, product_stkamt: 40, product_soldamt: 11,
		product_tag: ['product', 'cat', 'food'],
		product_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>',
		product_full_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio. Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>'
	},
	{
		product_id: 2, product_img: 'img/product/cat-toy.jpg',
		img_width: 128, img_height: 128,
		product_name: 'Brinquedo para gato', product_price: 29.90, product_stkamt: 20, product_soldamt: 12,
		product_tag: ['product', 'cat', 'accy'],
		product_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>',
		product_full_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio. Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>'
	},
	{
		product_id: 3, product_img: 'img/product/cat-bed.jpg',
		img_width: 128, img_height: 128,
		product_name: 'Cama para gato', product_price: 89.90, product_stkamt: 10, product_soldamt: 13,
		product_tag: ['product', 'cat', 'accy'],
		product_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>',
		product_full_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio. Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>'
	},
	{
		product_id: 4, product_img: 'img/product/cat-snack.jpg',
		img_width: 128, img_height: 128,
		product_name: 'Petisco para gato', product_price: 1.99, product_stkamt: 50, product_soldamt: 16,
		product_tag: ['product', 'cat', 'food'],
		product_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>',
		product_full_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio. Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>'
	},
	{
		product_id: 5, product_img: 'img/product/cat-collar.jpg',
		img_width: 128, img_height: 128,
		product_name: 'Coleira para gato', product_price: 35.90, product_stkamt: 45, product_soldamt: 15,
		product_tag: ['product', 'cat', 'accy'],
		product_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>',
		product_full_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio. Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>'
	}
]

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
]

var Pets = [
	{
		user_id: 1,
		pets: [
			{ pet_id: 1, pet_name: 'Garfield', pet_img: 'img/pet/cat64.png', img_width: 64, img_height: 64, pet_breed: 'Gato Malhado', pet_age: 2, pet_status: 'Em casa' },
			{ pet_id: 2, pet_name: 'Lara', pet_img: 'img/pet/cat64.png', img_width: 64, img_height: 64, pet_breed: 'Gato Persa', pet_age: 3, pet_status: 'Tosa' },
			{ pet_id: 3, pet_name: 'Ana', pet_img: 'img/pet/cat64.png', img_width: 64, img_height: 64, pet_breed: 'Gato Siames', pet_age: 5, pet_status: 'Banho' }
		]
	},
	{
		user_id: 2,
		pets: [
			{ pet_id: 4, pet_name: 'James', pet_img: 'img/pet/cat64.png', img_width: 64, img_height: 64, pet_breed: 'Gato Siames', pet_age: 4, pet_status: 'Em casa' },
			{ pet_id: 5, pet_name: 'Tom', pet_img: 'img/pet/cat64.png', img_width: 64, img_height: 64, pet_breed: 'Gato Malhado', pet_age: 1, pet_status: 'Banho' }
		]
	}
]

var Services = [
	{
		service_id: 1, service_img: 'img/service/cat-shearing.jpg',
		img_width: 128, img_height: 128,
		service_name: 'Tosa para gato', service_price: 69.90,
		service_tag: ['service', 'cat', 'shearing'],
		service_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>'
	},
	{
		service_id: 2, service_img: 'img/service/cat-bath.jpg',
		img_width: 128, img_height: 128,
		service_name: 'Banho para gato', service_price: 49.90,
		service_tag: ['service', 'cat', 'bath'],
		service_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>'
	},
    {
		service_id: 3, service_img: 'img/service/dog-training.jpg',
		img_width: 128, img_height: 128,
		service_name: 'Treino para cão', service_price: 49.90,
		service_tag: ['service', 'dog', 'training'],
		service_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>'
	}
]

var Transactions = [
    { product_id: 1, price: 123.90, quantity: 1, is_product: true },
    { service_id: 1, pet_id: 1, price: 13.90, quantity: 1, is_product: false }
]

exports.create = function() {
    nano.db.destroy('users', (err, body) => { nano.db.create('users', (err, body) => {
        if(err)
            console.log(err);
        var users = nano.use('users');
        Users.forEach(function(user){
            users.insert(user, user.user_id.toString());
        });
        Users = null;
        views.userViews();
    })});
    nano.db.destroy('products', (err, body) => { nano.db.create('products', (err, body) => {
        var products = nano.use('products');
        Products.forEach(function(product){
            products.insert(product, product.product_id.toString());
        });
        Products = null;
        views.productViews();
    })});
    nano.db.destroy('services', (err, body) => { nano.db.create('services', (err, body) => {
        var services = nano.use('services');
        Services.forEach(function(service){
            services.insert(service, service.service_id.toString());
        });
        Services = null;
        views.serviceViews();
    })});
    nano.db.destroy('carts', (err, body) => { nano.db.create('carts', (err, body) => {
        var carts = nano.use('carts');
        Carts.forEach(function(cart){
            carts.insert(cart, cart.user_id.toString());
        });
        Carts = null;
        views.cartViews();
    })});
    nano.db.destroy('pets', (err, body) => { nano.db.create('pets', (err, body) => {
        var pets = nano.use('pets');
        Pets.forEach(function(pet){
            pets.insert(pet, pet.user_id.toString());
        });
        Pets = null;
        views.petViews();
    })});
    nano.db.destroy('transactions', (err, body) => { nano.db.create('transactions', (err, body) => {
        var transactions = nano.use('transactions');
        Transactions.forEach(function(transaction){
            transactions.insert(transaction);
        });
        Transactions = null;
        views.transactionViews();
    })});
}
