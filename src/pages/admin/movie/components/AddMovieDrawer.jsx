/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Drawer, Space, } from "antd";
import { PlusIcon } from "./PlusIcon";
import { Button } from "@nextui-org/react";
import { TbSend } from "react-icons/tb";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import InputCustom from "../../../../components/others/Input";
import { createMovieAction, createMovieWithImageUrlAction } from "../../../../API/movies";
import { showError, showSuccess } from "../../../../utils";
import DragImage from "./DragImage";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { X } from "lucide-react";
import axios from "axios";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { useNavigate } from "react-router-dom";


const AddMovieDrawer = () => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const [fileImage, setFileImage] = useState(null)
  const [linkImage, setLinkImage] = useState(null)
  const { userData } = useCurrentUser();
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();




  const submit = async (data) => {
    // // if you are using form data approach  
    // if(!fileImage){
    //   toast.error('image is required')
    //   return // return will stop the operation.  
    // }
    // await upload(data)

    // OR 

    try {
      const res = await createMovieWithImageUrlAction(data);
      if (res) {
        showSuccess('movie created successfully')
        reset();
      }
    } catch (error) {
      toast.error(error?.toString());
    }
  };






  const showLargeDrawer = () => {
    setSize("large");
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };





const removeImage = ()=>{
  setFileImage(null)
}


const upload = async (data) => {
  const formData = new FormData();
  formData.append("img", fileImage);
  formData.append("title", data?.title);
  formData.append("description", data?.description);
  formData.append("price", data?.price);
  formData.append("genre", data?.genre);
  formData.append("movie_length", data?.movie_length);
  formData.append("dateRelease", data?.dateRelease);
  formData.append("trailer", data?.triler);

  // console.log(formData, file)
  const res = await uploadFile(formData);
  if (res) {
    // console.log(res)
    return res;
  }
};

const uploadFile = async (formData) => {
  try {
    const res = await axios({
      method: "post",
      url: "http://localhost:3000/movies/create",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        token:`Bearer ${userData?.token}`,
      },
    });

    if (res) {
      showSuccess('movie created successfully')
      reset();
      return res?.data;
    }
  } catch (err) {
    showError(err?.response?.data?.errors?.length ?  err?.response?.data?.errors[0]?.toString()  :  err?.response?.data?.toString())
   
  }
};






  return (
    <>
      <Space>
        <Button
          color="primary"
          endContent={<PlusIcon />}
          onClick={showLargeDrawer}
        >
          Add New
        </Button>
      </Space>
      <Drawer placement="right" size={size} onClose={onClose} open={open}>
        <form
          onSubmit={handleSubmit(submit)}
          className="flex gap-3 flex-col px-10 pt-5"
        >
          <div>
            <span className="font-bold text-2xl text-gray-700">
              Create New Movie
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 py-2">
            <div>
              <label htmlFor="title" className="text-gray-700">
                Movie Name
              </label>
              <InputCustom
                register={register}
                type="text"
                errors={errors}
                id="title"
                size="large"
                required={true}
              />
            </div>
           
            <div>
              <label htmlFor="price" className="text-gray-700">
                Price
              </label>
              <InputCustom
                register={register}
                type="text"
                errors={errors}
                id="price"
                size="large"
                required={true}
              />
            </div>

            <div>
              <label htmlFor="trailer" className="text-gray-700">
                Trailer <span className="bg-blue-100 px-1">Youtube or other Url Link</span> 
              </label>
              <InputCustom
                register={register}
                type="text"
                errors={errors}
                id="trailer"
                size="large"
                placeholder={'https://www.youtube.com/embed/727bnqhwhjw'}
                
              />
            </div>
            <div>
              <label htmlFor="genre" className="text-gray-700">
                Genre <span className="bg-blue-100 px-1">Comma seperated</span>
              </label>
              <InputCustom
                register={register}
                type="text"
                errors={errors}
                id="genre"
                size="large"
                required={true}
              />
            </div>
            <div>
              <label htmlFor="length" className="text-gray-700">
                Movie Length
              </label>
              <InputCustom
                register={register}
                type="text"
                errors={errors}
                id="movie_length"
                size="large"
                required={true}
              />
            </div>
            <div>
              <label htmlFor="date" className="text-gray-700">
                Date Release
              </label>
              <InputCustom
                register={register}
                type="date"
                errors={errors}
                id="dateRelease"
                size="large"
                required={true}
              />
            </div>


            <div>
              <label htmlFor="desc" className="text-gray-700">
                Image <span className="bg-blue-100 px-1">Url Link</span> 
              </label>
              <InputCustom
                register={register}
                type="text"
                errors={errors}
                id="img"
                size="large"
                required={true}
              />
            </div>
            <div>
              <label htmlFor="description" className="text-gray-700">
                Movie Description
              </label>
              <InputCustom
                register={register}
                type="text"
                errors={errors}
                id="description"
                size="large"
                required={true}
                inputType={'textarea'}
              />
            </div>



            {/* if you want to use file image. you can hide  (Image Url Link input wrapper) and uncomment the div below. In this case you will create movie with the method (upload) above. For this you need to validate img (fileImage) and ensure it is not null before you go ahead */}
            {/* <div>
              <label htmlFor="desc" className="text-gray-700">
                Image (File)
              </label>

              {
                fileImage ? <div className="relative max-h-[10rem]  max-w-[15rem]">

                  <img src={URL.createObjectURL(fileImage)} alt="" className=" max-h-[10rem]  max-w-[15rem]"  /> 

                  <X strokeWidth={3} size={20}  className="absolute top-0 -right-2  text-red-500  bg-white rounded-full border-1 border-red-500 cursor-pointer hover:text-white hover:bg-red-400" onClick={removeImage}/>
                </div> 
                :
                <DragImage setFileImage={setFileImage} /> 
              }

            </div> */}

          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              color="primary"
              startContent={<TbSend />}
            >
              Create Movie
            </Button>
          </div>
        </form>
      </Drawer>
    </>
  );
};

export default AddMovieDrawer;
