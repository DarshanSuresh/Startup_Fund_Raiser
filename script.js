let totalDonation = 89914;
let rem25 = 101;
let rem75 = 64;
let subscribers = 5007;
const progressSum = 100000;

// let currentProgressWidth = (totalDonation/progressSum) * 100;

const totalSum = document.querySelector("#totalSum");
const rem25container = document.querySelectorAll("#remainder-25");
const rem75container = document.querySelectorAll("#remainder-75");

const formatCurrency = (num) => {
  return new Intl.NumberFormat("en-us", {
    currency: "USD",
    style: "currency",
    maximumFractionDigits: 0,
  }).format(Number(num));
};

totalSum.textContent = formatCurrency(totalDonation);
rem25container.forEach((item) => (item.textContent = rem25));
rem75container.forEach((item) => (item.textContent = rem75));

//function that would add the registered pleges to the existent ones
const subscribersContainer = document.querySelector("#totalSubscribers");
const priceInput = document.querySelectorAll(".input-01");
subscribersContainer.textContent = subscribers;

const progressContainer = document.querySelector("#progress");

function editProgressBar(){
  const currentProgressWidth = (totalDonation/progressSum) * 100;
  progressContainer.style.width = `${currentProgressWidth}%`;
}

editProgressBar();

function updateDonationParams(donation, category) {
  totalDonation += donation;
  totalSum.textContent = formatCurrency(totalDonation);

  if (category === "25") {
    rem25--;
    rem25container.forEach((item) => (item.textContent = rem25));
  } else {
    if (category === "75") {
      rem75--;
      rem75container.forEach((item) => (item.textContent = rem75));
    }
  }

  subscribers++;
  subscribersContainer.textContent = subscribers;

  editProgressBar();

}

//get the modal
const backProject = document.querySelector("#back-project");

//get modal overlay
const modalOverlay = document.querySelector(".modal-overlay");
const modalOverlay2 = document.querySelector(".complete-modal-overlay");

//gets the thankYou modal
const completeModal = document.querySelector(".complete-modal");

//get the button that triggers the modal
const btnForModal = document.querySelector("#btnForModal");

//get the direct price inputs for the pledges
const price25Input = document.querySelector("#price-25");
const price75Input = document.querySelector("#price-75");

//gets the continue button after putting pledge input
const btn25 = document.querySelector(".btn-25");
const btn75 = document.querySelector(".btn-75");

//get button that closes modal
const closeBtnModal = document.querySelector(".closeBtn");
const btnBamboo = document.querySelector("#btn-bamboo");

let donationPrice = 0;
function updateDonationPrice(evt) {
  const price = evt.target.dataset.price;
  if (price) {
    donationPrice = Number(price);
  }
}

const modalBtns = document.querySelectorAll(".reward-btn");
modalBtns.forEach((btn) =>
  btn.addEventListener("click", function (evt) {
    updateDonationPrice(evt);
    bringUpModal();
  })
);

//updating params
const addUpPledges = function (category) {

  // initialize donation price
  let donationPrice = 0;

  // get donation values from input
  if (category === "25") {
    donationPrice = Number(price25Input.value);
  } else if (category === "75") {
    donationPrice = Number(price75Input.value);
  }

  // update UI with new price
  updateDonationParams(donationPrice, category);

  // clear inputs
  price25Input.value = "";
  price75Input.value = "";
};

//submits the pledges
const continueBtn = document.querySelectorAll(".btn-modal");
continueBtn.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    const category = e.target.dataset.category;

    closeModal();
    thankYouModal();
    addUpPledges(category);
  })
);

const thankYouModal = function () {
  completeModal.style.display = "block";
  modalOverlay2.style.display = "block";
};

//function that brings up the modal
const bringUpModal = function () {
  backProject.style.display = "block";
  modalOverlay.style.display = "block";

  //funtion that brings up thank-you modal
  //function that selects a particular option
  if (donationPrice === 0) {
    document.getElementById("first").checked = true;
  } else if (donationPrice === 25) {
    document.getElementById("second").checked = true;
  } else if (donationPrice === 75) {
    document.getElementById("third").checked = true;
  }
};
price25Input.addEventListener("keyup", function (e) {
  checkInputPrice();
});
price75Input.addEventListener("keyup", function (e) {
  checkInputPrice();
});

//this confirms that the pledge input correspons with the chosen tier
function checkInputPrice() {
  if (Number(price25Input.value) < 25 || Number(price25Input.value) > 74) {
    btn25.disabled = true;
  } else {
    btn25.disabled = false;
  }
  if (Number(price75Input.value) < 75 || Number(price75Input.value) > 199) {
    btn75.disabled = true;
  } else {
    btn75.disabled = false;
  }
}

//function that closes the modal

const closeModal = function () {
  backProject.style.display = "none";
  modalOverlay.style.display = "none";
  modalOverlay2.style.display = "none";
  completeModal.style.display = "none";
};
