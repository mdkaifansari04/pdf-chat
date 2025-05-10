import React from "react";
import { FadeImg } from "../ui/fade-img";

function Logo() {
  return (
    <div>
      <FadeImg className="dark:hidden" src="/logo/ai-planet.svg" alt="logo" />
      <FadeImg className="hidden dark:block" src="/logo/ai-planet-dark.svg" alt="logo" />
    </div>
  );
}

export default Logo;
