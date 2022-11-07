using System.ComponentModel.DataAnnotations;

namespace ALT_Security_SPA.Models
{
    public class File
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Url { get; set; }

        public byte[] Data { get; set; }

        public string UserName { get; set; }
    }
}
