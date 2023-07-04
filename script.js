/***** DATE AND TIME *****/

// get local datetime
var datetime = new Date();
console.log(datetime);

// refresh datetime appropriately
// and change ticker location
var tickers = document.getElementsByClassName("ticker");
function refreshTime() {
    const timeDisplay = document.getElementById("time");

    // refresh page if past midnight
    var oldtime = datetime;
    datetime = new Date();
    if (oldtime.getHours() > datetime.getHours()) location.reload();

    const dateString = datetime.toLocaleString();
    const formattedString = dateString.replace(", ", " - ");
    // document.getElementById("time").textContent = formattedString;

    // format date
    var day = weekday[datetime.getDay()];
    var month = months[datetime.getMonth()];
    var date = datetime.getDate();
    var hr = datetime.getHours();
    var min = datetime.getMinutes();
    var ampm = hr < 12 ? "am" : "pm";

    // adjust for edge cases
    hr = hr % 12;
    if (hr == 0) hr = 12;
    if (min < 10) min = "0" + min;

    // display formatted date
    var fulldate = day + ", " + month + " " + date + " - " + hr + ":" + min + ampm;
    timeDisplay.innerHTML = fulldate;

    // find seconds since midnight ratio
    var midnight = new Date(
        datetime.getFullYear(),
        datetime.getMonth(),
        datetime.getDate(),
        0,0,0);
    var diff =  (datetime - midnight) / 1000;
    var ratio = diff / 86400;

    for (var i = 0; i < tickers.length; i++) {
        tickers[i].style.top = "calc(4% + " + ratio + " * 96%)";
    }
}
setInterval(refreshTime, 1000);

/***** CALENDAR FUNCTIONALITY *****/

// check whether open at that time

function isOpen(colId, hr) {
    var col = document.getElementById(colId);

    var day = datetime.getDay();  // 0 is sunday
    var lib = libHours[colId];

    if (lib[day] == "x") return false;
    else {
        return (hr >= lib[day][0] && hr < lib[day][1]);
    }
}

// populate calcols with hours
function popCalCol(colId) {
    var col = document.getElementById(colId);
    for (var i = 0; i < 24; i++) {
        // create hour div
        var hour = document.createElement("div");
        hour.classList.add("hour");
        col.appendChild(hour);

        // put 2 half-hour divs inside hour div
        var half1 = document.createElement("div");
        half1.classList.add("halfhour");
        if (isOpen(colId, i)) half1.classList.add("open");
        hour.appendChild(half1);
        var half2 = document.createElement("div");
        half2.classList.add("halfhour");
        if (isOpen(colId, i + 0.5)) half2.classList.add("open");
        hour.appendChild(half2);

        
    }
}
popCalCol("biotech");
popCalCol("fisher");
popCalCol("huntsman");
popCalCol("tangen");
popCalCol("vp");
popCalCol("pottruck");
popCalCol("acme");
popCalCol("heirloom");
popCalCol("tj");
popCalCol("hengfa");

// populate calhrs for reference
function popCalHrs(hrsId) {
    var calhrs = document.getElementById(hrsId);
    for (var i = 0; i < 25; i++) {
        var calhr = document.createElement("div");
        var hrnum = (i-1) % 12;
        if (hrnum == 0) hrnum = 12;
        var ampm = i-1 < 12 ? "am" : "pm";

        if (i != 0) calhr.innerText = hrnum + ampm;

        calhr.classList.add("calhr");

        calhrs.appendChild(calhr);
    }
}
popCalHrs("studycalhrs");
popCalHrs("snackcalhrs");

/***** TAB FUNCTIONALITY *****/

var activeTab = "studytab"
function setActiveTab(clickedTab) {
    if (clickedTab == activeTab) return;

    // switch active window
    if (clickedTab == "snacktab") {
        document.getElementById("studywindow").className = "hidden";
        document.getElementById("snackwindow").className = "window";
    }
    else {
        document.getElementById("studywindow").className = "window";
        document.getElementById("snackwindow").className = "hidden";
    }

    // switch active tab
    document.getElementById(activeTab).classList.add("inactive");
    document.getElementById(clickedTab).classList.remove("inactive");
    activeTab = clickedTab;
}