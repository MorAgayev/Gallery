console.log('Starting up');

// $(document).ready(onInit);
$(onInit);
// $('.google-btn').on('click',  onSubmitContact)
$('.google-btn').click(onSubmitContact)

function onInit() {
    // $('.portfolio-item').click(onShowModal);
    renderProjs()
}
