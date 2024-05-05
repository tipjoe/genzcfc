fetch('/data/causes.json')
  .then(res => res.json())
  .then(causeList => {
    // Randomize order of causes.
    shuffledCauseList = shuffleObject(causeList);
    highlightedCauseList = Object.fromEntries(Object.entries(shuffledCauseList).slice(0,6));

    // Make a block for each cause.
    const causes = document.getElementById("causes");

    // Titles, images, descriptions. 
    for (const [key, value] of Object.entries(highlightedCauseList)) {
      // Create container div for each cause. 
      const cause = document.createElement("div");
      cause.id = `${key}`;
      cause.style = "max-width: 47.5%; margin-bottom: 16px; cursor: pointer;";
      cause.addEventListener('click', function() {
        window.location = "/cause?c=" + key;
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

      // Add cause description.
      // const desc = document.createElement("div");
      // desc.innerText = value[1] + ".";
      // cause.appendChild(desc);

      // Add new cause div to the main causes container div.
      causes.appendChild(cause);
    }
  });

function shuffleObject(obj) {
  // new obj to return
  let newObj = {};
  // create keys array
  var keys = Object.keys(obj);

  // randomize keys array
  keys.sort(function (a, b) { return Math.random() - 0.5; });

  // save in new array
  keys.forEach(function (k) {
    newObj[k] = obj[k];
  });
  return newObj;
}