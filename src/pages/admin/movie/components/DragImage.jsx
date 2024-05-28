/* eslint-disable react/prop-types */

import { Camera } from 'lucide-react';
import  { useState } from 'react';

function DragImage({setFileImage}) {
  const [dragging, setDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const files = Array.from(e.dataTransfer.files);
    // Assuming only one file is dropped
    const imageFile = files[0];
    setFileImage(imageFile)

    // if (imageFile.type.startsWith('image/')) {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     // Do something with the image data (e.g., display preview)
    //     const imageDataUrl = reader.result;
    //     console.log(imageDataUrl);
    //     setBase64Image(imageDataUrl)
    //   };
    //   reader.readAsDataURL(imageFile);
    // } else {
    //   alert('Please drop an image file.');
    // }



    // if (imageFile.type.startsWith('image/')) {
    //     const reader = new FormData();
    //     const image = reader.append('img', imageFile)
    //     console.log(image, imageFile)
    //     setFileImage(imageFile)

    // }  
  };

  return (

    <label htmlFor="img2">
        <div
          className={`dropzone ${dragging ? 'dragging border-3 border-green-400' : 'border-2 border-blue-200'}  flex items-center justify-center border-dashed py-10 cursor-pointer rounded-xl`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
            <div className='flex flex-col gap-2 items-center justify-center'>
                    <p>Drag & drop an image here</p>

                    <div className="pt-3 flex justify-between flex-wrap cursor-pointer">
                        <label
                        htmlFor="img2"
                        className="px-6 py-2 rounded outline-none border inset-0  flex space-x-2 items-center cursor-pointer"
                        >
                        <Camera size={15} />
                        <span className="font-semibold text-sm">Select Image</span>
                        </label>
                    
                    </div>
            </div>

                <input
                    type="file"
                    className="hidden"
                    accept=".jpg, .jpeg, .png, .gif"
                    id="img2"
                    onChange={(e) => setFileImage(e.target.files[0])}
                />
        </div>
    </label>
  );
}

export default DragImage;
