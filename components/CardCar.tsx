'use client'
import { useState } from "react";
import Image from "next/image";
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";
import { calculateCarRent } from "@/utils";

export type CarsProps = {
    city_mpg:number
    class:string
    combination_mpg:number
    cylinders:number
    displacement:number
    drive:string
    fuel_type:string
    highway_mpg:number
    make:string
    model:string
    transmission:string,
    year: number
}

interface Props {
    car: CarsProps
}

export default function CardCar({car}: Props) {
    const carRent = calculateCarRent(car.city_mpg, car.year)

    const [isOpen, setIsOpen] = useState(false)

    return (
    <div className="car-card group">
        <div className="car-card__content">
            <h2 className="car-card__content-title">
                {car.make} {car.model}
            </h2>
        </div>

        <p className="flex mt-6 text-[32px] font-extrabold">
            <span className="self-start text-[14px] font-semibold">$</span>
            {carRent}
            <span className="self-start text-[14px] font-medium">/day</span>
        </p>

        <div className="relative w-full h-40 my-3 object-contain">
            <Image src="/hero.png" fill alt="car model" priority 
             className="object-contain"
            />
        </div>

        <div className="relative flex w-full mt-2">
            <div className="flex group-hover:invisible w-full justify-between text-gray">
                <div className="flex flex-col justify-center items-center gap-2">
                    <Image src="/steering-wheel.svg" width={20} height={20} alt="sterring wheel" />
                    <p className="text-[14px]">
                        {car.transmission === "a" ? "automatic" : "manual"}
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <Image src="/tire.svg" width={20} height={20} alt="tire" />
                    <p className="text-[14px]">
                        {car.drive.toUpperCase()}
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2">
                    <Image src="/gas.svg" width={20} height={20} alt="gas" />
                    <p className="text-[14px]">
                        {car.city_mpg} MPG
                    </p>
                </div>
            </div>

            <div className="car-card__btn-container">
                <CustomButton 
                 title="View More" 
                 containerStyle="w-full py-4 rounded-full bg-primary-blue" 
                 textStyle="text-white text-[14px] leading-[17px] font-bold"
                 rightIcon="/right-arrow.svg"
                 handleClick={() => setIsOpen(true)} 
                />
            </div>
        </div>

        <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
    </div>
    )
}