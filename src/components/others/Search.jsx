import { cn } from "../../lib/utils"
import PropTypes from 'prop-types';

const Search = ({roundedSm}) => {
  return (
    <input
    placeholder="Search..."
    autoComplete="off"
    className={
      cn("mb-5 !bg-transparent border-1 border-[#d4d7e2] focus:border-[#87888f] outline-none  appearance-none placeholder:!text-[#626367] !text-[#ccc] px-4 py-2  w-[15rem] placeholder:text-sm", roundedSm ? "rounded-md" : "rounded-full" )}
    />
  )
}


Search.propTypes = {
  roundedSm : PropTypes.string
}

export default Search
