/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { Pagination } from "@nextui-org/react"
import AllBooking from "./AllBooking"

import Search from "../../../components/others/Search"
import Title from "../../../components/others/Title"
import SwitchTab from "../../../components/others/SwitchTab"
import { useCallback, useEffect, useState } from "react"
import { getAllBookingByMovieForAdminAction, getAllBookingByUserForAdminAction, getAllBookingForAdminAction, getAllBookingMoviesForAdminAction, getAllBookingUsersForAdminAction } from "../../../API/booking"
import MovieCardList from "./components/MovieCardList"
import { MdKeyboardDoubleArrowLeft } from "react-icons/md"
import UserList from "./components/UserList"
import ClaimModal from "./ClaimBooking"


const tabs = [
  {
    Key: "all", label: 'All'
  },
  {
    Key: "movies", label: 'By Movies'
  },
  {
    Key: "users", label: 'By User'
  },
]

const AdminBooking = () => {
  const [selectedTab, setSelectedTab] = useState('all')
  const [allBooking, setAllBooking] = useState([])
  const [allMovie, setAllMovie] = useState([])
  const [allUser, setAllUser] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [currentMovie, setCurrentMovie] = useState(null)
  const rowsPerPage= 10;
  const [totalCount, setTotalCount] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [page, setPage] = useState(1);
  const hasNextPage = Boolean(nextPage);
  const initialPage = 1;
  const [isLoading, setIsLoading] = useState(false);
  const [hasGotBooking, setHasGotBooking] = useState(false);




  useEffect(() => {
      
    const getUserBooking = async ()=>{
      if(selectedTab === "all"){
        setPage(1)
        setHasGotBooking(true)
        onGet()
      }
      else if(selectedTab !== "all"){
        setPage(1)
        setHasGotBooking(false)
      }
    }
    getUserBooking()

  }, [selectedTab])



  const onGet = useCallback( async (next) => {
      switch (selectedTab) {
        case 'all':
          await getAllBooking(next)
          break;
        case 'movies':
          await getBookingByMovie(currentMovie, next)
          break;
        case 'users':
          await getBookingByUser(currentUser, next)
          break;
      
        default:
          break;
      }
  }, [page, selectedTab, currentMovie, currentUser]);


  const togglePage = (next)=>{
    setPage(next)
    onGet(next)
  }

  const pages =  Math.ceil(totalCount / rowsPerPage);




  useEffect(() => {
      const getMovies = async ()=>{
        try {
            const res = await getAllBookingMoviesForAdminAction()
            if(res){
              setAllMovie(res)
            }
        } catch (error) {
          console.log(error)
        }
      }

      getMovies()
  }, [])


  useEffect(() => {
      const getUser = async ()=>{
        try {
            const res = await getAllBookingUsersForAdminAction()
            if(res){
              setAllUser(res)
            }
        } catch (error) {
          console.log(error)
        }
      }

      getUser()
  }, [])
  


  const getAllBooking = async (next)=>{
    try {
      setIsLoading(true)
      const res = await getAllBookingForAdminAction({page:next || initialPage, limit: rowsPerPage})
      if(res){
         setAllBooking(res?.data)
         setTotalCount(res?.totalCount)
         setNextPage(res?.nextPage)
         setIsLoading(false)

      }
   } catch (error) {
      setIsLoading(false)
   }finally{
    setIsLoading(false)
   }
  }
  
  const getBookingByMovie = async (movieId, next)=>{
    setCurrentMovie(movieId)
    setAllBooking([])
      try {
        const json = {
          page: next || initialPage,
          limit: 10,
          movieId: movieId
        }
        const res = await getAllBookingByMovieForAdminAction(json)
        if(res){

          setHasGotBooking(true)
          setAllBooking(res?.data)
          setTotalCount(res?.totalCount)
          setNextPage(res?.nextPage)
        }
      } catch (error) {
        console.log(error)
      }
  }

  const getBookingByUser = async (userId, next)=>{
    setCurrentUser(userId)
    setAllBooking([])
      try {
        const json = {
          page: next || initialPage,
          limit: 10,
          userId: userId 
        }
        const res = await getAllBookingByUserForAdminAction(json)
        if(res){

          setHasGotBooking(true)
          setAllBooking(res?.data)
          setTotalCount(res?.totalCount)
          setNextPage(res?.nextPage)
        }
      } catch (error) {
        console.log(error)
      }
  }


  const setPageTodefault = ()=>{
    setHasGotBooking(false)
    setPage(1)
  }


  console.log(page, pages)


  return (
    <div className="flex flex-col">
      <Title title={'All Booking'}/>

      <div className="flex flex-col bg-stone-100 p-4 py-6  gap-4 rounded">
        <div className="flex gap-2 flex-wrap justify-between">
          <SwitchTab tabs={tabs} selected={selectedTab} setSelected={setSelectedTab} /> 
          <div className="flex gap-2">
             <Search/>
             <ClaimModal/>
          </div>
        </div>
        {
          selectedTab === 'all' && (
            <AllBooking  data={allBooking}/>
          )
        }
        {
          selectedTab === 'movies' && (
            <div>

              {
                hasGotBooking  ? 
                <div className="flex flex-col gap-2">
                <div className="bg-stone-400 text-white w-fit px-3 rounded-lg flex items-center cursor-pointer"  onClick={setPageTodefault}>
                <MdKeyboardDoubleArrowLeft/>
                  Go back to movie</div>
                   <AllBooking  data={allBooking}/> 
              </div> :
              <div>
               <MovieCardList data={allMovie} getBook={getBookingByMovie}/>
              </div>
              }
            </div>
          )
        }
        {
          selectedTab === 'users' && (
              <div>
                 {
                  hasGotBooking  ? 
                  <div className="flex flex-col gap-2">
                    <div className="bg-stone-400 text-white w-fit px-3 rounded-lg flex items-center cursor-pointer" onClick={setPageTodefault}>
                      <MdKeyboardDoubleArrowLeft/>
                      Go back to user
                      </div>
                       <AllBooking  data={allBooking}/> 
                  </div>:
                  <div>
                  <UserList data={allUser} getBook={getBookingByUser}/>
                  </div>
                }
              </div>
          )
        }

        {
          hasGotBooking &&
        <Pagination showControls  total={pages} page={page}  onChange={togglePage} className="mt-2" />
        }
      </div>
    </div>
  )
}

export default AdminBooking
