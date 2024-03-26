import { TIMEOUT_SEC } from './config';
// A function that returns a promise that will reject after the given (s) number of seconds
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    // If the internet is too slow and the request took more than TIMEOUT_SEC seconds, alert it to the user
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await response.json();

    // Throw an error in case of trying to fetch to unvalid url
    if (!response.ok) throw new Error(`${data.message}`);
    return data;
  } catch (err) {
    throw err;
  }
};
