import React ,{useEffect,useState}from "react";
import api from "../api/axios";
import { useNavigate,useParams } from "react-router-dom";

const CreerAnnonce = () => {

  const { id }=useParams();  // if id exists, it's edit mode
  const navigate = useNavigate();

   
  const [form, setForm] = useState({
    type: "Demande", // ou Offre
    title: "",
    category: "",
    city: "",
    price: "",
    description: "",
  });
 useEffect(() => {
  if (id) {
    const fetchService = async () => {
      try {
        const res = await api.get(`/services/${id}`);
        const data = res.data;

        setForm({
          type: data.type,
          title: data.title,
          category: data.category,
          city: data.city,
          price: data.price,
          description: data.description,
        });
      } catch (error) {
        console.error("Erreur de chargement du service :", error);
        alert("Erreur lors du chargement du service.");
      }
    };

    fetchService();
  }
}, [id]);



 

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleRadio = (e) => {
    setForm({ ...form, type: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (id) {
      // Modifier
      await api.put(`/services/${id}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
         
        },
        
      });
      alert("Annonce modifiée !");
    } else {
      // Créer
      await api.post("/services", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Annonce publiée !");
    }

    navigate("/services");
  } catch (error) {
    console.error(error);
    alert("Erreur lors de la soumission.");
  }
};
console.log("Token envoyé :", localStorage.getItem("token"));

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-4">Créer une annonce</h2>

      <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: "600px" }}>
        <h5 className="fw-bold mb-3 text-center">Publier une annonce</h5>

        <form onSubmit={handleSubmit}>
          {/* Type d'annonce */}
          <div className="mb-3">
            <label className="form-label">Type d'annonce</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  name="typeAnnonce"
                  value="Demande"
                  checked={form.type === "Demande"}
                  onChange={handleRadio}
                />
                <label className="form-check-label" htmlFor="chercheService">
                  Je cherche une personne pour un service
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  name="typeAnnonce"
                  value="Offre"
                  checked={form.type ==="Offre"}
                  onChange={handleRadio}
                />
                <label className="form-check-label" htmlFor="proposeService">
                  Je propose mes services
                </label>
              </div>
            </div>
          </div>

          {/* Titre de l'annonce */}
          <div className="mb-3">
            <label htmlFor="titre" className="form-label">Titre de l'annonce</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Ex: Recherche aide-ménagère - 50dh/h"
              required
            />
          </div>

          {/* Catégorie, Ville, Tarif */}
          <div className="row mb-3">
            <div className="col-md-4 mb-2 mb-md-0">
              <label htmlFor="category" className="form-label">Catégorie</label>
              <select className="form-select" id="category" value={form.category} onChange={handleChange}>
                <option value="">Sélectionner</option>
                <option>Ménage</option>
                <option>Aide scolaire</option>
                <option>Relecture / Traduction</option>
                <option>Garde d'enfants</option>
                <option>Cuisine maison</option>
                <option>autres</option>
              </select>
            </div>
            <div className="col-md-4 mb-2 mb-md-0">
              <label htmlFor="city" className="form-label">Ville</label>
              <select className="form-select" id="city" value={form.city} onChange={handleChange}>
                <option value="">Sélectionner</option>
                <option>Rabat</option>
                <option>Casablanca</option>
                <option>Marrakech</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="price" className="form-label">Tarif (dh/heure)</label>
              <input
                type="number"
                className="form-control"
                id="price"
                value={form.price}
                onChange={handleChange}
               required
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              value={form.description}
              onChange={handleChange}
              placeholder="Décrivez le service dont vous avez besoin, la fréquence, le quartier, etc."
              required
            ></textarea>
          </div>

          {/* Bouton Publier */}
          <button
            type="submit"
            className="btn w-100 text-white"
            style={{ backgroundColor: "#a855f7" }}
          >
            {id ? "Modifier mon annonce ": "Publier mon annonce"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreerAnnonce;