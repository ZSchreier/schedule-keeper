// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

const scheduleArea = $('.container-lg');

const infoStorage = JSON.parse(localStorage.getItem('scheduleInfo')) || [];


let currentTime = dayjs();
console.log (currentTime.format(`dddd, MMM D, HH:mm a`));


function testing(){
  for(x=9; x < 18; x++){
    const newBlock = `
    <div id="hour-XXXXXX" class="row time-block${x}">
      <div class="col-2 col-md-1 hour text-center py-3">${x} o'clock</div>
      <textarea class="col-8 col-md-10 descripition" rows="3">
        Punch myself ${x} times!
      </textarea>
      <button class="btn saveBtn col-2 col-md-1" aria-labe"save">
        <i class="fas fa-save" aria-hidden="true"></i>
      </button>
    </div>`;
    scheduleArea.append(newBlock);
  }
} 

testing();


displayDay();

function displayDay(){
  setInterval(function() {
    $('#currentDay').text(`${dayjs().format('dddd MMM D, HH:mm:ss a')}`);
  }, 1000);
}



$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // var newBlock = $(`
  // <div id="hour-XXXXXX" class="row time-block${currentClass}">
  //   <div class="col-2 col-md-1 hour text-center py-3">${hourName}</div>
  //   <textarea class="col-8 col-md-10 descripition" rows="3">
  //     ${hourData}
  //   </textarea>
  //   <button class="btn saveBtn col-2 col-md-1" aria-labe"save">
  //     <i class="fas fa-save" aria-hidden="true"></i>
  //   </button>
  // </div>`
  // )
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
});
