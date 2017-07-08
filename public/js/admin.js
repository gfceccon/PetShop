

var admin = function() {
    var page = $(Templates.get(Templates.Admin));
    var prod_table = page.find('#product_transactions');
    var serv_table = page.find('#service_transactions');

    $.get('/transactions', function(result) {
        if(typeof result == 'string') transactions = JSON.parse(result).transactions; else transactions = result;
        if(typeof transactions != 'undefined' && transactions != false)
        {
            transactions.forEach(function(trans, index){
                if(trans.is_product){
                    $.get('/product', { product_id: trans.product_id }, function(result){
                        var product;
                        if(typeof result == 'string')
                            product = JSON.parse(result);
                        else
                            product = result;

                        let item = $(Templates.get(Templates.CartItem));
                        item.find('.cart_product_img').attr('src', product.product_img);
                        item.find('.cart_product_img').attr('width', product.img_width);
                        item.find('.cart_product_img').attr('height', product.img_height);
                        item.find('.cart_product_name').html(product.product_name);
                        item.find('.cart_product_quantity').html(trans.quantity);
                        item.find('.cart_product_price').html(trans.price.toFixed(2));
                        item.find('.cart_product_remove').hide();

                        prod_table.append(item);
                    });
                } else {
                    $.get('/service', { service_id: trans.service_id }, function(result){
                        var service;
                        if(typeof result == 'string')
                            service = JSON.parse(result);
                        else
                            service = result;

                        let item = $(Templates.get(Templates.CartItem));
                        item.find('.cart_product_img').attr('src', service.service_img);
                        item.find('.cart_product_img').attr('width', service.img_width);
                        item.find('.cart_product_img').attr('height', service.img_height);
                        item.find('.cart_product_name').html(service.service_name);
                        item.find('.cart_product_quantity').html(trans.quantity);
                        item.find('.cart_product_price').html(trans.price.toFixed(2));
                        item.find('.cart_product_remove').hide();

                        serv_table.append(item);
                    });
                }
            });
        }
        $('section').html(page);
    });
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

var setProductPage = function(id) {
    $.get('/product', {product_id: id}, function(result){
        var p; if(typeof result == 'string') p = JSON.parse(result); else p = result;
        var page = $(Templates.get(Templates.EditProduct));
        page.find('#product_id').val(p.product_id);

        page.find('#product_name').val(p.product_name);
        page.find('#product_brand').val(p.product_brand);
        page.find('#product_price').val(p.product_price);
        page.find('#product_tag').val(p.product_tag);

        page.find('#product_full_description').val(p.product_full_description);
        page.find('#product_description').val(p.product_description);
        page.find('#product_stkamt').val(p.product_stkamt);
        $('section').html(page);
    });
}

var setServicePage = function(id) {
    var page = $(Templates.get(Templates.EditService));

    $.get('/service', {service_id: id}, function(result){
        var s; if(typeof result == 'string') s = JSON.parse(result); else s = result;
            var page = $(Templates.get(Templates.EditService));

        page.find('#service_id').val(s.service_id);

        page.find('#service_tag').val(s.service_tag);
        page.find('#service_name').val(s.service_name);
        page.find('#service_price').val(s.service_price);
        page.find('#service_description').val(s.service_description);
        $('section').html(page);
    });
}
