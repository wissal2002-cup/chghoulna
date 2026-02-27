import React, { useState } from "react";
import api from "../api/axios";

const ContactezNous = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({...form, [e.target.id]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/contact", form);
      alert("Message envoyé !");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      alert("Erreur lors de l'envoi.");
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-4">Contactez-nous</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm p-4">
            <form onSubmit={handleSubmit}>
              {["name", "email", "subject"].map((field) => (
                <div className="mb-3" key={field}>
                  <label htmlFor={field} className="form-label text-capitalize">{field}</label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    className="form-control"
                    id={field}
                    placeholder={`Votre ${field}`}
                    value={form[field]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}

              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn w-100 text-white" style={{ backgroundColor: "#a855f7" }}>
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <h6 className="fw-bold">Autres façons de nous contacter</h6>
        <p><strong>Email:</strong> contact@chghoulna.ma</p>
        <p><strong>Téléphone:</strong> +212 522 123 456 </p>
        <p><strong>Adresse:</strong> Rabat, Maroc</p>
      </div>
    </div>
  );
};

export default ContactezNous;
