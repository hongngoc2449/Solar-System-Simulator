import { Canvas } from "@react-three/fiber";
import Sun from "./components/Sun";
import { useState, useRef, useEffect } from "react";
import Planet from "./components/Planet";
import { Stars, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import AnimationController from "./components/AnimationController";
import SaturnGroup from "./components/SaturnGroup";
import InfoPanel from "./components/InfoPanel";
import OrbitPath from "./components/OrbitPath";
import PlanetControlPanel from "./components/PlanetControlPanel";
import WelcomePopup from "./components/WelcomePopup";

function App() {
  const [elapsed, setElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showPanel, setShowPanel] = useState(true);
  const [timeScale, setTimeScale] = useState(1);
  const [globalSizeScale, setGlobalSizeScale] = useState(1);
  const [ambientIntensity, setAmbientIntensity] = useState(0.3);
  const [directionalIntensity, setDirectionalIntensity] = useState(1.5);
  const [bodyPositions, setBodyPositions] = useState({ Sun: new THREE.Vector3(0, 0, 0) });
  const [isMuted, setIsMuted] = useState(false);
  const [showOrbitPaths, setShowOrbitPaths] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const controlsRef = useRef();
  const audioRef = useRef();

  const planets = [
    { name: "Mercury", radius: 0.25, distance: 3, speed: 2.0 },
    { name: "Venus", radius: 0.45, distance: 4.5, speed: 1.6 },
    { name: "Earth", radius: 0.5, distance: 6, speed: 1.0 },
    { name: "Mars", radius: 0.35, distance: 8, speed: 0.8 },
    { name: "Jupiter", radius: 1.2, distance: 12, speed: 0.4 },
    { name: "Uranus", radius: 0.7, distance: 20, speed: 0.2 },
    { name: "Neptune", radius: 0.7, distance: 24, speed: 0.15 },
  ];

  const saturn = { name: "Saturn", radius: 1.0, distance: 16, speed: 0.3 };
  const sun = { name: "Sun", radius: 1.4, distance: 0, speed: 0 };
  const panelBodies = [sun, ...planets, saturn];

  const createDefaultTuning = () => {
    const base = {};
    [...planets, saturn].forEach((body) => {
      base[body.name] = {
        orbitSpeed: body.speed,
        rotationSpeed: 0.8,
        sizeScale: 1,
      };
    });
    // Add Sun tuning
    base.Sun = {
      rotationSpeed: 0.5,
      sizeScale: 1,
    };
    return base;
  };

  const [tuning, setTuning] = useState(() => createDefaultTuning());

  useEffect(() => {
    setBodyPositions((prev) => ({ ...prev, Sun: new THREE.Vector3(0, 0, 0) }));

    // Auto-play audio when component mounts
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Set volume to 50%
      audioRef.current.play().catch((err) => {
        console.log("Audio autoplay blocked by browser:", err);
        // If autoplay is blocked, we can show a UI prompt or just wait for user interaction
      });
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => {
          console.log("Audio playback error:", err);
        });
      }
    }
  }, [isMuted]);

  const updateTuning = (name, patch) => {
    setTuning((prev) => ({
      ...prev,
      [name]: { ...prev[name], ...patch },
    }));
  };

  const resetControls = () => {
    setTimeScale(1);
    setGlobalSizeScale(1);
    setAmbientIntensity(0.3);
    setDirectionalIntensity(1.5);
    setTuning(createDefaultTuning());
  };

  const handlePositionUpdate = (name, position) => {
    setBodyPositions((prev) => ({ ...prev, [name]: position.clone() }));
  };

  const focusOnBody = (name) => {
    const pos = bodyPositions[name];
    if (!pos || !controlsRef.current) return;

    const radiusMap = {
      Sun: 1.4,
      Mercury: 0.25,
      Venus: 0.45,
      Earth: 0.5,
      Mars: 0.35,
      Jupiter: 1.2,
      Saturn: 1.0,
      Uranus: 0.7,
      Neptune: 0.7,
    };

    const baseRadius = radiusMap[name] ?? 0.5;
    const sizeScale = name === "Sun"
      ? tuning.Sun.sizeScale
      : name === "Saturn"
        ? tuning.Saturn.sizeScale
        : tuning[name]?.sizeScale ?? 1;
    const scaledRadius = baseRadius * sizeScale * globalSizeScale;
    const dist = Math.max(4, scaledRadius * 2.5 + 4);
    const offset = new THREE.Vector3(dist, dist * 0.5, dist);

    controlsRef.current.target.copy(pos);
    controlsRef.current.object.position.copy(pos.clone().add(offset));
    controlsRef.current.update?.();
  };

  return (
    <>
      <audio ref={audioRef} src="/universe.mp3" loop autoPlay />

      {/* Control Panel - Right Side */}
      {showPanel ? (
        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            minWidth: "200px",
          }}
        >
          {/* Playback Controls */}
          <div style={{
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            padding: "12px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}>
            <div style={{
              color: "#fff",
              fontSize: "11px",
              fontWeight: "600",
              marginBottom: "8px",
              opacity: 0.7,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}>
              Playback
            </div>
            <button
              style={{
                width: "100%",
                padding: "10px 16px",
                fontSize: "15px",
                background: isPaused ? "#e74c3c" : "#27ae60",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                marginBottom: "6px",
                transition: "all 0.2s",
              }}
              onClick={() => setIsPaused((p) => !p)}
            >
              {isPaused ? "▶ Resume" : "⏸ Pause"}
            </button>
            <button
              style={{
                width: "100%",
                padding: "10px 16px",
                fontSize: "15px",
                background: isMuted ? "#95a5a6" : "#3498db",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                transition: "all 0.2s",
              }}
              onClick={() => setIsMuted((m) => !m)}
            >
              {isMuted ? "🔇 Sound Off" : "🔊 Sound On"}
            </button>
          </div>

          {/* View Controls */}
          <div style={{
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            padding: "12px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}>
            <div style={{
              color: "#fff",
              fontSize: "11px",
              fontWeight: "600",
              marginBottom: "8px",
              opacity: 0.7,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}>
              View
            </div>
            <button
              style={{
                width: "100%",
                padding: "10px 16px",
                fontSize: "15px",
                background: "#34495e",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                marginBottom: "6px",
                transition: "all 0.2s",
              }}
              onClick={() => setShowPanel(false)}
            >
              👁‍🗨 Hide All Panels
            </button>
            <button
              style={{
                width: "100%",
                padding: "10px 16px",
                fontSize: "15px",
                background: showOrbitPaths ? "#16a085" : "#7f8c8d",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                transition: "all 0.2s",
              }}
              onClick={() => setShowOrbitPaths((v) => !v)}
            >
              {showOrbitPaths ? "⭕ Hide Orbits" : "⭕ Show Orbits"}
            </button>
          </div>

          {/* Camera Controls */}
          <div style={{
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(10px)",
            borderRadius: "12px",
            padding: "12px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}>
            <div style={{
              color: "#fff",
              fontSize: "11px",
              fontWeight: "600",
              marginBottom: "8px",
              opacity: 0.7,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}>
              Camera
            </div>
            <button
              style={{
                width: "100%",
                padding: "10px 16px",
                fontSize: "15px",
                background: "#8e44ad",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                marginBottom: "6px",
                transition: "all 0.2s",
              }}
              onClick={() => focusOnBody(selected ?? "Sun")}
            >
              🎯 Focus Selected
            </button>
            <button
              style={{
                width: "100%",
                padding: "10px 16px",
                fontSize: "15px",
                background: "#d35400",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                transition: "all 0.2s",
              }}
              onClick={() => {
                setSelected("Sun");
                focusOnBody("Sun");
              }}
            >
              ☀️ Reset to Sun
            </button>
          </div>
        </div>
      ) : (
        // Floating eye icon when panels are hidden
        <button
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            zIndex: 100,
            width: "50px",
            height: "50px",
            padding: "0",
            fontSize: "24px",
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(10px)",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          }}
          onClick={() => setShowPanel(true)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.background = "rgba(0, 0, 0, 0.7)";
          }}
          title="Show Panels"
        >
          👁
        </button>
      )}

      {showPanel && (
        <PlanetControlPanel
          bodies={panelBodies}
          selected={selected}
          isPaused={isPaused}
          onSelect={setSelected}
          tuning={tuning}
          onTuningChange={updateTuning}
          timeScale={timeScale}
          setTimeScale={setTimeScale}
          globalSizeScale={globalSizeScale}
          setGlobalSizeScale={setGlobalSizeScale}
          ambientIntensity={ambientIntensity}
          setAmbientIntensity={setAmbientIntensity}
          directionalIntensity={directionalIntensity}
          setDirectionalIntensity={setDirectionalIntensity}
          onReset={resetControls}
        />
      )}
      <Canvas camera={{ position: [0, 10, 20], fov: 45 }}>
        <AnimationController isPaused={isPaused} setElapsed={setElapsed} />
        <ambientLight intensity={ambientIntensity} />
        <directionalLight position={[5, 5, 5]} intensity={directionalIntensity} />

        <Sun
          onSelect={setSelected}
          selectedName={selected}
          onPositionUpdate={handlePositionUpdate}
          rotationSpeed={tuning.Sun.rotationSpeed}
          sizeScale={tuning.Sun.sizeScale}
          globalSizeScale={globalSizeScale}
          timeScale={timeScale}
          isPaused={isPaused}
        />
        {showOrbitPaths && planets.map((planet) => (
          <OrbitPath key={`${planet.name}-orbit`} distance={planet.distance} />
        ))}
        {planets.map((planet) => (
          <Planet
            key={planet.name}
            name={planet.name}
            radius={planet.radius}
            distance={planet.distance}
            orbitSpeed={tuning[planet.name].orbitSpeed}
            rotationSpeed={tuning[planet.name].rotationSpeed}
            sizeScale={tuning[planet.name].sizeScale}
            globalSizeScale={globalSizeScale}
            timeScale={timeScale}
            elapsed={elapsed}
            isPaused={isPaused}
            onSelect={setSelected}
            selectedName={selected}
            onPositionUpdate={handlePositionUpdate}
          />
        ))}
        {showOrbitPaths && <OrbitPath distance={16} />}
        <SaturnGroup
          onSelect={setSelected}
          elapsed={elapsed}
          isPaused={isPaused}
          orbitSpeed={tuning.Saturn.orbitSpeed}
          rotationSpeed={tuning.Saturn.rotationSpeed}
          sizeScale={tuning.Saturn.sizeScale}
          globalSizeScale={globalSizeScale}
          timeScale={timeScale}
          selectedName={selected}
          onPositionUpdate={handlePositionUpdate}
        />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
        />
        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableRotate={true}
          enableZoom={true}
          panSpeed={2.5}
          rotateSpeed={1.0}
          zoomSpeed={1.0}
          minDistance={2}
          maxDistance={1000}
          autoRotate={!isPaused}
          autoRotateSpeed={0.4}
          mouseButtons={{
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN,
          }}
        />
      </Canvas>
      {selected && (
        <InfoPanel planet={selected} onClose={() => setSelected(null)} />
      )}
      {showWelcome && (
        <WelcomePopup onClose={() => setShowWelcome(false)} />
      )}
    </>
  );
}

export default App;
