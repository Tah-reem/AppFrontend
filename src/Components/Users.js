import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "./Users.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", phone: "" });
  const [editUserId, setEditUserId] = useState(null);
  const [editUser, setEditUser] = useState({ name: "", email: "", phone: "" });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [users]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://remaining-bella-tahreem-990bcb8d.koyeb.app/users", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleCreateUser = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://remaining-bella-tahreem-990bcb8d.koyeb.app/users",
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers((prevUsers) => [...prevUsers, response.data]);
      setNewUser({ name: "", email: "", phone: "" });
      setShowCreateModal(false);
      alert("New user created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleEditUser = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`https://remaining-bella-tahreem-990bcb8d.koyeb.app/users/${editUserId}`, editUser, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      setUsers(
        users.map((user) =>
          user._id === editUserId ? { ...user, ...editUser } : user
        )
      );
      setEditUserId(null);
      setEditUser({ name: "", email: "", phone: "" });
      setShowEditModal(false);
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://remaining-bella-tahreem-990bcb8d.koyeb.app/users/${userId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== userId));
      alert("User Deleted");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid users-container">
        <h1 className="mt-4">Users</h1>

        <Button
          variant="primary"
          className="mb-4"
          onClick={() => setShowCreateModal(true)}
          style={{ backgroundColor: "#06042c" }}
        >
          Add New User
        </Button>

        <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Create New User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleCreateUser}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPhone" className="mt-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter phone number"
                  value={newUser.phone}
                  onChange={(e) =>
                    setNewUser({ ...newUser, phone: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Button
                type="submit"
                style={{ backgroundColor: "#06042c", color: "white" }}
                className="mt-4"
              >
                Create User
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <div id="user-container">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone No.</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <React.Fragment key={user._id}>
                  <tr>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <button
                        className="btn btn-info"
                        style={{
                          backgroundColor: "transparent",
                          color: "navy",
                          border: "transparent",
                        }}
                        onClick={() => {
                          setEditUserId(user._id);
                          setEditUser({
                            name: user.name,
                            email: user.email,
                            phone: user.phone,
                          });
                          setShowEditModal(true);
                        }}
                      >
                        <i
                          className="fa-solid fa-pen-to-square"
                          style={{ fontSize: "large" }}
                        ></i>
                      </button>

                      <button
                        className="btn btn-danger"
                        style={{
                          backgroundColor: "transparent",
                          color: "#e30d0d",
                          border: "transparent",
                        }}
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        <i
                          className="fa-solid fa-trash"
                          style={{ fontSize: "large" }}
                        ></i>
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditUser}>
              <Form.Group controlId="editName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editUser.name}
                  onChange={(e) =>
                    setEditUser({ ...editUser, name: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group controlId="editEmail" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={editUser.email}
                  onChange={(e) =>
                    setEditUser({ ...editUser, email: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group controlId="editPhone" className="mt-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  value={editUser.phone}
                  onChange={(e) =>
                    setEditUser({ ...editUser, phone: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Button
                type="submit"
                style={{ backgroundColor: "#06042c", color: "white" }}
                className="mt-4"
              >
                Update User
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
      <Footer />
    </div>
  );
};

export default Users;
