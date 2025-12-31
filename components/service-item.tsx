import Image from "next/image";

import { BarbershopService } from "@/generated/prisma/client";
import { formatCurrency } from "@/lib/utils";

import { Button } from "./ui/button";

interface ServiceItemProps {
  service: BarbershopService;
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <div className="border-border bg-card flex gap-3 rounded-2xl border p-3">
      <div className="relative h-27.5 w-27.5 shrink-0">
        <Image
          src={service.imageUrl}
          alt={service.name}
          fill
          className="rounded-xl object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div className="space-y-1">
          <p className="text-sm font-bold">{service.name}</p>
          <p className="text-muted-foreground text-sm">{service.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold">
            {formatCurrency(service.priceInCents)}
          </p>
          <Button className="rounded-full" size="sm">
            Reservar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
