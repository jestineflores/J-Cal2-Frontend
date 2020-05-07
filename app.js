n = new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
d = n.getDate();

document.getElementById("date").innerHTML = m + "/" + d + "/" + y;

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

const handleSubmitClicked = (payload) => {
    console.log("Handle Submit Clicked");
    console.log(payload);
    postData('http://localhost:3000/events', payload)
        .then(response => {
            alert("Event Created");
            showCalendar();
        });
}

const displayEventForm = (month, year, startDay) => {

        let eventInputWithLabel = renderInputWithLabel("Event Name");
        let locationInputWithLabel = renderInputWithLabel("Event Location");
        let startTimeInputWithLabel = renderInputWithLabel("Start", { "type": "time" });
        let endTimeInputWithLabel = renderInputWithLabel("End", { "type": "time" });
        let submit = renderButtonWithCallback("Submit", () => {
                    console.log("Button Clicked")
                    let name = eventInputWithLabel.input;
                    let location = locationInputWithLabel.input;
                    let startInput = startTimeInputWithLabel.input;
                    let endInput = endTimeInputWithLabel.input;
                    let nameVal = name.value;
                    let locationVal = location.value;
                    let startVal = startInput.value;
                    let endVal = endInput.value;
                    if (!validateFormParams(nameVal, locationVal, startVal, endVal)) return;
                    startTime = `${year}-${month}-${startDay > 9 ? startDay : `0${startDay}`} ${startVal}`;
    endTime = `${year}-${month}-${startDay > 9 ? startDay : `0${startDay}`} ${endVal}`;
    let payload = {month, year, startDay, nameVal, locationVal, startTime, endTime}; 
    // TODO: IMPLEMENT THIS
    // MAKE SURE YEAR MONTH DAY are correct
    console.log("payload");
    // console.log(payload);
    handleSubmitClicked(payload);
    // TODO: COMMENT BACK IN
    // handleSubmitClicked({start_time: "2020-05-06 14:22", end_time: "2020-05-06 14:22", event: "First Event", location: "Denver", calendar_id: 1})
  });

  let exit = renderButtonWithCallback("Back", () => {
    hideEventForm();
  });

  let buttonsDiv = document.createElement("div");
  buttonsDiv.setAttribute("class", "event-form-buttons");
  buttonsDiv.appendChild(submit);
  buttonsDiv.appendChild(exit);

  let div = document.createElement("div");
  div.setAttribute("class", "new-event-form");
  div.appendChild(eventInputWithLabel.div);
  div.appendChild(locationInputWithLabel.div);
  div.appendChild(startTimeInputWithLabel.div);
  div.appendChild(endTimeInputWithLabel.div);
  div.appendChild(buttonsDiv);

  document.body.appendChild(div);
}

const validateFormParams = (nameVal, locationVal, startVal, endVal) => {
  console.log(nameVal);
  console.log(locationVal);
  console.log(startVal);
  console.log(endVal);
  if (nameVal == "" || nameVal == null
    || locationVal == "" || locationVal == null
    || startVal == "" || startVal == null
    || endVal == "" || endVal == null) {
      console.log(nameVal, locationVal, startVal, endVal);
    return false;
  }
  return true;
}

const renderInputWithLabel = (label, inputAttributes = {}, labelAttributes) => {
  const div = document.createElement("div");
  div.setAttribute("class", "input-with-label");
  let input = setAttributes(document.createElement("input"), inputAttributes);
  let span = setAttributes(document.createElement("span"), labelAttributes);
  span.innerHTML = label;
  div.appendChild(span);
  div.appendChild(input);
  return {div, input};
}

const setAttributes = (element, attributes = {}) => {
  const keys = Object.keys(attributes);
  keys.forEach(key => {
    element.setAttribute(key, attributes[key]);
    }
  );
  return element;
}

const renderButtonWithCallback = (label, callback) => {
  let btn = document.createElement("button");
  btn.value = label;
  btn.onclick = callback;
  return btn;
}


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let cell = document.createElement("td");
                let cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth) {
                break;
            } else {
                let cell = document.createElement("td");
                cell.onclick = () => displayEventForm(date);
                let cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}

// Example POST method implementation:
async function postData(url = '', data) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    // mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}