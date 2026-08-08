async function loadFooter() {
    try {
        const response = await fetch("data/constant.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        const footer = data.footer;

        // GitHub
        const github = document.getElementById("footer-github");

        if (github) {
            github.textContent = footer.repository.name;
            github.href = footer.repository.url;
        }

        // Template Author
        const templateAuthor = document.getElementById(
            "footer-template-author"
        );

        if (templateAuthor) {
            templateAuthor.textContent = footer.template.name;
            templateAuthor.href = footer.template.url;
        }

        // Developer
        const developer = document.getElementById(
            "footer-developer"
        );

        if (developer) {
            developer.textContent = footer.developer.name;
            developer.href = footer.developer.url;
        }

    } catch (error) {
        console.error("Failed to load footer:", error);
    }
}


document.addEventListener("componentsLoaded", () => {
    loadFooter();
});