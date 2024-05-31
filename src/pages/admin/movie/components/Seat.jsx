import PropTypes from "prop-types";

const Seat = ({status, tag, onClick}) => {
  return (
      <div className={`w-14 h-14  rounded-2xl relative overflow-clip  ${status === "free" ? 'bg-white cursor-pointer' : status === 'reserved' ? 'bg-gray-500' : 'bg-yellow-700 cursor-pointer'}`} onClick={ status === "reserved" ? ()=>{} : ()=>onClick(tag)}>

        <div className="w-1 h-7 bg-gray-700 rotate-[100deg] absolute top-0 left-0"></div>

        <div className="w-1 h-7 bg-gray-700 -rotate-[100deg] absolute top-0 right-0"></div>

        <div className="w-1 h-9 bg-gray-700 rotate-[130deg] absolute -bottom-3 right-0"></div>

        <div className="w-1 h-9 bg-gray-700 -rotate-[130deg] absolute -bottom-3 left-0"></div>

        <div className="w-1 h-7 bg-gray-700 -rotate-[90deg] absolute bottom-1 left-[1.7rem]"></div>

        <div className="w-1 h-[1.59rem] bg-gray-700 rotate-[180deg] absolute bottom-4  left-[0.8rem]"></div>

        <div className="w-1 h-[1.59rem] bg-gray-700 rotate-[180deg] absolute bottom-4  right-[0.8rem]"></div>

        <div className="absolute bottom-0 left-6">
          <span className={`text-[0.5rem]  font-light ${status === 'reserved' ? 'text-gray-900' : status === 'free' ? "text-gray-500" : "text-gray-200"}`}>{tag}</span>
        </div>

      </div>
  )
}

export default Seat
Seat.propTypes = {
    status: PropTypes.string,
    tag: PropTypes.string,
    onClick: PropTypes.func,
  };
