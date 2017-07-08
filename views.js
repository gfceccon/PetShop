var nano = require('nano')('http://localhost:5984');

var db = nano.db.use('cities');

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



db.viewWithList('design', 'name_and_state', 'by_name', {name: "Sao Paulo"}, function(err, body) {
  if (!err) {
    console.log(typeof body);
    var obj = JSON.parse(body);
    obj = JSON.parse(JSON.stringify(obj));
    console.log(obj);
    obj.rows.forEach(function(doc) {
      console.log(doc);
    });
  }
});
