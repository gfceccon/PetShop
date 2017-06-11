var user;
var cart;

$(function() {
    base();
    frontPage();
});

var base = function() {
    $.get({url: '/getUser',
    success: function(result){
        if(typeof result == 'string')
            user = JSON.parse(result);
        else
            user = result;
    }, async: false});
    var header;
    var nav;
    var footer;
    if(typeof user.user_id == typeof undefined || user.user_id == false)
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
        $.get({url: '/getCart',
        success: function(result){
            if(typeof cart == 'string')
                cart = JSON.parse(result);
            else
                cart = result;
        }, async: false});
        header.find('#header_cart_count').html(cart.length);
        nav.find('#nav_cart_count').html(cart.length);
    }
    footer = $(Templates.get(Templates.Footer));
    $('header').append(header);
    $('nav').append(nav);
    $('footer').append(footer);
}

var frontPage = function() {
    var page = $(Templates.get(Templates.Index));
    $.get('/getItems', {page: 0, pageSize: 14}, function(result) {
        var items; if(typeof result == 'string') items = JSON.parse(result); else items = result;
        addItemsTo(items, page);
    });
    $('section').html(page);
}

var searchTag = function(tags) {
    var page = $(Templates.get(Templates.Index));
    $.get('/getItemsByTag', { page: 0, pageSize: 14, tag: tags }, function(result){
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
            itemObj.attr('data-product', p.product_id);

            itemObj.find('.product_img_a').click(product);

            itemObj.find('.product_img').attr('src', 'img/' + p.product_img);
            itemObj.find('.product_img').attr('width', p.img_width);
            itemObj.find('.product_img').attr('height', p.img_height);

            itemObj.find('.product_name_a').click(product);
            itemObj.find('.product_name_a').html(p.product_name);

            itemObj.find('.product_price_a').click(product);
            itemObj.find('.product_price_a').html('R$ ' + p.product_price.toFixed(2));
        }
        if(item.isService) {
            var s = item.item;
            itemObj = $(Templates.get(Templates.IndexService));
            itemObj.attr('data-service', s.service_id);

            itemObj.find('.service_img_a').click(service);

            itemObj.find('.service_img').attr('src', 'img/' + s.service_img);
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

var product = function() {
    var obj = $(this);
    var id = obj.attr('data-product');
    if (typeof id == typeof undefined || id == false)
        id = obj.parents('div[data-product]').attr('data-product');
    $.get('/getProduct', {product_id: id}, function(result){
        var p; if(typeof result == 'string') p = JSON.parse(result); else p = result;
        var page = $(Templates.get(Templates.Product));
        page.find('#product_id').attr('value', p.product_id);

        page.find('#product_img').attr('src', 'img/' + p.product_img);
        page.find('#product_img').attr('width', p.img_width);
        page.find('#product_img').attr('height', p.img_height);

        page.find('#product_name').html(p.product_name);
        page.find('#product_brand').html(p.product_brand);
        page.find('#product_description_price').html('R$ ' + p.product_price.toFixed(2));

        page.find('#product_full_name').html(p.product_name);

        page.find('#product_description').html(p.product_description);
        page.find('#product_price_price').html('R$ ' + p.product_price.toFixed(2));
        page.find('#product_full_description').html(p.product_full_description);

        $('section').html(page);
    });
}

var service = function() {
    var obj = $(this);
    var id = obj.attr('data-service');
    if (typeof id == typeof undefined || id == false)
        id = obj.parents('div[data-service]').attr('data-service');
    $.get('/getService', {service_id: id}, function(result){
        var s; if(typeof result == 'string') s = JSON.parse(result); else s = result;
        var page = $(Templates.get(Templates.Service));

        page.find('#product_id').attr('value', s.service_id);

        page.find('#service_img').attr('src', 'img/' + s.service_img);
        page.find('#service_img').attr('width', s.img_width);
        page.find('#service_img').attr('height', s.img_height);

        page.find('#service_name').html(s.service_name);
        page.find('#service_description_price').html('R$ ' + s.service_price.toFixed(2));
        page.find('#service_description').html(s.service_description);

        page.find('#service_price_price').html('R$ ' + s.service_price.toFixed(2));

        $.get('/getPets', function(result){
            var p; if(typeof result == 'string') p = JSON.parse(result); else p = result;
            if(typeof p.user_id != typeof undefined && p.user_id != false)
            {
                var pets = p.pets;
                var first = true;
                pets.forEach(function(pet, index){
                    if(first) {
                        page.find('#pet_id').val(pet.pet_id);
                        page.find('#service_pet').val(pet.pet_id);
                        page.find('#service_pet_inline').val(pet.pet_id);
                        first = false;
                    }
                    var servicePet = $(Templates.get(Templates.ServicePet));
                    servicePet.val(pet.pet_id);
                    servicePet.html(pet.pet_name);
                    page.find('#service_pet').append(servicePet);

                    servicePet = $(Templates.get(Templates.ServicePet));
                    servicePet.val(pet.pet_id);
                    servicePet.html(pet.pet_name + ' ' + pet.pet_breed);
                    page.find('#service_pet_inline').append(servicePet);
                });
            }
            $('section').html(page);
        });
    });
}

var newClient = function() {
    $.get('/new-client', function(result){
        $('section').html(result);
    });
}

var newAdmin = function() {
    $.get('/new-admin', function(result){
        $('section').html(result);
    });
}

var newProduct = function() {
    $.get('/new-product', function(result){
        $('section').html(result);
    });
}

var newService = function() {
    $.get('/new-service', function(result){
        $('section').html(result);
    });
}

var cart = function() {
    $.get('/cart', function(result){
        $('section').html(result);
    });
}

var login = function() {
    $.get('/login', function(result){
        $('section').html(result);
    });
}

var logout = function() {
    $.ajax({
        url: '/login',
        type: 'DELETE',
        success: function(result){
            drawIndex();
        }
    });
}

var clientPost = function() {
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
        if(result.error)
            $('#form_return').html(result.message);
        else
            drawIndex();
    });

    return false;
}

var buyProduct = function(form) {
    var data = $(form).serialize();
    $.post("/" + form.id, data, function(result) {
        if(result.error)
            $('#form_return').html(result.message);
        else
            drawIndex();
    });

    return false;
}

var more = function() {
    var quantity = $('#product_quantity').val();
    quantity++;
    $('#quantity').val(quantity);
    $('#inline_quantity').val(quantity);
    $('#product_quantity').val(quantity);
}

var less = function() {
    var quantity = $('#product_quantity').val();
    if(quantity > 1)
        quantity--;
    $('#quantity').val(quantity);
    $('#inline_quantity').val(quantity);
    $('#product_quantity').val(quantity);
}

var petChange = function(obj) {
    var id = $(obj).val();
    $('#pet_id').val(id);
    $('#service_pet').val(id);
    $('#service_pet_inline').val(id);
}
