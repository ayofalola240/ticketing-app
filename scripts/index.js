process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const axios = require('axios');

const cookie =
  'session=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalkxT0dabU1qTTVNalJoTm1KaU5qVmlZV00zTVRjMk5pSXNJbVZ0WVdsc0lqb2lZWGx2Wm1Gc2IyeGhNalF3UUdkdFlXbHNMbU52YlNJc0ltbGhkQ0k2TVRjd016a3pNalEzTTMwLlVBUVd4b19ZRm9Ddndwb1ZDVng5ZWgzbU5jY3ltQjRIQmVtY3pPS0xWZDgifQ==';

const doRequest = async () => {
  const { data } = await axios.post(
    `https://ticketing.dev/api/tickets`,
    { title: 'ticket', price: 5 },
    { headers: { cookie } },
  );

  await axios.put(
    `https://ticketing.dev/api/tickets/${data.id}`,
    { title: 'ticket', price: 10 },
    { headers: { cookie } },
  );

  await axios.put(
    `https://ticketing.dev/api/tickets/${data.id}`,
    { title: 'ticket', price: 15 },
    { headers: { cookie } },
  );

  console.log('Request complete');
};

(async () => {
  for (let i = 0; i < 400; i++) {
    doRequest();
  }
})();
