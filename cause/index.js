// Grab causes from localStorage.
let causeList = localStorage.getItem("causeList");
if (!causeList) {
  // Load causes into localStorage.
  fetch('../data/causes.json')
    .then(res => res.json())
    .then(causes => {
      localStorage.setItem("causeList", JSON.stringify(causes));
      causeList = causes;
      loadCauses();
    });
} else {
  causeList = JSON.parse(causeList);
  loadCause();
}

function loadCause() {
  // Make a detail block for this cause.
  const cause = document.getElementById("cause");

  // Titles, images, descriptions. 
  for (const [key, value] of Object.entries(causeList)) {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('c');
    if (key == myParam) {
      // Add cause image.
      const img = new Image()
      img.src = "../images/causes/" + key + ".webp";
      img.className = "drop-shadow-md rounded-lg w-full"
      cause.appendChild(img);

      // Add cause title.
      const title = document.createElement("h5");
      title.innerText = value[0];
      title.style = "margin: 12px 0; color: #01015b;";
      cause.appendChild(title);

      // Add cause description.
      const desc = document.createElement("div");
      desc.innerText = value[1];
      cause.appendChild(desc);

      // Leave as soon as we find cause.
      return;
    }
  }
}

// Enable/disable button when valid amount is chosen.
function enableDonate() {
  const donate = document.getElementById("donate");
  donate.disabled = false;
  donate.classList = "bg-blue-950 text-white w-full md:w-32 my-6";
}