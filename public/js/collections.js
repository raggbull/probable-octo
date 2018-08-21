$(document).ready(function() {
  $('#submitCollection').on('click', function (event) {
    event.preventDefault();
    console.log('here');
    var newCol = {
      name: $('#collectionName').val().trim(),
      description: $('#collectionDescription').val().trim(),
      UserID: 'CHANGE THIS WHEN AUTH0 IS WORKING'
    };
    console.log(newCol);
    $.ajax('/api/collections/', {
      type: 'POST',
      data: newCol
    }).then(
      function () {
        console.log('posted collection', newCol);
      }
    );
  });

  $('#submitItem').on('click', function (event) {
    event.preventDefault();
    console.log('here');
    var newItem = {
      name: $('#itemName').val().trim(),
      imageUrl: $('#imageUrl').val().trim(),
      description: $('#itemDescription').val().trim(),
      UserID: 'CHANGE THIS WHEN AUTH0 IS WORKING',
      CollectionId: 1
    };
    console.log(newItem);
    $.ajax('/api/items/', {
      type: 'POST',
      data: newItem
    }).then(
      function () {
        console.log('posted item', newItem);
      }
    );
  });
});