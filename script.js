// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var scheduleMain = $("#schedule-main")
  var timeblockFormat = 24;
  var today = dayjs().format("MMMM D, YYYY");
  var currentHour = dayjs().format("H");
  var timeBlocks = [];
  currentHour = Number(currentHour);
  // console.log(today);
  // console.log(typeof currentHour);
  var hourText = "AM";

  $("header").append(today);

  //create the timeblocks and their content
  for (var i = 0; i < timeblockFormat; i++) {
    if (i <= 12) {
      hourText = "AM";
    } else {
      hourText = "PM";
    }
    timeBlocks[i] = $("<div>");
    timeBlocks[i].attr("id", "hour-" + String(i+1));
    if (currentHour > i) {
      timeBlocks[i].attr("class", "row time-block past");
    } else if (currentHour == i) {
      timeBlocks[i].attr("class", "row time-block present");
    } else {
      timeBlocks[i].attr("class", "row time-block future");
    }
    var timeDiv = $("<div>");
    timeDiv.attr("class", "col-2 col-md-1 hour text-center py-3");
    timeDiv.text(i + ":00");

    var inputArea = $("<textarea>");
    inputArea.attr("id", "hour-" + String(i+1));
    inputArea.attr("class", "col-8 col-md-10 description");
    inputArea.attr("rows", "3");
    inputArea.val(localStorage.getItem("hour-" + String(i+1))); //retrieve existing input value from local storage

    var saveButton = $("<button>");
    var saveInner = $("<i>");
    saveButton.attr("class", "btn saveBtn col-2 col-md-1");
    saveButton.attr("aria-label", "save");
    saveButton.attr("id", "hour-" + String(i+1));
    saveInner.attr("class", "fas fa-save");
    saveInner.attr("aria-hidden", "true");

    scheduleMain.append(timeBlocks[i]);
    timeBlocks[i].append(timeDiv);
    timeBlocks[i].append(inputArea);
    timeBlocks[i].append(saveButton)
    saveButton.append(saveInner);



  }

  var buttons = $("button");

  $.each(buttons, function() {
    $(this).on("click", function() {
      localStorage.setItem($(this).attr("id"), $("textarea[id='" + $(this).attr("id") + "']").val());
    })
  })

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
