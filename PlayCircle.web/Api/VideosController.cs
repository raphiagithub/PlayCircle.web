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

        #region View category

        [AllowAnonymous]
        [HttpPost]
        public async Task<IHttpActionResult> SaveViewType(ViewTypes viewtypes)
        {
            try
            {
                if (viewtypes != null)
                {
                    using (PlayCircleDBContext context = new PlayCircleDBContext())
                    {
                        context.ViewType.Add(viewtypes);
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
        public List<ViewTypes> GetAllViewTypes()
        {
            using (PlayCircleDBContext context = new PlayCircleDBContext())
            {
                return context.ViewType.OrderBy(e => e.view_order).ToList();
            }
        }

        #endregion
    }
}