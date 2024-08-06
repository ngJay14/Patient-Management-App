using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Net;

namespace PatientManagementAPI.Model
{
    public class PatientEntity
    {
        [Key]
        public int PatientId { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public bool Gender { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public bool IsActived { get; set; } = true;
        [AllowNull]
        public string InactiveReason { get; set; }

        public List<ContactEntity> Contacts { get; set; }
        public List<AddressEntity> Addresses { get; set; }
    }
}
