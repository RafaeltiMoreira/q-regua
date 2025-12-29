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
