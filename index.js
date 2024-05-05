// Grab causes from localStorage.
let causeList = localStorage.getItem("causeList");
if (!causeList) {
  console.log("home - getting causes.")
  // Load causes into localStorage.
  fetch('data/causes.json')
    .then(res => res.json())
    .then(causes => {
      localStorage.setItem("causeList", JSON.stringify(causes));
      causeList = causes;
      loadCauses();
    });
} else {
  causeList = JSON.parse(causeList);
  loadCauses();
}

function loadCauses() {
  // Randomize order of causes.
  shuffledCauseList = shuffleObject(causeList);

  // Make a block for each cause.
  const causes = document.getElementById("causes");
  const causeListButton = document.getElementById("cause-list");
  causeListButton.addEventListener("click", function() {
    window.location = "causes";
  });

  // Titles, images, descriptions. 
  for (const [key, value] of Object.entries(shuffledCauseList)) {
    // Create container div for each cause. 
    const cause = document.createElement("div");
    cause.id = `${key}`;
    cause.style = "max-width: 47.5%; margin-bottom: 16px; cursor: pointer;";
    cause.addEventListener('click', function() {
      window.location = "cause?c=" + key;
    });
    // Add cause image.
    const img = new Image()
    img.src = "/images/causes/" + key + ".webp";
    img.className = "drop-shadow-md"
    cause.appendChild(img);

    // Add cause title.
    const title = document.createElement("div");
    title.innerText = value[0];
    title.style = "margin-bottom: .2rem;";
    cause.appendChild(title);

    // Add new cause div to the main causes container div.
    causes.appendChild(cause);
  }
}

function shuffleObject(obj) {
  // new obj to return
  let newObj = {};
  // create keys array
  var keys = Object.keys(obj);
  // Remove the last category ("other/unknown") so it's never highlighted.
  keys.pop();

  // randomize keys array
  keys.sort(function (a, b) { return Math.random() - 0.5; });

  // save in new array
  keys.forEach(function (k) {
    newObj[k] = obj[k];
  });
  return Object.fromEntries(Object.entries(newObj).slice(0,6));
}