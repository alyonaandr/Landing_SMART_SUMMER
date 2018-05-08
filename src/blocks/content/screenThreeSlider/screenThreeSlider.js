var slideIndex = 1;
showSlides(slideIndex);

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slideItem = document.getElementsByClassName("screenThreeSlider__img-item");
  var dots = document.getElementsByClassName("slider-btn__dot");
  var nameItem = document.getElementsByClassName("slider-btn__name");
  if (n > slideItem.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slideItem.length}
  for (i = 0; i < slideItem.length; i++) {
      slideItem[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
      nameItem[i].className = nameItem[i].className.replace(" active", "");
  }
  slideItem[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  nameItem[slideIndex-1].className += " active";
}

$(document).ready(function() {

  // // Slow scroll from #a to current section
  // $(".screenThreeSlider__btn").click(function(event) {
  //   event.preventDefault();
  //   let id = $(this).attr("href");
  //   let top = $(id).offset().top;
  //   let headerHeightMenu = $(".header").height();

  //   let scrollTop = top - headerHeightMenu;
  //   $("body, html").animate({ scrollTop }, 900 );
  // });

  $(".btn").click(function(e) {
    e.preventDefault();
    $("html,body").animate({ scrollTop: 0 }, 900);
  });

});
