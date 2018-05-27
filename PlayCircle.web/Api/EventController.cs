using PlayCircle.web.Models.EventModels;
using Portal.PlayCircle.DataEntity.DBContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace PlayCircle.web.Api
{
    public class EventController : ApiController
    {
        [HttpGet]
        public EventsAndCategory BindCategoryAndEvents()

        {
            using (PlayCircleDBContext context = new PlayCircleDBContext())
            {
                EventsAndCategory result = new EventsAndCategory()
                {
                    Category = context.Category.Where(e => e.isdeleted == 0)
                    .OrderBy(s => s.view_order).ToList(),
                    Events = null
                };
                return result;
            }
        }


        [AllowAnonymous]
        [HttpPost]
        public async Task<IHttpActionResult> CreateEvent(Event events)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                else
                {
                    using (PlayCircleDBContext context = new PlayCircleDBContext())
                    {
                        context.Event.Add(events);
                        await context.SaveChangesAsync();
                        return Ok();
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IHttpActionResult> FetchAllEvents()
        {
            try
            {
                using (PlayCircleDBContext context = new PlayCircleDBContext())
                {
                    List<Event> allevents = context.Event
                        .OrderBy(e => e.date_from)
                        .Where(s => s.isdeleted == 0)
                        .ToList<Event>();
                    var hi = new eventresult()
                    {
                        CompletedEvents = allevents
                                              .Where(e => DateTime.Parse(e.date_from.ToString()) < DateTime.Parse(DateTime.Now.ToString())).ToList(),
                        UpCommingEvents = allevents
                                              .Where(e => DateTime.Parse(e.date_from.ToString()) >= DateTime.Parse(DateTime.Now.ToString())).ToList()
                    };
                    return Ok(
                        new eventresult()
                        {
                            CompletedEvents = allevents
                                              .Where(e => DateTime.Parse(e.date_from.ToString()) < DateTime.Parse(DateTime.Now.ToString())).ToList(),
                            UpCommingEvents = allevents
                                              .Where(e => DateTime.Parse(e.date_from.ToString()) >= DateTime.Parse(DateTime.Now.ToString())).ToList()
                        });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }
        }
    }

    public class eventresult
    {
        public List<Event> UpCommingEvents { get; set; }
        public List<Event> CompletedEvents { get; set; }
    }
}
