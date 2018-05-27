using System;

namespace PlayCircle.web.Models.EventModels
{
    public class Event
    {
        public int id { get; set; }
        public string event_name { get; set; }
        public string event_description { get; set; }
        public System.DateTime date_from { get; set; }
        public System.DateTime date_to { get; set; }
        public int file_count { get; set; }
        public Nullable<int> max_filesize { get; set; }
        public string categories { get; set; }
        public int winners_count { get; set; }
        public Nullable<System.DateTime> winner_announcement_date { get; set; }
        public Nullable<int> price_amount { get; set; }
        public int isdeleted { get; set; }
        public Nullable<int> participants_count { get; set; }

    }
}