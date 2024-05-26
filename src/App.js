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

function UpdateMember({ currentValues, data, setData }) {
  const [id, username, email, mobile] = [...currentValues];
  const handleName = (e) => {
    const name = e.target.value;
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, username: name } : item
    );
    setData(updatedData);
  };

  const handleEmail = (e) => {
    const email = e.target.value;
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, email: email } : item
    );
    setData(updatedData);
  };

  const handleMobile = (e) => {
    const mobile = e.target.value;
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, mobile: mobile } : item
    );
    setData(updatedData);
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleName}
        />
      </td>
      <td>
        <input
          type="text"
          name="email"
          className="ms-2"
          value={email}
          onChange={handleEmail}
        />
      </td>
      <td>
        <input
          type="text"
          name="mobile"
          className="ms-2"
          value={mobile}
          onChange={handleMobile}
        />
      </td>
      <td>
        <button type="submit" className="ms-2 btn btn-warning">
          Update
        </button>
        <button type="button" className="ms-2 btn btn-info">
          Cancel
        </button>
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formElements = event.target.elements;
    const username = formElements.username.value;
    const email = formElements.email.value;
    const mobile = formElements.mobile.value;

    const updatedData = data.map((item) =>
      item.id === editStatus
        ? { ...item, username: username, email: email, mobile: mobile }
        : item
    );
    setEditStatus(-1);
    setData(updatedData);
  };
  return (
    <div className="container">
      <div className="d-flex vh-100 justify-content-center align-items-center">
        <div>
          <AddMember setData={setData} />
          <form onSubmit={handleSubmit}>
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
                      currentValues={[
                        item.id,
                        item.username,
                        item.email,
                        item.mobile,
                      ]}
                      data={data}
                      setData={setData}
                    />
                  ) : (
                    <tr key={item.id}>
                      <td>{item.username}</td>

                      <td>{item.email}</td>

                      <td>{item.mobile}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={(e) => handleEditStatus(item.id)}
                        >
                          Edit
                        </button>
                        <button type="button" className="btn btn-danger ms-2">
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
