import React from "react";
import CountUp from "react-countup";
import "./Stats.css"; // your CSS from before

const Stats = () => {
  return (
    <div className="stats-section">
      <div className="parent">
        <div className="stat-card">
          <h2><CountUp end={500} duration={2} separator="," />+</h2>
          <p>Services proposés</p>
        </div>
        <div className="stat-card">
          <h2><CountUp end={320} duration={2} separator="," />+</h2>
          <p>Utilisatrices actives</p>
        </div>
        <div className="stat-card">
          <h2><CountUp end={15} duration={4} />+</h2>
          <p>Villes couvertes</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
