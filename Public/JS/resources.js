$(function() {
  // Hide the original video card on load (without changing its markup)
  $('#password-slot > a.video-card').hide();

  // On click, fade out image card then fade in original video card
  $('#password-image-card').on('click', function() {
    var $slot = $('#password-slot');
    $(this).fadeOut(800, function() {
      $slot.children('a.video-card').fadeIn(800);
    });
  });

  // Track video views when clicked (video-card are anchor tags)
  $('a.video-card').on('click', function(e) {
    var resourceKey = $(this).data('resource-key');
    if (resourceKey) {
      localStorage.setItem(resourceKey, 'watched');
      localStorage.setItem(resourceKey + '_date', new Date().toLocaleDateString());
    }
  });

  // Track site visits
  $('a[data-resource-key^="site_"]').on('click', function(e) {
    var resourceKey = $(this).data('resource-key');
    if (resourceKey) {
      localStorage.setItem(resourceKey, 'visited');
      localStorage.setItem(resourceKey + '_date', new Date().toLocaleDateString());
    }
  });
});
