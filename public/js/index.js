var user;
var cart;

$(function() {
    index();
});

var index = function() {
    base();
    frontPage();
}

var base = function() {
    $.get({url: '/user', success: function(result){
        if(result === false)
            user = false;
        else
            user = JSON.parse(result);
    }, async: false});
    var header;
    var nav;
    var footer;
    if(user === false)
    {
        header = $(Templates.get(Templates.Header));
        nav = $(Templates.get(Templates.NavIndex));
        header.find('#header_cart_count').html('0');
        nav.find('#nav_cart_count').html('0');
        cart = [];
    } else {
        header = $(Templates.get(Templates.HeaderLogged));
        if (user.is_admin)
            nav = $(Templates.get(Templates.NavAdmin));
        else
            nav = $(Templates.get(Templates.NavClient));
        $.get({url: '/cart', success: function(result){
            let quantity = 0;
            if(result !== false){
                cart = JSON.parse(result);
                cart.forEach(function(p, index){
                    quantity += p.product_quantity;
                });
            }
            header.find('#header_cart_count').html(quantity);
            nav.find('#nav_cart_count').html(quantity);
        }, async: false});
    }

    footer = $(Templates.get(Templates.Footer));
    $('header').html(header);
    $('nav').html(nav);
    $('footer').html(footer);
}

var frontPage = function() {
    var page = $(Templates.get(Templates.Index));
    $.get('/items', {page: 0, pageSize: 14}, function(result) {
        if(result !== false)
            addItemsTo(JSON.parse(result), page);
    });
    $('section').html(page);
}

var searchTag = function(tags) {
    var page = $(Templates.get(Templates.Index));
    $.get('/items-by-tag', { page: 0, pageSize: 14, tag: tags }, function(result){
        if(result !== false)
            addItemsTo(JSON.parse(result), page);
    });
    $('section').html(page);
}

var search = function() {
    var page = $(Templates.get(Templates.Index));
    query = document.getElementById('search').value;
    $.get('/items-by-search', { page: 0, pageSize: 14, query: query}, function(result) {
        var items; if(typeof result == 'string') items = JSON.parse(result); else items = result;
        addItemsTo(items, page);
    });
    $('section').html(page);
}

var addItemsTo = function(items, page) {
    var itemObj = '';
    items.forEach(function(item, index) {
        if(item.isProduct) {
            var p = item.item;
            itemObj = $(Templates.get(Templates.IndexProduct));
            itemObj.attr('data-product', p._id);

            itemObj.find('.product_img_a').click(product);

            itemObj.find('.product_img').attr('src', p.product_img);
            itemObj.find('.product_img').attr('width', p.img_width);
            itemObj.find('.product_img').attr('height', p.img_height);

            itemObj.find('.product_name_a').click(product);
            itemObj.find('.product_name_a').html(p.product_name);

            itemObj.find('.product_price_a').click(product);
            itemObj.find('.product_price_a').html('R$ ' + parseFloat(p.product_price).toFixed(2));
        }
        if(item.isService) {
            var s = item.item;
            itemObj = $(Templates.get(Templates.IndexService));
            itemObj.attr('data-service', s._id);

            itemObj.find('.service_img_a').click(service);

            itemObj.find('.service_img').attr('src', s.service_img);
            itemObj.find('.service_img').attr('width', s.img_width);
            itemObj.find('.service_img').attr('height', s.img_height);

            itemObj.find('.service_name_a').click(service);
            itemObj.find('.service_name_a').html(s.service_name);

            itemObj.find('.service_price_a').click(service);
            itemObj.find('.service_price_a').html('R$ ' + s.service_price.toFixed(2));
        }
        page.find('#index_items').append(itemObj);
    });
}

var login = function() {
    var page = $(Templates.get(Templates.Login));
    $('section').html(page);
}

var logout = function() {
    $.ajax({
        url: '/login',
        type: 'DELETE',
        success: function(result){
            base();
        }
    });
}

var loginPost = function(form) {
    if (!$('#username').val()){
        $('#form_return').html("Preencha um usuário!");
        $('#username').focus();
        return false;
    }

    if (!$('#password').val()){
        $('#form_return').html("Preencha uma senha!");
        $('#password').focus();
        return false;
    }

    var data = $(form).serialize();
    $.post("/" + form.id, data, function(result) {
        var l;
        if(typeof result == 'string')
            l = JSON.parse(result);
        else
            l = result;

        if(typeof l.user !== typeof undefined && l.user != false)
            user = l.user;

        if(!l.error)
            index();

        $('#form_return').html(l.message);
    });

    return false;
}
