var exports = module.exports = {};
var nano = require('nano')('http://admin:admin@localhost:5984');
var users = nano.use('users');
var products = nano.use('products');
var services = nano.use('services');
var carts = nano.use('carts');
var pets = nano.use('pets');
var transactions = nano.use('transactions');

exports.addUser = function(user, callback) {
    users.insert(user, (err, body) => {
        callback(err, body);
    });
};

exports.addPet = function(pet, callback) {
    pets.insert(pet, (err, body) => {
        callback(err, body);
    });
};

exports.addProduct = function(product, callback) {
    products.insert(product, (err, body) => {
        callback(err, body);
    });
};

exports.addService = function(service, callback) {
    services.insert(service, (err, body) => {
        callback(err, body);
    });
};

exports.addCart = function(cart, callback) {
    carts.insert(cart, (err, body) => {
        callback(err, body);
    });
};

exports.addTransaction = function(transaction, callback) {
    transactions.insert(transaction, null, (err, body) => {
        callback(err, body);
    });
};

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

exports.getPets = function(user_id, callback) {
    pets.get(user_id, (err, body) => {
        if(err)
            callback(true, undefined);
        else
            callback(false, body);
    })
};

exports.getProduct = function(product_id, callback) {
    products.get(product_id, (err, body) => {
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

exports.getCart = function(user_id, callback) {
    carts.get(user_id, (err, body) => {
        if(err)
            callback(true, undefined);
        else
            callback(false, body);
    })
};

exports.getTransactions = function(callback) {
    transactions.list({ include_docs: true }, (err, body) => {
        if(err)
            callback(true, undefined);
        else
            callback(false, body.rows);
    });
}

exports.getUserCount = function(callback) {
    users.view('queries', 'count', (err, body) => {
        if(typeof body == 'string' && body != '')
            body = JSON.parse(body);
        callback(err, body.value)
    });
};

exports.getIndexItems = function(page, pageSize, callback) {
    var items = [];
    includeAll(items, callback);
};

exports.getIndexItemsByTag = function(tag, callback) {
	var items = [];
    includeByTag(tag, items, callback);
};

exports.getIndexItemsByString = function(str, callback) {
    var items = [];
    includeByString(str, items, callback);
};

exports.getNextProductId = function(callback) {
    products.view('queries', 'max', (err, body) => {
        if(err)
            callback(true, undefined);
        else
            callback(false, body.rows[0].value + 1);
    });
}

exports.getNextServiceId = function(callback) {
    services.view('queries', 'max', (err, body) => {
        if(err)
            callback(true, undefined);
        else
            callback(false, body.rows[0].value + 1);
    });
}

var includeAll = function(items, callback) {
    includeProducts(items, (err, result) => {
        includeServices(items, (err, result) => {
            if(!err) {
                if(!items.length)
                    callback(true, undefined);
                else
                    callback(false, items);
            } else {
                callback(true, undefined);
            }
        });
    });
};

var includeProducts = function(items, callback) {
    products.view('queries', 'all', (err, body) => {
        if(!err){
            if(typeof body == 'string' && body != '')
                body = JSON.parse(body);
            body.rows.forEach((product) => {
                if(product.value.product_stkamt > 0) {
                    items.push({
                        isProduct: true,
                        isService: false,
                        item: product.value
                    });
                }
            });
            callback(false, items);
        } else {
            callback(true, undefined);
        }
    });
};

var includeServices = function(items, callback) {
    services.view('queries', 'all', (err, body) => {
        if(!err){
            if(typeof body == 'string' && body != '')
                body = JSON.parse(body);
            body.rows.forEach((service) => {
                items.push({
                    isProduct: false,
                    isService: true,
                    item: service.value
                });
            });
            callback(false, items);
        } else {
            callback(true, undefined);
        }
    });
};

var includeByTag = function(tags, items, callback) {
    includeProductsByTags(tags, items, (err, result) => {
        if(!err) {
            includeServicesByTags(tags, items, (err, result) => {
                if(!err) {
                    if(!items.length)
                        callback(true, undefined);
                    else
                        callback(false, items);
                } else {
                    callback(true, undefined);
                }
            });
        } else {
            callback(true, undefined);
        }
    });
};

var includeProductsByTags = function(tags, items, callback) {
    products.viewWithList('queries', 'all', 'by_tags',
        {field: 'product_tag', tags: tags},
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
                callback(false, items);
            } else {
                callback(true, undefined);
            }
        });
};

var includeServicesByTags = function(tags, items, callback) {
    services.viewWithList('queries', 'all', 'by_tags',
        {field: 'service_tag', tags: tags},
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
            } else {
                callback(true, undefined);
            }
        });
};

var includeByString = function(str, items, callback) {
    includeProductsByString(str, items, (err, result) => {
        if(!err) {
            includeServicesByString(str, items, (err, result) => {
                if(!err) {
                    if(!items.length)
                        callback(true, undefined);
                    else
                        callback(false, items);
                } else {
                    callback(true, undefined);
                }
            });
        } else {
                callback(true, undefined);
        }
    });
};

var includeProductsByString = function(str, items, callback) {
    products.viewWithList('queries', 'all', 'by_string',
        {field: 'product_name', value: str},
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
                callback(false, items);
            } else {
                callback(true, undefined);
            }
        });
};

var includeServicesByString = function(str, items, callback) {
    services.viewWithList('queries', 'all', 'by_string',
        {field: 'service_name', value: str},
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
            } else {
                callback(true, undefined);
            }
        });
};
