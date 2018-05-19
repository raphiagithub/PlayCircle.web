using System;

namespace PlayCircle.web.Models.VideoModels
{
    public class ViewTypes
    {
        public int id { get; set; }
        public string type { get; set; }
        public string description { get; set; }
        public Nullable<int> view_order { get; set; }
    }
}