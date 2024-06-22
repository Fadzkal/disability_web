// JavaScript to add interactivity to the job registration page

document.addEventListener("DOMContentLoaded", function () {
  // Add event listeners for filter and search functionalities
  document.getElementById("search-button").addEventListener("click", searchJob);

  // Function to filter jobs based on user input
  function searchJob() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const jobItems = document.querySelectorAll(".job-item");

    jobItems.forEach((item) => {
      const title = item.querySelector("h2").textContent.toLowerCase();
      if (title.includes(searchInput)) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  }

  // Function to filter jobs based on selected filters
  const filters = document.querySelectorAll(".filter-section select, .sort-section select");
  filters.forEach((filter) => {
    filter.addEventListener("change", filterJobs);
  });

  function filterJobs() {
    const categoryFilter = document.querySelector(".filter-section select:nth-child(2)").value;
    const typeFilter = document.querySelector(".filter-section select:nth-child(3)").value;
    const locationFilter = document.querySelector(".filter-section select:nth-child(4)").value;
    const sortFilter = document.querySelector(".sort-section select").value;

    let filteredJobs = Array.from(document.querySelectorAll(".job-item"));

    if (categoryFilter) {
      filteredJobs = filteredJobs.filter(job => job.querySelector("h2").textContent.toLowerCase().includes(categoryFilter));
    }
    if (typeFilter) {
      filteredJobs = filteredJobs.filter(job => job.querySelector("p:nth-of-type(2)").textContent.toLowerCase().includes(typeFilter));
    }
    if (locationFilter) {
      filteredJobs = filteredJobs.filter(job => job.querySelector("p:nth-of-type(1)").textContent.toLowerCase().includes(locationFilter));
    }

    // Sort jobs
    if (sortFilter === "latest") {
      filteredJobs.sort((a, b) => new Date(b.querySelector("p:nth-of-type(3)").textContent.split(": ")[1]) - new Date(a.querySelector("p:nth-of-type(3)").textContent.split(": ")[1]));
    } else if (sortFilter === "oldest") {
      filteredJobs.sort((a, b) => new Date(a.querySelector("p:nth-of-type(3)").textContent.split(": ")[1]) - new Date(b.querySelector("p:nth-of-type(3)").textContent.split(": ")[1]));
    } else if (sortFilter === "alphabetical") {
      filteredJobs.sort((a, b) => a.querySelector("h2").textContent.localeCompare(b.querySelector("h2").textContent));
    }

    const jobList = document.querySelector(".job-list");
    jobList.innerHTML = "";
    filteredJobs.forEach(job => jobList.appendChild(job));
  }
});
