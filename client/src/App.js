import { useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post("http://localhost:3002/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
      console.log("success");
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3002/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateWage = (id) => {
    Axios.put("http://localhost:3002/update", { wage: newWage, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newWage,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3002/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="header">
        <div className="title">
          <h1>EmployeeDB.com</h1>
        </div>
      </div>
      <div className="page">
        <div className="create-new">
          <h2>Add a New Employee</h2>
          <label>Name: </label>
          <input
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <br />
          <label>Age: </label>
          <input
            type="number"
            onChange={(event) => {
              setAge(event.target.value);
            }}
          />
          <br />
          <label>Country: </label>
          <input
            type="text"
            onChange={(event) => {
              setCountry(event.target.value);
            }}
          />
          <br />
          <label>Position: </label>
          <input
            type="text"
            onChange={(event) => {
              setPosition(event.target.value);
            }}
          />
          <br />
          <label>Wage (year): </label>
          <input
            type="text"
            onChange={(event) => {
              setWage(event.target.value);
            }}
          />
          <br />
          <button onClick={addEmployee}>Add Employee</button>
        </div>
        <hr />
        <div className="employees">
          <button onClick={getEmployees}>Show Employees</button>

          {employeeList.map((val, key) => {
            return (
              <div className="employee">
                <div>
                  <strong>Name: </strong>
                  {val.name}
                  <br />
                  <strong>Age:</strong> {val.age}
                  <br />
                  <strong>Country: </strong>
                  {val.country}
                  <br />
                  <strong>Position: </strong>
                  {val.position}
                  <br />
                  <strong>Wage: </strong>
                  {val.wage}
                  <br />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="$2000"
                    onChange={(event) => {
                      setNewWage(event.target.value);
                    }}
                  />
                  <br />
                  <div className="btn-container">
                    <button
                      onClick={() => {
                        updateWage(val.id);
                      }}
                      className="green"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => {
                        deleteEmployee(val.id);
                      }}
                      className="red"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
