import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from '@/components/ui/dialog';
import FlagIcon from 'react-flagkit';
import { FiEye, FiHeart, FiBell } from 'react-icons/fi';
import { GoArrowSwitch } from 'react-icons/go';
import TrendChart from './TrendChart';

const apiEndpoint = 'http://api.exchangeratesapi.io/v1/latest';

const SingleFX = () => {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [baseCurrency, setBaseCurrency] = useState('AUD');
  const [targetCurrency, setTargetCurrency] = useState('CNY');
  const apiKey = import.meta.env.VITE_EXCHANGE_RATES_API_KEY;

  const fetchExchangeRate = useCallback(
    async (base: string, target: string) => {
      const response = await axios.get(apiEndpoint, {
        params: {
          access_key: apiKey,
          symbols: `${base},${target}`,
        },
      });
      const rate = response.data.rates[target] / response.data.rates[base];
      const date = new Date(response.data.timestamp * 1000).toLocaleString();
      setExchangeRate(rate);
      setLastUpdated(date);
    },
    [apiKey],
  );

  useEffect(() => {
    fetchExchangeRate(baseCurrency, targetCurrency);
  }, [baseCurrency, targetCurrency, fetchExchangeRate]);

  const handleSwap = () => {
    setBaseCurrency((prev) => (prev === 'AUD' ? 'CNY' : 'AUD'));
    setTargetCurrency((prev) => (prev === 'CNY' ? 'AUD' : 'CNY'));
  };

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <div className="flex flex-wrap justify-between items-center space-y-4 sm:space-y-0">
        <div className="flex flex-wrap items-center space-x-3">
          <div className="flex items-center space-x-2 min-w-[150px] justify-center">
            <FlagIcon
              country={baseCurrency === 'AUD' ? 'AU' : 'CN'}
              size={24}
            />
            <span className="font-semibold">
              {baseCurrency === 'AUD' ? 'Australia (AUD)' : 'China (CNY)'}
            </span>
          </div>
          <Button
            variant="outline"
            onClick={handleSwap}
            className="mx-2 bg-transparent border-none shadow-none"
          >
            <GoArrowSwitch size={20} />
          </Button>
          <div className="flex items-center space-x-2 min-w-[150px] justify-center">
            <FlagIcon
              country={targetCurrency === 'CNY' ? 'CN' : 'AU'}
              size={24}
            />
            <span className="font-semibold">
              {targetCurrency === 'CNY' ? 'China (CNY)' : 'Australia (AUD)'}
            </span>
          </div>
          <span className="font-semibold pl-4">
            Rate: {exchangeRate ? exchangeRate.toFixed(2) : 'Loading...'}
          </span>
          <span className="text-gray-500 pl-4">
            Last Updated: {lastUpdated}
          </span>
        </div>
        <div className="flex flex-wrap items-center space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FiEye size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center">
                  Exchange Rate Details
                </DialogTitle>
              </DialogHeader>
              <TrendChart />
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <FiHeart size={20} />
          </Button>
          <Button variant="outline">
            <FiBell size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SingleFX;
