namespace PatientManagementAPI.DTOs
{
    public record struct ContactCreateDto(
        string EmailAddress,
        string PhoneNumber);
}
