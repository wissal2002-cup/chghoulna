import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api/axios";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stars, setStars] = useState("");
  const [comment, setComment] = useState("");

  const isLoggedIn = !!localStorage.getItem("token");
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const isOwnProfile = loggedInUser?.id === parseInt(id);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(res.data);
        console.log("User recu :",res.data);
      } catch (err) {
        if (err.response?.status === 404) {
          alert("Utilisateur introuvable.");
        } else {
          alert("Erreur de chargement.");
        }
        console.error("Erreur chargement profil", err);
      }
    };

    fetchProfile();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        "/reviews",
        {
          user_id: id,
          rating: parseInt(stars),
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Avis ajouté !");
      setStars("");
      setComment("");

      const res = await api.get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(res.data);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi de l'avis.");
    }
  };

  if (!user) return <div className="text-center mt-5">Chargement...</div>;

  return (
    <div className="container my-5">
      <div className="row mb-5">
        {/* Partie gauche : Infos profil */}
        <div className="col-md-4">
          <div className="card p-4 shadow-sm text-center">
            <img
              src={
                user.photo_url
                  ? `http://127.0.0.1:8000${user.photo_url}`
                  : "/default.jpg"
              }
              alt={user.name}
              className="rounded-circle mb-3 mx-auto"
              style={{ width: 100, height: 100, objectFit: "cover" }}
            />
            <h5 className="fw-bold mb-1">
              {user.name} {user.prenom}
            </h5>
            <div className="text-warning mb-2">★ {user.rating || "4.8"}</div>
            <p className="text-muted">{user.bio || "Aucune biographie."}</p>

            {isOwnProfile && (
              <Link
                to="/profile/edit"
                className="btn btn-outline-primary btn-sm mt-2"
              >
                Modifier mon profil
              </Link>
            )}
          </div>
        </div>

        {/* Partie droite : Services */}
        <div className="col-md-8">
          <h4 className="mb-3">Services proposés</h4>
          {user.services?.length > 0 ? (
            user.services.map((service) => (
              <div key={service.id} className="card p-3 mb-3 shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <div>
                    <span
                      className={`badge ${
                        service.type === "Offre"
                          ? "bg-success"
                          : "bg-primary"
                      } me-2`}
                    >
                      {service.type}
                    </span>
                    <strong>{service.title}</strong>
                  </div>
                  <span className="fw-bold">{service.price} dh</span>
                </div>
                <div className="text-muted small mb-2">{service.category}</div>
                <p className="mb-2">{service.description}</p>
                <div className="d-flex justify-content-between text-muted small">
                  <span>
                    Posté le{" "}
                    {new Date(service.created_at).toLocaleDateString("fr-FR")}
                  </span>
                  <span>{service.city}</span>
                </div>

                {isOwnProfile && (
                  <div className="d-flex gap-2 mt-3">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() =>
                        navigate(`/modifier-annonce/${service.id}`)
                      }
                    >
                      Modifier
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={async () => {
                        if (
                          window.confirm(
                            "Confirmer la suppression de ce service ?"
                          )
                        ) {
                          try {
                            await api.delete(`/services/${service.id}`, {
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem(
                                  "token"
                                )}`,
                              },
                            });
                            alert("Service supprimé !");
                            window.location.reload();
                          } catch (error) {
                            alert("Erreur lors de la suppression.");
                            console.error(error);
                          }
                        }
                      }}
                    >
                      Supprimer
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-muted">Aucun service publié.</p>
          )}
        </div>
      </div>

      {/* ✅ Messages reçus */}
      {isOwnProfile &&  (
        <div className="mt-5">
          <h4>Messages reçus</h4>
          {(user.messages_received || []).map((msg, index) => (
            <div key={index} className="card p-3 mb-3 shadow-sm">
              <div className="text-muted mb-1">
                De: {msg.sender?.name || "Utilisateur inconnu"} 

              </div>
              <p className="mb-2">{msg.content}</p>
              
              <button
                className="btn btn-sm btn-outline-secondary "
                onClick={() => navigate(`/contact/${msg.sender_id}`)}
              >
                Répondre
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Laisser un avis (si autre utilisateur) */}
      {!isOwnProfile && isLoggedIn && (
        <form onSubmit={handleReviewSubmit} className="card p-3 mb-4 mt-4">
          <h5>Laisser un avis</h5>
          <div className="mb-2">
            <label>Note</label>
            <input
              type="number"
              min="1"
              max="5"
              className="form-control"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <textarea
              className="form-control"
              placeholder="Commentaire (facultatif)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Envoyer
          </button>
        </form>
      )}

      {/* ✅ Avis reçus */}
      <div className="mt-4">
        <h4 className="mb-3">
          Évaluations ({user.reviews?.length || 0})
        </h4>
        {user.reviews?.length > 0 ? (
          user.reviews.map((review, i) => (
            <div key={i} className="card p-3 mb-3 shadow-sm">
              <div className="d-flex justify-content-between">
                <strong>{review.reviewer?.name}</strong>
                <small className="text-muted">
                  {new Date(review.created_at).toLocaleDateString("fr-FR")}
                </small>
              </div>
              <div className="text-warning mb-2">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
              <p className="mb-0">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-muted">Aucun avis pour le moment.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
