'use client';
// import Filters from "./layout/Filters";
// import { LoadingSpinner } from "./layout/LoadingSpinner";
import ListHomeCars from '@/components/car/ListHomeCars';
import { useQuery } from '@apollo/client/react';
import { GET_ALL_CARS } from './graphql/queries/car.queries';
import { CarStatus, ICar } from '@go-rental/shared';
import Filters from '@/components/layout/Filters';
import { useSearchParams } from 'next/navigation';

type TGetAllCarsData = {
  getAllCars: {
    cars: Array<ICar>;
  };
};

export default function Home() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const category = searchParams.get('category');
  const brand = searchParams.get('brand');
  const transmission = searchParams.get('transmission');

  const filters = {
    status: CarStatus.Active,
    ...(category && { category }),
    ...(brand && { brand }),
    ...(transmission && { transmission }),
  };
  const variables = {
    filters,
    query,
  };
  const { data, loading, error } = useQuery<TGetAllCarsData>(GET_ALL_CARS, { variables });

  console.log(error);

  return (
    <main className='my-8 grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 md:grid-cols-6 lg:grid-cols-10 xl:grid-cols-10'>
      <div className='md:col-span-2 lg:col-span-2 flex flex-col'>
        <Filters />
      </div>
      <div className='grid auto-rows-max items-start gap-4 md:gap-8 md:col-span-4 lg:col-span-4 flex-col'>
        <ListHomeCars cars={data?.getAllCars.cars} loading={loading} />
      </div>
      <div className='md:col-span-6 lg:col-span-4 flex flex-col'>
        <div className='flex items-center justify-center h-screen'></div>
        {/* Google Map Component */}
      </div>
    </main>
  );
}
