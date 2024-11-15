

import toast from 'react-hot-toast'

import { format } from 'date-fns';

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, "MMMM d, yyyy, h:mm a");
};


export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  // *** show success toaster ***/
export function showSuccess(msg){
  return toast.success(msg, {duration: 2000})
}

  // *** show error toaster with duration option ***/
export function showError(msg, option){
  if(option) return toast.error(msg, {duration: option})
  return toast.error(msg)
}



  // *** format date string ***/
export const formatDateString = (dateString) => {
  // Create a Date object from the ISO date string
  const date = new Date(dateString);
  
  // Array of day names to format the day of the week
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Array of month names to format the month
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Get the day of the week (0-6)
  const dayOfWeek = dayNames[date.getUTCDay()];
  
  // Get the date of the month (1-31)
  const dayOfMonth = date.getUTCDate();

  // Get the month (0-11)
  const month = monthNames[date.getUTCMonth()];
  
  // Format the date as "DayOfWeek DayOfMonth"
  const newdate = {
    dayOfWeek, dayOfMonth, month
  }
  return newdate;
};


export const formatDateString2 = (dateString) => {
  // Create a Date object from the ISO date string
  const date = new Date(dateString);
  
  // Array of day names to format the day of the week
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Array of month names to format the month
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Get the day of the week (0-6)
  const dayOfWeek = dayNames[date.getUTCDay()];
  
  // Get the date of the month (1-31)
  const dayOfMonth = date.getUTCDate();

  // Get the month (0-11)
  const month = monthNames[date.getUTCMonth()];
  
  // Format the date as "DayOfWeek DayOfMonth"
  const newdate = `${dayOfWeek}, ${dayOfMonth}-${month}`
  
  return newdate;
};  


export const convertToAmPm = (time) => {

  const [hours, minutes] = time.split(':').map(Number);
  let formattedTime;

  if (hours === 0) {
    formattedTime = '12:' + minutes.toString().padStart(2, '0') + ' AM';
  } else if (hours < 12) {
    formattedTime = hours.toString() + ':' + minutes.toString().padStart(2, '0') + ' AM';
  } else if (hours === 12) {
    formattedTime = '12:' + minutes.toString().padStart(2, '0') + ' PM';
  } else {
    formattedTime = (hours - 12).toString() + ':' + minutes.toString().padStart(2, '0') + ' PM';
  }

  return formattedTime;



  // // Split the time string
  // const [hours, minutes, seconds] = time.split(':');
  
  // // Create a new Date object
  // const date = new Date();
  // date.setHours(Number(hours));
  // date.setMinutes(Number(minutes));
  // date.setSeconds(seconds);

  // // Get hours and determine AM/PM
  // let hours12 = date.getHours();
  // const ampm = hours12 >= 12 ? 'PM' : 'AM';
  // hours12 = hours12 % 12;
  // hours12 = hours12 ? hours12 : 12; // the hour '0' should be '12'

  // // Format minutes
  // const minutesFormatted = minutes.padStart(2, '0');

  // // Return formatted time
  // return `${hours12}:${minutesFormatted} ${ampm}`;
};


  // *** re-arrange array element ***/
export const  shuffle = (array)=> {
  let newArray = array.slice(); // Create a copy of the array
  for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}