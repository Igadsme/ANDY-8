import { useState } from "react";

const DRONE_A = "https://images.unsplash.com/photo-1621506683092-a4a47fc01dbd?w=260&h=160&fit=crop&auto=format&q=80";
const DRONE_B = "https://images.unsplash.com/photo-1679136578198-539e835445be?w=260&h=160&fit=crop&auto=format&q=80";
const DRONE_C = "https://images.unsplash.com/photo-1761893425281-09ad46325079?w=260&h=160&fit=crop&auto=format&q=80";

const tabs = ["Network Topology", "Hardware Stack", "Message Flow", "Failure Recovery", "Security"];

const techCards = [
  { name: "Raspberry Pi Zero 2 W", role: "Onboard computer (lightweight, low power)", icon: "⬡", color: "#EF4444" },
  { name: "ESP32", role: "Mesh networking (Wi-Fi)", icon: "⬡", color: "#F59E0B" },
  { name: "ArduPilot", role: "Flight control & telemetry", icon: "△", color: "#2491FF" },
  { name: "MAVLink", role: "Standard communication protocol", icon: "⇄", color: "#70B7FF" },
  { name: "FastAPI", role: "Ground-station backend API", icon: "⚡", color: "#22C55E" },
  { name: "WebSockets", role: "Live bidirectional data stream", icon: "∞", color: "#A855F7" },
  { name: "React", role: "Dashboard frontend framework", icon: "◎", color: "#38BDF8" },
  { name: "Docker", role: "Reproducible deployment", icon: "◻", color: "#2491FF" },
];

const messageFlow = [
  { step: 1, text: "Nodes broadcast authenticated heartbeats at regular intervals.", type: "normal" },
  { step: 2, text: "Each node maintains a neighbor table with last-seen timestamps and link quality.", type: "normal" },
  { step: 3, text: "Drone 3 selects the best available path to the ground station.", type: "normal" },
  { step: 4, text: "Drone 2 stops responding — heartbeats no longer received.", type: "failure" },
  { step: 5, text: "The failed route expires when the neighbor entry times out.", type: "failure" },
  { step: 6, text: "The network selects another viable route to restore connectivity.", type: "recovery" },
  { step: 7, text: "Telemetry packets resume flowing through the alternate path.", type: "recovery" },
  { step: 8, text: "The ground station records route recovery time and packets lost.", type: "normal" },
];

const droneSpecs = [["Raspberry Pi Zero 2 W", "ESP32", "ArduPilot", "MAVLink"]];

type DroneConfig = {
  src: string;
  label: string;
  sublabel: string;
  online: boolean;
  specs?: string[];
};

const normalDrones: DroneConfig[] = [
  { src: DRONE_C, label: "Drone 3", sublabel: "Remote Node", online: true, specs: droneSpecs[0] },
  { src: DRONE_B, label: "Drone 2", sublabel: "Relay", online: true, specs: droneSpecs[0] },
  { src: DRONE_A, label: "Drone 1", sublabel: "Gateway", online: true, specs: droneSpecs[0] },
];

const failureDrones: DroneConfig[] = [
  { src: DRONE_C, label: "Drone 3", sublabel: "Remote Node", online: true, specs: droneSpecs[0] },
  { src: DRONE_B, label: "Drone 2", sublabel: "Relay", online: false, specs: droneSpecs[0] },
  { src: DRONE_A, label: "Drone 1", sublabel: "Gateway", online: true, specs: droneSpecs[0] },
];

