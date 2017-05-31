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

function new_client() {
  $.get('/new-client', function(result){
    $('section').html(result);
  });
}

function formPost(form){
    var data = $(form).serialize();
    $.post("/" + form.id, data, function(result) {
        console.log("fuck u");
    });

    return false;
}
