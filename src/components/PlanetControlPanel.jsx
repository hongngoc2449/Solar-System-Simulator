import React, { useMemo } from "react";

const Stat = ({ label, value }) => (
  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: 4 }}>
    <span style={{ color: "#b0b8c3" }}>{label}</span>
    <span style={{ color: "#fff" }}>{value}</span>
  </div>
);

const PlanetRow = ({ planet, displaySpeed, isSelected, onSelect }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1.2fr 0.9fr 0.9fr 0.9fr",
      gap: 8,
      padding: "8px 10px",
      borderRadius: 6,
      background: isSelected ? "rgba(255, 204, 0, 0.18)" : "rgba(255, 255, 255, 0.06)",
      cursor: "pointer",
    }}
    onClick={() => onSelect(planet.name)}
  >
    <span style={{ color: "#fff", fontWeight: 600 }}>{planet.name}</span>
    <span style={{ color: "#dfe6f2" }}>{planet.distance.toFixed(1)} AU*</span>
    <span style={{ color: "#dfe6f2" }}>{displaySpeed.toFixed(2)} rad/s</span>
    <span style={{ color: "#dfe6f2" }}>{planet.radius.toFixed(2)} R</span>
  </div>
);

const SliderRow = ({ label, value, min, max, step, onChange }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
    <span style={{ color: "#b0b8c3", fontSize: 12, width: 110 }}>{label}</span>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{ flex: 1 }}
    />
    <span style={{ color: "#fff", fontSize: 12, width: 52, textAlign: "right" }}>{value.toFixed(2)}</span>
  </div>
);