export default function Architecture({ navOffset }: { navOffset: string }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={`min-h-screen ${navOffset}`} style={{ backgroundColor: "#061426" }}>
      {/* Page header */}
      <div className="border-b bg-grid" style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.10)" }}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-0">
          <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "#70B7FF" }}>
            System Architecture
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: "#F8FAFC" }}>
            System Architecture
          </h1>
          <p className="text-base mb-6" style={{ color: "#A9B8CA" }}>
            Three-node mesh network with dynamic hand-off
          </p>

          {/* Tabs */}
          <div className="flex gap-0 overflow-x-auto" role="tablist" aria-label="Architecture sections">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === i}
                aria-controls={`tab-panel-${i}`}
                id={`tab-${i}`}
                onClick={() => setActiveTab(i)}
                className="px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all"
                style={{
                  borderColor: activeTab === i ? "#2491FF" : "transparent",
                  color: activeTab === i ? "#F8FAFC" : "#A9B8CA",
                  backgroundColor: "transparent",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ── TAB 0: Network Topology ── */}
        {activeTab === 0 && (
          <div id="tab-panel-0" role="tabpanel" aria-labelledby="tab-0">
            {/* Normal Route */}
            <div
              className="rounded-2xl border overflow-hidden mb-6"
              style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
            >
              <div
                className="flex items-center justify-between px-6 py-4 border-b"
                style={{ borderColor: "rgba(148,163,184,0.10)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#22C55E" }} />
                  <h2 className="font-semibold text-sm" style={{ color: "#F8FAFC" }}>
                    Normal Route <span style={{ color: "#22C55E" }}>(All Nodes Online)</span>
                  </h2>
                </div>
                <p className="text-xs font-mono hidden sm:block" style={{ color: "#A9B8CA" }}>
                  Drone 3 → Drone 2 → Drone 1 → Ground Station
                </p>
              </div>
              <div className="p-6">
                <DroneRow drones={normalDrones} failure={false} />
              </div>
            </div>

            {/* Relay Failure */}
            <div
              className="rounded-2xl border overflow-hidden mb-10"
              style={{ backgroundColor: "#0B1B30", borderColor: "rgba(239,68,68,0.2)" }}
            >
              <div
                className="flex items-center justify-between px-6 py-4 border-b"
                style={{ borderColor: "rgba(148,163,184,0.10)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#EF4444" }} />
                  <h2 className="font-semibold text-sm" style={{ color: "#F8FAFC" }}>
                    Relay Failure <span style={{ color: "#EF4444" }}>(Automatic Route Recovery)</span>
                  </h2>
                </div>
                <p className="text-xs font-mono hidden sm:block" style={{ color: "#F59E0B" }}>
                  Drone 3 → Drone 1 (Direct) → Ground Station
                </p>
              </div>
              <div className="p-6">
                <DroneRow drones={failureDrones} failure={true} />
              </div>
            </div>

            {/* Key Technologies */}
            <div>
              <h3 className="text-base font-semibold mb-4" style={{ color: "#F8FAFC" }}>
                Key Technologies
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {techCards.slice(0, 4).map(({ name, role, color }) => (
                  <TechCard key={name} name={name} role={role} color={color} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 1: Hardware Stack ── */}
        {activeTab === 1 && (
          <div id="tab-panel-1" role="tabpanel" aria-labelledby="tab-1">
            <h2 className="text-xl font-bold mb-6" style={{ color: "#F8FAFC" }}>
              Hardware Stack
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: "Raspberry Pi Zero 2 W",
                  type: "Companion Computer",
                  specs: [
                    "ARM Cortex-A53 quad-core",
                    "512 MB RAM",
                    "802.11 b/g/n Wi-Fi",
                    "Bluetooth 4.2",
                    "Micro-USB power",
                  ],
                  color: "#EF4444",
                },
                {
                  name: "ESP32 Dev Module",
                  type: "P2P Radio Experiments",
                  specs: [
                    "Dual-core Xtensa LX6",
                    "520 KB SRAM",
                    "802.11 b/g/n + BT",
                    "Mesh radio capability",
                    "Low-power modes",
                  ],
                  color: "#F59E0B",
                },
                {
                  name: "ArduPilot Flight Stack",
                  type: "Flight Control",
                  specs: [
                    "MAVLink v2 telemetry",
                    "GPS/IMU integration",
                    "Configurable failsafes",
                    "Mission planner support",
                    "Extensive logging",
                  ],
                  color: "#2491FF",
                },
                {
                  name: "3D-Printed Frame",
                  type: "Mechanical Integration",
                  specs: [
                    "PLA/PETG composite",
                    "Custom payload mount",
                    "Cable management tray",
                    "Tool-free access",
                    "Repeatable assembly",
                  ],
                  color: "#22C55E",
                },
                {
                  name: "LiPo Battery System",
                  type: "Power & Monitoring",
                  specs: [
                    "3S / 4S configuration",
                    "Per-node battery telemetry",
                    "Low-voltage cutoff",
                    "Flight time logging",
                    "Charge cycle tracking",
                  ],
                  color: "#A855F7",
                },
                {
                  name: "Laptop Ground Station",
                  type: "Command Interface",
                  specs: [
                    "Ubuntu 22.04 LTS",
                    "Docker runtime",
                    "React dashboard",
                    "FastAPI + WebSocket",
                    "MAVLink GCS",
                  ],
                  color: "#70B7FF",
                },
              ].map(({ name, type, specs, color }) => (
                <div
                  key={name}
                  className="rounded-xl border p-5"
                  style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className="w-1 rounded-full mt-1 self-stretch shrink-0"
                      style={{ backgroundColor: color, minHeight: 36 }}
                    />
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "#F8FAFC" }}>
                        {name}
                      </p>
                      <p className="text-xs font-mono mt-0.5" style={{ color }}>
                        {type}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {specs.map((s) => (
                      <li key={s} className="text-xs flex items-center gap-2" style={{ color: "#A9B8CA" }}>
                        <span style={{ color }}>·</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 2: Message Flow ── */}
        {activeTab === 2 && (
          <div id="tab-panel-2" role="tabpanel" aria-labelledby="tab-2">
            <h2 className="text-xl font-bold mb-6" style={{ color: "#F8FAFC" }}>
              Message Flow Timeline
            </h2>
            <div className="max-w-2xl">
              <div className="relative pl-10">
                <div
                  className="absolute left-4 top-0 bottom-0 w-px"
                  style={{ backgroundColor: "rgba(36,145,255,0.15)" }}
                />
                {messageFlow.map(({ step, text, type }) => {
                  const color = type === "failure" ? "#EF4444" : type === "recovery" ? "#22C55E" : "#2491FF";
                  return (
                    <div key={step} className="relative mb-5">
                      <div
                        className="absolute -left-6 w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold border-2"
                        style={{ backgroundColor: "#0B1B30", borderColor: color, color }}
                      >
                        {step}
                      </div>
                      <div
                        className="rounded-xl border p-4"
                        style={{
                          backgroundColor:
                            type === "failure"
                              ? "rgba(239,68,68,0.05)"
                              : type === "recovery"
                                ? "rgba(34,197,94,0.05)"
                                : "#0B1B30",
                          borderColor:
                            type === "failure"
                              ? "rgba(239,68,68,0.2)"
                              : type === "recovery"
                                ? "rgba(34,197,94,0.2)"
                                : "rgba(148,163,184,0.10)",
                        }}
                      >
                        <p className="text-sm leading-relaxed" style={{ color: "#F8FAFC" }}>
                          {text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: Failure Recovery ── */}
        {activeTab === 3 && (
          <div id="tab-panel-3" role="tabpanel" aria-labelledby="tab-3">
            <h2 className="text-xl font-bold mb-6" style={{ color: "#F8FAFC" }}>
              Failure Recovery Protocol
            </h2>
            <div className="grid lg:grid-cols-2 gap-5">
              {[
                {
                  phase: "Detection",
                  color: "#F59E0B",
                  items: [
                    "Heartbeat timeout for D2 detected",
                    "Neighbor table entry invalidated",
                    "Route marked unavailable",
                    "Alert flagged for ground station",
                  ],
                },
                {
                  phase: "Re-Routing",
                  color: "#2491FF",
                  items: [
                    "Available neighbors queried",
                    "Alternate path D3→D1 calculated",
                    "Route cost evaluated vs threshold",
                    "New primary path committed",
                  ],
                },
                {
                  phase: "Restoration",
                  color: "#22C55E",
                  items: [
                    "Telemetry stream redirected",
                    "Packet delivery resumes",
                    "Ground station receives alert",
                    "Recovery time recorded",
                  ],
                },
                {
                  phase: "Stabilization",
                  color: "#70B7FF",
                  items: [
                    "New route quality monitored",
                    "Link quality metrics logged",
                    "Trial data saved to evidence",
                    "System ready for next failure",
                  ],
                },
              ].map(({ phase, color, items }) => (
                <div
                  key={phase}
                  className="rounded-xl border p-5"
                  style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                    <p className="text-sm font-semibold font-mono uppercase tracking-wider" style={{ color }}>
                      {phase}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#A9B8CA" }}>
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 4: Security ── */}
        {activeTab === 4 && (
          <div id="tab-panel-4" role="tabpanel" aria-labelledby="tab-4">
            <h2 className="text-xl font-bold mb-6" style={{ color: "#F8FAFC" }}>
              Security Model
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
              {[
                {
                  title: "HMAC Authentication",
                  desc: "Each heartbeat and telemetry packet carries an HMAC signature to prevent spoofing.",
                },
                {
                  title: "Node Identity Verification",
                  desc: "Nodes use pre-shared key pairs established during ground configuration before flight.",
                },
                {
                  title: "Replay Attack Prevention",
                  desc: "Sequence numbers and timestamps reject duplicate or out-of-order packets automatically.",
                },
                {
                  title: "Ground-Station TLS",
                  desc: "All WebSocket and REST traffic between nodes and the dashboard is encrypted in transit.",
                },
              ].map(({ title, desc }) => (
                <div
                  key={title}
                  className="rounded-xl border p-5"
                  style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#22C55E" }} />
                    <p className="text-sm font-semibold" style={{ color: "#F8FAFC" }}>
                      {title}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#A9B8CA" }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── DRONE ROW COMPONENT ── */
function DroneRow({ drones, failure }: { drones: DroneConfig[]; failure: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-0">
      {drones.map((drone, i) => (
        <div key={drone.label} className="flex flex-col sm:flex-row items-center flex-1 w-full">
          {/* Drone card */}
          <div className="flex flex-col items-center w-full sm:max-w-[200px] shrink-0">
            {/* Image */}
            <div
              className="relative w-full rounded-xl overflow-hidden border mb-3"
              style={{
                height: 120,
                borderColor: !drone.online ? "rgba(239,68,68,0.4)" : "rgba(36,145,255,0.2)",
                backgroundColor: "#102640",
              }}
            >
              <img
                src={drone.src}
                alt={`${drone.label} — ${drone.sublabel}`}
                className="w-full h-full object-cover"
                style={{
                  opacity: drone.online ? 0.85 : 0.3,
                  filter: drone.online ? "none" : "grayscale(80%)",
                }}
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(6,20,38,0.5) 100%)" }}
                aria-hidden="true"
              />
              {/* Offline badge */}
              {!drone.online && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="px-2 py-1 rounded text-xs font-mono font-bold"
                    style={{ backgroundColor: "#EF4444", color: "#fff" }}
                    aria-label="Node offline"
                  >
                    Offline
                  </span>
                </div>
              )}
              {/* Status dot */}
              <div
                className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full border-2"
                style={{
                  backgroundColor: drone.online ? "#22C55E" : "#EF4444",
                  borderColor: "#102640",
                }}
              />
            </div>

            {/* Label */}
            <p className="text-xs font-mono font-bold mb-0.5" style={{ color: "#F8FAFC" }}>
              {drone.label}
            </p>
            <p className="text-[10px] font-mono mb-3" style={{ color: drone.online ? "#70B7FF" : "#EF4444" }}>
              {drone.sublabel}
            </p>

            {/* Specs list */}
            <div
              className="w-full rounded-lg border p-3"
              style={{ backgroundColor: "rgba(6,20,38,0.6)", borderColor: "rgba(148,163,184,0.08)" }}
            >
              {(drone.specs ?? []).map((s) => (
                <p
                  key={s}
                  className="text-[10px] font-mono mb-1"
                  style={{ color: drone.online ? "#A9B8CA" : "rgba(169,184,202,0.35)" }}
                >
                  {s}
                </p>
              ))}
            </div>
          </div>

          {/* Connection arrow between nodes */}
          {i < drones.length - 1 && (
            <ConnectionArrow
              failed={
                (failure && drones[i].label === "Drone 3" && drones[i + 1].label === "Drone 2") ||
                (drones[i].label === "Drone 2" && drones[i + 1].label === "Drone 1")
              }
              active={
                !(
                  (failure && drones[i].label === "Drone 3" && drones[i + 1].label === "Drone 2") ||
                  (failure && drones[i].label === "Drone 2" && drones[i + 1].label === "Drone 1")
                )
              }
            />
          )}

          {/* Arrow to Ground Station after last drone */}
          {i === drones.length - 1 && (
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0">
              {/* Arrow */}
              <div className="flex items-center">
                <div className="h-px w-6 sm:w-10" style={{ backgroundColor: "#2491FF", opacity: 0.7 }} />
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: "5px solid transparent",
                    borderBottom: "5px solid transparent",
                    borderLeft: "8px solid rgba(36,145,255,0.7)",
                  }}
                />
              </div>
              {/* Ground Station */}
              <div
                className="rounded-xl border p-3 flex flex-col items-center gap-2 sm:ml-2"
                style={{ backgroundColor: "#102640", borderColor: "rgba(34,197,94,0.3)", minWidth: 110 }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <rect x="2" y="14" width="20" height="8" rx="2" />
                  <line x1="12" y1="14" x2="12" y2="8" />
                  <circle cx="12" cy="6" r="3" />
                  <line x1="8" y1="4" x2="5" y2="2" />
                  <line x1="16" y1="4" x2="19" y2="2" />
                </svg>
                <p className="text-[10px] font-mono font-bold text-center" style={{ color: "#22C55E" }}>
                  Ground Station
                </p>
                <p className="text-[9px] font-mono text-center" style={{ color: "#A9B8CA" }}>
                  Command &amp; Telemetry
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ConnectionArrow({ failed, active }: { failed: boolean; active: boolean }) {
  const color = failed ? "#EF4444" : "#2491FF";
  return (
    <div className="flex items-center shrink-0 mx-1 sm:mx-2 my-2 sm:my-0">
      <div
        className="h-px"
        style={{
          width: 36,
          backgroundColor: color,
          opacity: active ? 0.9 : 0.45,
          borderTop: failed ? "none" : "none",
          backgroundImage: failed
            ? `repeating-linear-gradient(to right, ${color} 0, ${color} 4px, transparent 4px, transparent 8px)`
            : "none",
          height: 1.5,
        }}
      />
      <div
        style={{
          width: 0,
          height: 0,
          borderTop: "5px solid transparent",
          borderBottom: "5px solid transparent",
          borderLeft: `8px solid ${color}`,
          opacity: 0.7,
        }}
      />
    </div>
  );
}

function TechCard({ name, role, color }: { name: string; role: string; color: string }) {
  return (
    <div
      className="rounded-xl border p-5 transition-all"
      style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${color}40`;
        (e.currentTarget as HTMLElement).style.backgroundColor = "#102640";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(148,163,184,0.12)";
        (e.currentTarget as HTMLElement).style.backgroundColor = "#0B1B30";
      }}
    >
      <div className="w-1 h-4 rounded-full mb-3" style={{ backgroundColor: color }} />
      <p className="text-sm font-semibold mb-1" style={{ color: "#F8FAFC" }}>
        {name}
      </p>
      <p className="text-xs" style={{ color: "#A9B8CA" }}>
        {role}
      </p>
    </div>
  );
}
