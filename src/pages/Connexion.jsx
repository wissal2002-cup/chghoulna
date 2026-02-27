// pages/Connexion.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Connexion.css";
import api from "../api/axios";

const Connexion = () => {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", {
        email: email,
        password: motDePasse,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Connexion réussie !");
      navigate("/"); // Rediriger vers accueil ou dashboard
    } catch (err) {
      alert("Erreur de connexion");
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="connexion-container">
      <form className="connexion-form" onSubmit={handleSubmit}>
        <h2>Connexion</h2>

        <input
          type="email"
          placeholder="votre@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          required
        />


        <button type="submit">Se connecter</button>

        <p>
          Vous n'avez pas de compte ?{" "}
          <Link to="/inscription">Inscrivez-vous</Link>
        </p>
      </form>
    </div>
  );
};

export default Connexion;
