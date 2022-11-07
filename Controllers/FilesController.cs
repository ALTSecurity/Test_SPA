using System;
using System.Linq;
using System.Text;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ALT_Security_SPA.Models;
using ALT_Security_SPA.Models.Identity;

namespace ALT_Security_SPA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly ApplicationContext _dbContext;

        public FilesController(IHttpContextAccessor contextAccessor,
                               ApplicationContext dbContext)
        {
            _contextAccessor = contextAccessor;
            _dbContext = dbContext;
        }

        [HttpGet("get_by_id")]
        public ActionResult GetFileById(int id)
        {
            try
            {
                return Ok(_dbContext.Files.FirstOrDefault(x => x.Id == id));
            }
            catch(Exception ex)
            {
                return BadRequest(new { Exception = ex.InnerException });
            }
        }

        [HttpGet("get_by_data")]
        public ActionResult GetFileByData(byte[] data)
        {
            try
            {
                return Ok(_dbContext.Files.FirstOrDefault(x => Encoding.UTF8.GetString(x.Data) == Encoding.UTF8.GetString(data)));
            }
            catch (Exception ex)
            {
                return BadRequest(new { Exception = ex.InnerException });
            }
        }
        [HttpPost("create_file")]
        public ActionResult CreateFile(File file)
        {
            try
            {
                string userName = _contextAccessor.HttpContext.User.FindFirst(ClaimTypes.Name).Value;
                file.UserName = userName;

                _dbContext.Files.Add(file);
                bool success = _dbContext.SaveChanges() > 0;

                return Ok(success);
            }
            catch(Exception ex)
            {
                return BadRequest(new { Exception = ex.InnerException });
            }
        }
        [HttpPost("update_file")]
        public ActionResult UpdateFile(File file)
        {
            try
            {
                _dbContext.Files.Update(file);
                bool success = _dbContext.SaveChanges() > 0;

                return Ok(success);
            }
            catch(Exception ex)
            {
                return BadRequest(new { Exception = ex.InnerException });
            }
        }

        [HttpPost("delete_file")]
        public ActionResult DeleteFile(File file)
        {
            try
            {
                _dbContext.Files.Remove(file);
                bool success = _dbContext.SaveChanges() > 0;

                return Ok(success);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Exception = ex.InnerException });
            }
        }
    }
}
