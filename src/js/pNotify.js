import { alert } from '@pnotify/core';

export function onNotify(
  text = 'Something went wrong',
  type = 'error',
  title = '',
  delay = 2000,
) {
  const options = {
    title,
    text,
    type,
    delay,
  };
  alert(options);
}