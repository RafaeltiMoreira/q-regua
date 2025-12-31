import { prisma } from "@/lib/prisma";

export const getBarbershops = async () => {
  try {
    const barbershops = await prisma.barbershop.findMany();
    return barbershops;
  } catch (error) {
    console.error("Error fetching barbershops:", error);
    return [];
  }
};

export const getPopularBarbershops = async () => {
  const popularBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });
  return popularBarbershops;
};

export const getBarbershopById = async (id: string) => {
  const barbershop = await prisma.barbershop.findUnique({
    where: { id },
    include: { services: true },
  });
  return barbershop;
};
