import React from "react";
import "./Home.css"; // Assuming this is where your styles go

const Home = () => {
  return (
    <div className="home">
      <section className="hero-section">
        <div className="overlay">
          <div className="hero-content">
            <h1>Trouvez des services de confiance près de chez vous</h1>
            <p>
              Chghoulna connecte les femmes marocaines pour des services de proximité de qualité
            </p>

           <div className="bg-white p-5 rounded shadow text-center quote-box">
              <blockquote className="fs-5 fst-italic" style={{color:"black"}}>
                “Quand les femmes s'entraident, des choses incroyables se produisent.”
              </blockquote>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
