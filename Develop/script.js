// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

const scheduleArea = $('.container-lg');

const infoStorage = JSON.parse(localStorage.getItem('scheduleInfo')) || ['','','','','','','','',''];


let currentTime = dayjs();
let testCurrent = dayjs('2023-10-12 22:01');

//dayjs().format('H');
function testing(){
  displayDay();
  let noonCheck = '';
  let classCheck = '';
  for(x=9; x < 18; x++){
    
    if(x <= 11){
      noonCheck = 'am'
    }else{
      noonCheck = 'pm'
    }

    if(dayjs().format('a') === `pm`){
      classCheck = classCheckerPM(x);
    }else{
      classCheck = classCheckerAM(x);
    }

    const newBlock = `
    <div id="hour-${x}" class="row time-block ${classCheck}">
    <div class="col-2 col-md-1 hour text-center py-3">${x} ${noonCheck}</div>
    <textarea class="col-8 col-md-10 descripition text-${x}" rows="3">
      ${infoStorage[x-9]}
    </textarea>
    <button class="btn saveBtn col-2 col-md-1 button-${x}" aria-label="save">
    <i class="fas fa-save icon-${x}" aria-hidden="true"></i>
    </button>
    </div>`;
    scheduleArea.append(newBlock);
  }
} 

function classCheckerPM(number){
  if(number <= 11){
    return 'past'
  }else if(dayjs().format(`H`) === `${number}`){
    return 'present'
  }else if(dayjs().format(`H`) > `${number}`){
    return 'past'
  }else {
    return 'future'
  }
}
function classCheckerAM(number){
  if(dayjs().format(`H`) === `${number}`){
    return 'present'
  }else if(number === 11){
    return 'future'
  }else if(number === 10 && dayjs().format(`H`) !== '11'){
    return 'future'
  }else if (number === 10 && dayjs().format(`H`) === '11'){
    return 'past'
  }else if (number === 9 && dayjs().format(`H`) === '11'){
    return 'past'
  }else if (number === 9 && dayjs().format(`H`) === '10'){
    return 'past'
  }else {
    return 'future'
  }
}

// function saveChanges(){

// }


function displayDay(){
  setInterval(function() {
    $('#currentDay').text(`${dayjs().format('dddd MMM D, H:mm:ss a')}`);
  }, 1000);
}


$("div").click(function(event){
  event.preventDefault();
  if(event.target.matches(".saveBtn") || event.target.matches("i")){
    for(x=9; x < 18; x++){
      if(event.target.matches(`.button-${x}`) || event.target.matches(`.icon-${x}`)){
        let newText = rowFinder(x);
        infoStorage[x-9] = newText;
        localStorage.setItem("scheduleInfo", JSON.stringify(infoStorage));
      }
    }
  }

});


function rowFinder(number){
  let rowSelect = $(`.text-${number}`);
  return rowSelect.val().trim()
}


testing();





// if(x <= 11){
//   noonCheck = 'am'
// }else{
//   noonCheck = 'pm'
// }

// if(dayjs().format(`H`) === `${x}`){
//   classCheck = 'present';
// }else if(dayjs().format(`H`) > `${x}` || x === 9){
//   classCheck = 'past'
// }else {
//   classCheck = 'future';
// }

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
