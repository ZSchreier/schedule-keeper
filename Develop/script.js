

// Here are the global variables used throughout the various functions

const scheduleArea = $('.container-lg');

const infoStorage = JSON.parse(localStorage.getItem('scheduleInfo')) || ['','','','','','','','',''];


let currentTime = dayjs();
let testCurrent = dayjs('2023-10-12 22:01');


// This is the main function that fires off when the webpage loads and dynamically creates the rows with the info inside them
function initialize(){
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

// This function is used to determine the class (background color) of the rows if the current hour is in the PM
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

// Like above, this function determines the class of the row if the current hour is in the morning AM
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

// This function is a "timer" that shows the current time at the top of the page
function displayDay(){
  setInterval(function() {
    $('#currentDay').text(`${dayjs().format('dddd MMM D, H:mm:ss a')}`);
  }, 1000);
}

// This is an event listener that listens for a click on the button in a row, which triggers some checks before saving the textarea value to localStorage for use when the webpage loads again
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

// A small helper function that's called in the above function, determines the value of the associated textarea element and kicks it back to the function above
function rowFinder(number){
  let rowSelect = $(`.text-${number}`);
  return rowSelect.val().trim()
}


initialize();