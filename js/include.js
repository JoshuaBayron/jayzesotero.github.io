async function loadIncludes() {
  const components = document.querySelectorAll("[data-include]");

  await Promise.all(
    [...components].map(async function (element) {
      const file = element.getAttribute("data-include");

      try {
        const response = await fetch(file);

        if (!response.ok) {
          throw new Error(`Failed to load ${file}: ${response.status}`);
        }

        const html = await response.text();
        element.innerHTML = html;
      } catch (error) {
        console.error(`Component loading error: ${file}`, error);
      }
    })
  );

  document.dispatchEvent(new Event("componentsLoaded"));
}

document.addEventListener("DOMContentLoaded", async function () {
  const mappingsCreated = createIncludeMappings();

  if (!mappingsCreated) {
    return;
  }

  await loadIncludes();
});
