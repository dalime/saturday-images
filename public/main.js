$(() => {
  renderAllImages();
  $('.images').on('click', '.edit', openEditModal);
  $('#editModal').find('form').submit(saveEdit);
});

function openEditModal(event) {
  // quering for the elements
  let $editButton = $(event.target);
  let $media = $editButton.closest('.media');
  let $editModal = $('#editModal');

  // getting info from element
  let $title = $media.find('.title').text();
  let $description = $media.find('.description').text();
  let $imageUrl = $media.find('img').attr('src');
  let $id = $media.data('id');

  // setting info into modal
  $editModal.data('editingId', $id);
  $editModal.find('.url').val($imageUrl);
  $editModal.find('.title').val($title);
  $editModal.find('.description').val($description);
  $editModal.modal({
    keyboard: false,
    backdrop: 'static'
  });
}

function saveEdit(event) {
  event.preventDefault();
  let $editModal = $('#editModal');

  let id = $editModal.data('editingId');
  let url = $editModal.find('.url').val();
  let title = $editModal.find('.title').val();
  let description = $editModal.find('.description').val();

  $.ajax({
    url: `/images/${id}`,
    method: 'PUT',
    data: {url, title, description} //es6 allows for setting variables
  })
  .done(newImage => {
    renderAllImages();
  })
  .fail(err => {
    console.log('err: ', err);
  })
  .always(() => { //.always is only in ajax promises
    $editModal.modal('hide');
  });
}

function renderAllImages() {
  // Request all images in DB and render in DOM
  $.get('/images') //dont specify localhost, will break heroku
    .done(images => {
      console.log('images: ', images);

      let $images = images.map(image => {
        let $image = $('.template').clone();
        let formattedTime = moment(image.createdAt).format('LLL');

        $image.removeClass('template hidden');
        $image.data('id', image.id);
        $image.find('img').attr('src', image.url);
        $image.find('.title').text(image.title);
        $image.find('.description').text(image.description);
        $image.find('.createdAt').text(formattedTime);

        return $image;
      });

      $('.images')empty().append($images); //.empty clears list before appending new ones

    })
    .fail(err => {
      console.log('err: ', err);
    });
}
