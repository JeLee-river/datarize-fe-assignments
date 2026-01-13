import { DEFAULT_DATE_RANGE } from '../constants/date';
import { useState } from 'react';

export const useDateRange = () => {
  const [startDate, setStartDate] = useState(DEFAULT_DATE_RANGE.start);
  const [endDate, setEndDate] = useState(DEFAULT_DATE_RANGE.end);

  const changeStartDate = (date: string) => {
    setStartDate(date);
  };

  const changeEndDate = (date: string) => {
    setEndDate(date);
  };

  return {
    startDate,
    endDate,
    changeStartDate,
    changeEndDate,
  };
};
