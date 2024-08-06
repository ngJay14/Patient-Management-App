import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./Nav/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ListPatients from "./Patients/ListPatients";
import CreatePatient from "./Patients/CreatePatient";
import PatientDetails from "./Patients/PatientDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Nav />
          <Switch>
            <Route path="/" exact>
              <ListPatients />
            </Route>
            <Route path="/create">
              <CreatePatient />
            </Route>
            <Route path="/details/:patientId">
              <PatientDetails />
            </Route>
            <Route path="/user" exact></Route>
            <Route path="/user/:id"></Route>
          </Switch>
        </header>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;
