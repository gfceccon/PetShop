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
        $.get({url: '/cart',
        success: function(result){
            if(typeof result == 'string')
                cart = JSON.parse(result);
            else
                cart = result;
            var quantity = 0;
            if(typeof cart != 'undefined' && cart != false)
            {
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
        var items; if(typeof result == 'string') items = JSON.parse(result); else items = result;
        addItemsTo(items, page);
    });
    $('section').html(page);
}

var searchTag = function(tags) {
    var page = $(Templates.get(Templates.Index));
    $.get('/items-by-tag', { page: 0, pageSize: 14, tag: tags }, function(result){
        var items; if(typeof result == 'string') items = JSON.parse(result); else items = result;
        addItemsTo(items, page);
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
            itemObj.attr('data-product', p.product_id);

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
            itemObj.attr('data-service', s.service_id);

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

var product = function() {
    var obj = $(this);
    var id = obj.attr('data-product');
    if (typeof id == typeof undefined || id == false)
        id = obj.parents('div[data-product]').attr('data-product');
    $.get('/product', {product_id: id}, function(result){
        var p; if(typeof result == 'string') p = JSON.parse(result); else p = result;
        var page = $(Templates.get(Templates.Product));
        page.find('#product_id').attr('value', p.product_id);

        page.find('#product_img').attr('src', p.product_img);
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
    $.get('/service', {service_id: id}, function(result){
        var s; if(typeof result == 'string') s = JSON.parse(result); else s = result;
        var page = $(Templates.get(Templates.Service));

        page.find('#product_id').attr('value', s.service_id);

        page.find('#service_img').attr('src', s.service_img);
        page.find('#service_img').attr('width', s.img_width);
        page.find('#service_img').attr('height', s.img_height);

        page.find('#service_name').html(s.service_name);
        page.find('#service_description_price').html('R$ ' + s.service_price.toFixed(2));
        page.find('#service_description').html(s.service_description);

        page.find('#service_price_price').html('R$ ' + s.service_price.toFixed(2));

        $.get('/pets', function(result){
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

var admin = function() {
    var page = $(Templates.get(Templates.Admin));
    $('section').html(page);
}

var newClient = function() {
    var page = $(Templates.get(Templates.NewClient));
    $('section').html(page);
}

var newAdmin = function() {
    var page = $(Templates.get(Templates.NewAdmin));
    $('section').html(page);
}

var newProduct = function() {
    var page = $(Templates.get(Templates.NewProduct));
    $('section').html(page);
}

var newService = function() {
    var page = $(Templates.get(Templates.NewService));
    $('section').html(page);
}

var newPet = function() {
    var page = $(Templates.get(Templates.NewPet));
    $('section').html(page);
}

var cart = function() {
    var page = $(Templates.get(Templates.NewCart));
    $('section').html(page);
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

var clientPost = function(form) {
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
    if (!$('#client_img').val()){
        $('#form_return').html("Escolha uma imagem!");
        $('#client_img').focus();
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

var adminPost = function(form) {

    if (!$('#admin_name').val()){
        $('#form_return').html("Preencha um nome!");
        $('#admin_name').focus();
        return false;
    }

    if (!$('#admin_img').val()){
        $('#form_return').html("Escolha uma imagem!");
        $('#admin_img').focus();
        return false;
    }

    if (!$('#admin_user').val()){
        $('#form_return').html("Preencha um usuário!");
        $('#admin_user').focus();
        return false;
    }

    if (!$('#admin_password').val()){
        $('#form_return').html("Preencha uma senha!");
        $('#admin_password').focus();
        return false;
    }

    if ($('#admin_confirm').val() != $('#admin_password').val()){
        $('#form_return').html("Senhas não são iguais!");
        $('#admin_password').focus();
        return false;
    }

    if (!$('#admin_email').val()){
        $('#form_return').html("Preencha um email!");
        $('#admin_email').focus();
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
                $('#admin_reset').click();

            $('#form_return').html(result.message);
        },
        cache: false,
        contentType: false,
        processData: false
    });
    return false;
}

var productPost = function(form) {
    if (!$('#product_name').val()){
        $('#form_return').html("Preencha um nome!");
        $('#product_name').focus();
        return false;
    }

    if (!$('#product_id').val()){
        $('#form_return').html("Preencha um identificador!");
        $('#product_id').focus();
        return false;
    }

    if (!$('#product_img').val()){
        $('#form_return').html("Escolha uma imagem!");
        $('#product_img').focus();
        return false;
    }

    if (!$('#product_description').val()){
        $('#form_return').html("Preencha uma descrição!");
        $('#product_description').focus();
        return false;
    }

    if (!$('#product_full_description').val()){
        $('#form_return').html("Preencha a descrição completa!");
        $('#product_full_description').focus();
        return false;
    }

    if (!$('#product_tag').val()){
        $('#form_return').html("Especifique algumas tags!");
        $('#product_tag').focus();
        return false;
    }

    if (!$('#product_price').val()){
        $('#form_return').html("Especifique um preço!");
        $('#product_price').focus();
        return false;
    }

    if (!$('#product_stkamt').val()){
        $('#form_return').html("Especifique a quantidade em estoque!");
        $('#product_stkamt').focus();
        return false;
    }

    if (!$('#product_soldamt').val()){
        $('#form_return').html("Especifique a quantidade vendida!");
        $('#product_soldamt').focus();
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
                $('#product_reset').click();

            $('#form_return').html(result.message);
        },
        cache: false,
        contentType: false,
        processData: false
    });

    return false;
}

var servicePost = function(form) {
    if (!$('#service_name').val()){
        $('#form_return').html("Preencha um nome!");
        $('#service_name').focus();
        return false;
    }

    if (!$('#service_id').val()){
        $('#form_return').html("Preencha um identificador!");
        $('#service_id').focus();
        return false;
    }

    if (!$('#service_img').val()){
        $('#form_return').html("Escolha uma imagem!");
        $('#service_img').focus();
        return false;
    }

    if (!$('#service_description').val()){
        $('#form_return').html("Preencha uma descrição!");
        $('#service_description').focus();
        return false;
    }

    if (!$('#service_tag').val()){
        $('#form_return').html("Especifique algumas tags!");
        $('#service_tag').focus();
        return false;
    }

    if (!$('#service_price').val()){
        $('#form_return').html("Especifique um preço!");
        $('#service_price').focus();
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
                $('#service_reset').click();

            $('#form_return').html(result.message);
        },
        cache: false,
        contentType: false,
        processData: false
    });

    return false;
}

var petPost = function(form) {

    if (!$('#pet_name').val()){
        $('#form_return').html("Preencha um nome!");
        $('#pet_name').focus();
        return false;
    }

    if (!$('#pet_img').val()){
        $('#form_return').html("Escolha uma imagem!");
        $('#pet_img').focus();
        return false;
    }

    if (!$('#pet_breed').val()){
        $('#form_return').html("Especifique a raça!");
        $('#pet_breed').focus();
        return false;
    }

    if (!$('#pet_age').val()){
        $('#form_return').html("Especifique a idade!");
        $('#pet_age').focus();
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
                $('#pet_reset').click();

            $('#form_return').html(result.message);
        },
        cache: false,
        contentType: false,
        processData: false
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

var userPets = function() {
    var page = $(Templates.get(Templates.User));
    var pet_table = page.find('#user_pets');
    $.get('/pets', function(result){
        var p; if(typeof result == 'string') p = JSON.parse(result); else p = result;
        if(typeof p.user_id != typeof undefined && p.user_id != false)
        {
            var pets = p.pets;
            pets.forEach(function(pet, index){
                var user_pet = $(Templates.get(Templates.UserPet));
                user_pet.find('.user_pet_img').attr('src', pet.pet_img);
                user_pet.find('.user_pet_img').attr('width', pet.img_width);
                user_pet.find('.user_pet_img').attr('height', pet.img_height);
                user_pet.find('.user_pet_description').html(pet.pet_name + ', ' + pet.pet_breed + ', ' + pet.pet_age + ' ano(s)');
                user_pet.find('.user_pet_status').html(pet.pet_status);
                pet_table.append(user_pet);
            });
        }
        $('section').html(page);
    });
}

var viewCart = function() {
    var page = $(Templates.get(Templates.Cart));
    var cart_table = page.find('#cart');
    $.get('/cart', function(result){
        if(typeof result == 'string')
            cart = JSON.parse(result);
        else
            cart = result;
        if(typeof cart != 'undefined' && cart != false)
        {
            cart.forEach(function(prod, index){

                $.get('/product', { product_id: prod.product_id}, function(result){
                    var product; if(typeof result == 'string') product = JSON.parse(result);
                    else product = result;
                    var item = $(Templates.get(Templates.CartItem));
                    item.find('.cart_product_img').attr('src', product.product_img);
                    item.find('.cart_product_img').attr('width', product.img_width);
                    item.find('.cart_product_img').attr('height', product.img_height);
                    item.find('.cart_product_name').html(product.product_name);
                    item.find('.cart_product_quantity').html(prod.product_quantity);
                    item.find('.cart_product_price').html(product.product_price);
                    cart_table.append(item);
                });
            });
        }
        $('section').html(page);
    });
}
