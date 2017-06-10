document.addEventListener('DOMContentLoaded', function () {
  svg4everybody();

  var body = document.body;
  var contentArea = document.querySelector('.content-area');
  var main = document.querySelector('.main');
  var catalogNav = document.querySelector('.catalog-nav');

  function togglecatalogNavOverlay(event) {
    if (catalogNav.classList.contains('catalog-nav--opened')) {
      main.classList.toggle('main--overlay');
    }
  }

  function setContentAreaHeight(catalogNavList, contentArea) {
    var catalogNavListHeight = catalogNavList.offsetHeight;
    contentArea.style.minHeight = catalogNavListHeight + 'px';
  }

  if (catalogNav) {
    if ((matchMedia('(min-width: 768px)').matches)) {
      // Desktop menu
      var catalogNavToogle = catalogNav.querySelector('.catalog-nav__toggle');
      var catalogNavList = catalogNav.querySelector('.catalog-nav__list');

      setContentAreaHeight(catalogNavList, contentArea);

      catalogNavToogle.addEventListener('click', function (event) {
        event.preventDefault();
      });

      if (body.classList.contains('homepage')) {
        catalogNav.classList.toggle('catalog-nav--opened');
        catalogNavToogle.classList.toggle('is-active');
      } else {
        catalogNavToogle.addEventListener('click', function (event) {
          catalogNav.classList.toggle('catalog-nav--opened');
          main.classList.toggle('main--overlay');
          catalogNavToogle.classList.toggle('is-active');
        });
      }

      catalogNav.addEventListener('mouseover', togglecatalogNavOverlay);
      catalogNav.addEventListener('mouseout', togglecatalogNavOverlay);

    } else {
      // Mobile menu
      $('.catalog-nav__wrapper').mmenu({
        navbar: {
          title: "Каталог продукции"
        }
      }, {
        // configuration
        offCanvas: {
          pageSelector: ".site-wrapper"
        },
        classNames: {
          selected: "main-subnav__item--active"
        }
      });
    }
  }




  $(window).on('resize', function () {
    productCardHeight = Math.ceil($productCard.eq(0).find('.product-card__inner').outerHeight());
    $productCard.each(recalculateProductCardHeight);
  });

  function recalculateProductCardHeight() {
    if ($(this).closest('.cards').not('.cards--not-affect').hasClass('cards--mode-list') && matchMedia('(min-width: 992px)').matches) {
      return;
    }
    $(this).height(productCardHeight);
  }

  function resetProductCardHeight() {
    $(this).height('auto');
  }


  /*=====  End of Product cards height  ======*/


  /*=================================================
  =            Layout mode product cards            =
  =================================================*/

  var $cards = $('.cards');
  var $productCard = $('.product-card');
  var layoutProductCards = localStorage.getItem('layoutProductCards');
  var $catalogMode = $('.catalog-mode');
  var $catalogModeItems = $('.catalog-mode__item');
  var productCardHeight = Math.ceil($productCard.eq(0).find('.product-card__inner').outerHeight());

  $catalogMode.on('click', '.catalog-mode__item', function (event) {
    event.preventDefault();
    $catalogModeItems.removeClass('catalog-mode__item--active');
    $(this).addClass('catalog-mode__item--active');
    var layoutProductCards = this.dataset.layoutMode;
    localStorage.setItem('layoutProductCards', layoutProductCards);
    $cards.not('.cards--not-affect').attr('class', 'cards cards--mode-' + layoutProductCards);
    if (layoutProductCards === 'tile') {
      $productCard.each(recalculateProductCardHeight);
    } else {
      $productCard.each(resetProductCardHeight);
    }
  });


  if (!layoutProductCards || layoutProductCards === 'tile') {
    $cards.not('.cards--not-affect').attr('class', 'cards');
    $catalogModeItems.filter('[data-layout-mode="tile"]').addClass('catalog-mode__item--active');
  } else {
    $cards.not('.cards--not-affect').attr('class', 'cards cards--mode-' + layoutProductCards);
    $catalogModeItems.filter('[data-layout-mode="' + layoutProductCards + '"]').addClass('catalog-mode__item--active');
  }

  $productCard.each(recalculateProductCardHeight);

  /*=====  End of Layout mode product cards  ======*/




  /*============================
  =            Tabs            =
  ============================*/

  $('.tabs').tabslet({});

  /*=====  End of Tabs  ======*/



  /*======================================
  =            Product button            =
  ======================================*/

  // var $cards = $('.cards');

  $cards.on('click', '.product-card__button', function (event) {
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






  /*================================================
  =            Catalog filter accordion            =
  ================================================*/

  var $catalogFilter = $('#catalog-filter');

  if ($catalogFilter.length) {
    $catalogFilter.collapse({
      query: ".catalog-filter__caption",
      open: function () {
        this.slideDown(300);
      },
      close: function () {
        this.slideUp(300);
      },
    });
  }

  /*=====  End of Catalog filter accordion  ======*/



  /*===========================================
  =            Filter range slider            =
  ===========================================*/

  var filterIntervalItems = document.querySelectorAll('.filter-interval');

  if (filterIntervalItems.length) {
    Array.prototype.forEach.call(filterIntervalItems, function (filterInterval) {
      var slider = filterInterval.querySelector('.filter-interval__slider');
      var inputMin = filterInterval.querySelector('.filter-interval__input--min');
      var inputMax = filterInterval.querySelector('.filter-interval__input--max');
      var inputs = [inputMin, inputMax];

      function setSliderHandle(i, value) {
        var r = [null, null];
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

      slider.noUiSlider.on('update', function (values, handle) {
        inputs[handle].value = values[handle];
      });

      inputs.forEach(function (input, handle) {
        input.addEventListener('change', function () {
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
