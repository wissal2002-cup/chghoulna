import React, { useState, useEffect } from "react";
import api from "../api/axios";

const EditProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: user?.name || "",
    prenom: user?.prenom || "",
    phone: user?.phone || "",
    email: user?.email || "",
    city: user?.city || "",
    bio: user?.bio || "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    if (!form.name || !form.prenom || !form.email) {
    alert("Veuillez remplir tous les champs obligatoires.");
    return;
  }

  data.append("name", form.name);
  data.append("prenom", form.prenom);
  data.append("email", form.email);
  data.append("phone", form.phone || "");
  data.append("city", form.city || "");
  data.append("bio", form.bio || "");

  if (form.photo) {
    data.append("photo", form.photo);
  }

    try {
      const res = await api.post(`/users/${user.id}?_method=PUT`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Profil mis à jour !");
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      if (err.response?.status === 422) {
  console.error("Validation errors:", err.response.data.errors);
  alert("Erreur de validation. Vérifie les champs.");
} else {
  alert("Erreur mise à jour");
  console.error(err);
}
    }
  };


  return (
    <div className="container my-5">
      <h2>Modifier mon profil</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm" style={{ maxWidth: 600 }}>
        <input type="text" name="prenom" value={form.prenom} onChange={handleChange} placeholder="Prénom" className="form-control mb-2" required />
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Nom" className="form-control mb-2" required />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="form-control mb-2"/>
        <input type="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="000000" className="form-control mb-2" />

        <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="Ville" className="form-control mb-2" />
        <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="À propos de moi" className="form-control mb-2" />
        <input type="file" name="photo" accept="image/*" onChange={handleChange} className="form-control mb-3" />
        <button className="btn btn-primary w-100" type="submit">Sauvegarder</button>
      </form>
    </div>
  );
};

export default EditProfile;
