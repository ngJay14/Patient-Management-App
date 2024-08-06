import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function formatDate(date) {
  const selectedDate = new Date(date);
  const formattedDate = selectedDate.toISOString().split("T")[0];
  return formattedDate;
}

function PatientDetails() {
  const { patientId } = useParams();
  const [data, setData] = useState({});
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`https://localhost:7028/api/Patient/GetPatientById/${patientId}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [patientId]);

  function handleDeletePatient(e, patientId) {
    e.preventDefault();
    const conf = window.confirm(
      "Are you sure you want to delete this patient?"
    );
    if (!conf) return;

    axios
      .put(`https://localhost:7028/api/Patient/DeletePatient/${patientId}`)
      .then((res) => {
        console.log(">>>> Check res: ", res);
        history.push("/");
      })
      .catch((error) => {
        console.log(">>>> Check error: ", error);
        return;
      });

    toast.success("Patient deleted successfully");
  }

  function hadleSubmit(e) {
    e.preventDefault();
    console.log("Check update data: ", data);
    axios
      .put(
        `https://localhost:7028/api/Patient/UpdatePatient/${patientId}`,
        data
      )
      .then((res) => {
        toast.success("Patient updated successfully");
        history.push("/");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container-fluid mt-5 mb-5">
      <h1 className="text-center">data Details</h1>
      <br />
      <form className="form fs-5">
        <div className="row">
          <div className="col-md-6">
            <hr />
            <p className="text-center">General information</p>
            <hr />
            <div className="row">
              <div className="col">
                <label>First name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  value={data && data.firstName ? data.firstName : ""}
                  onChange={(e) =>
                    setData({ ...data, firstName: e.target.value })
                  }
                />
              </div>
              <div className="col">
                <label>Last name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  value={data && data.lastName ? data.lastName : ""}
                  onChange={(e) =>
                    setData({ ...data, lastName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label>Gender</label>
                <br />
                <input
                  type="radio"
                  value={true}
                  name="gender"
                  checked={data.gender === true}
                  onChange={(e) =>
                    setData({ ...data, gender: Boolean(e.target.value) })
                  }
                />
                &nbsp;
                <label>Male</label>
                &emsp;
                <input
                  type="radio"
                  value={false}
                  name="gender"
                  // checked={data.gender === false}
                  onChange={(e) =>
                    setData({ ...data, gender: Boolean(e.target.value) })
                  }
                />
                &nbsp;
                <label>Female</label>
              </div>
              <div className="col">
                <label>Date of birth</label>
                <input
                  type="date"
                  className="form-control"
                  value={
                    data && data.dateOfBirth ? formatDate(data.dateOfBirth) : ""
                  }
                  onChange={(e) =>
                    setData({ ...data, dateOfBirth: e.target.value })
                  }
                />
              </div>
            </div>
            <br /> <br /> <br />
            <hr />
            <p className="text-center">Contact information</p>
            <hr />
            <div className="text-end">
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  let newContact = {
                    emailAddress: "",
                    phoneNumber: "",
                  };
                  setData({
                    ...data,
                    contacts: [...data.contacts, newContact],
                  });
                }}
              >
                Add +
              </button>
            </div>
            {/* List contacts */}
            {data &&
              data.contacts &&
              data.contacts.length > 0 &&
              data.contacts.map((contact, index) => {
                return (
                  <div key={index}>
                    <hr />
                    <label>{"Contact " + (index + 1)}</label>
                    <hr />
                    <div className="row">
                      <div className="row">
                        <div className="col">
                          <label>Email address</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Email address"
                            value={contact ? contact.emailAddress : ""}
                            onChange={(e) => {
                              contact.emailAddress = e.target.value;
                              setData({
                                ...data,
                                contacts: data.contacts,
                              });
                              console.log(data);
                            }}
                          />
                        </div>
                        <div className="col">
                          <label>Phone number</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Phone number"
                            value={contact ? contact.phoneNumber : ""}
                            onChange={(e) => {
                              contact.phoneNumber = e.target.value;
                              setData({
                                ...data,
                                contacts: data.contacts,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="col-md-6">
            <hr />
            <p className="text-center">Address information</p>
            {/* List addresses */}
            {data.addresses &&
              data.addresses.length > 0 &&
              data.addresses.map((address, index) => {
                return (
                  <div key={index}>
                    <hr />
                    <label>
                      {index === 0 ? "Primary Address" : "Optional Address"}
                    </label>
                    <hr />
                    <div className="row">
                      <div className="row">
                        <div className="col">
                          <label>Address line 1</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Address line 1"
                            value={address ? address.addressLine1 : ""}
                            onChange={(e) => {
                              address.addressLine1 = e.target.value;
                              setData({
                                ...data,
                                addresses: data.addresses,
                              });
                            }}
                          />
                        </div>
                        <div className="col">
                          <label>Address line 2</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Address line 2"
                            value={address ? address.addressLine2 : ""}
                            onChange={(e) => {
                              address.addressLine2 = e.target.value;
                              setData({
                                ...data,
                                addresses: data.addresses,
                              });
                            }}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <label>City</label>
                          <br />
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            value={address ? address.city : ""}
                            onChange={(e) => {
                              address.city = e.target.value;
                              setData({
                                ...data,
                                addresses: data.addresses,
                              });
                            }}
                          >
                            <option selected>--- Select a city ---</option>
                            <option value="Ho Chi Minh">Ho Chi Minh</option>
                            <option value="Ha Noi">Ha Noi</option>
                            <option value="Da Nang">Da Nang</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <hr />
      </form>
      <button
        className="btn btn-primary mt-3"
        type="button"
        onClick={hadleSubmit}
      >
        Submit
      </button>
      &nbsp;&nbsp;
      <button
        className="btn btn-danger mt-3"
        type="button"
        onClick={(e) => handleDeletePatient(e, patientId)}
      >
        Delete
      </button>
    </div>
  );
}

export default PatientDetails;
