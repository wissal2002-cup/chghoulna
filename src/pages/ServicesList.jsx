import React, { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import axios from "../api/axios";
import "./ServiceList.css";

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [filters, setFilters] = useState({
    type: "Tous",
    ville: "Toutes les villes",
    categorie: "Tous les services",
    tarif: "Tous les tarifs",
  });

  // Fetch services from backend
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

  // Create filter options
  const villes = ["Toutes les villes", ...new Set(services.map(s => s.city || ""))];
  const categories = ["Tous les services", ...new Set(services.map(s => s.category || ""))];
  const tarifs = ["Tous les tarifs", ...new Set(services.map(s => s.price || ""))];

  // Apply filters
  const filteredServices = services.filter((s) => {
    return (
      (filters.type === "Tous" || s.type && s.type.toLowerCase() === filters.type.toLowerCase()) &&
      (filters.ville === "Toutes les villes" || s.city === filters.ville) &&
      (filters.categorie === "Tous les services" || s.category === filters.categorie) &&
      (filters.tarif === "Tous les tarifs" || String(s.price) === filters.tarif)
    );
  });

  return (
    <main className="services-main">
      <div className="services-container">
        <h2>Découvrez les services</h2>

        <div className="filters-container">
          <p className="filters-title">Filtrer les annonces</p>

          <div className="tabs">
            {["Tous", "Offre", "Demande"].map((type) => (
              <button
                key={type}
                className={filters.type === type ? "active" : ""}
                onClick={() => setFilters({ ...filters, type })}
              >
                {type === "Tous" ? "Tous" : type === "Offre" ? "Services proposés" : "Services demandés"}
              </button>
            ))}
          </div>

          <div className="filters-row">
            <div className="filter-group">
              <label>Ville</label>
              <select
                value={filters.ville}
                onChange={(e) => setFilters({ ...filters, ville: e.target.value })}
              >
                {villes.map((v) => (
                  <option key={v} value={v}> {v} </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Catégorie</label>
              <select
                value={filters.categorie}
                onChange={(e) => setFilters({ ...filters, categorie: e.target.value })}
              >
                {categories.map((c) => (
                  <option key={c} value={c}> {c} </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Tarif</label>
              <select
                value={filters.tarif}
                onChange={(e) => setFilters({ ...filters, tarif: e.target.value })}
              >
                {tarifs.map((t) => (
                  <option key={t} value={t}> {t} </option>
                ))}
              </select>
            </div>

            <button
              className="btn btn-primary"
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

        <div className="service-grid">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))
          ) : (
            <p className="text-center text-muted">Aucun service trouvé.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default ServicesList;
