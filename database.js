var exports = module.exports = {};
var nano = require('nano')('http://admin:admin@localhost:5984');
var users = nano.use('users');
var products = nano.use('products');
var services = nano.use('services');
var carts = nano.use('carts');
var pets = nano.use('pets');

exports.Pets = [
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
];

exports.Transactions = [
    { product_id: 1, price: 123.90, quantity: 1, is_product: true },
    { service_id: 1, pet_id: 1, price: 13.90, quantity: 1, is_product: false }
];

exports.getUser = function(user, field, callback) {
    users.list({include_docs: true}, (err, body) => {
        if(!err){
            let all_users = body.rows;
            let filtered_list = [];

            if(field == 'id')
                filtered_list = all_users.filter((u) => { return u.doc._id == user; });
            else if(field == 'email')
                filtered_list = all_users.filter((u) => { return u.doc.user_email == user; });

            if(!filtered_list.length)
                callback(true, undefined);
            else
                callback(false, filtered_list[0].doc);
        }
    });
};

exports.addUser = function(user, id, callback) {
    users.insert(user, id, (err, body) => {
        callback(err, body);
    });
};

exports.getProducts = function(page, pageSize) {
	return { products: this.Products };
};

exports.getServices = function(page, pageSize) {
	return { products: this.Services };
};

exports.getTransactions = function() {
    return { transactions: this.Transactions };
};

var includeProducts = function(items, callback) {
    products.list({include_docs: true}, (err, body) => {
        if(!err){
            let all_products = body.rows;
            all_products.forEach((product) => {
                if(product.doc.product_stkamt > 0) {
                    items.push({
                        isProduct: true,
                        isService: false,
                        item: product.doc
                    });
                }
            });

            includeServices(items, callback);
        }
    });
};

var includeServices = function(items, callback) {
    services.list({include_docs: true}, (err, body) => {
        if(!err){
            let all_services = body.rows;
            all_services.forEach((service) => {
                items.push({
                    isProduct: false,
                    isService: true,
                    item: service.doc
                });
            });

            if(!items.length)
                callback(true, undefined);
            else
                callback(false, items);
        }
    });
};

exports.getIndexItems = function(page, pageSize, callback) {
    var items = [];
    includeProducts(items, callback);
};

exports.getProduct = function(product_id, callback) {
    products.get(product_id, (err, body) => {
        if(err)
            callback(true, undefined);
        else
            callback(false, body);
    })
};

var includeProductTags = function(tag, items, callback) {
    products.list({include_docs: true}, (err, body) => {
        if(!err){
            let all_products = body.rows;
            all_products.forEach((product) => {
                if(tag.constructor === Array) {
        			var add = true;
        			tag.forEach((current_tag) => {
        				if(product.doc.product_tag.indexOf(current_tag) < 0) {
        					add = false;
        				}
        			});
        			if(add)
        				items.push({
                            isProduct: true,
                            isService: false,
                            item: product.doc
                        });
        		} else {
        			if(product.doc.product_tag.indexOf(tag) >= 0) {
        				items.push({
                            isProduct: true,
                            isService: false,
                            item: product.doc
                        });
        			}
        		}
            });

            includeServiceTags(tag, items, callback);
        }
    });
};

var includeServiceTags = function(tag, items, callback) {
    services.list({include_docs: true}, (err, body) => {
        if(!err){
            let all_services = body.rows;
            all_services.forEach((service) => {
        		if(tag.constructor === Array) {
        			var add = true;
        			tag.forEach((current_tag) => {
        				if(service.doc.service_tag.indexOf(current_tag) < 0) {
        					add = false;
        				}
        			});
        			if(add)
        				items.push({
                            isProduct: false,
                            isService: true,
                            item: service.doc
                        });
        		} else {
        			if(service.doc.service_tag.indexOf(tag) >= 0) {
        				items.push({
                            isProduct: false,
                            isService: true,
                            item: service.doc
                        });
        			}
        		}
        	});

            if(!items.length)
                callback(true, undefined);
            else
                callback(false, items);
        }
    });
};

exports.getIndexItemsByTag = function(tag, callback) {
	var items = [];
    includeProductTags(tag, items, callback);
};

exports.getIndexItembsByString = function(query) {
    var items = [];
    this.Products.forEach((product) => {
        if((product.product_name.toLowerCase().search(query) >= 0) || (product.product_description.toLowerCase().search(query) >= 0) || (product.product_full_description.toLowerCase().search(query) >= 0)) {
            items.push({
                isProduct: true,
                isService: false,
                item: product.doc
            });
        }
    });
    this.Services.forEach((service) => {
        if((service.service_name.toLowerCase().search(query) >= 0) || (service.service_description.toLowerCase().search(query) >= 0)) {
            items.push({
                isProduct: false,
                isService: true,
                item: service.doc
            });
        }
    });
    return items;
};

exports.getCart = function(user_id, callback) {
    carts.get(user_id, (err, body) => {
        if(err)
            callback(true, undefined);
        else
            callback(false, body);
    })

    /*carts.list({include_docs: true}, (err, body) => {
        if(!err){
            let all_carts = body.rows;
            let filtered_list = all_carts.filter((c) => { return c._id == user_id; });

            if(!filtered_list.length)
                callback(true, undefined);
            else
                callback(false, filtered_list[0].doc);
        }
    });*/
};

exports.getPets = function(user_id, callback) {
    pets.get(user_id, (err, body) => {
        if(err)
            callback(true, undefined);
        else
            callback(false, body);
    })
};

exports.getService = function(service_id, callback) {
    services.get(service_id, (err, body) => {
        if(err)
            callback(true, undefined);
        else
            callback(false, body);
    })
};
