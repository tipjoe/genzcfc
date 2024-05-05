fetch('/data/causes.json')
  .then(res => res.json())
  .then(causeList => {
    // Make a block for each cause.
    const cause = document.getElementById("cause");

    // Titles, images, descriptions. 
    for (const [key, value] of Object.entries(causeList)) {
      const urlParams = new URLSearchParams(window.location.search);
      const myParam = urlParams.get('c');
      console.log('parm', myParam)
      if (key == myParam) {
        // Add cause image.
        const img = new Image()
        img.src = "/images/causes/" + key + ".webp";
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

        // Add new cause div to the main causes container div.
        causes.appendChild(cause);

        return;
      }
    }
  });
