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
exports.userViews = function() {
    nano.db.destroy('users/_design/queries', () => { nano.db.create('users/_design/queries', () => {
        var db = nano.db.use('users');
        db.insert(
            {
                "views": {
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
                },
                "lists": {
                    by_field: function(doc, req) {
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
                }
            },
            '_design/queries'
        );
    })});
}
exports.productViews = function() {
}
exports.serviceViews = function() {
}
exports.cartViews = function() {
}
exports.transactionViews = function() {
}
exports.petViews = function() {
}
