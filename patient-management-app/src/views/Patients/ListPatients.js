import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

class ListPatients extends React.Component {
  state = {
    listPatients: [],
    searchData: "",
  };

  async componentDidMount() {
    let res = await axios.get(
      "https://localhost:7028/api/Patient/GetAllPatients"
    );
    console.log(">>>> Check res: ", res.data);
    this.setState({
      listPatients: res && res.data ? res.data : [],
    });
  }

  formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString();
  };

  handleDeletePatient = async (patientId) => {
    const conf = window.confirm(
      "Are you sure you want to delete this patient?"
    );
    if (!conf) return;

    let res = await axios
      .put(`https://localhost:7028/api/Patient/DeletePatient/${patientId}`)
      .catch((error) => {
        console.log(">>>> Check error: ", error);
        return;
      });
    console.log(">>>> Check res: ", res);

    toast.success("Patient deleted successfully");

    this.componentDidMount();
  };

  handleSearch = (e) => {
    this.setState({ searchData: e.target.value });
  };

  render() {
    let { listPatients, searchData } = this.state;
    const columns = [
      "Patient ID",
      "First Name",
      "Last Name",
      "Gender",
      "Date of Birth",
      "Status",
      "Inactive Reason",
      "Line Address 1",
      "Line Address 2",
      "City",
      "Email address",
      "Phone number",
      "Actions",
    ];

    return (
      <div className="container mt-5 fs-5">
        <div className="text-end mb-3">
          <Link to="/create" className="btn btn-primary">
            Add +
          </Link>
        </div>
        <form class="form-inline">
          <input
            class="form-control mr-sm- mb-3"
            type="search"
            placeholder="Search First name or Last name or Date of birth or Email address or Phone number"
            aria-label="Search"
            onChange={(e) => this.handleSearch(e)}
          />
        </form>
        <div className="table-responsive">
          <table className="table table-sm table-striped table-hover table-bordered">
            <caption className="text-uppercase">List of patients</caption>
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {listPatients
                .filter((patient) => {
                  return searchData.toLowerCase() === ""
                    ? patient
                    : patient.firstName
                        .toLowerCase()
                        .includes(searchData.toLowerCase()) ||
                        patient.lastName
                          .toLowerCase()
                          .includes(searchData.toLowerCase()) ||
                        this.formatDate(patient.dateOfBirth).includes(
                          searchData
                        ) ||
                        patient.contacts[0].emailAddress
                          .toLowerCase()
                          .includes(searchData.toLowerCase()) ||
                        patient.contacts[0].phoneNumber
                          .toLowerCase()
                          .includes(searchData);
                })
                .map((patient, index) => (
                  <tr key={index}>
                    <td>{patient.patientId}</td>
                    <td>{patient.firstName}</td>
                    <td>{patient.lastName}</td>
                    <td>{patient.gender ? "Male" : "Female"}</td>
                    <td>{this.formatDate(patient.dateOfBirth)}</td>
                    <td>{patient.isActived ? "Active" : "Inactive"}</td>
                    <td>{patient.inActiveReason}</td>
                    <td>{patient.addresses[0].addressLine1}</td>
                    <td>{patient.addresses[0].addressLine2}</td>
                    <td>{patient.addresses[0].city}</td>
                    <td>{patient.contacts[0].emailAddress}</td>
                    <td>{patient.contacts[0].phoneNumber}</td>
                    <td>
                      <Link
                        to={`/details/${patient.patientId}`}
                        className="btn btn-sm btn-success"
                      >
                        Details
                      </Link>
                      <button
                        className="btn btn-sm ms-1 btn-danger"
                        onClick={() =>
                          this.handleDeletePatient(patient.patientId)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withRouter(ListPatients);
