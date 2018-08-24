$(document).ready(function() {
  $('#logout').on('click', function(event) {
    event.preventDefault();
    $.get('/logout');
  });
});