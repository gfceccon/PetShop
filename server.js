var express = require('express');
var mustache = require('mustache');
var fs = require("fs");

var app = express();

var templates = {
  header: fs.readFileSync('template/header.html').toString(),
  nav_admin: fs.readFileSync('template/nav-admin.html').toString(),
  nav_index: fs.readFileSync('template/nav-index.html').toString(),
  page: fs.readFileSync('template/page.html').toString(),
  product_card: fs.readFileSync('template/product-card.html').toString(),
  section_admin: fs.readFileSync('template/section-admin.html').toString(),
  section_index: fs.readFileSync('template/section-index.html').toString(),
}

app.use(express.static('public'));

app.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   // req.query.<query_string>
   var html = mustache.render(templates.page, {  header: mustache.render(templates.header, {cart_count: 1}),
                            nav: mustache.render(templates.nav_index, {cart_count: 1}),
                            section: mustache.render(templates.section_index, {
                              products: function() {
                                var html = "";
                                for(var prod = 0; prod < 9; prod++)
                                {
                                  html += mustache.render(templates.product_card, {product_id: prod, product_img: 'cat128.png', product_name: 'Produto', product_price: 190.00});
                                }
                                return html;
                              }
                            })
                          });
   res.send(html);
})

// This responds a POST request for the homepage
app.post('/', function (req, res) {
   console.log("Got a POST request for the homepage");
   // req.body.<post_string>
   var html = mustache.render("{{{header}}} {{{nav}}} {{{section}}}", {  header: mustache.render(templates.header, {cart_count: 1}),
                            nav: mustache.render(templates.nav_index, {cart_count: 1}),
                            section: mustache.render(templates.section_index, {
                              products: function() {
                                var html = "";
                                for(var prod = 0; prod < 9; prod++)
                                {
                                  html += mustache.render(templates.product_card, {product_id: prod, product_img: 'cat128.png', product_name: 'Produto', product_price: 190.00});
                                }
                                return html;
                              }
                            })
                          });
   res.send(html);
})

var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
