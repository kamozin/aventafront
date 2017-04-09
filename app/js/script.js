document.addEventListener('DOMContentLoaded', function() {
  svg4everybody(); // run it now or whenever you are ready

  /*=================================
  =            Billboard            =
  =================================*/

  var billboardSlider = document.querySelector('.billboard__slider');
  if (billboardSlider) {
    $(billboardSlider).slick({
      accessibility: false,
      // autoplay: true,
      // arrows: false
    });
  }

  /*=====  End of Billboard  ======*/



  /*====================================
  =            Inline popup            =
  ====================================*/

  $('.js-trigger-inline-popup').magnificPopup({
    mainClass: 'popup-fade',
    removalDelay: 300
  });

  /*=====  End of Inline popup  ======*/



  /*==================================
  =            Input mask            =
  ==================================*/

  $('input[type="tel"]').mask("+7 (999) 999-99-99", {});

  /*=====  End of Input mask  ======*/

});
