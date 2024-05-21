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
  const backLink = document.getElementById("back-link");

  // Titles, images, descriptions. 
  for (const [key, value] of Object.entries(causeList)) {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('c');
    const amount = localStorage.getItem("donationAmount");

    backLink.href = "../cause?c=" + myParam;

    if (key == myParam) {
      // Add cause donation description.
      const desc = document.getElementById("desc");
      desc.innerText = "Your donation will be distributed to all CFC-approved charities dedicated to " + value[0] + ".";

      // Add donation summary.
      const summaryLeft = document.getElementById("summary-left");
      summaryLeft.innerHTML = value[0];

      const summaryRight = document.getElementById("summary-right");
      summaryRight.innerHTML = amount;


      return;
    }
  }
}

function showApplePay(e) {
  const applePay = document.getElementById("apple-pay");
  const amount = localStorage.getItem("donationAmount");
  applePay.classList.remove('hidden');
  document.getElementById("apple-amount").innerHTML = amount;

  const onClick = (e) => {
    if (e.target.id !== "thanks") {
      applePay.classList.add('hidden');
      applePay.removeEventListener('click', onClick);
    }
  }
  applePay.addEventListener('click', onClick);
}

function showCreditPay(e) {
  const creditPay = document.getElementById("credit-pay");
  const amount = localStorage.getItem("donationAmount");
  creditPay.classList.remove('hidden');
  document.getElementById("credit-amount").innerHTML = amount;

  const onClick = (e) => {
    if (e.target.id !== "thanks") {
      creditPay.classList.add('hidden');
      creditPay.removeEventListener('click', onClick);
    }
  }
  creditPay.addEventListener('click', onClick);
}
