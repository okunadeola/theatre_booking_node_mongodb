import {Card, CardHeader, CardBody, Image,  Button} from "@nextui-org/react";
import { Edit } from "lucide-react";

export default function UserCard() {
  return (
    <Card className="py-4  gap-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Daily Mix</p>
        <small className="text-default-500">12 Tracks</small>
        <h4 className="font-bold text-large">Frontend Radio</h4>
      </CardHeader>
      <CardBody className="overflow-visible h-30 py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          width={270}
        />
      </CardBody>


      {/* <CardFooter className="justify-between border-white/20 border-t-1 overflow-hidden mt-4  h-10    z-10">

        <p className="text-tiny text-white/80 w-[270px] ">Available soon.</p>
        <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
         Edit
        </Button>
      </CardFooter> */}


      <div className="justify-between  mt-10   z-10 flex px-4">
      <p className="text-tiny text-white/80 w-[270px] ">Available soon.</p>
        <Button className="text-tiny text-black/80 bg-black/20" variant="flat" color="default" radius="lg" size="sm">
          <Edit/>
         Edit
        </Button>
      </div>
    </Card>
  );
}
