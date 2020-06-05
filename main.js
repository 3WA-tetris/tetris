var totalRows = 10;
var cellsInRow = 20;
var min = 0;
var max = 1;

function drawTable() {
  // get the reference for the body
  var div1 = document.getElementById("div1");

  // creates a <table> element
  var tbl = document.createElement("table");

  // creating rows
  for (var r = 0; r < totalRows; r++) {
    var row = document.createElement("tr");

    // create cells in the row
    for (var c = 0; c < cellsInRow; c++) {
      var cell = document.createElement("td");
      // getRandom = Math.floor(Math.random() * (max - min + 1)) + min;
      var cellText = document.createTextNode(Math.floor(Math.random()));
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    tbl.appendChild(row); // add the row to the end of the table body
  }

  div1.appendChild(tbl); // appends <table> into <div1>
}

console.log(drawTable);

window.onload = drawTable;