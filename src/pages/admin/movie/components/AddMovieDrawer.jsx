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


const AddMovieDrawer = () => {
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();

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
                Trailer
              </label>
              <InputCustom
                register={register}
                type="text"
                errors={errors}
                id="trailer"
                size="large"
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
                Image
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
