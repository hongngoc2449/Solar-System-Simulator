import React from "react";

const WelcomePopup = ({ onClose }) => {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0, 0, 0, 0.85)",
                backdropFilter: "blur(8px)",
                animation: "fadeIn 0.3s ease-out",
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: "linear-gradient(135deg, rgba(20, 20, 40, 0.95), rgba(10, 10, 25, 0.98))",
                    border: "2px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "20px",
                    padding: "40px",
                    maxWidth: "600px",
                    width: "90%",
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 100px rgba(100, 100, 255, 0.1)",
                    animation: "scaleIn 0.4s ease-out",
                    position: "relative",
                    overflow: "hidden",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative stars */}
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(100, 150, 255, 0.05) 0%, transparent 50%)",
                    pointerEvents: "none",
                }} />

                {/* Content */}
                <div style={{ position: "relative", zIndex: 1 }}>
                    {/* Header */}
                    <div style={{ textAlign: "center", marginBottom: "30px" }}>
                        <div style={{ fontSize: "48px", marginBottom: "10px" }}>🌌</div>
                        <h1 style={{
                            margin: "0 0 10px 0",
                            fontSize: "32px",
                            fontWeight: "700",
                            background: "linear-gradient(135deg, #fff, #a0c4ff)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}>
                            Welcome to Solar System Simulator
                        </h1>
                        <p style={{
                            margin: 0,
                            color: "rgba(255, 255, 255, 0.7)",
                            fontSize: "16px",
                        }}>
                            Explore the wonders of our cosmic neighborhood
                        </p>
                    </div>

                    {/* Instructions */}
                    <div style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        borderRadius: "12px",
                        padding: "20px",
                        marginBottom: "25px",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                    }}>
                        <h3 style={{
                            margin: "0 0 15px 0",
                            fontSize: "18px",
                            color: "#ffcc00",
                            fontWeight: "600",
                        }}>
                            🎮 Quick Start Guide
                        </h3>

                        <div style={{
                            display: "grid",
                            gap: "12px",
                            fontSize: "14px",
                            lineHeight: "1.6",
                        }}>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <span style={{ color: "#ffcc00", minWidth: "24px" }}>🖱️</span>
                                <span style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                                    <strong>Left Click + Drag:</strong> Rotate camera view
                                </span>
                            </div>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <span style={{ color: "#ffcc00", minWidth: "24px" }}>🔍</span>
                                <span style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                                    <strong>Scroll:</strong> Zoom in/out
                                </span>
                            </div>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <span style={{ color: "#ffcc00", minWidth: "24px" }}>👆</span>
                                <span style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                                    <strong>Click on planets:</strong> View detailed information
                                </span>
                            </div>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <span style={{ color: "#ffcc00", minWidth: "24px" }}>🎛️</span>
                                <span style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                                    <strong>Left Panel:</strong> Adjust speed, size, and lighting
                                </span>
                            </div>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <span style={{ color: "#ffcc00", minWidth: "24px" }}>🎯</span>
                                <span style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                                    <strong>Right Panel:</strong> Control playback and camera
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "10px",
                        marginBottom: "25px",
                    }}>
                        {[
                            { icon: "☀️", text: "Interactive Sun" },
                            { icon: "🪐", text: "8 Planets" },
                            { icon: "🎵", text: "Background Music" },
                            { icon: "⭕", text: "Orbital Paths" },
                        ].map((feature, idx) => (
                            <div
                                key={idx}
                                style={{
                                    background: "rgba(255, 255, 255, 0.03)",
                                    border: "1px solid rgba(255, 255, 255, 0.08)",
                                    borderRadius: "8px",
                                    padding: "10px",
                                    textAlign: "center",
                                    fontSize: "13px",
                                    color: "rgba(255, 255, 255, 0.8)",
                                }}
                            >
                                <div style={{ fontSize: "20px", marginBottom: "4px" }}>{feature.icon}</div>
                                {feature.text}
                            </div>
                        ))}
                    </div>

                    {/* Start Button */}
                    <button
                        onClick={onClose}
                        style={{
                            width: "100%",
                            padding: "16px",
                            fontSize: "18px",
                            fontWeight: "700",
                            background: "linear-gradient(135deg, #ffcc00, #ff9500)",
                            color: "#000",
                            border: "none",
                            borderRadius: "12px",
                            cursor: "pointer",
                            boxShadow: "0 4px 15px rgba(255, 204, 0, 0.4)",
                            transition: "all 0.3s",
                            position: "relative",
                            overflow: "hidden",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 204, 0, 0.6)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 4px 15px rgba(255, 204, 0, 0.4)";
                        }}
                    >
                        🚀 Start Exploring
                    </button>

                    {/* Footer */}
                    <p style={{
                        marginTop: "20px",
                        textAlign: "center",
                        fontSize: "12px",
                        color: "rgba(255, 255, 255, 0.4)",
                    }}>
                        Press 👁‍🗨 Hide All Panels for immersive view
                    </p>
                </div>
            </div>

            {/* Inline animations */}
            <style>
                {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.9) translateY(20px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}
            </style>
        </div>
    );
};

export default WelcomePopup;
