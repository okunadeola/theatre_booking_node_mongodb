/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Drawer, Space, } from "antd";
import { PlusIcon } from "./PlusIcon";
import { Button } from "@nextui-org/react";
import { TbSend } from "react-icons/tb";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import InputCustom from "../../../../components/others/Input";
import { createMovieAction } from "../../../../API/movies";
import { showSuccess } from "../../../../utils";
import DragImage from "./DragImage";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { X } from "lucide-react";
import axios from "axios";
import useCurrentUser from "../../../../hooks/useCurrentUser";


const AddMovieDrawer = () => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const [fileImage, setFileImage] = useState(null)
  // const [base64Image, setBase64Image] = useState(null)
  const [linkImage, setLinkImage] = useState(null)
  const { userData } = useCurrentUser();

  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm();




  const submit = async (data) => {

    try {
      const res = await createMovieAction(data);
      if (res) {
        showSuccess('movie created successfully')
        // reset();
        // onClose();
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

  // const create = async () => {
  //   toast.loading("sending create request...", { duration: "1000" });

  //   onClose();
  // };




const removeImage = ()=>{
  setFileImage(null)
}


const upload = async () => {
  const formData = new FormData();
  formData.append("file", fileImage);

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
      url: "http://lamp3.ncaa.gov.ng/attachment/addFile",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        token: userData?.token,
      },
    });

    if (res) {
      return res.data;
    }
  } catch (err) {
    if (
      err?.response?.data?.message !==
      "There was an error uploading your file"
    )
      toast.error(err?.response?.data?.message);
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
                placeholder={'www.trailer.com'}
                
              />
            </div>
            <div>
              <label htmlFor="genre" className="text-gray-700">
                Genre (comma seperated)
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
                Image (Url Link)
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
              <label htmlFor="desc" className="text-gray-700">
                Image (File)
              </label>
              {/* <InputCustom
                register={register}
                type="text"
                errors={errors}
                id="img"
                size="large"
                required={true}
              /> */}

              {
                fileImage ? <div className="relative max-h-[10rem]  max-w-[15rem]">

                  <img src={URL.createObjectURL(fileImage)} alt="" className=" max-h-[10rem]  max-w-[15rem]"  /> 

                  <X strokeWidth={3} size={20}  className="absolute top-0 -right-2  text-red-500  bg-white rounded-full border-1 border-red-500 cursor-pointer hover:text-white hover:bg-red-400" onClick={removeImage}/>
                </div> 
                :
                <DragImage setFileImage={setFileImage} /> 
              }

            </div>
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
