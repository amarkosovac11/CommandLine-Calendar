// Global variables
const today = new Date(); // current date
let currentYear = today.getFullYear(); // Get the full year (2024)
let currentMonth = today.getMonth(); // Get the month (0-11)
const day = today.getDate(); // Get the day of the month

// Event storage (use localStorage for persistence)
let events = JSON.parse(localStorage.getItem("events")) || [];

// Function to display today's date and format it
function displayToday() {
    const formattedDate = `${day}/${currentMonth + 1}/${currentYear}`; 
    document.getElementById("currentDate").textContent = `Today's Date: ${formattedDate}`;
}

// Function to render the calendar for the current month
function renderCurrentMonthCalendar() {
    const calendarDiv = document.getElementById("calendar");
    calendarDiv.innerHTML = ""; // Clear any previous calendar

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (const day of daysOfWeek) {
        const dayHeader = document.createElement("div");
        dayHeader.classList.add("day", "day-header");
        dayHeader.textContent = day;
        calendarDiv.appendChild(dayHeader);
    }

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Add empty cells for the days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement("div");
        emptyDiv.classList.add("day");
        calendarDiv.appendChild(emptyDiv);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day");
        dayDiv.textContent = day;

        const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const eventForDay = events.find(event => event.date === dateString);

        if (eventForDay) {
            const eventLabel = document.createElement("div");
            eventLabel.textContent = eventForDay.description;
            eventLabel.style.backgroundColor = "#ffeb3b";
            eventLabel.style.color = "#000";
            eventLabel.style.marginTop = "5px";
            eventLabel.style.padding = "3px";
            eventLabel.style.borderRadius = "3px";

            // Append the event label to the day cell
            dayDiv.appendChild(eventLabel);
        }

        calendarDiv.appendChild(dayDiv);
    }

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    document.getElementById("currentMonth").textContent = `${months[currentMonth]} ${currentYear}`;
}

// Event listeners for the Previous and Next buttons
document.getElementById("prevMonth").addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCurrentMonthCalendar();
});

document.getElementById("nextMonth").addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCurrentMonthCalendar();
});

// Add event listener for adding events
document.getElementById("add-event").addEventListener("click", () => {
    const dateInput = document.getElementById("event-date").value;
    const descriptionInput = document.getElementById("event-description").value;

    if (!dateInput || !descriptionInput) {
        alert("Please fill in both the date and event description.");
        return;
    }

    // Add event to the list and save to localStorage
    events.push({ date: dateInput, description: descriptionInput });
    localStorage.setItem("events", JSON.stringify(events));

    // Re-render the calendar and event list
    renderCurrentMonthCalendar();
    renderEventList();

    // Clear the input fields
    document.getElementById("event-date").value = "";
    document.getElementById("event-description").value = "";

    alert("Event added successfully!");
});

// Function to render the events(Your Events)
function renderEventList() {
    const eventListDiv = document.getElementById("eventItems");
    eventListDiv.innerHTML = ""; // Clear previous events

    // Loop through the events array and display them in the "Your Events" section
    events.forEach(event => {
        const eventItem = document.createElement("li");
        
        // Display date in day/month/year format under "Your Events"
        const formattedEventDate = event.date.split("-").reverse().join("/");  // Format: dd/mm/yyyy
        eventItem.textContent = `${formattedEventDate}: ${event.description}`;

        // Create delete button for each event
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.backgroundColor = "#ff4d4d"; // Red background
        deleteButton.style.color = "#fff"; // White text
        deleteButton.style.border = "none";
        deleteButton.style.padding = "3px 5px";
        deleteButton.style.borderRadius = "5px";
        deleteButton.style.cursor = "pointer";
        deleteButton.style.marginLeft = "10px"; // Space between text and button

        // Event listener for delete button
        deleteButton.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this event?")) {
                // Remove the event from the array
                events = events.filter(e => e.date !== event.date || e.description !== event.description);

                // Save the updated events array to localStorage
                localStorage.setItem("events", JSON.stringify(events));

                // Re-render the event list and the calendar
                renderEventList();
                renderCurrentMonthCalendar();
            }
        });

        // Append the delete button to the event item
        eventItem.appendChild(deleteButton);

        // Append the event item to the list
        eventListDiv.appendChild(eventItem);
    });
}

// Call the functions to display today's date, the calendar, and the event list
displayToday();
renderCurrentMonthCalendar();
renderEventList();
