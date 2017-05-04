document.addEventListener('DOMContentLoaded', function() {
  svg4everybody();

  var body = document.body;
  var main = document.querySelector('.main');
  var mainNav = document.querySelector('.main-nav');

  if (mainNav) {
    var mainNavToogle = mainNav.querySelector('.main-nav__toggle');
    var mainNavList = mainNav.querySelector('.main-nav__list');

    if (body.classList.contains('homepage')) {
      mainNav.classList.toggle('main-nav--opened');
      mainNavToogle.classList.toggle('is-active');
    } else {
      mainNavToogle.addEventListener('click', function(event) {
        event.preventDefault();
        mainNav.classList.toggle('main-nav--opened');
        main.classList.toggle('main--overlay');
        mainNavToogle.classList.toggle('is-active');
      });
    }

    mainNav.addEventListener('mouseover', toggleMainNavOverlay);
    mainNav.addEventListener('mouseout', toggleMainNavOverlay);

    function toggleMainNavOverlay(event) {
      if (mainNav.classList.contains('main-nav--opened')) {
        main.classList.toggle('main--overlay');
      }
    }
  }


  /*============================
  =            Tabs            =
  ============================*/

  $('.tabs').tabslet({});

  /*=====  End of Tabs  ======*/



  /*======================================
  =            Product button            =
  ======================================*/

  var $cards = $('.cards');

  $cards.on('click', '.product-card__button', function(event) {
    event.preventDefault();
    var $self = $(this);
    var $productCard = $(this).closest('.product-card');
    var $productCardButtonLabel = $(this).find('.product-card__button-label')
    var $productCardCounter = $productCard.find('.counter__input');
    var $productCardControls = $productCard.find('.counter__control');

    $self.removeClass('button--orange');
    $productCardButtonLabel.text('Перейти в корзину');

    $productCardCounter.prop('readonly', true);
    $productCardControls.prop('disabled', true);
  });

  /*=====  End of Product button  ======*/


  /*============================================
  =            Product cards height            =
  ============================================*/

  var $productCard = $('.product-card');
  var productCardHeight = Math.ceil($productCard.eq(0).find('.product-card__inner').outerHeight());

  $productCard.each(recalculateProductCardHeight);

  $(window).on('resize', function() {
    console.log('resize')
    productCardHeight = Math.ceil($productCard.eq(0).find('.product-card__inner').outerHeight());
    $productCard.each(recalculateProductCardHeight);
  });

  function recalculateProductCardHeight() {
    if (!$(this).closest('.cards').hasClass('cards--mode-list'))
    $(this).height(productCardHeight);
  }

  /*=====  End of Product cards height  ======*/







  /*================================================
  =            Catalog filter accordion            =
  ================================================*/

  var $catalogFilter = $('#catalog-filter');

  if ($catalogFilter.length) {
    $catalogFilter.collapse({
      query: ".catalog-filter__caption"
    });
  }

  /*=====  End of Catalog filter accordion  ======*/



/*===========================================
=            Filter range slider            =
===========================================*/

var filterIntervalItems = document.querySelectorAll('.filter-interval');

if (filterIntervalItems.length) {
  Array.prototype.forEach.call(filterIntervalItems, function(filterInterval) {
    var slider = filterInterval.querySelector('.filter-interval__slider');
    var inputMin = filterInterval.querySelector('.filter-interval__input--min');
    var inputMax = filterInterval.querySelector('.filter-interval__input--max');
    var inputs = [inputMin, inputMax];

    function setSliderHandle(i, value) {
      var r = [null,null];
      r[i] = value;
      slider.noUiSlider.set(r);
    }

    noUiSlider.create(slider, {
      start: [inputMin.value, inputMax.value],
      connect: true,
      range: {
        'min': parseFloat(inputMin.value),
        'max': parseFloat(inputMax.value)
      }
    });

    slider.noUiSlider.on('update', function(values, handle) {
      inputs[handle].value = values[handle];
    });

    inputs.forEach(function(input, handle) {
      input.addEventListener('change', function(){
        setSliderHandle(handle, this.value);
        // slider.noUiSlider.set([null, this.value]);
      });
    });
  });
}

/*=====  End of Filter range slider  ======*/



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



  /*================================
  =            Contacts            =
  ================================*/

  // Map
  var contactsMap = document.querySelector('.contacts-map');

  if (contactsMap) {
    ymaps.ready(initMap);
  }

  function initMap() {
    map1 = new ymaps.Map("contacts-map-1", {
      center: [53.298378, 34.314458],
      zoom: 16,
      controls: []
    });

    mapMarker1 = new ymaps.Placemark([53.298378, 34.314458], {
      hintContent: "Центральный офис – г. Брянск, Бежицкий район, ул. Бурова, 8"
    }, {
      // iconLayout: 'default#image',
      // iconImageHref: 'img/icon-map-pin.svg',
      // iconImageSize: [67, 100],
      // iconImageOffset: [-33, -100]
    });

    map1.behaviors.disable(['scrollZoom']);
    map1.geoObjects.add(mapMarker1);

    map2 = new ymaps.Map("contacts-map-2", {
      center: [53.227091, 34.321222],
      zoom: 16,
      controls: []
    });

    mapMarker2 = new ymaps.Placemark([53.227091, 34.321222], {
      hintContent: "Магазин-офис – г. Брянск, Советский район, проспект Станке-Димитрова, 67"
    }, {
      // iconLayout: 'default#image',
      // iconImageHref: 'img/icon-map-pin.svg',
      // iconImageSize: [67, 100],
      // iconImageOffset: [-33, -100]
    });

    map2.behaviors.disable(['scrollZoom']);
    map2.geoObjects.add(mapMarker2);
  }

  /*=====  End of Contacts  ======*/

});
