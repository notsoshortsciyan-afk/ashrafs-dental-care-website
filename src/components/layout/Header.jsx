import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", to: "/", type: "route" },
  { label: "About", to: "/about", type: "route" },
  { label: "Work", to: "/work", type: "route" },
  { label: "Contact", to: "/contact", type: "route" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-[#e8ebf2]">
      <div className="relative mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="Ashrafs Dental Clinic home">
          <img
            src="/ASSETS/LOGO.png"
            alt=""
            className="h-10 w-10 object-contain"
          />
        </Link>

        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-10 md:flex" aria-label="Primary navigation">
          {navItems.map((item) =>
            item.type === "route" ? (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "text-lg font-semibold transition-colors hover:text-[#0D99E4]/80",
                    isActive ? "text-[#0D99E4]" : "text-[#0D99E4]"
                  )
                }
              >
                {item.label}
              </NavLink>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="text-lg font-semibold text-[#0D99E4] transition-colors hover:text-[#0D99E4]/80"
                onClick={() => {
                  // If not on home page, navigate home first then scroll
                  if (location.pathname !== "/") {
                    window.location.href = "/" + item.href;
                  }
                }}
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/appointment"
            className="inline-flex h-10 items-center rounded-full bg-[#0D99E4] hover:bg-[#0D99E4]/90 px-5 text-sm font-semibold text-white shadow-md transition-colors"
          >
            <span>Appointment</span>
            <div className="w-[1px] h-[14px] bg-white mx-2 opacity-90"></div>
            <Plus className="h-4 w-4 shrink-0" strokeWidth={2.5} />
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#0D99E4]/20 bg-white/60 text-[#0D99E4] md:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-[#0D99E4]/10 bg-[#e8ebf2] transition-[max-height,opacity] duration-300 md:hidden",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 overflow-hidden opacity-0",
        )}
      >
        <nav className="mx-auto flex w-full max-w-7xl flex-col px-4 py-4 sm:px-6" aria-label="Mobile navigation">
          {navItems.map((item) =>
            item.type === "route" ? (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-1 py-3 text-lg font-semibold",
                    isActive ? "text-[#0D99E4]" : "text-[#0D99E4]"
                  )
                }
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-1 py-3 text-lg font-semibold text-[#0D99E4]"
                onClick={() => {
                  setIsOpen(false);
                  if (location.pathname !== "/") {
                    window.location.href = "/" + item.href;
                  }
                }}
              >
                {item.label}
              </a>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
