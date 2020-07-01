

// ************** variables for countdown
let startingMin = 25;
let totalSec = startingMin * 60;
let counting;
let clicked;
let add5count;
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const minutesInput = document.getElementById('minutesInput');
const addButton = document.getElementById('addButton');
const subButton = document.getElementById('subButton');
pauseButton.style.display = 'none';


// ************** variables for to do list
const addItemInput = document.getElementById('addItemInput');
const addItemButton = document.getElementById('addItemButton');
const removeItemButton = document.getElementById('removeItemButton');
const listItems = document.getElementsByTagName('li');
const divList = document.querySelector('.divList');
const listUl = document.querySelector('ul');
const listUlChildren = listUl.children;


/******************************* COUNTDOWN CODE **********************************/
/******************************* COUNTDOWN CODE **********************************/
/******************************* COUNTDOWN CODE **********************************/


//starts counting down and avoids double starting which could accelerate the counting
startButton.addEventListener('click', event => {
    if (clicked === 1) {} else {
    counting = setInterval(updateCountDown, 1000);
    clicked = 1;
    startButton.style.display = 'none';
    pauseButton.style.display = 'inline';
}});

//pauses countdown and set start button to clickable again
pauseButton.addEventListener('click', event => {
    clearInterval(counting);
    clicked = 0;
    pauseButton.style.display = 'none';
    startButton.style.display = 'inline';

});

//resets the counter to any number of minutes provided by user on the input field or just reset to 25minutes as standard and set start button to clickable again
resetButton.addEventListener('click', event => {
   //if (minutesInput.value === "") {totalSec= 25 * 60} else {totalSec= minutesInput.value * 60};
   totalSec= 25 * 60 
   printCountDown();
    clicked = 0;
    pauseButton.style.display = 'none';
    startButton.style.display = 'inline';
});

//adds 1 minute everytime that is clicked
addButton.addEventListener('click', event => {
    totalSec = totalSec + 60; 
    printCountDown();
    clicked = 0;
    pauseButton.style.display = 'none';
    startButton.style.display = 'inline';
});

//subtracts 1 minute everytime that is clicked
subButton.addEventListener('click', event => {
    totalSec = totalSec - 60; 
    printCountDown();
    clicked = 0;
    pauseButton.style.display = 'none';
    startButton.style.display = 'inline';
});

// the logic of the countdown full cycle. cycle is 25min (or minutes set up by user), when reaches 0sec than auto restarts a 5minutes countdown, when reaches 0sec than asks user if want a new cycle or not. initial cycle triggered by start button.
function updateCountDown () {
    const minRemaining = Math.floor(totalSec/60);
    let secR = totalSec % 60;
    if (secR > 10) {secR = secR} else {secR = `0` + secR};
    minutesElement.innerHTML = `${minRemaining}`;
    secondsElement.innerHTML = `${secR}`;
    totalSec--;
    if (minRemaining<0) { /* when counts to zero, or add 5 or reset to 25 */
        if (add5count>0) {
            totalSec=25*60;
            printCountDown();
            let nextCycle = confirm("Well done! This cycle is over. Ready to one more?");
            if (nextCycle === true) {counting = setInterval(updateCountDown, 1000);} {clicked = 0};
            return;
        } else { add5min() }
    }
};
// function to automatically triggers 5min countdown relax. no warning about this 5min break for the user here*/
function add5min ()   {
    clearInterval(counting);
    totalSec= 0.1 * 60;
    printCountDown();
    clicked = 1;
    add5count = 1;
    counting = setInterval(updateCountDown, 1000);
};

/* prints the updated count down time used by the reset button after input from user*/
function printCountDown () {
    clearInterval(counting);
    const minRemaining = Math.floor(totalSec/60);
    let secR = totalSec % 60
    if (secR > 10) {secR = secR} else {secR = `0` + secR};
    minutesElement.innerHTML = `${minRemaining}`;
    secondsElement.innerHTML = `${secR}`;
};


