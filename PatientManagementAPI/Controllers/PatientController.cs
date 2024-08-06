using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PatientManagementAPI.Data;
using PatientManagementAPI.DTOs;
using PatientManagementAPI.Model;
using System.Globalization;
using System.Reflection.PortableExecutable;

namespace PatientManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly ILogger<PatientController> _logger;


        public PatientController(ApplicationDbContext context, ILogger<PatientController> logger)
        {
            _db = context;
            _logger = logger;
        }

        [HttpGet("GetAllPatients")]
        public async Task<ActionResult<PatientEntity>> GetAllPatients()
        {
            _logger.LogInformation("Fetching All Patients");
            var patients = await _db.Patient
                .Include(p => p.Contacts)
                .Include(p => p.Addresses)
                .Where(p => p.IsActived == true)
                .ToListAsync();


            if (patients == null || patients.Count <= 0)
            {
                return NotFound();
            }

            return Ok(patients);
        }

        [HttpGet("GetAllPatientsForAdmin")]
        public async Task<ActionResult<PatientEntity>> GetAllPatientsForAdmin()
        {
            _logger.LogInformation("Fetching All Patients For Admin");
            var patients = await _db.Patient
                .Include(p => p.Contacts)
                .Include(p => p.Addresses)
                .ToListAsync();


            if (patients == null || patients.Count <= 0)
            {
                return NotFound();
            }

            return Ok(patients);
        }

        [HttpGet("GetPatientById/{patientId}")]
        public async Task<ActionResult<PatientEntity>> GetPatientById(int patientId)
        {
            if (patientId == 0)
            {
                _logger.LogError("Patient Id was not passed");
                return BadRequest();
            }

            _logger.LogInformation("Fetching Patient By Id");
            var patient = await _db.Patient
                .Include(p => p.Contacts)
                .Include(p => p.Addresses)
                .FirstOrDefaultAsync(p => p.PatientId == patientId && p.IsActived == true);


            if (patient == null)
            {
                return NotFound();
            }

            return Ok(patient);
        }

        [HttpPost("AddPatient")]
        public async Task<ActionResult<List<PatientEntity>>> CreatePatient(PatientDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            // Create Patient details
            var newPatient = new PatientEntity
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Gender = request.Gender,
                DateOfBirth = request.DateOfBirth,
                IsActived = request.IsActived,
                InactiveReason = request.InactiveReason
            };

            // Create Contact details
            var contacts = request.Contacts.Select(c => new ContactEntity
            {
                EmailAddress = c.EmailAddress,
                PhoneNumber = c.PhoneNumber,
            }).ToList();

            // Create Address details
            var addresses = request.Addresses.Select(a => new AddressEntity
            {
                IsPrimary = a.IsPrimary,
                AddressLine1 = a.AddressLine1,
                AddressLine2 = a.AddressLine2,
                City = a.City,
            }).ToList();

            newPatient.Contacts = contacts;
            newPatient.Addresses = addresses;

            // Add and save Patient into database
            _db.Patient.Add(newPatient);
            await _db.SaveChangesAsync();

            return Ok(await _db.Patient.Include(p => p.Contacts).Include(p => p.Addresses).ToListAsync());

        }

        [HttpPut("UpdatePatient/{patientId}")]
        public async Task<ActionResult<List<PatientEntity>>> UpdatePatient(int patientId, PatientDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            // Create Patient details
            var patient = _db.Patient.Include(p => p.Contacts).Include(p => p.Addresses).FirstOrDefault(p => p.PatientId == patientId);

            if (patient == null)
            {
                return NotFound();
            }

            // Update general informations
            patient.FirstName = request.FirstName;
            patient.LastName = request.LastName;
            patient.Gender = request.Gender;
            patient.DateOfBirth = request.DateOfBirth;
            patient.IsActived = request.IsActived;
            patient.InactiveReason = request.InactiveReason;

            // Update contacts informations
            int i = 0;
            if (request.Contacts.Count >= patient.Contacts.Count)
            {
                while (true)
                {
                    if (i == request.Contacts.Count)
                        break;

                    if (i > patient.Contacts.Count - 1)
                    {
                        ContactEntity newContact = new ContactEntity();

                        newContact.EmailAddress = request.Contacts[i].EmailAddress;
                        newContact.PhoneNumber = request.Contacts[i].PhoneNumber;
                        newContact.PatientId = patientId;

                        _db.Contact.Add(newContact);
                    }
                    else
                    {
                        var oldContact = _db.Contact.Find(patient.Contacts[i].ContactId);
                        if (oldContact != null)
                        {
                            oldContact.EmailAddress = request.Contacts[i].EmailAddress;
                            oldContact.PhoneNumber = request.Contacts[i].PhoneNumber;
                        }
                    }

                    i++;
                }
            }
            else
            {
                while (true)
                {
                    if (i == patient.Contacts.Count)
                        break;

                    if (i > request.Contacts.Count - 1)
                    {
                        ContactEntity oldContact = patient.Contacts[i];

                        _db.Contact.Remove(oldContact);
                    }
                    else
                    {
                        var oldContact = _db.Contact.Find(patient.Contacts[i].ContactId);

                        if (oldContact != null)
                        {
                            oldContact.EmailAddress = request.Contacts[i].EmailAddress;
                            oldContact.PhoneNumber = request.Contacts[i].PhoneNumber;
                        }
                    }

                    i++;
                }
            }
            

            // Update addresses information
            int y = 0;
            foreach (var address in patient.Addresses)
            {
                var oldAddress = _db.Address.Find(address.AddressId);
                if (oldAddress != null)
                {
                    oldAddress.AddressLine1 = request.Addresses[y].AddressLine1;
                    oldAddress.AddressLine2 = request.Addresses[y].AddressLine2;
                    oldAddress.City = request.Addresses[y].City; ;
                }

                y++;
            }

            await _db.SaveChangesAsync();

            return Ok(await _db.Patient.Include(p => p.Contacts).Include(p => p.Addresses).ToListAsync());

        }

        [HttpPut("DeletePatient/{patientId}")]
        public async Task<ActionResult> DeletePatient(int patientId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            // Create Patient details
            var patient = _db.Patient.FirstOrDefault(x => x.PatientId == patientId);

            if (patient == null)
            {
                return NotFound();
            }

            // Update status os patient
            patient.IsActived = false;
            patient.InactiveReason = "Deleted";

            await _db.SaveChangesAsync();

            return Ok();

        }
    }
}
