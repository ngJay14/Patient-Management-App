using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PatientManagementAPI.Model
{
    public class ContactEntity
    {
        [Key]
        public int ContactId { get; set; }
        [Required]
        public string EmailAddress { get; set; }
        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public int PatientId { get; set; }
        [JsonIgnore]
        public PatientEntity Patient { get; set; }
    }
}
