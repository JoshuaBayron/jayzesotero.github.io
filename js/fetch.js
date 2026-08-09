async function fetchQualifications() {
  try {
    const response = await fetch("data/qualification.json");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch qualifications:", error);
    return null;
  }
}

async function fetchPortfolios() {
    try {
      const response = await fetch("data/portfolio.json");
  
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch portfolios:", error);
      return null;
    }
  }
  