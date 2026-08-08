function renderPortfolio(portfolio) {
  const container = document.getElementById("portfolio-list");

  if (!container) {
    console.error("Portfolio container not found.");
    return;
  }

  container.innerHTML = portfolio
    .map(
      (item) => `
        <div class="col-lg-4 col-md-6 mb-4 portfolio-item ${item["filter-type"]}">

          <div class="position-relative overflow-hidden mb-2">

            <img
              class="img-fluid rounded w-100"
              src="${item["image-src"]}"
              alt="${item.title || "Portfolio image"}"
            >
            <div class="portfolio-btn bg-primary d-flex align-items-center justify-content-center">
              <a href="${item["image-src"]}" data-lightbox="portfolio">
                <i class="fa fa-eye text-white" style="font-size: 40px;"></i>
              </a>
            </div>

          </div>

        </div>
      `
    )
    .join("");

  initializePortfolioFilter();
}


function initializePortfolioFilter() {
  const $portfolio = $(".portfolio-container");

  if (!$portfolio.length) {
    console.error("Portfolio container not found.");
    return;
  }

  // Destroy existing Isotope instance if there is one
  if ($portfolio.data("isotope")) {
    $portfolio.isotope("destroy");
  }

  // Initialize Isotope
  $portfolio.isotope({
    itemSelector: ".portfolio-item",
    layoutMode: "fitRows"
  });

  // Filtering
  $("#portfolio-flters li")
    .off("click")
    .on("click", function () {

      $("#portfolio-flters li").removeClass("active");
      $(this).addClass("active");

      const filterValue = $(this).attr("data-filter");

      $portfolio.isotope({
        filter: filterValue
      });
    });

  // Recalculate after images have loaded
  $portfolio.imagesLoaded(function () {
    $portfolio.isotope("layout");
  });
}


async function loadPortfolios() {
  const data = await fetchPortfolios();

  if (!data) {
    return;
  }

  renderPortfolio(data.portfolio);
}


document.addEventListener("componentsLoaded", () => {
  loadPortfolios();
});