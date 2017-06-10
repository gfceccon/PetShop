module.exports = {
    Users: [
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
    ],

    Products: [
    	{
    		product_id: 1, product_img: 'cat-food.jpg',
    		img_width: 128, img_height: 128,
    		product_name: 'Ração para gato', product_price: 199.90,
    		product_tag: ['product', 'cat', 'food'],
    		product_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>',
    		product_full_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio. Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>'
    	},
    	{
    		product_id: 2, product_img: 'cat-toy.jpe',
    		img_width: 128, img_height: 128,
    		product_name: 'Brinquedo para gato', product_price: 29.90,
    		product_tag: ['product', 'cat', 'accy'],
    		product_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>',
    		product_full_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio. Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>'
    	},
    	{
    		product_id: 3, product_img: 'cat-bed.jpg',
    		img_width: 128, img_height: 128,
    		product_name: 'Cama para gato', product_price: 89.90,
    		product_tag: ['product', 'cat', 'accy'],
    		product_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>',
    		product_full_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio. Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>'
    	},
    	{
    		product_id: 4, product_img: 'cat-snack.jpg',
    		img_width: 128, img_height: 128,
    		product_name: 'Petisco para gato', product_price: 1.99,
    		product_tag: ['product', 'cat', 'food'],
    		product_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>',
    		product_full_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio. Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>'
    	},
    	{
    		product_id: 5, product_img: 'cat-collar.jpg',
    		img_width: 128, img_height: 128,
    		product_name: 'Coleira para gato', product_price: 35.90,
    		product_tag: ['product', 'cat', 'accy'],
    		product_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>',
    		product_full_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio. Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>'
    	}
    ],

    Carts: [
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
    ],

    Pets: [
    	{
    		user_id: 1,
    		pets: [
    			{ pet_id: 1, pet_name: 'Garfield', pet_img: 'cat64.png', pet_breed: 'Gato Malhado', pet_age: 2 },
    			{ pet_id: 2, pet_name: 'Lara', pet_img: 'cat64.png', pet_breed: 'Gato Persa', pet_age: 3 },
    			{ pet_id: 3, pet_name: 'Ana', pet_img: 'cat64.png', pet_breed: 'Gato Siames', pet_age: 5 }
    		]
    	},
    	{
    		user_id: 2,
    		pets: [
    			{ pet_id: 4, pet_name: 'James', pet_img: 'cat64.png', pet_breed: 'Gato Siames', pet_age: 4 },
    			{ pet_id: 5, pet_name: 'Tom', pet_img: 'cat64.png', pet_breed: 'Gato Malhado', pet_age: 1 }
    		]
    	}
    ],

    Services: [
    	{
    		service_id: 1, service_img: 'cat-shearing.jpg',
    		img_width: 128, img_height: 128,
    		service_name: 'Tosa para gato', service_price: 69.90,
    		service_tag: ['service', 'cat', 'shearing'],
    		service_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>'
    	},
    	{
    		service_id: 2, service_img: 'cat-bath.jpg',
    		img_width: 128, img_height: 128,
    		service_name: 'Banho para gato', service_price: 49.90,
    		service_tag: ['service', 'cat', 'bath'],
    		service_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>'
    	},
        {
    		service_id: 3, service_img: 'dog-training.jpg',
    		img_width: 128, img_height: 128,
    		service_name: 'Treino para cão', service_price: 49.90,
    		service_tag: ['service', 'dog', 'training'],
    		service_description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis sollicitudin turpis. Sed sed luctus dui. Suspendisse id luctus odio.</p><p>Suspendisse eu orci eget urna suscipit efficitur. Cras tempus sapien vel quam imperdiet dignissim. Nunc dui libero, eleifend sed vulputate vehicula, sodales nec nisi.</p>'
    	}
    ],

    getUser: function(user, field) {
    	let filtered_list = [];

    	if(field == 'id')
    		filtered_list = this.Users.filter((u) => { return u.user_id == user; });
    	else if(field == 'username')
    		filtered_list = this.Users.filter((u) => { return u.user_username == user; });
    	else if(field == 'email')
    		filtered_list = this.Users.filter((u) => { return u.user_email == user; });

    	if(!filtered_list.length)
    		return false;

    	return filtered_list[0];
    },

    getProducts: function(page, pageSize) {
    	return { products: this.Products };
    },

    getServices: function(page, pageSize) {
    	return { products: this.Services };
    },

    getIndexItems: function(page, pageSize) {
        var items = { items: [] };
        this.Products.forEach((product) => {
            items.items.push({
                isProduct: true,
                isService: false,
                item: product
            });
        });
        this.Services.forEach((service) => {
            items.items.push({
                isProduct: false,
                isService: true,
                item: service
            });
        });
        return items;
    },

    getProduct: function(product_id) {
    	let filtered_list = this.Products.filter((p) => { return p.product_id == product_id; });

    	if(!filtered_list.length)
    		return false;

    	return filtered_list[0];
    },

    getIndexItemsByTag: function(tag) {
    	var items = { items: [] };
    	this.Products.forEach((product) => {
    		if(tag.constructor === Array) {
    			var add = true;
    			tag.forEach((current_tag) => {
    				if(product.product_tag.indexOf(current_tag) < 0) {
    					add = false;
    				}
    			});
    			if(add)
    				items.items.push({
                        isProduct: true,
                        isService: false,
                        item: product
                    });
    		} else {
    			if(product.product_tag.indexOf(tag) >= 0) {
    				items.items.push({
                        isProduct: true,
                        isService: false,
                        item: product
                    });
    			}
    		}
    	});
        this.Services.forEach((service) => {
    		if(tag.constructor === Array) {
    			var add = true;
    			tag.forEach((current_tag) => {
    				if(service.service_tag.indexOf(current_tag) < 0) {
    					add = false;
    				}
    			});
    			if(add)
    				items.items.push({
                        isProduct: false,
                        isService: true,
                        item: service
                    });
    		} else {
    			if(service.service_tag.indexOf(tag) >= 0) {
    				items.items.push({
                        isProduct: false,
                        isService: true,
                        item: service
                    });
    			}
    		}
    	});
    	return items;
    },

    getCart: function(user_id) {
    	let filtered_list = this.Carts.filter((c) => { return c.user_id == user_id; });

    	if(!filtered_list.length)
    		return false;

    	return filtered_list[0];
    },

    getPets: function(user_id) {
    	let filtered_list = this.Pets.filter((p) => { return p.user_id == user_id; });

    	if(!filtered_list.length)
    		return false;

    	let pets = filtered_list[0];
    	pets.pet_description = () => {
    		return this.pet_name + ' - ' + this.pet_breed;
    	}

    	return pets;
    },

    getService: function(service_id, user_id) {
    	let filtered_list = this.Services.filter((s) => { return s.service_id == service_id; });

    	if(!filtered_list.length)
    		return false;

    	let service = filtered_list[0];
    	let pets = this.getPets(user_id);

    	// This makes no sense
    	service.pets = pets.pets;
    	service.pet_description = pets.pet_description;
    	return service;
    }
};
