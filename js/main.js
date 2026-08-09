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
    $(document)
      .off("click.smoothScroll", ".navbar-nav a")
      .on("click.smoothScroll", ".navbar-nav a", function (event) {
        if (this.hash !== "") {
          event.preventDefault();

          const target = $(this.hash);

          if (target.length) {
            $("html, body")
              .stop()
              .animate(
                {
                  scrollTop: target.offset().top - 45,
                },
                1500,
                "easeInOutExpo"
              );
          }

          // Update active navigation
          $(".navbar-nav .active").removeClass("active");

          $(this).addClass("active");

          // Close mobile navbar after clicking
          if ($(".navbar-toggler").is(":visible")) {
            $(".navbar-collapse").collapse("hide");
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
        loop: true,
      });
    }

    // -----------------------------------------
    // Modal Video
    // -----------------------------------------
    let videoSrc;

    $(document)
      .off("click.video", ".btn-play")
      .on("click.video", ".btn-play", function () {
        videoSrc = $(this).data("src");
      });

    $(document)
      .off("shown.bs.modal.video", "#videoModal")
      .on("shown.bs.modal.video", "#videoModal", function () {
        if (videoSrc) {
          $("#video").attr(
            "src",
            videoSrc + "?autoplay=1&modestbranding=1&showinfo=0"
          );
        }
      });

    $(document)
      .off("hide.bs.modal.video", "#videoModal")
      .on("hide.bs.modal.video", "#videoModal", function () {
        $("#video").attr("src", videoSrc);
      });

    // -----------------------------------------
    // Contact Modal
    // -----------------------------------------
    $(document)
      .off("submit.contact", "#contactForm")
      .on("submit.contact", "#contactForm", function (event) {
        event.preventDefault();

        const name = $("#senderName").val().trim();

        const email = $("#senderEmail").val().trim();

        const subject = $("#emailSubject").val().trim();

        const message = $("#emailMessage").val().trim();

        // Replace this with your email address
        const recipient = "joshu.bayron@gmail.com";

        // Create email body
        const body = `Name: ${name}\n` + `Email: ${email}\n\n` + `${message}`;

        // Create mailto URL
        const mailto =
          `mailto:${recipient}` +
          `?subject=${encodeURIComponent(subject)}` +
          `&body=${encodeURIComponent(body)}`;

        // Open visitor's email client
        window.location.href = mailto;
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
            $(this).css("width", $(this).attr("aria-valuenow") + "%");
          });
        },
        {
          offset: "80%",
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

        layoutMode: "fitRows",
      });

      portfolioFilters
        .find("li")
        .off("click.portfolio")
        .on("click.portfolio", function () {
          portfolioFilters.find("li").removeClass("active");

          $(this).addClass("active");

          const filterValue = $(this).attr("data-filter");

          portfolioIsotope.isotope({
            filter: filterValue,
          });
        });
    } else {
      console.warn("Portfolio elements or Isotope were not found.");
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

    $(document)
      .off("click.backToTop", ".back-to-top")
      .on("click.backToTop", ".back-to-top", function () {
        $("html, body").stop().animate(
          {
            scrollTop: 0,
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

        items: 1,
      });
    }
  };
})(jQuery);

// -----------------------------------------
// Initialize after components are loaded
// -----------------------------------------
document.addEventListener("componentsLoaded", function () {
  window.initializePortfolio();
});
