
var product = function() {
    var obj = $(this);
    var id = obj.attr('data-product');
    if (typeof id == typeof undefined || id == false)
        id = obj.parents('div[data-product]').attr('data-product');
    $.get('/product', {product_id: id}, function(result){
        var p; if(typeof result == 'string') p = JSON.parse(result); else p = result;
        var page = $(Templates.get(Templates.Product));
        page.find('#product_id').val(p.product_id);

        page.find('#product_img').attr('src', p.product_img);
        page.find('#product_img').attr('width', p.img_width);
        page.find('#product_img').attr('height', p.img_height);

        page.find('#product_name').html(p.product_name);
        page.find('#product_brand').html(p.product_brand);
        page.find('#product_description_price').html('R$ ' + p.product_price.toFixed(2));

        page.find('#product_full_name').html(p.product_name);

        page.find('#product_description').html(p.product_description);
        page.find('#product_price_price').html('R$ ' + p.product_price.toFixed(2));
        page.find('#product_stock_ammount_text').html('Quantidade:<br>(' + p.product_stkamt + ')');
        page.find('#product_stock_ammount').val(p.product_stkamt);
        page.find('#product_full_description').html(p.product_full_description);

        if(user.is_admin)
            page.find('.transaction').html('Editar');

        $('section').html(page);
    });
}


var productPost = function(form) {
    if (!$('#product_name').val()){
        $('#form_return').html("Preencha um nome!");
        $('#product_name').focus();
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

var productEdit = function(form) {
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

    var formData = new FormData(form);
    $.ajax({
        url: '/' + form.id,
        type: 'PUT',
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


var more = function() {
    var quantity = $('#product_quantity').val();
    var maxquantity = $('#product_stock_ammount').val();
    if(parseInt(quantity) < parseInt(maxquantity))
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
