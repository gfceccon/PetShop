$(function() {
    drawIndex();
});

function drawIndex() {
    $.get('/header', function(result){
        $('header').html(result);
    });
    $.get('/nav', function(result){
        $('nav').html(result);
    });
    $.get('/footer', function(result){
        $('footer').html(result);
    });
    index();
}

function index() {
    $.get('/index', {page: 0, pageSize: 14}, function(result){
        $('section').html(result);
    });
}

function product(id) {
    $.get('/product', {product_id: id}, function(result){
        $('section').html(result);
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

    var data = $(form).serialize();
    $.post("/" + form.id, data, function(result) {
        $('#form_return').html(result);
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
  $.get('/search_tag', {tag: tag}, function(result){
      $('section').html(result);
  });
}
