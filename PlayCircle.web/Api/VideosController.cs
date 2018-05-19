using PlayCircle.web.Models.VideoModels;
using Portal.PlayCircle.DataEntity.DBContext;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace PlayCircle.web.Api
{
    public class VideosController : ApiController
    {
        #region Category

        [AllowAnonymous]
        [HttpPost]
        public async Task<IHttpActionResult> SaveCategory(VIDEOCATEGORY videocategory)
        {
            try
            {
                if (videocategory != null)
                {
                    using (PlayCircleDBContext context = new PlayCircleDBContext())
                    {
                        context.Category.Add(videocategory);
                        await context.SaveChangesAsync();
                    }
                    return Ok();
                }
                else
                {
                    return BadRequest("Please fill all values");
                }

            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.InnerException.ToString());
            }
        }


        [AllowAnonymous]
        [HttpGet]
        public List<VIDEOCATEGORY> GetAllCategories()
        {
            using (PlayCircleDBContext context = new PlayCircleDBContext())
            {
                return context.Category.OrderBy(e => e.view_order).ToList<VIDEOCATEGORY>();
            }
        }

        #endregion
    }
}