(function ($) {
  "use strict";

  window.initializePortfolio = function () {

      // -----------------------------------------
      // Navbar on scrolling
      // -----------------------------------------
      $(window)
          .off("scroll.navbar")
          .on("scroll.navbar", function () {
              if ($(this).scrollTop() > 200) {
                  $(".navbar").fadeIn("slow").css("display", "flex");
              } else {
                  $(".navbar").fadeOut("slow").css("display", "none");
              }
          });


      // -----------------------------------------
      // Smooth scrolling on navbar links
      // -----------------------------------------
      $(".navbar-nav a")
          .off("click.smoothScroll")
          .on("click.smoothScroll", function (event) {

              if (this.hash !== "") {
                  event.preventDefault();

                  const target = $(this.hash);

                  if (target.length) {
                      $("html, body").animate(
                          {
                              scrollTop: target.offset().top - 45
                          },
                          1500,
                          "easeInOutExpo"
                      );
                  }

                  if ($(this).parents(".navbar-nav").length) {
                      $(".navbar-nav .active").removeClass("active");
                      $(this).closest("a").addClass("active");
                  }
              }
          });


      // -----------------------------------------
      // Typed Text
      // -----------------------------------------
      if ($(".typed-text-output").length === 1) {

          const typedStrings = $(".typed-text").text();

          new Typed(".typed-text-output", {
              strings: typedStrings.split(", "),
              typeSpeed: 100,
              backSpeed: 20,
              smartBackspace: false,
              loop: true
          });
      }


      // -----------------------------------------
      // Modal Video
      // -----------------------------------------
      let videoSrc;

      $(".btn-play")
          .off("click.video")
          .on("click.video", function () {
              videoSrc = $(this).data("src");
          });

      $("#videoModal")
          .off("shown.bs.modal.video")
          .on("shown.bs.modal.video", function () {

              $("#video").attr(
                  "src",
                  videoSrc + "?autoplay=1&modestbranding=1&showinfo=0"
              );

          })
          .off("hide.bs.modal.video")
          .on("hide.bs.modal.video", function () {

              $("#video").attr("src", videoSrc);

          });


      // -----------------------------------------
      // Scroll to Bottom
      // -----------------------------------------
      $(window)
          .off("scroll.scrollBottom")
          .on("scroll.scrollBottom", function () {

              if ($(this).scrollTop() > 100) {
                  $(".scroll-to-bottom").fadeOut("slow");
              } else {
                  $(".scroll-to-bottom").fadeIn("slow");
              }

          });


      // -----------------------------------------
      // Skills
      // -----------------------------------------
      if ($(".skill").length && typeof $.fn.waypoint === "function") {

          $(".skill").waypoint(
              function () {

                  $(".progress .progress-bar").each(function () {

                      $(this).css(
                          "width",
                          $(this).attr("aria-valuenow") + "%"
                      );

                  });

              },
              {
                  offset: "80%"
              }
          );
      }


      // -----------------------------------------
      // Portfolio Isotope + Filter
      // -----------------------------------------
      const portfolioContainer = $(".portfolio-container");
      const portfolioFilters = $("#portfolio-flters");

      if (
          portfolioContainer.length &&
          portfolioFilters.length &&
          typeof $.fn.isotope === "function"
      ) {

          const portfolioIsotope = portfolioContainer.isotope({
              itemSelector: ".portfolio-item",
              layoutMode: "fitRows"
          });

          portfolioFilters
              .find("li")
              .off("click.portfolio")
              .on("click.portfolio", function () {

                  portfolioFilters
                      .find("li")
                      .removeClass("active");

                  $(this).addClass("active");

                  const filterValue = $(this).attr("data-filter");

                  console.log("Portfolio filter:", filterValue);

                  portfolioIsotope.isotope({
                      filter: filterValue
                  });

              });

          console.log("Portfolio Isotope initialized.");

      } else {

          console.warn(
              "Portfolio elements or Isotope were not found."
          );
      }


      // -----------------------------------------
      // Back to Top
      // -----------------------------------------
      $(window)
          .off("scroll.backToTop")
          .on("scroll.backToTop", function () {

              if ($(this).scrollTop() > 200) {
                  $(".back-to-top").fadeIn("slow");
              } else {
                  $(".back-to-top").fadeOut("slow");
              }

          });

      $(".back-to-top")
          .off("click.backToTop")
          .on("click.backToTop", function () {

              $("html, body").animate(
                  {
                      scrollTop: 0
                  },
                  1500,
                  "easeInOutExpo"
              );

              return false;
          });


      // -----------------------------------------
      // Testimonials Carousel
      // -----------------------------------------
      if (
          $(".testimonial-carousel").length &&
          typeof $.fn.owlCarousel === "function"
      ) {

          $(".testimonial-carousel").owlCarousel({
              autoplay: true,
              smartSpeed: 1500,
              dots: true,
              loop: true,
              items: 1
          });

      }


      console.log("Portfolio initialized successfully.");

  };

})(jQuery);

document.addEventListener("componentsLoaded", () => {
  window.initializePortfolio();
});