function index() {
  $.post('/', function(result){
    $('#wrapper').html(result);
  });
}
