"use strict";

var state = "getNumA";
var numA = "";
var numB = "";
var op = "";
var result = 0;

function clearBtnHandler() {
  numA = "";
  numB = "";
  op = "";
  result = "";
  state = "getNumA";
  $("input[name='display']").val("");
}

function getNumAState(btn) {
  // Check if clicked btn is a digit
  var btnValue = btn.val();
  var isDigit = /[0-9]/.test(btnValue);

  if (isDigit) {
    // if clicked a digit
    numA += btnValue;
    $("input[name='display']").val(numA);
  } else if (btn.hasClass("operator")) {
    //if clicked an operator btn
    if (numA) {
      op = btn.attr("id");
      state = "opClicked";
    }
  }
}

function operatorHandler(btn) {
  // Clicked an operator
  if (btn.hasClass("operator")) {
    op = btn.attr("id");
  } else if (/[0-9]/.test(btn.val())) {
    // Cliked digit
    state = "getNumB";
    numB = btn.val();
    $("input[name='display']").val(numB);
  }
}

function getNumBState(btn) {
  // Check if clicked btn is a digit
  var btnValue = btn.val();
  var isDigit = /[0-9]/.test(btnValue);
  if (isDigit) {
    numB += btnValue;
    $("input[name='display']").val(numB);
  } else if (btn.hasClass("operator")) {
    result = calculate();
    numA = result;
    numB = "";
    op = btn.attr("id");
    state = "opClicked";
    $("input[name='display']").val(result);
  } else if (btn.attr("id") == "equalsButton") {
    result = calculate();
    numA = result;
    state = "equalsClicked";
    $("input[name='display']").val(result);
  }
}

function equalsClickedHandler(btn) {
  if (btn.attr("id") == "equalsButton") {
    result = calculate();
    numA = result;
    $("input[name='display']").val(result);
  } else if (/[0-9]/.test(btn.val())) {
    clearBtnHandler();
    numA = btn.val();
    $("input[name='display']").val(numA);
  } else if (btn.hasClass("operator")) {
    op = btn.attr("id");
    numB = "";
    state = "opClicked";
  }
}

function calculate() {
  if (numA && numB && op) {
    switch (op) {
      case "addButton":
        result = parseInt(numA) + parseInt(numB);
        break;
      case "subtractButton":
        result = parseInt(numA) - parseInt(numB);
        break;
      case "multiplyButton":
        result = parseInt(numA) * parseInt(numB);
        break;
      case "divideButton":
        result = parseFloat(numA) / parseFloat(numB);
        break;
    }
    return result;
  }
}

// Event Listener
$("button").click(function () {
  // Clear Button Handler
  if ($(this).attr("id") == "clearButton") {
    clearBtnHandler();
  }
  // state = getNumA
  if (state == "getNumA") {
    getNumAState($(this));
  }
  // state = opClicked
  else if (state == "opClicked") {
    operatorHandler($(this));
  }
  // state = getNumB
  else if (state == "getNumB") {
    getNumBState($(this));
  }
  // state = equalsClicked
  else if (state == "equalsClicked") {
    equalsClickedHandler($(this));
  }
});

//÷
