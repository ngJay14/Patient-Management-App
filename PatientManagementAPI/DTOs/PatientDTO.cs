using System.Runtime.Serialization;

namespace PatientManagementAPI.DTOs
{
    public record struct PatientDto(string FirstName,
        string LastName,
        bool Gender,
        DateTime DateOfBirth,
        bool IsActived,
        string InactiveReason,
        List<ContactCreateDto> Contacts,
        List<AddressCreateDto> Addresses);
}
