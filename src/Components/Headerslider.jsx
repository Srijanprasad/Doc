import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  Code2,
  Gamepad2,
  House,
  Mail,
  UserRound,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  { label: "Home", to: "/", icon: <House size={15} strokeWidth={1.8} />, end: true },
  { label: "Work", to: "/projects", icon: <Code2 size={15} strokeWidth={1.8} /> },
  { label: "Experience", to: "/experience", icon: <BriefcaseBusiness size={15} strokeWidth={1.8} /> },
  { label: "Awards", to: "/certifications", icon: <Award size={15} strokeWidth={1.8} /> },
  { label: "Writing", to: "/blog", icon: <BookOpen size={15} strokeWidth={1.8} /> },
  { label: "About", to: "/about", icon: <UserRound size={15} strokeWidth={1.8} /> },
  { label: "Play", to: "/play", icon: <Gamepad2 size={15} strokeWidth={1.8} /> },
  { label: "Contact", to: "/contacts", icon: <Mail size={15} strokeWidth={1.8} /> },
];

function Headerslider() {
  return (
    <header className="border-b border-white/10 pb-3 pt-5">
      <div className="mb-4 flex items-center gap-3">
        <img
          src="/srijan-prasad-photo.jpg"
          alt=""
          className="h-10 w-10 rounded-xl object-cover object-top"
        />
        <div>
          <p className="text-sm font-semibold text-white">Srijan Prasad</p>
          <p className="text-xs text-slate-400">Software Developer</p>
        </div>
      </div>
      <nav
        aria-label="Main navigation"
        className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1"
      >
        {navigation.map(({ label, to, icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs transition-colors ${
                isActive
                  ? "bg-white/[0.1] text-white"
                  : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
              }`
            }
          >
            {icon}
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Headerslider;
