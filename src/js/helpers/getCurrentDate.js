export default (size, ts) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  console.log(ts);
  const date = new Date(ts || null);
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const fullDate = `${dayOfWeek}, ${day} ${month}`;
  const shortDate = `${day} ${month.slice(0, 3)}`;

  return size === 'full' ? fullDate : shortDate;
};
