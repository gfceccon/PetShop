var transactionPost = function(form) {
    console.log("hello");
    if(!$('#credit_card').val()) {
        $('#form_return').html("Insira um número de cartão válido!");
        $('#credit_card').focus();
        return false;
    }

    var formData = new FormData(form);
    $.ajax({
        url: '/' + form.id,
        type: 'POST',
        data: formData,
        async: false,
        success: function(result){
            $('#form_return').html(result.message);
            setTimeout(function () {
                viewCart();
            }, 1000);
        },
        cache: false,
        contentType: false,
        processData: false
    });

    return false;
}

var clearCart = function() {
    $.get('/cart-clear', function(result) {
        viewCart();
    })
}

var buyProduct = function(form) {
    if(!user)
    {
        $('#form_return').html("Usuário não logado!");
        return false;
    }
    if(user.is_admin)
    {
        setProductPage($('#product_id').val());
        return false;
    }

    var data = $(form).serialize();
    $.post("/buy-product", data, function(result) {
        if(result.error)
            $('#form_return').html(result.message);
        else
        {
            base();
            viewCart();
        }
    });

    return false;
}

var buyService = function(form) {
    if(!user)
    {
        $('#form_return').html("Usuário não logado!");
        return false;
    }
    if(user.is_admin)
    {
        setServicePage($('#service_id').val());
        return false;
    }

    var data = $(form).serialize();
    $.post("/transaction-service", data, function(result) {
        if(result.error)
            $('#form_return').html(result.message);
        else
            index();
    });

    return false;
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
