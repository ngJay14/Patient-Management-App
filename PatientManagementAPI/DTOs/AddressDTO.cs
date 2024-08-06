namespace PatientManagementAPI.DTOs
{
    public record struct AddressCreateDto(bool IsPrimary,
        string AddressLine1,
        string AddressLine2,
        string City);
}
