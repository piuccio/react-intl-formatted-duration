import React, {useState} from 'react';
import FormattedDuration, {TIMER_FORMAT} from './index';

export default { title: 'Formatted Duration' };

function withInput(defaultValue, Example) {
  return () => {
    const [seconds, setSeconds] = useState(defaultValue);
    return (
    <form>
      <input type="number" defaultValue={seconds} onInput={(evt) => setSeconds(Number(evt.target.value))} />
      <br />
      <Example seconds={seconds} />
    </form>
  );
}}

export const defaultFormat = withInput(95, ({seconds}) => (
  <FormattedDuration seconds={seconds} />
));

export const customFormats = withInput(180000, ({seconds}) => (
  <React.Fragment>
    <div>
      Format: {`{days} {hours} {minutes} {seconds}`}
      <br />
      <FormattedDuration seconds={seconds} format="{days} {hours} {minutes} {seconds}" />
    </div>
    <div>
      Format: {`{hours} {minutes} {seconds}`}
      <br />
      <FormattedDuration seconds={seconds} format="{hours} {minutes} {seconds}" />
    </div>
    <div>
      Format: {`{minutes} {seconds}`}
      <br />
      <FormattedDuration seconds={seconds} format="{minutes} {seconds}" />
    </div>
    <div>
      Format: {`{seconds}`}
      <br />
      <FormattedDuration seconds={seconds} format="{seconds}" />
    </div>
  </React.Fragment>
));

export const styles = withInput(3610, ({seconds}) => (
  <React.Fragment>
    <div>
      Unit Display: long
      <br />
      <FormattedDuration seconds={seconds} unitDisplay="long" />
    </div>
    <div>
      Unit Display: short
      <br />
      <FormattedDuration seconds={seconds} unitDisplay="short" />
    </div>
    <div>
      Unit Display: narrow
      <br />
      <FormattedDuration seconds={seconds} unitDisplay="narrow" />
    </div>
    <div>
      TIMER
      <br />
      <FormattedDuration seconds={seconds} format={TIMER_FORMAT} />
    </div>
  </React.Fragment>
));
