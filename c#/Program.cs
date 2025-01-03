using System;
using System.IO;
using System.Collections.Generic;
using System.Globalization;

namespace CommandLineCalendar
{


    class Program
    {
        static List<Event> events = new List<Event>();

        static void Main(string[] args)
        {
            int year, month, option;

            do
            {
                Console.WriteLine("...........................................");
                Console.WriteLine("CURRENT MONTH: ");
                displayMonth(DateTime.Now.Year, DateTime.Now.Month);

                //SELECT OPTION
                Console.WriteLine("...........................................");
                Console.WriteLine("1.View Month 2.Add Task 3.View Task 4.Exit");
                option = Convert.ToInt32(Console.ReadLine());

                //IF ELSE FOR OPTIONS SELECT
                if (option == 1)
                {
                    Console.WriteLine("Input year: ");
                    year = Convert.ToInt32(Console.ReadLine());
                    Console.WriteLine("Input month: ");
                    month = Convert.ToInt32(Console.ReadLine());

                    displayMonth(year, month);
                }
                else if (option == 2)
                {
                    addEvent();
                }
                else if (option == 3)
                {
                    viewTasks();
                }
                
            }
            while (option != 4);
        }

        //FUNCTION FOR ADDING EVENTS
        static void addEvent()
        {
            Console.WriteLine("Input event day: ");
            int eventDay = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Input event month: ");
            int eventMonth = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Input event year: ");
            int eventYear = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Input event description: ");
            string eventDesc = Console.ReadLine();

            Event newEvent = new Event();
            newEvent.setEventDay(eventDay);
            newEvent.setEventMonth(eventMonth);
            newEvent.setEventYear(eventYear);
            newEvent.setEventDesc(eventDesc);

            events.Add(newEvent);
            Console.WriteLine($"Event added: {newEvent}");

            File.AppendAllText("tekst.txt", newEvent.ToString() + Environment.NewLine);
        }

        
        //FUNCTION FOR VIEWING TASKS
        static void viewTasks()
        {
            Console.WriteLine("Your tasks:");
            
            for (int i = 0; i < events.Count; i++)
            {
                Event ev = events[i];
                Console.WriteLine(ev);
            }
        }


        //FUNCTION FOR DISPLAYING MONTHS
        static void displayMonth(int year, int month)
        {
            DateTime firstDayOfMonth = new DateTime(year, month, 1);
            int daysInMonth = DateTime.DaysInMonth(year, month);

            Console.WriteLine( firstDayOfMonth.ToString("MMMM yyyy", CultureInfo.InvariantCulture));
            Console.WriteLine("Mon Tue Wed Thu Fri Sat Sun");

            int currentDayOfWeek = (int)firstDayOfMonth.DayOfWeek;
            int dayOffset = currentDayOfWeek == 0 ? 6 : currentDayOfWeek - 1;

            for (int i = 0; i < dayOffset; i++)
            {
                Console.Write("    ");
            }

            for (int day = 1; day <= daysInMonth; day++)
            {
                Console.Write($"{day,3} ");
                if ((day + dayOffset) % 7 == 0)
                {
                    Console.WriteLine();
                }
            }

            Console.WriteLine();
        }
    }



    public class Event
    {
        private int eventDay, eventMonth, eventYear;
        private string eventDesc;

        public Event() { }

        public Event(int eventDay, int eventMonth, int eventYear, string eventDesc)
        {
            this.eventDay = eventDay;
            this.eventMonth = eventMonth;
            this.eventYear = eventYear;
            this.eventDesc = eventDesc;
        }

        //SETTERS
        public void setEventDay(int eventDay)
        {
            this.eventDay = eventDay;
        }

        public void setEventMonth(int eventMonth)
        {
            this.eventMonth = eventMonth;
        }

        public void setEventYear(int eventYear)
        {
            this.eventYear = eventYear;
        }

        public void setEventDesc(string eventDesc)
        {
            this.eventDesc = eventDesc;
        }

        //GETTERS
        public int getEventDay()
        {
            return eventDay;
        }

        public int getEventMonth()
        {
            return eventMonth;
        }

        public int getEventYear()
        {
            return eventYear;
        }

        public string getEventDesc()
        {
            return eventDesc;
        }

        public override string ToString()
        {
            return $"{eventDay} {eventMonth} {eventYear} {eventDesc}";
            
        }
    }
}
