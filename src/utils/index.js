

import toast from 'react-hot-toast'



export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


export function showSuccess(msg){
  return toast.success(msg)
}


export function showError(msg, option){
  if(option) return toast.error(msg, {duration: option})
  return toast.error(msg)
}




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
  // Split the time string
  const [hours, minutes, seconds] = time.split(':');
  
  // Create a new Date object
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);

  // Get hours and determine AM/PM
  let hours12 = date.getHours();
  const ampm = hours12 >= 12 ? 'PM' : 'AM';
  hours12 = hours12 % 12;
  hours12 = hours12 ? hours12 : 12; // the hour '0' should be '12'

  // Format minutes
  const minutesFormatted = minutes.padStart(2, '0');

  // Return formatted time
  return `${hours12}:${minutesFormatted} ${ampm}`;
};



export const  shuffle = (array)=> {
  let newArray = array.slice(); // Create a copy of the array
  for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}