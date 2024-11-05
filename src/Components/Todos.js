import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Todos.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Modal, Button, Form } from "react-bootstrap";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTodo, setNewTodo] = useState({ title: "", completed: false });
  const [editingTodo, setEditingTodo] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, [todos]);

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://remaining-bella-tahreem-990bcb8d.koyeb.app/todos", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const createTodo = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://remaining-bella-tahreem-990bcb8d.koyeb.app/todos",
        newTodo,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos((prevTodos) => [...prevTodos, response.data]);
      setNewTodo({ title: "", completed: false });
      setShowCreateModal(false);
      alert("Todo created successfully!");
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const editTodo = async (event, todoId) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`https://remaining-bella-tahreem-990bcb8d.koyeb.app/todos/${todoId}`, editingTodo, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });
      const updatedTodos = todos.map((todo) =>
        todo._id === todoId ? { ...editingTodo } : todo
      );
      setTodos(updatedTodos);
      setEditingTodo(null);
      setShowEditModal(false);
      alert("Todo updated successfully!");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://remaining-bella-tahreem-990bcb8d.koyeb.app/todos/${todoId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setTodos(todos.filter((todo) => todo._id !== todoId));
      alert("Todo deleted!");
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <h1 className="mt-4">Todos</h1>
        <div id="todo-container">
          <Button
            className="btn btn-primary mb-4"
            style={{ backgroundColor: "#06042c" }}
            onClick={() => setShowCreateModal(true)}
          >
            Add New Todo
          </Button>

          <Modal
            show={showCreateModal}
            onHide={() => setShowCreateModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Create New Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={createTodo}>
                <Form.Group>
                  <Form.Label>Todo Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={newTodo.title}
                    onChange={(e) =>
                      setNewTodo({ ...newTodo, title: e.target.value })
                    }
                    placeholder="Enter todo title"
                    required
                  />
                </Form.Group>
                <Form.Group className="mt-3">
                  <Form.Check
                    type="checkbox"
                    label="Completed"
                    checked={newTodo.completed}
                    onChange={(e) =>
                      setNewTodo({ ...newTodo, completed: e.target.checked })
                    }
                  />
                </Form.Group>
                <Button
                  type="submit"
                  style={{ backgroundColor: "#06042c", color: "white" }}
                  className="mt-4"
                >
                  Create Todo
                </Button>
              </Form>
            </Modal.Body>
          </Modal>

          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <React.Fragment key={todo._id}>
                  <tr>
                    <td>{todo.title}</td>
                    <td>{todo.completed ? "Completed" : "Pending"}</td>
                    <td>
                      <Button
                        className="edit-btn"
                        style={{
                          backgroundColor: "transparent",
                          color: "navy",
                          border: "transparent",
                        }}
                        onClick={() => {
                          setEditingTodo(todo);
                          setShowEditModal(true);
                        }}
                      >
                        <i
                          className="fas fa-edit"
                          style={{ fontSize: "large" }}
                        ></i>
                      </Button>
                      <Button
                        className="delete-btn"
                        style={{
                          backgroundColor: "transparent",
                          color: "#e30d0d",
                          border: "transparent",
                        }}
                        onClick={() => deleteTodo(todo._id)}
                      >
                        <i
                          className="fas fa-trash"
                          style={{ fontSize: "large" }}
                        ></i>
                      </Button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>

          <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {editingTodo && (
                <Form onSubmit={(event) => editTodo(event, editingTodo._id)}>
                  <Form.Group>
                    <Form.Label>Todo Title</Form.Label>
                    <Form.Control
                      type="text"
                      value={editingTodo.title}
                      onChange={(e) =>
                        setEditingTodo({
                          ...editingTodo,
                          title: e.target.value,
                        })
                      }
                      placeholder="Enter todo title"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mt-3">
                    <Form.Check
                      type="checkbox"
                      label="Completed"
                      checked={editingTodo.completed}
                      onChange={(e) =>
                        setEditingTodo({
                          ...editingTodo,
                          completed: e.target.checked,
                        })
                      }
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    className="mt-4"
                    style={{ backgroundColor: "#06042c", color: "white" }}
                  >
                    Update
                  </Button>
                </Form>
              )}
            </Modal.Body>
          </Modal>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Todos;
