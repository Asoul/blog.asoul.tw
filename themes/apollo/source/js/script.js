(function($) {
  // Caption
  $('.entry-content').each(function(i) {
    $(this).find('img').each(function() {
      if ($(this).parent().hasClass('fancybox')) return

      var alt = this.alt

      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>')
    })

    $(this).find('.fancybox').each(function() {
      $(this).attr('rel', 'article' + i)
    })
  })

  if ($.fancybox) {
    $('.fancybox').fancybox()
  }

  // Mobile nav
  $(".menu-bar-icon, .nav-cover, .nav-close").on("click", function(e) {
      e.preventDefault()
      $("html").toggleClass("nav-opened nav-closed")
  })

})(jQuery)
