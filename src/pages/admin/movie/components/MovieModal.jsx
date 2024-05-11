/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import { useState } from "react";
import { Drawer } from "antd";

import { Chip, Button, useDisclosure } from "@nextui-org/react";
import { TbSend } from "react-icons/tb";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import InputCustom from "../../../../components/others/Input";
import { createMovieAction } from "../../../../API/movies";
import { showSuccess } from "../../../../utils";
import { PlusIcon } from "./PlusIcon";
import ShowModal from "./ShowModal";

const lvRating = {
  0: "⭐️",
  1: "⭐️",
  2: "⭐️⭐️",
  3: "⭐️⭐️⭐️",
  4: "⭐️⭐️⭐️⭐️",
  5: "⭐️⭐️⭐️⭐️⭐️",
};

const MovieModal = ({ isOpen, onClose, data }) => {
  const { onOpen, isOpen: hasOpen, onClose: isClose } = useDisclosure();

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
        showSuccess("movie created successfully");
        // reset();
        // onClose();
      }
    } catch (error) {
      toast.error(error?.toString());
    }
  };

  // const create = async () => {
  //   toast.loading("sending create request...", { duration: "1000" });

  //   onClose();
  // };

  const openShow = () => {
    onOpen();
  };

  return (
    <>
      <Drawer
        placement="right"
        size={"large"}
        onClose={onClose}
        open={isOpen}
        maskClosable={false}
      >
        <div className="flex flex-col gap-3 p-2">
          <div className="flex gap-6 flex-wrap">
            <div className="h-[18rem] md:w-[42%] w-full  rounded-3xl inline-flex relative">
              <img
                src={data?.img}
                alt=""
                className=" rounded-3xl w-full max-h-full inline-flex"
              />
              <div className=" h-full w-full rounded-3xl absolute bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(1,1,2,0.8))] "></div>
            </div>

            <div className="flex flex-col gap-5  flex-1">
              <div className="flex gap-4 flex-wrap">
                <span className="text-xl font-bold text-gray-700 font-Roboto capitalize tracking-widest">
                  {data?.title}
                </span>
                <span className="text-lg font-bold text-gray-700 font-Roboto capitalize">
                  {lvRating[data?.averageRating]}{" "}
                </span>
              </div>

              <div className="">
                <div className=" w-fit   text-xl rounded-lg font-Poppins  font-semibold text-gray-600 tracking-wider">
                  #{data?.price}
                </div>
              </div>

              <div className="w-fit flex gap-2 rounded-md font-Poppins">
                {data?.genre?.split(",")?.map((gn, i) => (
                  <Chip key={i}>{gn}</Chip>
                ))}
              </div>
            </div>
          </div>

          <div className=" bg-stone-500/10 min-h-10 rounded-md p-5 font-Roboto mb-6">
            <span className="text-gray-600 font-Poppins">{data?.description}</span>
          </div>

          <div className="flex flex-col gap-5 bg-slate-50 w-full rounded-md mb-6 font-Poppins">
            <div className="flex justify-between items-center p-2  gap-2 flex-wrap">
              <span className="text-lg text-gray-600">Show Date</span>
              <Button>
                <PlusIcon /> Add Show Date{" "}
              </Button>
            </div>
            <div className="flex gap-3 overflow-x-auto w-full scrollbar-hide p-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]?.map((mv) => (
                <div
                  key={mv}
                  className="rounded-3xl min-w-[4.8rem] h-26 bg-gray-500/90 p-1 items-center text-xl flex flex-col gap-4"
                >
                  <div className="w-2 h-2 rounded-full bg-gray-700"></div>
                  <div className="text-white">
                    {mv % 2 === 0 ? "Fri" : "Sat"}
                  </div>
                  <div className="text-white text-2xl">{mv}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5 bg-slate-50 w-full rounded-md font-Poppins">
            <div className="flex justify-between items-center p-2 gap-2 flex-wrap">
              <span className="text-lg text-gray-600">Show Time For Sat 9</span>
              <Button>
                <PlusIcon /> Add Show Time{" "}
              </Button>
            </div>
            <div className="flex gap-3 overflow-x-auto w-full scrollbar-hide p-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]?.map((mv) => (
                <div
                  key={mv}
                  onClick={openShow}
                  className="rounded-xl min-w-36 h-12 bg-gray-600/90 p-2 px-4 items-center text-lg flex flex-col gap-4 cursor-pointer"
                >
                  <div className="text-white">
                    {mv % 2 === 0 ? "11:30 AM" : "3:30 PM"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Drawer>

      <ShowModal onClose={isClose} isOpen={hasOpen} data={data} />
    </>
  );
};

export default MovieModal;
