// Grab causes from localStorage.
let causeList = localStorage.getItem("causeList");
let donationAmount = 0;
let donationUrl = "../donate?c=";
let donationEventListener; 

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
    donationUrl += myParam;

    if (key == myParam) {
      // If user is on a large screen, use the bigger jpg. Otherwise webp. 
      const width = window.innerWidth; 
      const path = width > 600 ? "../images/causes/jpg/" : "../images/causes/";
      const ext = width > 600 ? ".jpg" : ".webp";
      // Add cause image.
      const img = new Image()
      img.src = path + key + ext;
      img.className = "drop-shadow-md rounded-lg w-full"
      cause.appendChild(img);

      // Add cause title.
      const title = document.createElement("h5");
      title.innerText = value[0];
      title.className = "font-blue font-20";
      title.style = "margin: 12px 0;";
      cause.appendChild(title);

      // Add cause description.
      const desc = document.createElement("div");
      desc.innerText = value[1];
      desc.className = "font-black";
      cause.appendChild(desc);

      donationUrl = "../donate/?c=" + key;
      // Leave as soon as we find cause.
      return;
    }
  }
}

// Enable/disable button when valid amount is chosen.
function enableDonate(event) {
  const donate = document.getElementById("donate");
  donate.disabled = false;


  // enabled donate button
  donate.classList.add("bg-blue-950", "!text-white");
  donate.classList.remove("disabled");

  // highlight selected (and unhighlight others);
  let amtButtons = document.getElementsByClassName("amount");
  Array.from(amtButtons).forEach(function (b) {
    b.classList.remove("amount-selected");
  });

  donationAmount = event.target.innerHTML;
  const donationLink = donationUrl + "&a=" + donationAmount;

  // Remove previous donate handler. 
  donationEventListener = function() {
    window.location = donationLink;
  };

  donate.addEventListener("click", donationEventListener);
  
  event.target.classList.add("amount-selected");

}
