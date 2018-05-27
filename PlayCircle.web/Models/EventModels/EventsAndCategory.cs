using PlayCircle.web.Models.VideoModels;
using System.Collections.Generic;

namespace PlayCircle.web.Models.EventModels
{
    public class EventsAndCategory
    {
        public List<Event> Events { get; set; }
        public List<VIDEOCATEGORY> Category { get; set; }
    }
}