document.addEventListener('DOMContentLoaded', function() {
  svg4everybody();

  var main = document.querySelector('.main');
  var mainNav = document.querySelector('.main-nav');
  var mainNavToogle = mainNav.querySelector('.main-nav__toggle');
  var mainNavList = mainNav.querySelector('.main-nav__list');

  mainNav.addEventListener('mouseover', toggleMainNavOverlay);
  mainNav.addEventListener('mouseout', toggleMainNavOverlay);

  function toggleMainNavOverlay(event) {
    if (mainNav.classList.contains('main-nav--opened')) {
      main.classList.toggle('main--overlay');
    }
  }

  mainNavToogle.addEventListener('click', function(event) {
    event.preventDefault();
    mainNav.classList.toggle('main-nav--opened');
    main.classList.toggle('main--overlay');
    mainNavToogle.classList.toggle('is-active');
  });

  /*=================================
  =            Billboard            =
  =================================*/

  var billboardSlider = document.querySelector('.billboard__slider');

  if (billboardSlider) {
    $(billboardSlider).slick({
      accessibility: false,
      // autoplay: true,
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
