const includeMappings = {
  navbar: "components/navbar.html",
  header: "components/header.html",
  about: "pages/about.html",
  qualification: "pages/qualification.html",
  portfolio: "pages/portfolio.html",
  footer: "components/footer.html",
  contactModal: "components/modals/contact_modal.html",
};

function createIncludeMappings() {
  const container = document.getElementById("include-mappings");
  if (!container) {
    console.error('Element "#include-mappings" not found.');
    return false;
  }
  Object.entries(includeMappings).forEach(([id, path]) => {
    const element = document.createElement("div");
    element.id = id;
    element.setAttribute("data-include", path);
    container.appendChild(element);
  });

  return true;
}
