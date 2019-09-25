let iCanRun = true;
let matches = 0;
let count = 0;
let array12 = [];
let array18 = [];
let imageArray = [];
let imagesContainer = [];
let innerCard = [];
let storedEventData = [];
let urls = [];
let elevenImages = [];
let objectName = [];
let objectCountry = [];
let objectDate = [];
let objectMedium = [];
let objectURL = [];
let apiURL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';
let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
let isMac = (navigator.userAgent.indexOf('Mac OS X') != -1);

//  The Fisher-Yates algorithm works by picking one random element for each original array element, and then excluding it from the next draw. Just like randomly picking from a deck of cards.
//  This exclusion is done in a clever way (invented by Durstenfeld for use by computers) by swapping the picked element with the current element, and then picking the next random element from the remainder. For optimal efficiency, the loop runs backwards so that the random pick is simplified.
function shuffleArray(array) {
     for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
     }
}

function mobileBackground() {
     $('body').css({
          'background': 'url(./images/minoan_fresco5.jpg) no-repeat center center fixed',
          '-webkit-background-size': 'cover',
          '-moz-background-size': 'cover',
          '-o-background-size': 'cover',
          'background-size': 'cover'
     });
}

function startPlay() {
     $('#header-play-div').hide();
     $('.container').show();
     $('body').css({
          'background': 'url()',
          'background-color': '#f2fdf2'
     });
     for (let i = 0; i < imagesContainer.length; i++) {
          $(imagesContainer[i]).attr('src', imageArray[i]);
     }
}

function playAgain() {
     $('#win-restart').css('display', 'none');
     location.reload();
}

function closeModal() {
     $('#win-restart').css('display', 'none');
     location.reload();
}

function artInfoMobile() {
     $('#win-restart').css('display', 'none');
     $('#modal-slides').css('display', 'block');
     $('.display-right, .display-left').hide();
     $('.slides-div').show();
     $('.modal-content').css('background-color', 'transparent');
     $('#row1, #row2, #row3').hide();
     $('.slides-div').css({'margin-top': '10px'});
     let slideContainerSize = $('.modal-container').width();
     let imageSize = $('.eleven-images').width();
     let imageLeftMargin = (slideContainerSize - imageSize) / 2;
     $('.eleven-images').css('margin-left', imageLeftMargin + 'px');
     $('.button-display-topright').css({
     'position': 'fixed',
     'margin': '5px 0 0 10px',
     'font-size': '2.200em'
     });
}

function artInfo() {

     if ((((window.matchMedia('(max-width: 768px)').matches)) && ((window.matchMedia('(orientation: portrait)').matches))) || (((window.matchMedia('(max-width: 1024px)').matches)) && ((window.matchMedia('(orientation: landscape)').matches))) || (navigator.userAgent.match(/iPad/i) != null)) {
          $('#win-restart').css('display', 'none');
          $('#modal-slides').css('display', 'block');
          $('.display-right, .display-left').hide();
          $('#row1, #row2, #row3').hide();
          $('.slides-div').show();
          $('.modal-content').css({'background-color': 'transparent'});
          $('.slides-div').css({'margin-top': '45px'});
          let slideContainerSize = $('.modal-container').width();
          let imageSize = $('.eleven-images').width();
          let imageLeftMargin = (slideContainerSize - imageSize) / 2;
          $('.eleven-images').css('margin-left', imageLeftMargin + 'px');
          $('.button-display-topright').css({
          'position': 'fixed',
          'margin': '20px 0 0 25px',
          'font-size': '2.200em'
          });
     }
     else {
          $('#win-restart').css('display', 'none');
          $('#modal-slides').css('display', 'block');
          let slideContainerSize = $('.modal-container').width();
          let imageSize = $('.eleven-images').width();
          let imageLeftMargin = (slideContainerSize - imageSize) / 2;
          $('.eleven-images').css('margin-left', imageLeftMargin + 'px');
          var slideIndex = 1;
          showDivs(slideIndex);

          function plusDivs(n) {
          showDivs(slideIndex += n);
          }

          $('.display-left').click(subtractOne);

          function subtractOne() {
          plusDivs(-1);
          }

          $('.display-right').click(addOne);

          function addOne() {
          plusDivs(1);
          }

          function showDivs(n) {
          let x = $('.slides-div');

          if (n > x.length) {
               slideIndex = 1;
          }

          if (n < 1) {
               slideIndex = x.length;
          }

          for (let i = 0; i < x.length; i++) {
               $(x[i]).css('display', 'none');
          }

          $(x[slideIndex - 1]).css('display', 'contents');
          }
     }
}

function closeArtModal() {
     $('#modal-slides').css('display', 'none');
     location.reload();
}

