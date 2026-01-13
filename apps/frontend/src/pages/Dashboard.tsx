import DateFilter from '../components/dashboard/DateFilter';
import { useDateRange } from '../hooks/useDateRange';

const Dashboard = () => {
  const { startDate, endDate, changeStartDate, changeEndStartDate } = useDateRange();

  return (
    <DateFilter
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={changeStartDate}
      onEndDateChange={changeEndStartDate}
    />
  );
};

export default Dashboard;