/******************************* TO DO LIST CODE **********************************/
/******************************* TO DO LIST CODE **********************************/
/******************************* TO DO LIST CODE **********************************/


//adds a new task on the list
addItemButton.addEventListener('click', () => {

    if (addItemInput.value == "") {
        alert(`you should insert a task before adding it`) //avoids adding tasks in blank
    } else {
    let ul = document.getElementsByTagName('ul')[0]; // FIRST SELECT THE PARENT ELEMENT. if there were 2 ul, and you wanted to select the second, should choose [1] second
    let li = document.createElement('li'); //  actually create the new element
    li.classList = "form-control form-control-sm task";
    li.textContent = addItemInput.value; // give it the value you want. in this case an users input
    ul.appendChild(li); // appending the new element as a child of the selected parent actually adds (displays on screen) the new alement
    ul.insertBefore(li, ul.firstChild)
    addItemInput.value = ""; // this is just to erase the input text field after the element is added
    attachButtonsToListItems(li);
    }
});

//adds tasks clicking enter
addItemInput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("addItemButton").click();
  }
});

//adds to every tasks that already exists on the page the three buttons up, down and remove
for (let i = 0; i < listUlChildren.length; i += 1) {
    attachButtonsToListItems(listUlChildren[i]);
}

//adds to every new task added to the page the three buttons up, down and remove
function attachButtonsToListItems(li) {

    
    //adds remove button
    let remove = document.createElement('Button');
    remove.className = 'remove';
    li.appendChild(remove);
   
     //adds down button
     let down = document.createElement('Button');
     down.className = 'down';
     li.appendChild(down);
   
    //adds up button
    let up = document.createElement('Button');
    up.className = 'up';
    li.appendChild(up);

    //adds checkbox
    let checkbox = document.createElement('input');
    checkbox.className = "checkbox"
    checkbox.type = 'checkbox';
    checkbox.value = '';
    li.appendChild(checkbox);
};


//when checkbox checked task changes 
listUl.addEventListener('click', (event) => {
    if (event.target.tagName == 'INPUT') {
        if (event.target.checked == true) {
            event.target.parentNode.id = "checked";
            task = event.target.parentNode;
            ul = task.parentNode;
            last = ul.lastChild;
            ul.insertBefore(task, last.nextElementSibling);
        } else {
            event.target.parentNode.id = "notchecked";
        }
}
});


//when clicked buttons up down and remove the tasks respond to that
listUl.addEventListener('click', (event) => {
    if (event.target.tagName == 'BUTTON') {
        if (event.target.className == 'remove') {
            let li = event.target.parentNode;
            let ul = li.parentNode;
            ul.removeChild(li);
        }
        if (event.target.className == 'up') {
            let li = event.target.parentNode;
            let prevLi = li.previousElementSibling;
            let ul = li.parentNode;
            if (prevLi) {
                ul.insertBefore(li, prevLi);
            }
        }
        if (event.target.className == 'down') {
            let li = event.target.parentNode;
            let nextLi = li.nextElementSibling;
            let ul = li.parentNode;
            if (nextLi) {
                ul.insertBefore(nextLi, li);
            }
    }
    }
});


/*

//hoover

//mouseover show 
listUl.addEventListener('mouseover', (event) => {
    if (event.target.tagName !== 'BUTTON') {
   buttons = event.target.getElementsByTagName('button');
   for (let i = 0; i < buttons.length; i++) {
       let button = buttons[i];
       button.id = "show";
   } 
   buttons = event.target.getElementsByTagName('input');
   for (let i = 0; i < buttons.length; i++) {
       let button = buttons[i];
       button.id = "show";
   } 
    }
});    


//mouseout hide
listUl.addEventListener('mouseout', (event) => {
    if (event.target.tagName !== 'BUTTON') {

    setTimeout (function () {
    buttons = event.target.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        button.id = "hide"; 
        
    }}, 450);
     

    setTimeout (function () {
    buttons = event.target.getElementsByTagName('input');
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
         button.id = "hide"; 
    
    }}, 450)  
}
});

*/
