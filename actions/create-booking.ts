"use server";

import { isPast } from "date-fns";
import { returnValidationErrors } from "next-safe-action";
import { z } from "zod";

import { protectedActionClient } from "@/lib/action-client";
import { prisma } from "@/lib/prisma";

const inputSchema = z.object({
  serviceId: z.uuid(),
  date: z.date(),
});

export const createBooking = protectedActionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput: { serviceId, date }, ctx: { user } }) => {
    if (isPast(date)) {
      returnValidationErrors(inputSchema, {
        _errors: ["A data selecionada já passou."],
      });
    }
    const service = await prisma.barbershopService.findUnique({
      where: {
        id: serviceId,
      },
    });
    if (!service) {
      returnValidationErrors(inputSchema, {
        _errors: ["Serviço não encontrado."],
      });
    }
    const existingBooking = await prisma.booking.findFirst({
      where: {
        barbershopId: service.barbershopId,
        date,
      },
    });
    if (existingBooking) {
      returnValidationErrors(inputSchema, {
        _errors: ["Data e hora selecionadas já estão reservados."],
      });
    }
    const booking = await prisma.booking.create({
      data: {
        serviceId,
        date: date.toISOString(),
        userId: user.id,
        barbershopId: service.barbershopId,
      },
    });
    // console.log("Banco (Date):", booking?.date);
    // console.log("Horário Brasil:", booking?.date.toLocaleTimeString("pt-BR"));
    return booking;
  });
