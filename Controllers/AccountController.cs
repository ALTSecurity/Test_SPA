using System;
using System.Linq;
using System.Text;
using System.Threading;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using ALT_Security_SPA.Models.Identity;

namespace ALT_Security_SPA.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _config;

        public AccountController(UserManager<ApplicationUser> userManager,
                                 IConfiguration config)
        {
            _userManager = userManager;
            _config = config;
        }


        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] LoginModel model, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var user = _userManager.FindByNameAsync(model.Email).Result;
            if (user != null && _userManager.CheckPasswordAsync(user, model.Password).Result)
            {
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                var userRoles = _userManager.GetRolesAsync(user).Result;

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                string token = GenerateToken(authClaims, out DateTime expires);
                if (!string.IsNullOrEmpty(token))
                {
                    return Ok(new { Token = token, ExpiredAt = expires });
                }
            }
           
            return Unauthorized();
        }

        [HttpPost]
        [Route("register")]
        public IActionResult Register([FromBody] RegisterModel model, CancellationToken cancellationToken)
        {
           
            cancellationToken.ThrowIfCancellationRequested();

            var userExists = _userManager.FindByNameAsync(model.Email).Result;
            if (userExists != null)
            {
                return BadRequest("User already exists");
            }

            ApplicationUser user = new ApplicationUser()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Email
            };

            var result = _userManager.CreateAsync(user, model.Password).Result;
            if (!result.Succeeded)
            { 
                var errors = new List<KeyValuePair<string, string[]>>();

                foreach (var error in result.Errors)
                {
                    errors.Add(new KeyValuePair<string, string[]>(error.Code, new string[] { error.Description }));
                }

                return StatusCode(StatusCodes.Status500InternalServerError, new { Errors = errors });
            }

            return Ok();
        }
        private string GenerateToken(List<Claim> claims, out DateTime expires)
        {
            string token = string.Empty;
            expires = DateTime.MinValue;

            if (claims != null && claims.Count() > 0)
            {
                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AuthToken")["Secret"]));
                expires = DateTime.Now.AddDays(1);

                JwtSecurityToken jwt = new JwtSecurityToken(
                    issuer: _config.GetSection("AuthToken")["Issuer"],
                    audience: _config.GetSection("AuthToken")["Audience"],
                    expires: expires,
                    claims: claims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));

                var jwtHandler = new JwtSecurityTokenHandler();
                token = jwtHandler.WriteToken(jwt);
            }

            return token;
        }
    }
}
