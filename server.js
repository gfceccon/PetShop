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
    product: fs.readFileSync('template/product.html').toString(),
    cart: fs.readFileSync('template/cart.html').toString(),
    login: fs.readFileSync('template/login.html').toString(),
    service: fs.readFileSync('template/service.html').toString(),
    section_admin: fs.readFileSync('template/section-admin.html').toString(),
    section_index: fs.readFileSync('template/section-index.html').toString()
}

app.use(express.static('public'));

app.get('/', function (req, res) {
    console.log("GET request: index");
    var html = mustache.render(templates.page, {
        header: mustache.render(templates.header, {cart_count: 1}),
        nav: mustache.render(templates.nav_index, {cart_count: 1}),
        section: mustache.render(templates.section_index, {
            products: function() {
                var html = "";
                for(var prod = 0; prod < 8; prod++){
                    html += mustache.render(templates.product_card, {product_id: prod, product_img: 'cat128.png', product_name: 'Produto', product_price: 190.00});
                }
                return html;
            }
        })
    });
    res.send(html);
})

/*app.post('/', function (req, res) {
    console.log("POST request: index");
    var html = mustache.render(templates.page, {
        header: mustache.render(templates.header, {cart_count: 1}),
        nav: mustache.render(templates.nav_index, {cart_count: 1}),
        section: mustache.render(templates.section_index, {
            products: function() {
                var html = "";
                for(var prod = 0; prod < 8; prod++){
                    html += mustache.render(templates.product_card, {product_id: prod, product_img: 'cat128.png', product_name: 'Produto', product_price: 190.00});
                }
                return html;
            }
        })
    });
    res.send(html);
})*/

app.get('/product', function (req, res) {
    console.log("GET request: product");
    var html = mustache.render(templates.product);
    res.send(html);
})

app.get('/cart', function (req, res) {
    console.log("GET request: cart");
    var html = mustache.render(templates.cart);
    res.send(html);
})

app.get('/login', function (req, res) {
    console.log("GET request: login");
    var html = mustache.render(templates.login);
    res.send(html);
})

app.get('/service', function (req, res) {
    console.log("GET request: service");
    var html = mustache.render(templates.service);
    res.send(html);
})

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Petzzaria Pet Shop listening at http://%s:%s", host, port);
})
