import { TrendingDown, TrendingUp } from 'lucide-react';
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useState } from 'react';
import { Button } from './ui/button';

const chartData = [
  { date: '2024-05-10', AUD: 4.95 },
  { date: '2024-05-11', AUD: 4.86 },
  { date: '2024-05-12', AUD: 4.86 },
  { date: '2024-05-13', AUD: 4.87 },
  { date: '2024-05-14', AUD: 4.83 },
  { date: '2024-05-15', AUD: 4.81 },
  { date: '2024-05-16', AUD: 4.77 },
  { date: '2024-06-28', AUD: 4.73 },
  { date: '2024-07-11', AUD: 4.86 },
  { date: '2024-07-12', AUD: 4.86 },
  { date: '2024-07-13', AUD: 4.87 },
  { date: '2024-07-14', AUD: 4.83 },
  { date: '2024-07-15', AUD: 4.81 },
  { date: '2024-07-16', AUD: 4.77 },
  { date: '2024-07-17', AUD: 4.73 },
  { date: '2024-07-18', AUD: 4.95 },
  { date: '2024-07-19', AUD: 4.86 },
  { date: '2024-07-20', AUD: 4.86 },
  { date: '2024-07-21', AUD: 4.87 },
  { date: '2024-07-22', AUD: 4.83 },
  { date: '2024-07-23', AUD: 4.81 },
  { date: '2024-07-24', AUD: 4.77 },
  { date: '2024-07-25', AUD: 4.73 },
];

const chartConfig = {
  AUD: {
    label: 'AUD',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

const filterDataByTimeRange = (data: any, range: string) => {
  const now = new Date();
  let filteredData;
  switch (range) {
    case '7d':
      filteredData = data.filter(
        (d: any) =>
          new Date(d.date) >= new Date(new Date().setDate(now.getDate() - 7)),
      );
      break;
    case '1m':
      filteredData = data.filter(
        (d: any) =>
          new Date(d.date) >= new Date(new Date().setMonth(now.getMonth() - 1)),
      );
      break;
    case '3m':
      filteredData = data.filter(
        (d: any) =>
          new Date(d.date) >= new Date(new Date().setMonth(now.getMonth() - 3)),
      );
      break;
    default:
      filteredData = data;
  }
  return filteredData;
};

const calculateTrendToday = (data: any, curCode: string) => {
  if (data.length < 2) return 0;
  const lastValue = data[data.length - 1][curCode];
  const secondLastValue = data[data.length - 2][curCode];
  const difference = lastValue - secondLastValue;
  const percentageChange = (difference / secondLastValue) * 100;
  return percentageChange;
};

const getTimeRangeText = (timeRange: string) => {
  if (timeRange === '7d') {
    return '7 days';
  }
  if (timeRange === '1m') {
    return '1 month';
  }
  return '3 months';
};

function TrendChart() {
  const [timeRange, setTimeRange] = useState('7d');

  const filteredData = filterDataByTimeRange(chartData, timeRange);
  const trendToday = calculateTrendToday(filteredData, 'AUD');

  return (
    <div className="w-full max-w-[500px] my-10 mx-auto border-slate-100	border-2 rounded-md p-4 flex flex-col gap-2 text-sm">
      <p className="flex gap-2 font-medium text-lg">
        Australian Dollar to Chinese Yuan Exchange Rate
      </p>
      <p className="text-muted-foreground font-light">
        {new Date(filteredData[0].date).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}{' '}
        - {}
        {new Date(
          filteredData[filteredData.length - 1].date,
        ).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </p>

      {/* Button group */}
      <div className="flex gap-4 mt-4">
        <Button
          variant="destructive"
          size="sm"
          className="h-7 p-2"
          onClick={() => setTimeRange('7d')}
        >
          7D
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="h-7 p-2"
          onClick={() => setTimeRange('1m')}
        >
          1M
        </Button>
        <Button
          variant="destructive"
          size="sm"
          className="h-7 p-2"
          onClick={() => setTimeRange('3m')}
        >
          3M
        </Button>
      </div>

      {/* Chart */}
      <div className="p-4">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={filteredData}
            margin={{
              top: 20,
              left: 20,
              right: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString(undefined, {
                  month: '2-digit',
                  day: '2-digit',
                })
              }
            />
            <YAxis domain={['dataMin - 0.1', 'dataMax + 0.1']} hide={true} />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="AUD"
              type="natural"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={false}
            >
              {timeRange === '7d' && (
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              )}
            </Line>
          </LineChart>
        </ChartContainer>
      </div>

      {/* Footer */}
      <div className="flex gap-2 font-medium">
        {trendToday === 0 ? (
          'There is no change today'
        ) : (
          <>
            Trending {trendToday > 0 ? 'up' : 'down'} by{' '}
            {Math.abs(trendToday).toFixed(2)}% today
            {trendToday > 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
          </>
        )}
      </div>
      <div className="text-muted-foreground text-sm font-light">
        Showing exchange rates for the last {getTimeRangeText(timeRange)}
      </div>
    </div>
  );
}

export default TrendChart;
