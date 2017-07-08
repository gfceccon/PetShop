var nano = require('nano')('http://localhost:5984');
var doc_cb = function(error, results){
  if(error)
    console.log("Error writing document");
  else
    console.log("Success", results);
};
var view_cb = function(error, results){
  if(error)
    console.log("Error creating view");
  else
    console.log("Success", results);
};
nano.db.create('cities', function() {
  var db = nano.db.use('cities');
  db.insert({ name: "Sao Paulo", state: "Sao Paulo" }, 0, doc_cb);
  db.insert({ name: "Sao Carlos", state: "Sao Paulo" }, 1, doc_cb);
  db.insert({ name: "Guarulhos", state: "Sao Paulo" }, 2, doc_cb);
});
nano.db.create('cities/_design/design', function() {
  var db = nano.db.use('cities');
  db.insert(
      {
        "views": {
          name_and_state:
            {
              "map": function(doc) {
                emit(doc.id, { "name": doc.name, "state": doc.state });
              }
            }
        },
        "lists": {
          by_name: function(doc, req) {
            var row;
            var result = "";
            var first = true;
            var sep = '{"rows": [';
            while(row = getRow()) {
              if(row.value.name == req.query.name) {
                if(first)
                  first = false;
                else
                  sep = ","
                result = result + sep + JSON.stringify(row.value);
              }
            }
            result = result + ']}';
            send(result);
          }
        }
      },
      '_design/design', view_cb
  );
});
