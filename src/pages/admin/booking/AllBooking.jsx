/* eslint-disable react/prop-types */
import BookingCard from "./BookingCard"


const AllBooking = ({data}) => {






  return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {
            data?.map(bb =>(
              <BookingCard key={bb?.id} data={bb} />
            ))
          }
        </div>
  )
}

export default AllBooking
