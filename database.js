var exports = module.exports = {};
var nano = require('nano')('http://admin:admin@localhost:5984');
var users = nano.use('users');
var products = nano.use('products');
var services = nano.use('services');
var carts = nano.use('carts');
var pets = nano.use('pets');

exports.getUser = function(user, field, callback) {
    if(typeof user == 'undefined')
        callback(true, undefined);
    else
        users.viewWithList('queries', 'all', 'by_field', {field: field, value: user}, (err, body) => {
            if(typeof body == 'string' && body != '')
                body = JSON.parse(body);
            if(err || body == '')
                callback(true, undefined);
            else
                callback(false, body);
        });
};

exports.getUserCount = function(callback) {
    users.view('queries', 'count', (err, body) => {
        if(typeof body == 'string' && body != '')
            body = JSON.parse(body);
        callback(err, body.value)
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
    products.viewWithList('queries', 'all', 'by_tags',
        {field: 'tags', tags: tag},
        (err, body) => {
            if(!err) {
                if(typeof body == 'string' && body != '')
                    body = JSON.parse(body);
                body.rows.forEach((product) => {
                    items.push({
						isProduct: true,
						isService: false,
						item: product
					});
                });
                includeServiceTags(tag, items, callback);
            }
        });
};

var includeServiceTags = function(tag, items, callback) {
    services.viewWithList('queries', 'all', 'by_tags',
        {field: 'tags', tags: tag},
        (err, body) => {
            if(!err){
                if(typeof body == 'string' && body != '')
                    body = JSON.parse(body);
                body.rows.forEach((service) => {
                    items.push({
						isProduct: false,
						isService: true,
						item: service
					});
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
