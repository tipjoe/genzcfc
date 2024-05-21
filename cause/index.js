// Grab causes from localStorage.
let causeList = localStorage.getItem("causeList");
let donationAmount = 0;
let donationUrl = "../donate?c=";

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
      console.log('donate add event listener')
      donate.addEventListener("click", function() {
        console.log('donate event')
        window.location = donationUrl;
      });

      // Leave as soon as we find cause.
      return;
    }
  }
}

// Enable/disable button when valid amount is clicked (buttons) or entered 
// (text number input).
function enableDonate(event) {

  const donate = document.getElementById("donate");
  let amtButtons;
  let donateTextDesc = document.getElementById("donate-text-desc");
  let donateTextListener;

  if (event.target.type !== 'number') {
    // It's an amount button.
    donate.disabled = false;
    donate.classList.remove("disabled");
    donate.classList.add("bg-blue-950", "!text-white");
    // Set donation amount.
    donationAmount = event.target.innerHTML;
    localStorage.setItem('donationAmount', donationAmount);
    // highlight selected (and unhighlight others);
    amtButtons = document.getElementsByClassName("amount");
    Array.from(amtButtons).forEach(function (b) {
      b.classList.remove("amount-selected");
    });
    // Now add it to the selected one. 
    event.target.classList.add("amount-selected");

    // Clear out text if user clicks button after entering.
    const dt = document.getElementById("donate-text")
    dt.value = "";
    donateTextDesc.classList.add("hidden");
    if (donateTextListener) {
      dt.removeEventListener("input", donateTextListener);
    }
    
  } else {
    // It's the text box. Don't enable Donate button until there's a valid amt.
    donate.disabled = true;
    donate.classList.add("disabled");
    donate.classList.remove("bg-blue-950", "!text-white");
    donateTextListener = event.target.addEventListener("input", function(e) {
      if (e.target.value && e.target.value >= 5) {
        donate.disabled = false;
        donate.classList.remove("disabled");
        donate.classList.add("bg-blue-950", "!text-white");
        donateTextDesc.classList.add("hidden")
        localStorage.setItem('donationAmount', "$" + e.target.value);
      } else {
        donate.disabled = true;
        donate.classList.add("disabled");
        donate.classList.remove("bg-blue-950", "!text-white");
        donateTextDesc.classList.remove("hidden")
      }
    });
    // Unhighlight all amount buttons. 
    amtButtons = document.getElementsByClassName("amount");
    Array.from(amtButtons).forEach(function (b) {
      b.classList.remove("amount-selected");
    });
  }
}
