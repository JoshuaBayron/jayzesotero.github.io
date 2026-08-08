function renderEducation(education) {
  const container = document.getElementById("education-list");

  if (!container) {
    console.error("Education container not found.");
    return;
  }

  container.innerHTML = education
    .map(item => `
      <div class="position-relative mb-4">

        <i
          class="far fa-dot-circle text-primary position-absolute"
          style="top: 2px; left: -32px"
        ></i>

        <h5 class="font-weight-bold mb-1">
          ${item.title}
        </h5>

        <p class="mb-2">
          <strong>${item.organization}</strong>
          |
          <small>${item.date}</small>
        </p>

        <p>
          ${item.description}
        </p>

      </div>
    `)
    .join("");
}


function renderExperience(experience) {
  const container = document.getElementById("experience-list");

  if (!container) {
    console.error("Experience container not found.");
    return;
  }

  container.innerHTML = experience
    .map(item => `
      <div class="position-relative mb-4">

        <i
          class="far fa-dot-circle text-primary position-absolute"
          style="top: 2px; left: -32px"
        ></i>

        <h5 class="font-weight-bold mb-1">
          ${item.title}
        </h5>

        <p class="mb-2">
          <strong>${item.organization}</strong>
          |
          <small>${item.date}</small>
        </p>

        <p>
          ${item.description}
        </p>

      </div>
    `)
    .join("");
}


async function loadQualifications() {
  const data = await fetchQualifications();

  if (!data) {
    return;
  }

  renderEducation(data.education);
  renderExperience(data.experience);
}


document.addEventListener("componentsLoaded", () => {
  loadQualifications();
});