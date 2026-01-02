// import { MenuIcon } from "lucide-react";
import Image from "next/image";

import MenuSheet from "./menu-sheet";
// import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="bg-background flex items-center justify-between px-5 py-6">
      <Image src="/logo-qregua.png" alt="Logo QRégua" width={91} height={24} />
      {/* <Button variant="outline" size="icon">
        <MenuIcon />
      </Button> */}
      <MenuSheet />
    </header>
  );
};

export default Header;