const PlanetControlPanel = ({
  bodies,
  selected,
  isPaused,
  onSelect,
  tuning,
  onTuningChange,
  timeScale,
  setTimeScale,
  globalSizeScale,
  setGlobalSizeScale,
  ambientIntensity,
  setAmbientIntensity,
  directionalIntensity,
  setDirectionalIntensity,
  onReset,
}) => {
  const enriched = useMemo(
    () =>
      bodies.map((b) => ({
        ...b,
        orbitSpeed: tuning?.[b.name]?.orbitSpeed ?? b.speed ?? 0,
      })),
    [bodies, tuning]
  );

  const stats = useMemo(() => {
    const total = enriched.length;
    const furthest = enriched.reduce((a, b) => (b.distance > a.distance ? b : a), enriched[0]);
    const closest = enriched.reduce((a, b) => (b.distance < a.distance ? b : a), enriched[0]);
    const fastest = enriched.reduce((a, b) => (b.orbitSpeed > a.orbitSpeed ? b : a), enriched[0]);
    const orbiting = enriched.filter((b) => b.name !== "Sun" && b.orbitSpeed > 0);
    const slowest = orbiting.length
      ? orbiting.reduce((a, b) => (b.orbitSpeed < a.orbitSpeed ? b : a), orbiting[0])
      : fastest;
    return { total, furthest, closest, fastest, slowest };
  }, [enriched]);

  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 120,
        width: 340,
        maxHeight: "120vh",
        padding: "16px 16px 14px 16px",
        background: "rgba(0, 0, 0, 0.65)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: 12,
        backdropFilter: "blur(6px)",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div>
          <div style={{ color: "#fff", fontWeight: 700, letterSpacing: 0.3 }}>Orbit Dashboard</div>
          <div style={{ color: "#8fa3bf", fontSize: 13 }}>
            Scene: {isPaused ? "Paused" : "Playing"}
          </div>
        </div>
        <div style={{ color: "#ffcc00", fontWeight: 700, fontSize: 13 }}>{stats.total} bodies</div>
      </div>

      <div style={{ marginBottom: 10 }}>
        <Stat label="Closest" value={`${stats.closest.name} (${stats.closest.distance.toFixed(1)} AU*)`} />
        <Stat label="Furthest" value={`${stats.furthest.name} (${stats.furthest.distance.toFixed(1)} AU*)`} />
        <Stat label="Fastest orbit" value={`${stats.fastest.name} (${stats.fastest.orbitSpeed.toFixed(2)} rad/s)`} />
        <Stat label="Slowest orbit" value={`${stats.slowest.name} (${stats.slowest.orbitSpeed.toFixed(2)} rad/s)`} />
      </div>

      <div style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: 10, marginBottom: 10 }}>
        <div style={{ color: "#fff", fontWeight: 600, fontSize: 13, marginBottom: 8 }}>Global</div>
        <SliderRow label="Scene speed" value={timeScale} min={0} max={3} step={0.05} onChange={setTimeScale} />
        <SliderRow label="Planet size" value={globalSizeScale} min={0.2} max={2} step={0.05} onChange={setGlobalSizeScale} />
        <SliderRow label="Ambient light" value={ambientIntensity} min={0} max={2} step={0.05} onChange={setAmbientIntensity} />
        <SliderRow label="Key light" value={directionalIntensity} min={0} max={3} step={0.05} onChange={setDirectionalIntensity} />
        <button
          style={{
            marginTop: 6,
            width: "100%",
            padding: "8px 10px",
            background: "#ffcc00",
            color: "#000",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            cursor: "pointer",
          }}
          onClick={onReset}
        >
          Reset to default
        </button>
      </div>

      <div style={{ color: "#8fa3bf", fontSize: 12, marginBottom: 6 }}>Click a row to focus in info panel</div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.9fr 0.9fr 0.9fr", gap: 8, color: "#8fa3bf", fontSize: 12, marginBottom: 6 }}>
        <span>Name</span>
        <span>Orbit (AU*)</span>
        <span>Speed (rad/s)</span>
        <span>Radius (R)</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, overflowY: "auto", maxHeight: "36vh", paddingRight: 4 }}>
        {enriched.map((planet) => (
          <div key={planet.name}>
            <PlanetRow
              planet={planet}
              displaySpeed={planet.orbitSpeed}
              isSelected={planet.name === selected}
              onSelect={onSelect}
            />
            {planet.name === "Sun" ? (
              <div style={{ marginTop: 6, padding: "6px 8px", background: "rgba(255,255,255,0.03)", borderRadius: 6 }}>
                <SliderRow
                  label="Rotation"
                  value={tuning.Sun.rotationSpeed}
                  min={0}
                  max={3}
                  step={0.01}
                  onChange={(v) => onTuningChange("Sun", { rotationSpeed: v })}
                />
                <SliderRow
                  label="Size factor"
                  value={tuning.Sun.sizeScale}
                  min={0.2}
                  max={3}
                  step={0.05}
                  onChange={(v) => onTuningChange("Sun", { sizeScale: v })}
                />
              </div>
            ) : planet.name !== "Sun" && (
              <div style={{ marginTop: 6, padding: "6px 8px", background: "rgba(255,255,255,0.03)", borderRadius: 6 }}>
                <SliderRow
                  label="Orbit speed"
                  value={planet.orbitSpeed}
                  min={0}
                  max={3}
                  step={0.01}
                  onChange={(v) => onTuningChange(planet.name, { orbitSpeed: v })}
                />
                <SliderRow
                  label="Rotation"
                  value={tuning[planet.name].rotationSpeed}
                  min={0}
                  max={3}
                  step={0.01}
                  onChange={(v) => onTuningChange(planet.name, { rotationSpeed: v })}
                />
                <SliderRow
                  label="Size factor"
                  value={tuning[planet.name].sizeScale}
                  min={0.2}
                  max={2}
                  step={0.05}
                  onChange={(v) => onTuningChange(planet.name, { sizeScale: v })}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ color: "#566076", fontSize: 11, marginTop: 8 }}>*Scaled distances for visualization, not to real AU.</div>
    </div>
  );
};

export default PlanetControlPanel;
