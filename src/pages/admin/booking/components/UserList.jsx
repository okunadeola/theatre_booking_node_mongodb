/* eslint-disable react/prop-types */






import {Card, CardHeader, CardBody, Image,} from "@nextui-org/react";
import { cn } from '../../../../lib/utils';
import { Fragment } from 'react';
import { GiCarSeat } from 'react-icons/gi';


const UserList = ({data, getBook}) => {
    
const getBooking = (userId)=>{
    getBook(userId)
}

    

    return (

        <Fragment>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                {
                    data?.map(user =>(
                    <div   key={user.id}>
                        <div className={cn("relative", user?.bookings?.length && 'cursor-pointer'  )} style={{backgroundImage: `url(${user?.img})`}} onClick={()=> user?.bookings?.length ? getBooking(user?.id) :  {}}>
                           
                            <Card className="py-4  gap-4">
                            <CardHeader className="pb-0 pt-2 px-4 gap-1 flex-col items-start">
                                <p className="text-tiny uppercase font-bold">{user?.name}</p>
                                <small className="text-default-500">{user?.email}</small>
                                <div className='flex gap-1 text-stone-300'>
                                     <GiCarSeat  size={20}/>
                                    <small className=' text-medium text-stone-300'>{user?.bookings?.length}</small>
                                </div>
                            </CardHeader>
                            <CardBody className="overflow-visible h-30 py-2">
                                <Image
                                alt="Card background"
                                className="object-cover rounded-xl"
                                src={`https://ui-avatars.com/api/?name=${user?.username}`}
                                width={100}
                                />
                            </CardBody>
                            </Card>
                        </div>  
                        

                    </div>
                    ))
                }
            </div>




        </Fragment>
    );
}

export default UserList;









