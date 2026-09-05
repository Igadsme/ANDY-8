const team = [
  {
    name: "Imani Gad",
    role: "Systems/Integration Engineer",
    focus: "System architecture, hardware integration, project coordination, schedule and risk management.",
    initials: "IG",
    color: "#2491FF",
    unsplashId: "photo-1508214751196-bcfd4ca60f91",
  },
  {
    name: "Maryam Baban",
    role: "Project Documentation & Software Developer",
    focus: "Requirements, progress tracking, reports, presentations and coding support.",
    initials: "MB",
    color: "#A855F7",
    unsplashId: "photo-1573497019940-1c28c88b4f3e",
  },
  {
    name: "Carlos Guerrero",
    role: "Mesh Networking & Software Developer",
    focus: "Routing logic, telemetry processing, automated testing and software implementation.",
    initials: "CG",
    color: "#22C55E",
    unsplashId: "photo-1506794778202-cad84cf45f1d",
  },
  {
    name: "Harom Andargachew",
    role: "Ground-Station & Dashboard Developer",
    focus: "Backend services, telemetry visualization, dashboard implementation and integration.",
    initials: "HA",
    color: "#F59E0B",
    unsplashId: "photo-1531384441138-2736e62e0919",
  },
  {
    name: "Mekai Matia",
    role: "Prototype & Systems Engineer",
    focus: "3D-printed prototypes, mechanical integration, payload mounting and hardware testing.",
    initials: "MM",
    color: "#70B7FF",
    unsplashId: "photo-1500648767791-00dcc994a43e",
  },
];

export default function TeamPage({ navOffset }: { navOffset: string }) {
  return (
    <div className={`min-h-screen ${navOffset}`} style={{ backgroundColor: "#061426" }}>
      {/* Header */}
      <div className="border-b bg-grid" style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "#70B7FF" }}>
            People
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "#F8FAFC" }}>
            Meet the ANDY-8 RED Team
          </h1>
          <p className="text-base" style={{ color: "#A9B8CA" }}>
            Five engineers · CS 4850 Senior Project · Fall 2026
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Team grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map(({ name, role, focus, initials, color, unsplashId }) => (
            <div
              key={name}
              className="rounded-xl border overflow-hidden transition-all group"
              style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${color}40`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(148,163,184,0.12)")}
            >
              {/* Avatar area */}
              <div
                className="relative h-48 flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: `${color}10` }}
              >
                <img
                  src={`https://images.unsplash.com/${unsplashId}?w=400&h=400&fit=crop&auto=format&face`}
                  alt={`${name} — professional headshot placeholder`}
                  className="absolute inset-0 w-full h-full object-cover object-top opacity-40"
                  style={{ backgroundColor: `${color}10` }}
                  loading="lazy"
                />
                <div
                  className="relative w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold font-mono border-2 z-10"
                  style={{ backgroundColor: `${color}20`, borderColor: color, color }}
                >
                  {initials}
                </div>
                <div
                  className="absolute bottom-3 right-3 w-2 h-2 rounded-full z-10"
                  style={{ backgroundColor: color }}
                />
              </div>

              {/* Info */}
              <div className="p-5">
                <p className="font-bold text-base mb-1" style={{ color: "#F8FAFC" }}>
                  {name}
                </p>
                <p className="text-xs font-mono mb-3" style={{ color }}>
                  {role}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#A9B8CA" }}>
                  {focus}
                </p>
              </div>
            </div>
          ))}

          {/* Team stats */}
          <div
            className="rounded-xl border p-5"
            style={{ backgroundColor: "#0B1B30", borderColor: "rgba(148,163,184,0.12)" }}
          >
            <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: "#70B7FF" }}>
              Team Stats
            </p>
            <div className="space-y-5">
              {[
                { label: "Team Size", value: "5 Engineers" },
                { label: "Total Planned Hours", value: "592 hrs" },
                { label: "Planned Tasks", value: "31 tasks" },
                { label: "Semester", value: "Fall 2026" },
                { label: "Course", value: "CS 4850" },
                { label: "Repository", value: "drones-dev" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[10px] font-mono uppercase tracking-widest mb-1" style={{ color: "#A9B8CA" }}>
                    {label}
                  </p>
                  <p className="text-sm font-semibold" style={{ color: "#F8FAFC" }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
