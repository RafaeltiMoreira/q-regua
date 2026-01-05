"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

import { createBooking } from "@/actions/create-booking";
import { Barbershop, BarbershopService } from "@/generated/prisma/client";
import { useGetDateAvailableTimeSlots } from "@/hooks/data/use-get-date-availabe-time-slots";
import { formatCurrency } from "@/lib/utils";

import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Card, CardContent } from "./ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface ServiceItemProps {
  service: BarbershopService;
  barbershop: Barbershop;
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const { executeAsync: executeCreateBooking, isPending: isCreatingBooking } =
    useAction(createBooking);
  const { data: availableTimeSlots } = useGetDateAvailableTimeSlots({
    barbershopId: barbershop.id,
    date: selectedDate,
  });

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(undefined);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime) {
      return;
    }
    const splittedTime = selectedTime.split(":");
    const hours = Number(splittedTime[0]);
    const minutes = Number(splittedTime[1]);
    const date = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      hours,
      minutes,
      0,
      0,
    );
    const result = await executeCreateBooking({
      date,
      serviceId: service.id,
    });
    if (result.validationErrors) {
      return toast.error(result.validationErrors._errors?.[0]);
    }
    if (result.serverError) {
      return toast.error(
        "Erro ao criar agendamento. Por favor, tente novamente.",
      );
    }
    toast.success("Agendamento reservado com sucesso!");
    setSheetIsOpen(false);
    setSelectedDate(undefined);
    setSelectedTime(undefined);
  };

  return (
    <div className="border-border bg-card flex gap-3 rounded-2xl border p-3">
      <div className="relative h-27.5 w-27.5 shrink-0">
        <Image
          src={service.imageUrl}
          alt={service.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
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

          <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
            <SheetTrigger asChild>
              <Button className="rounded-full" size="sm">
                Reservar
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto px-0 pb-0">
              <SheetHeader className="border-border border-b px-5 py-6">
                <SheetTitle>Fazer Reserva</SheetTitle>
                <SheetDescription>
                  Selecione a data e o horário
                </SheetDescription>
              </SheetHeader>

              <div className="border-border border-b px-5 py-6">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  locale={ptBR}
                  className="w-full p-0"
                  disabled={{ before: new Date() }}
                  classNames={{
                    cell: "w-full",
                    day: "w-[36px] h-[36px] mx-auto text-sm bg-transparent hover:bg-muted rounded-full data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground",
                    head_cell:
                      "w-full text-xs font-normal text-muted-foreground capitalize",
                    caption: "capitalize",
                    caption_label: "text-base font-bold",
                    nav: "flex gap-1 absolute right-0 top-0 z-10",
                    nav_button_previous:
                      "w-7 h-7 bg-transparent border border-border rounded-lg hover:opacity-100 hover:bg-transparent",
                    nav_button_next:
                      "w-7 h-7 bg-muted text-muted-foreground rounded-lg hover:opacity-100 hover:bg-muted",
                    month_caption:
                      "flex justify-start pt-1 relative items-center w-full px-0",
                  }}
                />
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className="border-border flex gap-3 overflow-x-auto border-b px-5 py-6 [&::-webkit-scrollbar]:hidden">
                  {availableTimeSlots?.data?.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      className="rounded-full"
                      onClick={() => handleTimeSelect(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              )}

              {/* Booking Summary */}
              {selectedDate && selectedTime && (
                <div className="px-5 py-6">
                  <Card>
                    <CardContent className="flex flex-col gap-3 p-3 py-0">
                      <div className="flex items-center justify-between">
                        <h2 className="font-bold">{service.name}</h2>
                        <p className="text-sm font-bold">
                          {formatCurrency(service.priceInCents)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground text-sm">Data</p>
                        <p className="text-sm">
                          {format(selectedDate, "d 'de' MMMM", {
                            locale: ptBR,
                          })}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground text-sm">Horário</p>
                        <p className="text-sm">{selectedTime}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-muted-foreground text-sm">
                          Barbearia
                        </p>
                        <p className="text-sm">{barbershop.name}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              <SheetFooter className="px-5 pb-6">
                <Button
                  className="w-full"
                  disabled={!selectedDate || !selectedTime || isCreatingBooking}
                  onClick={handleConfirmBooking}
                >
                  {isCreatingBooking ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    "Confirmar"
                  )}
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
