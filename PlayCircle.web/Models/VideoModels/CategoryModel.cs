namespace PlayCircle.web.Models.VideoModels
{
    public partial class VIDEOCATEGORY
    {
        public int id { get; set; }
        public string category { get; set; }
        public string description { get; set; }
        public int view_order { get; set; }
        public int isdeleted { get; set; }
    }
}