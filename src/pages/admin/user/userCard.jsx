/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { Eye } from "lucide-react";
import { MdPayment } from "react-icons/md";

import Currency from "react-currency-formatter";
import TransferPopup from "./TransferPopup";

export default function UserCard({ data, onClick }) {
  return (
    <Card className="py-4  gap-4 !min-w-[15.5rem] max-w-[17.5rem]">
      <CardHeader className="pb-0 pt-2 px-4 gap-1 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{data?.name}</p>
        <small className="text-default-500">{data?.email}</small>
      </CardHeader>
      <CardBody className="overflow-visible h-30 py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={`https://ui-avatars.com/api/?name=${data?.username}`}
          width={100}
        />
      </CardBody>

      <div className="  flex mt-10   z-10  gap-5 px-4">
        <Button
          className="text-tiny text-black/80 cursor-none"
          variant="light"
          radius="lg"
          size="sm"
        >
          <MdPayment size={15} />
          <Currency quantity={data?.account_balance || 0} currency="NGN" />

        </Button>
        <TransferPopup user={data} />
        <Button
          className="text-tiny text-black/80 bg-black/20"
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
          onClick={onClick}
        >
          <Eye size={15} />
          Ticket
        </Button>
      </div>
    </Card>
  );
}
