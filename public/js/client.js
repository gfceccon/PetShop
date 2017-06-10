var user;
var cart;

$(function() {
    base();
    index();
});

function base() {
    $.get({url: '/getUser',
    success: function(result){
        user = JSON.parse(result);
    }, async: false});
    var header;
    var nav;
    var footer;
    if(typeof user.user_id == 'undefined')
    {
        header = $(Templates.get(Templates.Header));
        if (user.is_admin)
            nav = $(Templates.get(Templates.NavAdmin));
        else
            nav = $(Templates.get(Templates.NavClient));
        header.find('#header_index_cart_count').html('0');
        cart = [];
    } else {
        header = $(Templates.get(Templates.HeaderLogged));
        nav = $(Templates.get(Templates.NavIndex));
        $.get({url: '/getCart',
        success: function(result){
            cart = JSON.parse(result);
        }, async: false});
        header.find('#header_logged_cart_count').html(cart.length);
    }
    footer = $(Templates.get(Templates.Footer));
    $('header').append(header);
    $('nav').append(nav);
    $('footer').append(footer);
}

function index() {
    var indexObj = $(Templates.get(Templates.Index));
    $.get('/getItems', {page: 0, pageSize: 14}, function(result) {
        var items = JSON.parse(result);
        var itemObj = '';
        items.forEach(function(item, index) {
            if(item.isProduct) {
                itemObj = $(Templates.get(Templates.IndexProduct));
                itemObj.find('.index-item').attr('data-product', item.item.product_id);

                itemObj.find('.index_product_img_a').click(product);

                itemObj.find('.index_product_img').attr('src', 'img/' + item.item.product_img);
                itemObj.find('.index_product_img').attr('width', item.item.img_width);
                itemObj.find('.index_product_img').attr('height', item.item.img_height);

                itemObj.find('.index_product_name_a').click(product);
                itemObj.find('.index_product_name_a').html(item.item.product_name);

                itemObj.find('.index_product_price_a').click(product);
                itemObj.find('.index_product_price_a').html('R$ ' + item.item.product_price.toFixed(2));
            }
            if(item.isService) {
                itemObj = $(Templates.get(Templates.IndexService));
                itemObj.find('.index-item').attr('data-product', item.item.product_id);

                itemObj.find('.index_service_img_a').click(product);

                itemObj.find('.index_service_img').attr('src', 'img/' + item.item.service_img);
                itemObj.find('.index_service_img').attr('width', item.item.img_width);
                itemObj.find('.index_service_img').attr('height', item.item.img_height);

                itemObj.find('.index_service_name_a').click(product);
                itemObj.find('.index_service_name_a').html(item.item.service_name);

                itemObj.find('.index_service_price_a').click(product);
                itemObj.find('.index_service_price_a').html('R$ ' + item.item.service_price.toFixed(2));
            }
            indexObj.find('#index_items').append(itemObj);
            $('section').html(indexObj);
        });
    });
}

function product() {
    var obj = $(this);
    var id = obj.attr('data-product');
    if (typeof id !== typeof undefined && id !== false)
        id = obj.parents('div[data-product]').attr('data-product');
    $.get('/product', {product_id: id}, function(result){
    });
}

function service(id) {
    $.get('/service', {service_id: id}, function(result){
        $('section').html(result);
    });
}

function newAdmin() {
    $.get('/new-admin', function(result){
        $('section').html(result);
    });
}

function newProduct() {
    $.get('/new-product', function(result){
        $('section').html(result);
    });
}

function newService() {
    $.get('/new-service', function(result){
        $('section').html(result);
    });
}

function cart() {
    $.get('/cart', function(result){
        $('section').html(result);
    });
}

function login() {
    $.get('/login', function(result){
        $('section').html(result);
    });
}

function logout() {
    $.ajax({
        url: '/login',
        type: 'DELETE',
        success: function(result){
            drawIndex();
        }
    });
}

function new_client() {
    $.get('/new-client', function(result){
        $('section').html(result);
    });
}

function clientPost(form){
    if (!$('#client_name').val()){
        $('#form_return').html("Preencha um nome!");
        $('#client_name').focus();
        return false;
    }

    if (!$('#client_user').val()){
        $('#form_return').html("Preencha um usuário!");
        $('#client_user').focus();
        return false;
    }

    if (!$('#client_password').val()){
        $('#form_return').html("Preencha uma senha!");
        $('#client_password').focus();
        return false;
    }

    if ($('#client_confirm').val() != $('#client_password').val()){
        $('#form_return').html("Senhas não são iguais!");
        $('#client_password').focus();
        return false;
    }

    if (!$('#client_email').val()){
        $('#form_return').html("Preencha um email!");
        $('#client_email').focus();
        return false;
    }

    var formData = new FormData(form);
    $.ajax({
        url: '/' + form.id,
        type: 'POST',
        data: formData,
        async: false,
        success: function(result){
            if(!result.error)
                $('#client_reset').click();

            $('#form_return').html(result.message);
        },
        cache: false,
        contentType: false,
        processData: false
    });

    return false;
}

function loginPost(form){
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
        if(result.error)
            $('#form_return').html(result.message);
        else
            drawIndex();
    });

    return false;
}

function searchTag(tag) {
    $.get('/search_tag', { page: 0, pageSize: 14, tag: tag }, function(result){
        $('section').html(result);
    });
}
