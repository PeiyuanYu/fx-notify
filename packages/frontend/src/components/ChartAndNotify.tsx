import NotifySetting from './NotifySetting';
import TrendChart from './TrendChart';

function ChartAndNotify() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row items-start justify-between">
      <TrendChart />
      <NotifySetting />
    </div>
  );
}

export default ChartAndNotify;
