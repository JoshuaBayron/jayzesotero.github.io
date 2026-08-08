document.addEventListener(
    "DOMContentLoaded",
    async function () {

        const components =
            document.querySelectorAll(
                "[data-include]"
            );


        await Promise.all(

            [...components].map(
                async function (element) {

                    const file =
                        element.getAttribute(
                            "data-include"
                        );


                    try {

                        console.log(
                            `Loading component: ${file}`
                        );


                        const response =
                            await fetch(file);


                        if (!response.ok) {

                            throw new Error(
                                `Failed to load ${file}: ${response.status}`
                            );

                        }


                        const html =
                            await response.text();


                        element.innerHTML =
                            html;


                        console.log(
                            `Loaded component: ${file}`
                        );


                    } catch (error) {

                        console.error(
                            `Component loading error: ${file}`,
                            error
                        );

                    }

                }
            )

        );


        console.log(
            "All components loaded."
        );


        document.dispatchEvent(
            new Event("componentsLoaded")
        );

    }
);