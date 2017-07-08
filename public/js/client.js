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
