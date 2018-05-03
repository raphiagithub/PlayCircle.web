using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;

namespace Portal.PlayCircle.DataEntity.EntityModels
{
    public class APPLICATIONs
    {
        public int id { get; set; }
        public string applciation_name { get; set; }
        public string description { get; set; }

    }
}