// Reading CSV File
function thirdFunction() {
  var myFirstFile = document.getElementById("myfile");

  var myFirstFileReader = new FileReader();

  myFirstFileReader.readAsText(myFirstFile.files[0]);

  myFirstFileReader.onload = function () {
    const textOfCSV = myFirstFileReader.result;

    // Creating arrays for both headers and individuals rows
    const headersOfCSV = textOfCSV.slice(0, textOfCSV.indexOf("\n")).split(",");
    const rowsOfCSV = textOfCSV.slice(textOfCSV.indexOf("\n") + 1).split("\n");

    // did this to remove the /r from All Sales
    headersOfCSV.pop();
    headersOfCSV.push("All Sales");

    var rowArray = [];
    for (var i = 0; i < rowsOfCSV.length - 1; i++) {
      rowArray[i] = rowsOfCSV[i].split(",");
    }

    // Allows for the display of number of lines read to the HTML
    document.getElementById("linesRead").innerHTML = rowsOfCSV.length - 1;

    // Creates an array of objects with the array of headers and rows created previously

    var keys = headersOfCSV,
      i = 0,
      k = 0,
      obj = null,
      output = [];

    for (i = 0; i < rowArray.length; i++) {
      obj = {};

      for (k = 0; k < keys.length; k++) {
        obj[keys[k]] = rowArray[i][k];
      }

      output.push(obj);
    }

    errorCatching(headersOfCSV, output);

    countAds(output);
  };
}
// Looking into header and row arrays to determine if any errors in CSV file uploaded.
// Errors will determine if proper number and type of headers and rows have been included
function errorCatching(headersOfCSV, output) {
  try {
    if (headersOfCSV.length != 5) throw "Invalid number of Headers.";
    // this error keeps getting thrown, not sure why
    for (let h = 0; h < headersOfCSV.length; h++) {
      if (
        headersOfCSV[h] == "BeaconID" ||
        headersOfCSV[h] == "Organic" ||
        headersOfCSV[h] == "Vegetarian" ||
        headersOfCSV[h] == "House Brand" ||
        headersOfCSV[h] == "All Sales"
      );
      else throw "Invalid Headers" + headersOfCSV[h];
    }

    for (let i = 0; i < output.length - 1; i++) {
      if (
        output[i]["BeaconID"] == "25-447-0505" ||
        output[i]["BeaconID"] == "61-808-9116" ||
        output[i]["BeaconID"] == "43-589-7937" ||
        output[i]["BeaconID"] == "79-195-9434" ||
        output[i]["BeaconID"] == "85-144-5065"
      );
      else throw "Invalid Beacon ID: " + output[i]["BeaconID"];
    }

    for (let i = 0; i < output.length; i++) {
      if (output[i]["Organic"] == "0" || output[i]["Organic"] == "1");
      else throw "Invalid entry under Organic. Must be 0 or 1 to be valid.";

      if (output[i]["Organic"] == "") throw "Missing entry under Organic.";
    }

    for (let i = 0; i < output.length; i++) {
      if (output[i]["Vegetarian"] == "0" || output[i]["Vegetarian"] == "1");
      else throw "Invalid entry under Vegetarian. Must be 0 or 1 to be valid.";

      if (output[i]["Vegetarian"] == "")
        throw "Missing entry under Vegetarian.";
    }

    for (let i = 0; i < output.length; i++) {
      if (output[i]["House Brand"] == "0" || output[i]["House Brand"] == "1");
      else throw "Invalid entry under House Brand. Must be 0 or 1 to be valid.";

      if (output[i]["House Brand"] == "")
        throw "Missing entry under House Brand.";
    }

    for (let i = 0; i < output.length; i++) {
      if (output[i]["All Sales"] == "0" || output[i]["All Sales"] == "1");
      else throw "Invalid entry under All Sales. Must be 0 or 1 to be valid.";

      if (output[i]["All Sales"] == "") throw "Missing entry under All Sales.";
    }
  } catch (err) {
    document.getElementById("errorMsg").innerHTML =
      err + ". Please submit revised file.";
    console.log(err);
  }
}

// Counting advertisments with located in the array of objects
// Then allowing for the display of the number to the user
function countAds(output) {
  //All Sales Advertisment Count
  let allCount = 0;
  for (let i = 0; i == output.length; i++) {
    if (output[i]["All Sales "] === "1") allCount++;
  }

  //Organic Count
  let orgCount = 0;
  for (let i = 0; i < output.length; i++) {
    if (output[i].Organic === "1") orgCount++;
  }

  document.getElementById("orgAds").innerHTML = orgCount + allCount;

  // Vegetarian Advertisment Count
  let vegCount = 0;
  for (let i = 0; i < output.length; i++) {
    if (output[i].Vegetarian === "1") vegCount++;
  }

  document.getElementById("vegAds").innerHTML = vegCount + allCount;

  // House Brand Advertisment Count
  let houseCount = 0;
  for (let i = 0; i < output.length; i++) {
    if (output[i]["House Brand"] === "1") houseCount++;
  }

  document.getElementById("houseAds").innerHTML = houseCount + allCount;
}
