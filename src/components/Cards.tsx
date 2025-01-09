import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

type CardProps = {
    heading: string;
    svg: string;
    content: string
}

const Cards = ({ heading, svg,content }: CardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row gap-3 justify-start items-center">
        <Image src={svg} width={35} height={35} alt="svg" />
        <CardTitle>{heading}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
         {content}
        </p>
      </CardContent>
    </Card>
  );
};

export default Cards;
