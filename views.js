var nano = require('nano')('http://admin:admin@localhost:5984');
var exports = module.exports = {};

//getUser: id, username or email
//getProducts
//getServices
//getTransactions (all)
//getIndexItems (no view), call products and services
//getProduct: id, string, tag, tags
//getService: id, string, tag, tags
//getIndexItemsByTag (no view), call products and services
//getIndexItemsByTags (no view), call products and services
//getCart: user_id
//getPets: user_id

var fnby_tags = function(doc, req) {
    var row;
    var field = req.query.field;
    var tags = req.query.tags.split(/\s*,\s*/);
    var separator = "[";
    var first = true;
    var result = '{"rows": ';
    while(row = getRow()) {
        let include = true;
        tags.forEach((tag) => {
            if(row.value[field].indexOf(tag) < 0)
                include = false;
        });
        row.isProduct = req.query.isProduct;
        row.isService = req.query.isService;
        if(include)
            result = result + separator + JSON.stringify(row.value);
    }
    result = result + ']}';
    send(result);
};

var objviews = {
    all:
    {
        map: function(doc) {
            emit(doc.id, doc);
        }
    },
    count:
    {
        map: function(doc) {
            emit(doc.id, 1);
        },
        reduce: "_count"
    }
};

var fnequals = function(doc, req) {
    var row;
    var field = req.query.field;
    var val = req.query.value;
    while(row = getRow()) {
        if(row.value[field] == val)
        {
            send(JSON.stringify(row.value));
            break;
        }
    }
}

var fncontains = function(doc, req) {
    var row;
    var field = req.query.field;
    var val = req.query.value;
    while(row = getRow()) {
        if(row.value[field].indexOf(val) != -1)
        {
            send(JSON.stringify(row.value));
            break;
        }
    }
}

exports.userViews = function() {
    nano.db.destroy('users/_design/queries', () => { nano.db.create('users/_design/queries', () => {
        var db = nano.db.use('users');
        db.insert(
            {
                "views": objviews,
                "lists": {
                    by_field: fnequals
                }
            },
            '_design/queries'
        );
    })});
}
exports.productViews = function() {
    nano.db.destroy('products/_design/queries', () => { nano.db.create('products/_design/queries', () => {
        var db = nano.db.use('products');
        db.insert(
            {
                "views": objviews,
                "lists": {
                    by_string: fncontains,
                    by_tags: fnby_tags
                }
            },
            '_design/queries'
        );
    })});
}
exports.serviceViews = function() {
    nano.db.destroy('services/_design/queries', () => { nano.db.create('services/_design/queries', () => {
        var db = nano.db.use('services');
        db.insert(
            {
                "views": objviews,
                "lists": {
                    by_string: fncontains,
                    by_tags: fnby_tags
                }
            },
            '_design/queries'
        );
    })});
}
exports.cartViews = function() {
}
exports.transactionViews = function() {
}
exports.petViews = function() {
}
