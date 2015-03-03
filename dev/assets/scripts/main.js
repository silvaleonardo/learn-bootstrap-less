(function($) {

  $('body').scrollspy({target: '.ms-nav'});

  $('[data-spy="scroll"]').each(function() {
    var $spy = $(this).scrollspy('refresh')
  });
  
})(jQuery);