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
  // TODO: Call the back end passing in the following values
  const {month, year, startDay, nameVal, locationVal, startVal, endVal} = payload;
  console.log("submit clicked");
}

const displayEventForm = (month, year, startDay) => {

  let eventInputWithLabel = renderInputWithLabel("Event Name");
  let locationInputWithLabel = renderInputWithLabel("Event Location Name");
  let startTimeInputWithLabel = renderInputWithLabel("Start");
  let endTimeInputWithLabel = renderInputWithLabel("End");
  let submit = renderButtonWithCallback(() => {
    let name = eventInputWithLabel.input;
    let location = locationInputWithLabel.input;
    let startTime = startTimeInputWithLabel.input;
    let endTime = endTimeInputWithLabel.input;
    let nameVal = name.value();
    let locationVal = name.value();
    let startVal = name.value();
    let endVal = name.value();
    if (!validateFormParams(nameVal, locationVal, startVal, endVal)) return;
    let payload = {month, year, startDay, nameVal, locationVal, startVal, endVal};
    handleSubmitClicked(payload);
  });

  let exit = renderButtonWithCallback(() => {
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
  if (nameVal == "" || nameVal == null
    || locationVal == "" || locationVal == null
    || startVal == "" || startVal == null
    || endVal == "" || endVal == null) {
    return false;
  }
}

const renderInputWithLabel = (label) => {
  const div = document.createElement("div");
  div.setAttribute("class", "input-with-label");
  let input = document.createElement("input");
  let span = document.createElement("span");
  console.log(span);
  console.log(input);
  span.innerHTML = label;
  div.appendChild(span);
  div.appendChild(input);
  return {div, input};
}

const renderButtonWithCallback = (callback) => {
  let btn = document.createElement("button");
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
