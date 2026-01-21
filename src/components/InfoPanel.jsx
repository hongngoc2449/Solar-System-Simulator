import React from "react";

const InfoPanel = ({ planet, onClose }) => {
  const info = {
    Mercury:
      "Mercury skims closest to the Sun; days hot enough to melt metal, nights brutally cold, and its cratered crust tells a story of ancient impacts.",
    Venus:
      "Venus is smothered in acidic clouds and a runaway greenhouse, making it the hottest world; an amber sky with super-rotating winds sweeps the planet.",
    Earth:
      "Earth is the rare blue world with liquid water, an oxygen-rich sky, a shielding magnetosphere, and swirling cloud oceans seen from orbit.",
    Mars:
      "Mars glows rusty red, carved by the vast Valles Marineris and crowned by the giant volcano Olympus Mons; polar caps hide water ice and ancient river traces.",
    Jupiter:
      "Jupiter is the gas giant king; caramel cloud bands wrap a centuries-old Great Red Spot, and its immense magnetic field traps savage radiation.",
    Saturn:
      "Saturn is graceful with icy rings that glitter in sunlight; a pale-gold atmosphere and a bizarre hexagon storm spin over its north pole.",
    Uranus:
      "Uranus rolls on its side like a tilted top; its teal hue comes from methane, with faint rings and frigid winds sweeping the upper haze.",
    Neptune:
      "Neptune is deep blue with supersonic winds over 2,000 km/h; dark storms dot its clouds, and inner heat gives it a subtle internal glow.",
    Sun:
      "The Sun is a blazing fusion furnace of plasma; granules and magnetic arcs sculpt its surface while it floods the Solar System with light and solar wind.",
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: 30,
        right: 30,
        padding: "15px 20px",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        color: "white",
        borderRadius: "10px",
        maxWidth: "300px",
        fontSize: "16px",
        lineHeight: "1.5",
        zIndex: 200,
      }}
    >
      <h2 style={{ margin: "0 0 8px 0", color: "#ffcc00" }}>{planet}</h2>
      <p style={{ margin: "0 0 12px 0" }}>{info[planet]}</p>
      <button
        onClick={onClose}
        style={{
          background: "#ffcc00",
          border: "none",
          color: "#000",
          padding: "8px 12px",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Close
      </button>
    </div>
  );
};

export default InfoPanel;
