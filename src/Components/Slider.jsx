import { ArrowUpRight, Award, BookOpen, BriefcaseBusiness, Code2, Gamepad2, House, Mail, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  { label: "Home", to: "/", icon: <House size={17} strokeWidth={1.8} />, end: true },
  { label: "Projects", to: "/projects", icon: <Code2 size={17} strokeWidth={1.8} /> },
  { label: "Experience", to: "/experience", icon: <BriefcaseBusiness size={17} strokeWidth={1.8} /> },
  { label: "Certifications", to: "/certifications", icon: <Award size={17} strokeWidth={1.8} /> },
  { label: "Writing", to: "/blog", icon: <BookOpen size={17} strokeWidth={1.8} /> },
  { label: "About", to: "/about", icon: <UserRound size={17} strokeWidth={1.8} /> },
  { label: "Play", to: "/play", icon: <Gamepad2 size={17} strokeWidth={1.8} /> },
  { label: "Contact", to: "/contacts", icon: <Mail size={17} strokeWidth={1.8} /> },
];

function Slider() {
  return (
    <aside className="flex h-full flex-col py-10">
      <div className="mb-9 flex items-center gap-4">
        <img
          src="/srijan-prasad-photo.jpg"
          alt="Srijan Prasad"
          className="h-16 w-16 rounded-2xl border border-white/10 object-cover object-top"
        />
        <div>
          <p className="text-base font-semibold tracking-tight text-white">
            Srijan Prasad
          </p>
          <p className="mt-1 text-sm text-slate-400">Software Developer</p>
        </div>
      </div>

      <div className="mb-8 flex items-center gap-2 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-2.5 text-xs font-medium text-emerald-300">
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        Open to opportunities
      </div>

      <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        Navigate
      </p>
      <nav aria-label="Main navigation" className="flex flex-col gap-1">
        {navigation.map(({ label, to, icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? "bg-white/[0.08] font-medium text-white"
                  : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-100"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`[&_svg]:text-slate-500 group-hover:[&_svg]:text-slate-300 ${
                    isActive ? "[&_svg]:text-cyan-300" : ""
                  }`}
                >
                  {icon}
                </span>
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <a
        href="https://github.com/Srijanprasad"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto flex items-center justify-between border-t border-white/10 pt-5 text-sm text-slate-400 transition-colors hover:text-white"
      >
        <span>GitHub</span>
        <ArrowUpRight aria-hidden="true" size={16} />
      </a>
    </aside>
  );
}

export default Slider;
