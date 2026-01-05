import Image from "next/image";
import Link from "next/link";

import MenuSheet from "./menu-sheet";

const Header = () => {
  return (
    <header className="bg-background flex items-center justify-between px-5 py-6">
      <Link href="/">
        <Image
          src="/logo-qregua.png"
          alt="Logo QRégua"
          width={91}
          height={24}
          className="h-auto w-auto"
        />
      </Link>
      <MenuSheet />
    </header>
  );
};

export default Header;
