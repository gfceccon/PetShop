var service = function() {
    var obj = $(this);
    var id = obj.attr('data-service');
    if (typeof id == typeof undefined || id == false)
        id = obj.parents('div[data-service]').attr('data-service');
    $.get('/service', { service_id: id }, function(result){
        if(result !== false){
            s = JSON.parse(result);

            var page;
            page = $(Templates.get(Templates.Service));

            page.find('#service_id').val(s.service_id);

            page.find('#service_img').attr('src', s.service_img);
            page.find('#service_img').attr('width', s.img_width);
            page.find('#service_img').attr('height', s.img_height);

            page.find('#service_name').html(s.service_name);
            page.find('#service_description_price').html('R$ ' + s.service_price.toFixed(2));
            page.find('#service_description').html(s.service_description);

            page.find('#service_price_price').html('R$ ' + s.service_price.toFixed(2));

            $.get('/pets', function(result){
                if(result !== false){
                    pets = JSON.parse(result);
                    let first = true;
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

                if(user.is_admin)
                    page.find('.transaction').html('Editar');

                $('section').html(page);
            });
        }
    });
}

var servicePost = function(form) {
    if (!$('#service_name').val()){
        $('#form_return').html("Preencha um nome!");
        $('#service_name').focus();
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

var serviceEdit = function(form) {
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
        type: 'PUT',
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


var petChange = function(obj) {
    var id = $(obj).val();
    $('#pet_id').val(id);
    $('#service_pet').val(id);
    $('#service_pet_inline').val(id);
}
