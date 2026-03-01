import React from "react";
import "./Home.css";
import bg1 from "../assets/bg_1.png"; // Best practice for React & Vercel

const Home = () => {
  return (
    <div className="home">
      <section
        className="hero-section"
        style={{
          backgroundImage: `url(${bg1})`, // Import ensures Vercel finds it
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="overlay">
          <div className="hero-content">
            <h1>Trouvez des services de confiance près de chez vous</h1>
            <p>
              Chghoulna connecte les femmes marocaines pour des services de
              proximité de qualité
            </p>

            {/* Search box 
            <div className="search-box">
              <select>
                <option>Type de service</option>
                <option>Garde d'enfants</option>
                <option>Cours particuliers</option>
                <option>Traducteur</option>
              </select>

              <select>
                <option>Ville</option>
                <option>Casablanca</option>
                <option>Rabat</option>
                <option>Marrakech</option>
              </select>

              <button className="search-button">Rechercher</button>
            </div>
*/}
            {/* Quote box */}
            <div className="quote-box">
              <blockquote style={{ color: "black" }}>
                “Quand les femmes s'entraident, des choses incroyables se
                produisent.”
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;