// pages/Inscription.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Inscription.css";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


const Inscription = () => {
  const [formData, setFormData] = useState({
    prenom: "",
    name: "",
    email: "",
    phone: "",
    city:"",
    bio:"",
    photo:null,
    password: "",
    password_confirmation: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked,files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" 
      ? checked
      :type === "file"
      ? files[0]
      : value,
    }));
  };

 const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.password_confirmation) {
    alert("Les mots de passe ne correspondent pas.");
    return;
  }
  if (!formData.termsAccepted) {
    alert("Veuillez accepter les termes et conditions.");
    return;
  }

 try {
    const data = new FormData();
    data.append("prenom", formData.prenom);
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("city", formData.city);
    data.append("bio", formData.bio);
    data.append("photo", formData.photo); // fichier image
    data.append("password", formData.password);
    data.append("password_confirmation", formData.password_confirmation);

    const res = await api.post("/register", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    alert("Inscription réussie !");
    navigate("/");
  } catch (error) {
  if (error.response && error.response.status === 422) {
    console.error("Validation errors:", error.response.data.errors);
    alert("Erreur de validation. Vérifiez les champs.");
  } else {
    alert("Erreur lors de l'inscription");
    console.error(error);
  }
}
alert("Inscription réussie.");


};



  return (
    <div className="inscription-container">
      <form className="inscription-form" onSubmit={handleSubmit}>
        <h2>Inscription</h2>
        <div className="name-row">
          <input
            type="text"
            name="prenom"
            placeholder="Votre prénom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Votre nom"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="votre@email.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="0600000000"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
  type="text"
  name="city"
  placeholder="Ville"
  value={formData.city}
  onChange={handleChange}
/>

<textarea
  name="bio"
  placeholder="Présentez-vous en quelques lignes"
  value={formData.bio}
  onChange={handleChange}
/>

<input
  type="file"
  name="photo"
  accept="image/*"
  onChange={handleChange}
/>

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirmer le mot de passe"
          value={formData.password_confirmation}
          onChange={handleChange}
          required
        />
        <div className="checkbox-row">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            required
          />
          <label>
            J'accepte les <a href="#">termes et conditions</a>
          </label>
        </div>
        <button type="submit">S'inscrire</button>
        <p>
          Vous avez déjà un compte ? <Link to="/Connexion">Connectez-vous</Link>
        </p>
      </form>
    </div>
  );
};

export default Inscription;
