import { Card, CardHeader } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CarBrand, CarCategories, CarTransmissions } from '@go-rental/shared';

const categories = Array.isArray(CarCategories) ? CarCategories : Object.values(CarCategories || {});
const brands = Array.isArray(CarBrand) ? CarBrand : Object.values(CarBrand || {});
const transmissions = Array.isArray(CarTransmissions) ? CarTransmissions : Object.values(CarTransmissions || {});

const Filters = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get('category'),
    brand: searchParams.get('brand'),
    transmission: searchParams.get('transmission'),
  });
  const router = useRouter();
  const pathname = usePathname();

  const handleCheckboxChange = (type: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? null : value,
    }));
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`${pathname}?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery.trim()) {
      params.set('query', searchQuery);
    } else {
      params.delete('query');
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <Card>
        <CardHeader className='flex flex-row items-start bg-muted/25'>
          <div className='grid gap-0.5'>
            <div className='text-sm text-muted-foreground'>
              <div className='filter-section my-8'>
                <form onSubmit={handleSubmit}>
                  <h2 className='text-xl font-bold mt-4 my-2'>Type keyword</h2>
                  <div className='relative ml-auto flex-1 md:grow-0'>
                    <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
                    <Input
                      type='search'
                      placeholder='Search...'
                      className='w-full rounded-lg bg-background pl-8'
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </form>
              </div>

              <div className='filter-section my-8'>
                <h2 className='text-xl font-bold mt-4 my-3'>Car Category</h2>
                {categories?.map((category) => (
                  <div key={category} className='flex items-center space-x-2 my-2'>
                    <Checkbox
                      id='category'
                      name='category'
                      value={category}
                      checked={filters.category === category}
                      onCheckedChange={() => handleCheckboxChange('category', category)}
                    />
                    <label htmlFor='carType' className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                      {category}
                    </label>
                  </div>
                ))}
              </div>

              <div className='filter-section my-8'>
                <h2 className='text-xl font-bold mt-4 my-3'>Select Brand</h2>
                {brands?.map((brand) => (
                  <div key={brand} className='flex items-center space-x-2 my-2'>
                    <Checkbox
                      id='brand'
                      name='brand'
                      value={brand}
                      checked={filters.brand === brand}
                      onCheckedChange={() => handleCheckboxChange('brand', brand)}
                    />
                    <label htmlFor='carBrand' className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                      {brand}
                    </label>
                  </div>
                ))}
              </div>

              <div className='filter-section my-8'>
                <h2 className='text-xl font-bold mt-4 my-3'>Transmission</h2>
                {transmissions?.map((transmission) => (
                  <div key={transmission} className='flex items-center space-x-2 my-2'>
                    <Checkbox
                      id='transmission'
                      name='transmission'
                      value={transmission}
                      checked={filters.transmission === transmission}
                      onCheckedChange={() => handleCheckboxChange('transmission', transmission)}
                    />
                    <label
                      htmlFor='carTransmission'
                      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                      {transmission}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Filters;
