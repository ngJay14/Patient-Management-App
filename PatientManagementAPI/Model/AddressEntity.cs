using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PatientManagementAPI.Model
{
    public class AddressEntity
    {
        [Key]
        public int AddressId { get; set; }
        [Required]
        public bool IsPrimary { get; set; }
        [Required]
        public string AddressLine1 { get; set; }
        [Required]
        public string AddressLine2 { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public int PatientId { get; set; }
        [JsonIgnore]
        public PatientEntity Patient { get; set; }
    }
}
