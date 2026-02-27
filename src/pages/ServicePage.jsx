import React, { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import axios from "../api/axios";

const Services = () => {
  const [services, setServices] = useState([]);
  const [filters, setFilters] = useState({
    type: "Tous",
    ville: "Toutes les villes",
    categorie: "Tous les services",
    tarif: "Tous les tarifs",
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("/services");
        setServices(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des services:", err);
      }
    };

    fetchServices();
  }, []);

  const villes = ["Toutes les villes", ...new Set(services.map(s => s.city || ""))];
  const categories = ["Tous les services", ...new Set(services.map(s => s.category || ""))];
  const tarifs = ["Tous les tarifs", ...new Set(services.map(s => s.price || ""))];

  const filteredServices = services.filter((s) => {
    return (
      (filters.type === "Tous" || s.type && s.type.toLowerCase() === filters.type.toLowerCase()) &&
      (filters.ville === "Toutes les villes" || s.city === filters.ville) &&
      (filters.categorie === "Tous les services" || s.category === filters.categorie) &&
      (filters.tarif === "Tous les tarifs" || String(s.price) === filters.tarif)
    );
  });

  return (
    <main className="container my-5">
      <h2 className="mb-4 text-center">Découvrez les services</h2>

      {/* Filtres */}
      <div className="bg-light p-4 rounded shadow-sm mb-5">
        <h5 className="mb-3">Filtrer les annonces</h5>

        {/* Onglets type */}
        <div className="mb-3 d-flex gap-2">
          {["Tous", "Offre", "Demande"].map((type) => (
            <button
              key={type}
              className={`btn ${filters.type === type ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setFilters({ ...filters, type })}
            >
              {type === "Tous" ? "Tous" : type === "Offre" ? "Services proposés" : "Services demandés"}
            </button>
          ))}
        </div>

        {/* Filtres ville/categorie/tarif */}
        <div className="row g-3 align-items-end">
          <div className="col-md-4">
            <label className="form-label">Ville</label>
            <select
              className="form-select"
              value={filters.ville}
              onChange={(e) => setFilters({ ...filters, ville: e.target.value })}
            >
              {villes.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Catégorie</label>
            <select
              className="form-select"
              value={filters.categorie}
              onChange={(e) => setFilters({ ...filters, categorie: e.target.value })}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <label className="form-label">Tarif</label>
            <select
              className="form-select"
              value={filters.tarif}
              onChange={(e) => setFilters({ ...filters, tarif: e.target.value })}
            >
              {tarifs.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="col-md-1 d-grid">
            <button
              className="btn btn-secondary"
              onClick={() =>
                setFilters({
                  type: "Tous",
                  ville: "Toutes les villes",
                  categorie: "Tous les services",
                  tarif: "Tous les tarifs",
                })
              }
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </div>

      {/* Résultats */}
      <div className="row">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <div key={service.id} className="col-md-4 mb-4">
              <ServiceCard key={service.id} service={service} />
            </div>
          ))
        ) : (
          <div className="text-center text-muted">Aucun service trouvé.</div>
        )}
      </div>
    </main>
  );
};

export default Services;
