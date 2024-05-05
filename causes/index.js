fetch('/data/causes.json')
  .then(res => res.json())
  .then(causeList => {
    // Make a block for each cause.
    const causes = document.getElementById("causes");

    // Titles, images, descriptions. 
    for (const [key, value] of Object.entries(causeList)) {
      // Create container div for each cause. 
      const cause = document.createElement("li");
      cause.id = `${key}`;
      cause.style = "padding: 8px 4px; margin: 0 !important; list-style: none;";
      cause.innerHTML = "<a style='color: #01015b;' href='/cause?c=" + key + "'>" + value[0] + "</a>";

      // Add new cause div to the main causes container list.
      causes.appendChild(cause);
    }
  });