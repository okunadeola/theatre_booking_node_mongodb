

import toast from 'react-hot-toast'



export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


export function showSuccess(msg){
  return toast.success(msg)
}


export function showError(msg){
  return toast.error(msg)
}