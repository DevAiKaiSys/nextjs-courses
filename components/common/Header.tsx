import { NAV_LINKS } from "@/constants/data";
import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";

const Header = () => {
  return (
    <div>
      {/* Main Header - Hidden when scrolled */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/60 backdrop-blur-md supports-backdrop-filter:bg-background/60">
        <Container className="h-24 flex items-center justify-between">
          {/* logo */}
          <Logo />

          {/* navigation */}
          <div className="hidden lg:flex gap-8 items-center">
            {NAV_LINKS?.map((item) => (
              <Link
                href={item?.href}
                key={item?.label}
                className="relative text-sm font-semibold text-foreground hover:text-primary uppercase tracking-wide hoverEffect group"
              >
                {item?.label}
                <span className="absolute left-0 -bottom-1 bg-primary w-0 h-0.5 group-hover:w-full hoverEffect" />
              </Link>
            ))}
          </div>

          {/* icons bar */}
          <div>
            <div className="flex items-center gap-3">
              <Link href={"/auth/signin"}>
                <button className="border border-primary py-2.5 px-5 rounded-full text-xs font-medium relative overflow-hidden group">
                  <span className="absolute inset-0 bg-primary -translate-y-full group-hover:translate-y-0 hoverEffect" />
                  <span className="z-10 text-primary group-hover:text-primary-foreground hoverEffect relative">
                    Sign In
                  </span>
                </button>
              </Link>
              <Link href={"/auth/signup"}>
                <button className="border border-primary py-2.5 px-5 rounded-full text-xs font-medium relative overflow-hidden group">
                  <span className="absolute inset-0 bg-primary -translate-y-full group-hover:translate-y-0 hoverEffect" />
                  <span className="z-10 text-primary group-hover:text-primary-foreground hoverEffect relative">
                    Sign Up
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </header>
      {/* Sticky Scrolled Header - Appear on Scroll */}
      {/* Mobile Sidebar Overlay */}
      {/* Search Modal */}
    </div>
  );
};

export default Header;
