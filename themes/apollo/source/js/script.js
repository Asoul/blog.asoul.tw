(function($) {
  // Mobile nav
  $(".menu-bar-icon, .nav-cover, .nav-close").on("click", function(e) {
      e.preventDefault()
      $("html").toggleClass("nav-opened nav-closed")
  })

})(jQuery)
