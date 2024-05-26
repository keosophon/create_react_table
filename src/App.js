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
      <button className="ms-2 btn btn-success">Add +</button>
    </form>
  );
}

function UpdateMember({ currentValues }) {
  const [username, email, mobile] = [...currentValues];
  return (
    <tr>
      <td>
        <input type="text" name="username" value={username} />
      </td>
      <td>
        <input type="text" name="email" className="ms-2" value={email} />
      </td>
      <td>
        <input type="text" name="mobile" className="ms-2" value={mobile} />
      </td>
      <td>
        <button className="ms-2 btn btn-primary">Update</button>
        <button className="ms-2 btn btn-danger">Delete</button>
      </td>
    </tr>
  );
}

function App() {
  const [data, setData] = useState(Data);
  const [editStatus, setEditStatus] = useState(-1);

  const handleEditStatus = (id) => {
    setEditStatus(id);
  };

  return (
    <div className="container">
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <div>
          <AddMember setData={setData} />
          <table className="table table-bordered table-striped mt-3 text-center">
            <thead className="thead-dark">
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) =>
                item.id === editStatus ? (
                  <UpdateMember
                    currentValues={[item.username, item.email, item.mobile]}
                  />
                ) : (
                  <tr key={item.id}>
                    <td>{item.username}</td>

                    <td>{item.email}</td>

                    <td>{item.mobile}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={(e) => handleEditStatus(item.id)}
                      >
                        Edit
                      </button>
                      <button className="btn btn-danger ms-2">Delete</button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
