function index() {
    $.get('/', function(result){
        $('#wrapper').html(result);
    });
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

function service(serviceName) {
    if(serviceName == 'tosa'){
        $.get('/service', function(result){
            $('section').html(result);
        })
    }
}
