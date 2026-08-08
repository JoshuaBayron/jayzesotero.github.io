document.addEventListener("DOMContentLoaded", async () => {

    const components = document.querySelectorAll("[data-include]");

    await Promise.all(
        [...components].map(async (element) => {

            const file = element.getAttribute("data-include");

            try {
                const response = await fetch(file);

                if (!response.ok) {
                    throw new Error(
                        `Failed to load ${file}: ${response.status}`
                    );
                }

                element.innerHTML = await response.text();

            } catch (error) {
                console.error(error);
            }
        })
    );

    document.dispatchEvent(new Event("componentsLoaded"));
});