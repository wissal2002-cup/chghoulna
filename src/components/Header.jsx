import React from "react";
import { Link,useNavigate} from "react-router-dom";
import logo from "../assets/logo.png";
import "./Header.css"; // Import CSS customisé
import api from "../api/axios";

const Header = () => {
          
const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
console.log("Token pour déconnexion :", localStorage.getItem("token"));

  const handleLogout = async () => {
    try {
      await api.post("/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      alert("Déconnecté !");
      navigate("/connexion");
    } catch (err) {
      console.error("Erreur de déconnexion :", err);
      alert("Erreur lors de la déconnexion");
    }
  };
const handleProfileClick = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.id) {
    navigate(`/profile/${user.id}`);
  }
};

const currentUser = JSON.parse(localStorage.getItem("user"));


  return (
    <header className="main-header">
      <div className="container header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
        </Link>

        {/* Navigation links */}
        <nav className="nav-links">
          <Link to="/">Accueil</Link>
          <Link to="/Services">Services</Link>
          <Link to="/CommentCaMarche">Comment ça marche</Link>
          <Link to="/ContactezNous">Contact</Link>
        </nav>

        {/* Buttons */}
        <div className="auth-buttons">

{isLoggedIn ? (
  <div className="d-flex align-items-center gap-2">
    {currentUser?.photo && (
      <img
        src={`http://127.0.0.1:8000/storage/${currentUser.photo}`}
        alt={currentUser.name}
        style={{
          width: 35,
          height: 35,
          borderRadius: "50%",
          objectFit: "cover",
          border: "1px solid #ccc",
        }}
      />
    )}
    <button className="btn btn-outline-primary" onClick={handleProfileClick}>
      Mon profil
    </button>
    <button className="btn btn-danger" onClick={handleLogout}>
      Déconnexion
    </button>
  </div>
) : (
  <>
    <Link to="/Connexion" className="btn btn-login">
      Connexion
    </Link>
    <Link to="/inscription" className="btn btn-register">
      Inscription
    </Link>
  </>
)}

         
        </div>
      </div>
    </header>
  );
};

export default Header;
