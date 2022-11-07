using System.ComponentModel.DataAnnotations;

namespace ALT_Security_SPA.Models.Identity
{
    public class LoginModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
