using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class WaterController : ControllerBase
    {
        private WaterDbContext _waterContext;

        public WaterController(WaterDbContext temp) => _waterContext = temp;

        [HttpGet("AllProjects")]
        public IActionResult GetProjects(int pageSize = 10, int pageNum = 1, [FromQuery] List<string>? projectType = null)
        {
            var query = _waterContext.Projects.AsQueryable();

            if (projectType != null && projectType.Any())
            {
                query = query.Where(project => projectType.Contains(project.ProjectType));
            }

            var totalNumProjects = query.Count();

            var projects = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var projectListData = new
            {
                Projects = projects,
                TotalNumProjects = totalNumProjects
            };

            return Ok(projectListData);
        }

        [HttpGet("GetProjectTypes")]
        public IActionResult GetProjectTypes()
        {
            var projectTypes = _waterContext.Projects
                .Select(project => project.ProjectType)
                .Distinct()
                .ToList();

            return Ok(projectTypes);
        }
    }
}