function addToSearch(dataItems) {
     fetch(dataItems)
     .then(convertToJson);
}

function convertToJson(response) {
    //this returns the info so it can be worked with
     return response.json();
}

function useData(jsonData) {
     console.log(jsonData)
     elevenImages[elevenImages.length] = jsonData.primaryImageSmall;
     objectName[objectName.length] = jsonData.objectName;
     objectCountry[objectCountry.length] = jsonData.culture;
     objectMedium[objectMedium.length] = jsonData.medium;
     objectDate[objectDate.length] = jsonData.objectDate;
     objectURL[objectURL.length] = jsonData.objectURL;
     $('.slides-content').prepend('<div class="slides-div"><h2 class="object-name">' + objectName[count] + '</h2><img class="eleven-images" src=' + elevenImages[count] + '><h3 class="object-country">' + objectCountry[count] + '</h3><h3 class="object-date">' + objectDate[count] + '</h3><h3 class="object-medium">' + objectMedium[count] + '</h3><ul class="met-link-ul"><li class="met-link-li"><a class="met-link-a" href=' + objectURL[count] + '>More info at the Metropolitan Museum</a></li></ul></div>');
     count++;
     $('.met-link-a').attr('target', '_blank');
}

function chromeFix() {
     if (isChrome && !isMac) {
          $('.flip-card-bottom, .flip-card-top').css({
               'backface-visibility': 'visible',
               ' -webkit-backface-visibility': 'visible'
          });
     }
}

