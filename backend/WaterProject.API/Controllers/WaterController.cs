using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WaterController : ControllerBase
    {
        private WaterDbContext _waterContext;

        public WaterController(WaterDbContext temp) => _waterContext = temp;

        [HttpGet("AllProjects")]
        public IActionResult GetProjects(int pageSize = 10, int pageNum = 1)
        {
            var projects = _waterContext.Projects
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            var totalNumProjects = _waterContext.Projects.Count();

            var projectListData = new
            {
                Projects = projects,
                TotalNumProjects = totalNumProjects
            };

            return Ok(projectListData);
        }

        [HttpGet("FunctionalProjects")]
        public IEnumerable<Project> GetFunctionalProjects()
        {
            var functionalProjects = _waterContext.Projects.Where(project => project.ProjectFunctionalityStatus == "Functional").ToList();

            return functionalProjects;
        }
    }
}
