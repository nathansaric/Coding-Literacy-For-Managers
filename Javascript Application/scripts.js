// Creating an array of objects to store all of the advertisements
const Ads = [
  { beacon: "bakery", type: "organic", imgLink: "IMAGES/BAKERY/Bakery-O1.png" },
  { beacon: "bakery", type: "organic", imgLink: "IMAGES/BAKERY/Bakery-O2.png" },
  { beacon: "bakery", type: "vegetarian", imgLink: "IMAGES/BAKERY/Bakery-PB1.png" },
  { beacon: "bakery", type: "vegetarian", imgLink: "IMAGES/BAKERY/Bakery-PB2.png" },
  { beacon: "bakery", type: "houseBrand", imgLink: "IMAGES/BAKERY/Bakery-HB1.png" },
  { beacon: "bakery", type: "houseBrand", imgLink: "IMAGES/BAKERY/Bakery-HB2.png" },

  { beacon: "dairy", type: "organic", imgLink: "IMAGES/DAIRY/Dairy-O1.png" },
  { beacon: "dairy", type: "organic", imgLink: "IMAGES/DAIRY/Dairy-O2.png" },
  { beacon: "dairy", type: "vegetarian", imgLink: "IMAGES/DAIRY/Dairy-PB1.png" },
  { beacon: "dairy", type: "vegetarian", imgLink: "IMAGES/DAIRY/Dairy-PB2.png" },
  { beacon: "dairy", type: "houseBrand", imgLink: "IMAGES/DAIRY/Dairy-HB1.png" },
  { beacon: "dairy", type: "houseBrand", imgLink: "IMAGES/DAIRY/Dairy-HB2.png" },

  { beacon: "deli", type: "organic", imgLink: "IMAGES/DELI/Deli-O1.png" },
  { beacon: "deli", type: "organic", imgLink: "IMAGES/DELI/Deli-O2.png" },
  { beacon: "deli", type: "vegetarian", imgLink: "IMAGES/DELI/Deli-PB1.png" },
  { beacon: "deli", type: "vegetarian", imgLink: "IMAGES/DELI/Deli-PB2.png" },
  { beacon: "deli", type: "houseBrand", imgLink: "IMAGES/DELI/Deli-HB1.png" },
  { beacon: "deli", type: "houseBrand", imgLink: "IMAGES/DELI/Deli-HB2.png" },

  { beacon: "grocery", type: "organic", imgLink: "IMAGES/GROCERY/Grocery-O1.png" },
  { beacon: "grocery", type: "organic", imgLink: "IMAGES/GROCERY/Grocery-O2.png" },
  { beacon: "grocery", type: "vegetarian", imgLink: "IMAGES/GROCERY/Grocery-PB1.png" },
  { beacon: "grocery", type: "vegetarian", imgLink: "IMAGES/GROCERY/Grocery-PB2.png" },
  { beacon: "grocery", type: "houseBrand", imgLink: "IMAGES/GROCERY/Grocery-HB1.png" },
  { beacon: "grocery", type: "houseBrand", imgLink: "IMAGES/GROCERY/Grocery-HB2.png" },

  { beacon: "produce", type: "organic", imgLink: "IMAGES/PRODUCE/Produce-O1.png" },
  { beacon: "produce", type: "organic", imgLink: "IMAGES/PRODUCE/Produce-O2.png" },
  { beacon: "produce", type: "vegetarian", imgLink: "IMAGES/PRODUCE/Produce-PB1.png" },
  { beacon: "produce", type: "vegetarian", imgLink: "IMAGES/PRODUCE/Produce-PB2.png" },
  { beacon: "produce", type: "houseBrand", imgLink: "IMAGES/PRODUCE/Produce-HB1.png" },
  { beacon: "produce", type: "houseBrand", imgLink: "IMAGES/PRODUCE/Produce-HB2.png" },
];

let popupOpen = false;

// Retrieves the user preferences and stores them in a list
function validatePreferences() {
  const preferenceOptions = ["organic", "vegetarian", "houseBrand"];
  let userPreferences = [];

  if (document.getElementById("allSales").checked) {
    userPreferences = preferenceOptions;
  } else {
    for (let preference of preferenceOptions) {
      if (document.getElementById(preference).checked) {
        userPreferences.push(preference);
      }
    }
  }

  if (!userPreferences.length) {
    return alert("Must select at least one preference!");
  }

  // sessionStorage allows the transfer of data across html pages
  sessionStorage.setItem("userPreferences", JSON.stringify(userPreferences));

  window.location.href = "grocerymap.html";
}

// Retrieves the user preferences stored in sessionStorage
function getUserPreferences() {
  userPreferences = JSON.parse(sessionStorage.getItem("userPreferences"));
}

// Retrieves the relevant ads to display in the popup box
function getAds(departmentBeacon) {
  const ads = Ads.filter(function (ad) {
    return (
      userPreferences.includes(ad.type) && ad.beacon === departmentBeacon
    );
  });
  return ads;
}

// Dynamically creates the popup box to display to the user
function populatePopup(departmentBeacon) {
  if (popupOpen) return;
  popupOpen = true;
  const popupContainer = document.getElementById("adPopup");
  const popupInnerHTMLBase = popupContainer.innerHTML;
  let popupInnerHTML = popupContainer.innerHTML;
  const ads = getAds(departmentBeacon);
  for (let ad of ads) {
    popupInnerHTML += `
    <img src="${ad.imgLink}" id="${ad.beacon}" style="width:100%; max-width:750px" />
    `;
  }
  popupContainer.innerHTML = popupInnerHTML;
  popupContainer.style.display = "block";

  const closeButton = document.getElementsByClassName("close")[0];
  closeButton.onclick = function () {
    popupOpen = false;
    popupContainer.style.display = "none";
    popupContainer.innerHTML = popupInnerHTMLBase;
  };
}
