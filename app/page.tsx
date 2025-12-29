import Image from "next/image";

import BarbershopItem from "@/components/barbershop-item";
import BookingItem from "@/components/booking-item";
import Footer from "@/components/footer";
import Header from "@/components/header";
import QuickSearch from "@/components/quick-search";
import {
  PageContainer,
  PageSectionContent,
  PageSectionScroller,
  PageSectionTitle,
} from "@/components/ui/page";
import { getBarbershops, getPopularBarbershops } from "@/data/barbershops";
import Banner from "@/public/banner.png";

export default async function Home() {
  const barbershops = await getBarbershops();
  const popularBarberShops = await getPopularBarbershops();

  return (
    <div>
      <Header />
      <PageContainer>
        <QuickSearch />
        <Image
          src={Banner}
          alt="Agende nas melhores barbearias com a QRégua"
          sizes="100vw"
          className="h-auto w-full rounded-2xl"
        />

        <PageSectionContent>
          <PageSectionTitle>Agendamentos</PageSectionTitle>
          <BookingItem />
        </PageSectionContent>

        <PageSectionContent>
          <PageSectionTitle>Barbearias</PageSectionTitle>
          <PageSectionScroller>
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageSectionScroller>
        </PageSectionContent>

        <PageSectionContent>
          <PageSectionTitle>Populares</PageSectionTitle>
          <PageSectionScroller>
            {popularBarberShops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageSectionScroller>
        </PageSectionContent>
      </PageContainer>

      <Footer />
    </div>
  );
}
