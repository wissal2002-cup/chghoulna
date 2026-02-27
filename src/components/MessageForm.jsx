// src/components/MessageForm.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const MessageForm = () => {
  const { receiverId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    content: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendMessage = async (e) => {
    e.preventDefault(); // ⚠️ IMPORTANT
    try {
      await api.post(
        "/messages",
        {
          receiver_id: receiverId,
          content: `De: ${form.name} (${form.email})\n\n${form.content}`,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Message envoyé !");
      navigate(`/profile/${receiverId}`);
    } catch (err) {
      console.error("Erreur d’envoi", err);
      alert("Erreur lors de l’envoi du message.");
    }
  };

  return (
    <div className="container my-5">
      <h2>Contacter l'utilisateur</h2>
      <form
        onSubmit={sendMessage}
        className="card p-4 shadow-sm"
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        <div className="mb-3">
          <label>Votre nom</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Votre email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Message</label>
          <textarea
            name="content"
            rows="5"
            className="form-control"
            value={form.content}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary">Envoyer</button>
      </form>
    </div>
  );
};

export default MessageForm;
