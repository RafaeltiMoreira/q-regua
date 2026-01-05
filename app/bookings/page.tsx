import BookingItem from "@/components/booking-item";
import Header from "@/components/header";
import {
  PageContainer,
  PageSectionContent,
  PageSectionTitle,
} from "@/components/ui/page";
import { getUserBookings } from "@/data/bookings";

const BookingsPage = async () => {
  const { confirmedBookings, finishedBookings } = await getUserBookings();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageContainer>
          <h1 className="text-xl font-bold">Agendamentos</h1>

          <PageSectionContent>
            <PageSectionTitle>Confirmados</PageSectionTitle>
            {confirmedBookings.length > 0 ? (
              <div className="flex flex-col gap-3">
                {confirmedBookings.map((booking) => (
                  <BookingItem key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                Nenhum agendamento confirmado.
              </p>
            )}
          </PageSectionContent>

          <PageSectionContent>
            <PageSectionTitle>Finalizados</PageSectionTitle>
            {finishedBookings.length > 0 ? (
              <div className="flex flex-col gap-3">
                {finishedBookings.map((booking) => (
                  <BookingItem key={booking.id} booking={booking} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                Nenhum agendamento finalizado.
              </p>
            )}
          </PageSectionContent>
        </PageContainer>
      </main>
    </div>
  );
};

export default BookingsPage;
