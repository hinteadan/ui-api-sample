using Bogus;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace UiApiSample.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BogusController : ControllerBase
    {
        #region Construct
        static readonly Random random = new Random();
        static readonly Faker faker = new Faker();
        static BogusController()
        {
            Randomizer.Seed = new Random(random.Next(int.MaxValue));
        }
        #endregion

        [HttpGet]
        public string[] Get()
        {
            return
                Enumerable
                .Range(0, random.Next(10, 100))
                .Select(index => faker.Name.FullName())
                .ToArray();
        }
    }
}
