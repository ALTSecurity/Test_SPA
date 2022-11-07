using System.ComponentModel.DataAnnotations;

namespace ALT_Security_SPA.Models.Identity
{
    public class RegisterModel
    {
        [Required]
        [MaxLength(255)]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
