import logo from "./logo.svg";
import "./App.css";
import Data from "./data.json";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function AddMember({ setData }) {
  const handleAddMember = (event) => {
    event.preventDefault();
    const formElements = event.target.elements;
    setData((prevData) =>
      prevData.concat({
        id: prevData.length + 1,
        username: formElements.username.value,
        email: formElements.email.value,
        mobile: formElements.mobile.value,
      })
    );
  };
  return (
    <form onSubmit={handleAddMember}>
      <input type="text" name="username" placeholder="enter usernamer" />
      <input
        type="text"
        name="email"
        placeholder="enter email"
        className="ms-2"
      />
      <input
        type="text"
        name="mobile"
        placeholder="enter mobile number"
        className="ms-2"
      />
      <button className="ms-2">Add</button>
    </form>
  );
}

function App() {
  const [data, setData] = useState(Data);
  return (
    <div className="container">
      <div>
        <AddMember setData={setData} />
      </div>
      <div className="mt-3">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Mobile</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.username}</td>

                <td>{item.email}</td>

                <td>{item.mobile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
