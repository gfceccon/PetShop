$(function() {
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
});

function index() {
  $.get('/index', {page: 0, pageSize: 14}, function(result){
    $('section').html(result);
  });
}

function product(id) {

}

function cart() {
    $.get('/cart', function(result){
        $('section').html(result);
    })
}

function login() {
    $.get('/login', function(result){
        $('section').html(result);
    })
}

function new_client() {
    $.get('/new-client', function(result){
        $('section').html(result);
    })
}

function service(serviceName) {
    if(serviceName == 'tosa'){
        $.get('/service', function(result){
            $('section').html(result);
        })
    }
}

function formPost(form){
    var data = $(form).serialize();
    $.post("/" + form.id, data, function(result) {
        console.log("fuck u");
    });

    return false;
}
