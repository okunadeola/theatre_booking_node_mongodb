import BookingCard from "./BookingCard"


const AllBooking = () => {
  return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            <BookingCard />
            <BookingCard />
            <BookingCard />
            <BookingCard />
            <BookingCard />
        </div>
  )
}

export default AllBooking
