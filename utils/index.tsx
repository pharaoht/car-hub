import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps){

    const { manufacturer, model, limit, fuel, year } = filters;

    const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`;

    const header = {
		'X-RapidAPI-Key': `${process.env.API_KEY}`,
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
	};

    const response = await fetch(url, { headers: header });

    const result = await response.json();

    return result;
};

export const calculateCarRent = ( city_mpg: number, year: number ) => {

    const basePricePerDay = 50;

    const mileageFactor = 0.1;

    const ageFactor = 0.05;

    const mileageRate = city_mpg * mileageFactor;

    const ageRate = (new Date().getFullYear() - year) * ageFactor;

    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

    return rentalRatePerDay.toFixed(0);
}

export const generateCarImageUrl = ( car: CarProps, angle?: string) => {

    const url = new URL('https://cdn.imagin.studio/getimage');

    const { make, year, model } = car;

    url.searchParams.append('customer', `${process.env.CUSTOMER}`);
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(' ')[0]);
    url.searchParams.append('zoomType', 'fullScreen');
    url.searchParams.append('modelYear', `${year}`);
    url.searchParams.append('angle', `${angle}`);

    return `${url}`



}

export const updateSearchParams = (type: string, value:string) => {

    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set(type, value);

    const newPathName = `${window.location.pathname}?${searchParams.toString()}`

    return newPathName;
}