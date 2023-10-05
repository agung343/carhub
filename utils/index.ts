import type { FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
    const headers = {
        'X-RapidAPI-Key': '7e58c68f81msh96dacb4c4c4694fp14d9cejsn4cbfd5b785c8',
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }
    const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${filters.manufacturer}&year=${filters.year}&model=${filters.model}&limit=${filters.limit}&fuel_type=${filters.fuel}`;

    const response = await fetch(url, {
        headers: headers
    })

    const resData = await response.json()

    return resData
};

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // in dollars

    const mileageFactor = 0.1 // rate per mile

    const ageFactor = 0.5

    //calculate addtional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor

    //calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageFactor + ageRate

    return rentalRatePerDay.toFixed(0)
}


export const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set(type, value)

    const newPathname = `${window.location.search}?${searchParams.toString()}`

    return newPathname
}