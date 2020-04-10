import React from 'react';
import FormattedDuration from './index';

export default { title: 'Formatted Duration' };

export const defaultFormat = () => <FormattedDuration seconds={95} />;

export const customFormats = () => {
  const seconds = 180000;
  return (
    <div>
      <div>Seconds {seconds}</div>
      <div>
        {`{days} {hours} {minutes} {seconds}: `}
        <FormattedDuration seconds={seconds} format="{days} {hours} {minutes} {seconds}" />
      </div>
      <div>
        {`{hours} {minutes} {seconds}: `}
        <FormattedDuration seconds={seconds} format="{hours} {minutes} {seconds}" />
      </div>
      <div>
        {`{minutes} {seconds}: `}
        <FormattedDuration seconds={seconds} format="{minutes} {seconds}" />
      </div>
      <div>
        {`{days} {hours} {minutes} {seconds}: `}
        <FormattedDuration seconds={seconds} format="{seconds}" />
      </div>
    </div>
  );
}
