import Image from "next/image";
import Link from "next/link";

import { Barbershop } from "@/generated/prisma/client";

interface BarbershopItemProps {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <div className="relative min-h-50 min-w-72.5 rounded-xl">
      <Link
        href={`/barbershops/${barbershop.id}`}
        className="relative block h-full w-full rounded-xl"
      >
        <div className="absolute top-0 left-0 z-10 h-full w-full rounded-xl bg-gradient-to-t from-black to-transparent" />

        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="rounded-xl object-cover"
        />

        <div className="absolute right-0 bottom-0 left-0 z-20 p-4">
          <h3 className="text-background text-lg font-bold">
            {barbershop.name}
          </h3>
          <p className="text-background text-xs">{barbershop.address}</p>
        </div>
      </Link>
    </div>
  );
};

export default BarbershopItem;