function onReady() {

     if ((((window.matchMedia('(max-width: 414px)').matches)) && ((window.matchMedia('(orientation: portrait)').matches))) || (((window.matchMedia('(max-width: 823px)').matches)) && ((window.matchMedia('(orientation: landscape)').matches)))) {
          const images = [
               './images/img1_greek_cycladic_female_253423.jpg',
               './images/img3_greek_woman_bird_253487.jpg',
               './images/img4_cycladic_harp_254587.jpg',
               './images/img6_cypriot_mask_figure_242089.jpg',
               './images/img7_greek_standing_woman_255549.jpg',
               './images/img9_cypriot_woman_bird_face_241098.jpg',
               './images/img1_greek_cycladic_female_253423.jpg',
               './images/img3_greek_woman_bird_253487.jpg',
               './images/img4_cycladic_harp_254587.jpg',
               './images/img6_cypriot_mask_figure_242089.jpg',
               './images/img7_greek_standing_woman_255549.jpg',
               './images/img9_cypriot_woman_bird_face_241098.jpg',
          ];

          let imageObjectIDS = [253423, 253487, 254587, 242089, 255549, 241098];

//because I'm going off event data to match indexes, the conditionals are thrown off. The arrays depend on there being 18 items to match within the arrays that correspond to index-numbers throughout (associative). Changed it to match the IDs, not the indexes (InnerCard Array no longer useful)
function compareImagesMobile() {
     setTimeout(function () {
          if (($('#image-' + storedEventData[0]).attr('src')) === ($('#image-' + storedEventData[1]).attr('src'))) {
          $(('#flip-card-inner-' + storedEventData[0])).off();
          $(('#flip-card-inner-' + storedEventData[1])).off();
          x = 0;
          storedEventData = [];
          matches++
          if (matches === 6) {
               $('#win-restart').css("display", "block");
          }
          }
          else {
          $(('#flip-card-inner-' + storedEventData[0])).toggleClass('flip', false);
          $(('#flip-card-inner-' + storedEventData[1])).toggleClass('flip', false);
          storedEventData = [];
          x = 0;
          }
     }, 1300);
}

          for (let i = 0; i < 12; i++) {
               array12[i] = i;
          }

          shuffleArray(array12);
          console.log(array12);

          for (let i = 0; i < array12.length; i++) {
               imageArray.splice(array12[i], 0, images[i]);
          }
          console.log(imageArray);

          for (let i = 0; i < 18; i++) {
               imagesContainer[i] = i;
               imagesContainer[i] = '#image-' + imagesContainer[i];
          }
          imagesContainer.splice(4, 2);
          imagesContainer.splice(8, 2);
          imagesContainer.splice(12, 2);
          console.log(imagesContainer);

        //GOT RID OF INNERCARD / NOT NEEDED HERE

          $('body').css('height', window.innerHeight);

          $(window).resize(function () {
               $('body').css('height', window.innerHeight);
          });

          mobileBackground();

          $('#play').click(startPlay);

          let x = 0;

          $('.flip-card-inner').each(function (j) {
               $(this).on("click", {x: j}, function (event) {
                    if (iCanRun) {
                    storedEventData.push(event.data.x);
                    $(this).toggleClass('flip', true);
                    x++;
                    if (storedEventData[0] === storedEventData[1]) {
                         storedEventData.splice(1, 1);
                         x--;
                    }
                    if (x >= 2) {
                         compareImagesMobile();
                    }
                    iCanRun = false;
                    setTimeout(function () {
                         iCanRun = true;
                    }, 1100);
                    }
               });
          });

          console.log(storedEventData);

          $('.button-win-restart-topright').click(closeModal);

          $('#play-again').click(playAgain);

          $('#art-info').click(artInfoMobile);

          $('.button-display-topright').click(closeArtModal);

          imageObjectIDS.forEach(function (i, j) {
               urls[j] = apiURL + i;
          });
          console.log(urls)

          Promise.all(urls.map(url =>
               fetch(url)
                    .then(convertToJson)
                    .then(useData)
          ));
          
          chromeFix();

     }

     else {
          const images = [
               './images/img1_greek_cycladic_female_253423.jpg',
               './images/img2_greek_holding_baby_241284.jpg',
               './images/img3_greek_woman_bird_253487.jpg',
               './images/img4_cycladic_harp_254587.jpg',
               './images/img5_greek_girl_ball_247898.jpg',
               './images/img6_cypriot_mask_figure_242089.jpg',
               './images/img7_greek_standing_woman_255549.jpg',
               './images/img8_cypriot_pointed_cap_242150.jpg',
               './images/img9_cypriot_woman_bird_face_241098.jpg',
               './images/img1_greek_cycladic_female_253423.jpg',
               './images/img2_greek_holding_baby_241284.jpg',
               './images/img3_greek_woman_bird_253487.jpg',
               './images/img4_cycladic_harp_254587.jpg',
               './images/img5_greek_girl_ball_247898.jpg',
               './images/img6_cypriot_mask_figure_242089.jpg',
               './images/img7_greek_standing_woman_255549.jpg',
               './images/img8_cypriot_pointed_cap_242150.jpg',
               './images/img9_cypriot_woman_bird_face_241098.jpg',
          ];

          let imageObjectIDS = [253423, 241284, 253487, 254587, 247898, 242089, 255549, 242150, 241098];

          function compareImages() {
               setTimeout(function () {
                    if (imageArray[storedEventData[0]] === (imageArray[storedEventData[1]])) {
                    $(innerCard[storedEventData[0]]).off();
                    $(innerCard[storedEventData[1]]).off();
                    x = 0;
                    storedEventData = [];
                    matches++;
                    if (matches === 9) {
                         $('#win-restart').css("display", "block");
                    }
                    }
                    else {
                    $(innerCard[storedEventData[0]]).toggleClass('flip', false);
                    $(innerCard[storedEventData[1]]).toggleClass('flip', false);
                    storedEventData = [];
                    x = 0;
                    }
               }, 1000);
          }

          for (var i = 0; i < 18; i++) {
               array18[i] = i;
          }

          shuffleArray(array18);
          console.log(array18);

          for (let i = 0; i < array18.length; i++) {
               imageArray.splice(array18[i], 0, images[i]);
          }

          for (let i = 0; i < array18.length; i++) {
               imagesContainer[i] = i;
               imagesContainer[i] = '#image-' + imagesContainer[i];
          }
          console.log(imageArray);

          for (let i = 0; i < array18.length; i++) {
               innerCard[i] = i;
               innerCard[i] = '#flip-card-inner-' + innerCard[i];
          }
          
          $('body').css('height', window.innerHeight);

          $(window).resize(function () {
               $('body').css('height', window.innerHeight);
          });

          $('#play').click(startPlay);

          let x = 0;

          $('.flip-card-inner').each(function (j) {
               $(this).on("click", {x: j}, function (event) {
                    if (iCanRun) {
                         $(this).toggleClass('flip', true);
                         storedEventData.push(event.data.x);
                         x++;
                         if (storedEventData[0] === storedEventData[1]) {
                         storedEventData.splice(1, 1);
                         x--;
                         }
                         if (x >= 2) {
                         compareImages();
                         }
                         iCanRun = false;
                         setTimeout(function () {
                         iCanRun = true;
                         }, 1000);
                    }
               });
          });

          console.log(storedEventData);

          $('.button-win-restart-topright').click(closeModal);

          $('#play-again').click(playAgain);

          $('#art-info').click(artInfo);

          $('.button-display-topright').click(closeArtModal);

          imageObjectIDS.forEach(function (i, j) {
               urls[j] = apiURL + i;
          });
          console.log(urls)

          Promise.all(urls.map(url =>
               fetch(url)
                    .then(convertToJson)
                    .then(useData)
          ));

          chromeFix();

     }
}

$('document').ready(onReady);







