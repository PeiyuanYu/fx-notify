import Combobox from '@/components/combobox';
import { MoveRight } from 'lucide-react';

export const Search = () => (
  <div className="container flex items-center justify-between w-1/2">
    <Combobox />
    <MoveRight />
    <Combobox />
  </div>
);

export default Search;
