import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

class CreatePatient extends React.Component {
  state = {
    // General inform
    firstName: "",
    lastName: "",
    gender: true,
    dateOfBirth: "",
    isActived: true,
    inactiveReason: "",
    // Address
    addresses: [],
    // Contact
    contacts: [],
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state);

    await axios
      .post("https://localhost:7028/api/Patient/AddPatient", this.state)
      .then((res) => {
        console.log(">>>> Check res: ", res);
        this.setState({
          // General inform
          firstName: "",
          lastName: "",
          gender: true,
          dateOfBirth: "",
          isActived: true,
          inactiveReason: "",
          // Address
          addresses: [],
          // Contact
          contacts: [],
        });
      })
      .catch((error) => {
        console.log(">>>> Check error: ", error);
        return;
      });

    toast.success("Patient created successfully");
  };

  render() {
    var data = {
      firstName: "",
      lastName: "",
      gender: true,
      dateOfBirth: "",
      isActived: true,
      inactiveReason: "",
      addresses: [
        {
          isPrimary: true,
          addressLine1: "",
          addressLine2: "",
          city: "",
        },
        {
          isPrimary: false,
          addressLine1: "",
          addressLine2: "",
          city: "",
        },
      ],
      contacts: [
        {
          emailAddress: "",
          phoneNumber: "",
        },
      ],
    };

    return (
      <div className="d-flex w-100 vh-1000 mt-5 justify-content-center align-items-center fs-5">
        <div className="w-50 border bg-light p-5">
          <h1 class="text-center">Create Patient</h1>
          <form id="form">
            <hr />
            <label>General information</label>
            <hr />
            <div class="row">
              <div class="col">
                <label>First name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="First name"
                  onChange={(e) => {
                    data.firstName = e.target.value;
                  }}
                />
              </div>
              <div class="col">
                <label>Last name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Last name"
                  onChange={(e) => {
                    data.lastName = e.target.value;
                  }}
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label>Gender</label>
                <br />
                <input
                  type="radio"
                  value={true}
                  name="gender"
                  onChange={(e) => {
                    data.gender = Boolean(e.target.value);
                  }}
                />
                &nbsp;
                <label>Male</label>
                &emsp;
                <input
                  type="radio"
                  value={false}
                  name="gender"
                  onChange={(e) => {
                    data.gender = Boolean(e.target.value);
                  }}
                />
                &nbsp;
                <label>Female</label>
              </div>
              <div class="col">
                <label>Date of birth</label>
                <input
                  type="date"
                  class="form-control"
                  placeholder="Date of birth"
                  onChange={(e) => {
                    data.dateOfBirth = e.target.value;
                  }}
                />
              </div>
            </div>
            <br />
            <hr />
            <label>Primary Address</label>
            <hr />
            <div class="row">
              <div class="col">
                <label>Address line 1</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Address line 1"
                  onChange={(e) => {
                    data.addresses[0].addressLine1 = e.target.value;
                  }}
                />
              </div>
              <div class="col">
                <label>Address line 2</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Address line 2"
                  onChange={(e) => {
                    data.addresses[0].addressLine2 = e.target.value;
                  }}
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label>City</label>
                <br />
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={(e) => {
                    data.addresses[0].city = e.target.value;
                  }}
                >
                  <option selected>--- Select a city ---</option>
                  <option value="Ho Chi Minh">Ho Chi Minh</option>
                  <option value="Ha Noi">Ha Noi</option>
                  <option value="Da Nang">Da Nang</option>
                </select>
              </div>
            </div>
            <br />
            <hr />
            <label>Optional Address</label>
            <hr />
            <div class="row">
              <div class="col">
                <label>Address line 1</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Address line 1"
                  onChange={(e) => {
                    data.addresses[1].addressLine1 = e.target.value;
                  }}
                />
              </div>
              <div class="col">
                <label>Address line 2</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Address line 2"
                  onChange={(e) => {
                    data.addresses[1].addressLine2 = e.target.value;
                  }}
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label>City</label>
                <br />
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={(e) => {
                    data.addresses[1].city = e.target.value;
                  }}
                >
                  <option selected>--- Select a city ---</option>
                  <option value="Ho Chi Minh">Ho Chi Minh</option>
                  <option value="Ha Noi">Ha Noi</option>
                  <option value="Da Nang">Da Nang</option>
                </select>
              </div>
            </div>
            <br />
            <hr />
            <label>Contact information</label>
            <hr />
            <div class="row">
              <div class="col">
                <label>Email address</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Email address"
                  onChange={(e) => {
                    data.contacts[0].emailAddress = e.target.value;
                  }}
                />
              </div>
              <div class="col">
                <label>Phone number</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Phone number"
                  onChange={(e) => {
                    data.contacts[0].phoneNumber = e.target.value;
                  }}
                />
              </div>
            </div>
          </form>
          <button
            className="btn btn-primary mt-3"
            type="button"
            onClick={(e) =>
              this.setState(
                {
                  firstName: data.firstName,
                  lastName: data.lastName,
                  gender: data.gender,
                  dateOfBirth: data.dateOfBirth,
                  addresses: data.addresses,
                  contacts: data.contacts,
                },
                () => {
                  this.handleSubmit(e);
                }
              )
            }
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default CreatePatient;
