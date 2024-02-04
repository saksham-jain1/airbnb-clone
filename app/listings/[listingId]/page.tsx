import ClientOnly from "@/app/Components/ClientOnly";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/Components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <div>
      <ClientOnly>
        <ListingClient listing={listing} reservations={reservations} currentUser={currentUser} />
      </ClientOnly>
    </div>
  );
};

export default ListingPage;
