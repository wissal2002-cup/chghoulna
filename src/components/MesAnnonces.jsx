// pages/MesServices.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const MesServices = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchMyServices = async () => {
      try {
        const res = await api.get("/services");
        const filtered = res.data.filter(s => s.user_id === user.id);
        setServices(filtered);
      } catch (err) {
        console.error("Erreur chargement:", err);
      }
    };
    fetchMyServices();
  }, [user.id]);

  const handleDelete = async (id) => {
    if (!window.confirm("Confirmer la suppression ?")) return;
    try {
      await api.delete(`/services/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setServices((prev) => prev.filter((s) => s.id !== id));
      alert("Annonce supprimée !");
    } catch (err) {
      alert("Erreur suppression.");
    }
  };

  return (
    <div className="container my-5">
      <h2>Mes annonces</h2>
      {services.length === 0 ? (
        <p>Aucune annonce publiée.</p>
      ) : (
        services.map((s) => (
          <div key={s.id} className="card p-3 mb-3 shadow-sm">
            <h5>{s.title}</h5>
            <div className="text-muted">{s.category} - {s.city}</div>
            <p>{s.description}</p>
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-primary"
                onClick={() => navigate(`/modifier-service/${s.id}`)}
              >
                Modifier
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => handleDelete(s.id)}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MesServices;
