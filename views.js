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

var objViews = {
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

var fnEquals = function(doc, req) {
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

var fnContains = function(doc, req) {
    var row;
    var field = req.query.field;
    var str = req.query.value;
    var separator = '';
    var result = '{"rows": [';
    while(row = getRow()) {
        if(row.value[field].toLowerCase().indexOf(str) < 0)
            continue;
        result = result + separator + JSON.stringify(row.value);
        separator = ',';
    }
    result = result + ']}';
    send(result);
}

var fnByTags = function(doc, req) {
    var row;
    var field = req.query.field;
    var tags = req.query.tags.split(/\s*,\s*/);
    var separator = '';
    var result = '{"rows": [';
    var include;
    while(row = getRow()) {
        include = true;
        tags.forEach(function(tag) {
            if(row.value[field].indexOf(tag) < 0)
                include = false;
        });
        if(include) {
            result = result + separator + JSON.stringify(row.value);
            separator = ',';
        }
    }
    result = result + ']}';
    send(result);
};

exports.userViews = function() {
    nano.db.destroy('users/_design/queries', () => { nano.db.create('users/_design/queries', () => {
        var db = nano.db.use('users');
        db.insert(
            {
                "views": objViews,
                "lists": {
                    by_field: fnEquals
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
                "views": objViews,
                "lists": {
                    by_string: fnContains,
                    by_tags: fnByTags
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
                "views": objViews,
                "lists": {
                    by_string: fnContains,
                    by_tags: fnByTags
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
