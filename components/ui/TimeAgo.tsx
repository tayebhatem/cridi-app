import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import 'moment/locale/ar';

import useLanguageStore from '@/stores/useLanguageStore';

const TimeAgo = ({ date }: { date: string }) => {
  const { language } = useLanguageStore();
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    // Set the locale based on the language
    moment.locale(language?.id);

    // Function to update the time ago text
    const updateTime = () => {
      const time = moment(date).fromNow();
      setTimeAgo(time);
    };

    // Initial time ago update
    updateTime();

    // Set interval to update every minute
    const intervalId = setInterval(updateTime, 60000); // 60000ms = 1 minute

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [language, date]);

  return (
    <Text className='font-kufi text-neutral-400 text-xs text-left ' numberOfLines={1}>{timeAgo}</Text>
  );
};

export default TimeAgo;
