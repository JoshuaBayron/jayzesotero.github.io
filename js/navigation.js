async function loadNavigation() {
    try {
      const response = await fetch("data/navigation.json");
  
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
  
      const data = await response.json();
  
      renderNavigation(data.navigation);
  
    } catch (error) {
      console.error("Failed to load navigation:", error);
    }
  }
  
  const global_variable = "";
  function renderNavigation(navigation) {
    const container = document.getElementById("navigation-list");
  
    if (!container) {
      console.error("Navigation container not found.");
      return;
    }
  
    container.innerHTML = navigation
      .map(
        item => `
          <a
            href="#${item.id}"
            class="nav-item nav-link ${item.isActive ? "active" : global_variable}"
          >
            ${item.label}
          </a>
        `
      )
      .join("");
  }
  
  
  document.addEventListener("componentsLoaded", () => {
    loadNavigation();
  });