import os
import json
from datetime import datetime, timedelta

class Event:
    def __init__(self, event_day=None, event_month=None, event_year=None, event_desc=None):
        self.event_day = event_day
        self.event_month = event_month
        self.event_year = event_year
        self.event_desc = event_desc

    def to_dict(self):
        return {
            "event_day": self.event_day,
            "event_month": self.event_month,
            "event_year": self.event_year,
            "event_desc": self.event_desc
        }

    @staticmethod
    def from_dict(data):
        return Event(
            event_day=data["event_day"],
            event_month=data["event_month"],
            event_year=data["event_year"],
            event_desc=data["event_desc"]
        )

    def __str__(self):
        return f"{self.event_day} {self.event_month} {self.event_year} {self.event_desc}"

class CommandLineCalendar:
    def __init__(self):
        self.events = []
        self.load_events()

    def load_events(self):
        if os.path.exists("events.json"):
            with open("events.json", "r") as file:
                events_data = json.load(file)
                self.events = [Event.from_dict(event) for event in events_data]

    def save_events(self):
        with open("events.json", "w") as file:
            json.dump([event.to_dict() for event in self.events], file, indent=4)

    def display_month(self, year, month):
        first_day_of_month = datetime(year, month, 1)
        days_in_month = (first_day_of_month + timedelta(days=31)).replace(day=1) - first_day_of_month

        print(first_day_of_month.strftime("%B %Y"))
        print("Mon Tue Wed Thu Fri Sat Sun")

        day_offset = (first_day_of_month.weekday() + 1) % 7
        print("    " * day_offset, end="")

        for day in range(1, days_in_month.days + 1):
            print(f"{day:3} ", end="")
            if (day + day_offset) % 7 == 0:
                print()
        print()

    def add_event(self):
        event_day = int(input("Input event day: "))
        event_month = int(input("Input event month: "))
        event_year = int(input("Input event year: "))
        event_desc = input("Input event description: ")

        new_event = Event(event_day, event_month, event_year, event_desc)
        self.events.append(new_event)
        self.save_events()

        print(f"Event added: {new_event}")

    def view_tasks(self):
        print("Your tasks:")
        for event in self.events:
            print(event)

    def delete_task(self):
        delete_day = int(input("Input event day to delete: "))
        delete_month = int(input("Input event month to delete: "))
        delete_year = int(input("Input event year to delete: "))

        for event in self.events:
            if (event.event_day == delete_day and
                event.event_month == delete_month and
                event.event_year == delete_year):
                print(f"Deleting event: {event.event_desc}")
                self.events.remove(event)
                self.save_events()
                break

    def run(self):
        while True:
            print("...........................................")
            print("CURRENT MONTH: ")
            self.display_month(datetime.now().year, datetime.now().month)

            print("...........................................")
            print("1. View Month  2. Add Task  3. View Tasks  4. Delete Task  5. Exit")
            try:
                option = int(input("Select an option: "))
            except ValueError:
                print("Invalid input. Please enter a number.")
                continue

            if option == 1:
                year = int(input("Input year: "))
                month = int(input("Input month: "))
                self.display_month(year, month)
            elif option == 2:
                self.add_event()
            elif option == 3:
                self.view_tasks()
            elif option == 4:
                self.delete_task()
            elif option == 5:
                print("Exiting. Goodbye!")
                break
            else:
                print("Invalid option. Try again.")

if __name__ == "__main__":
    calendar = CommandLineCalendar()
    calendar.run()
