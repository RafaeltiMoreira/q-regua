import Image from "next/image";

import Header from "@/components/header";
import Banner from "@/public/banner.png";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="px-4">
        <Image
          src={Banner}
          alt="Agende nas melhores barbearias com a QRégua"
          sizes="100vw"
          className="h-auto w-full rounded-2xl"
        />
      </div>
    </div>
  );
}
