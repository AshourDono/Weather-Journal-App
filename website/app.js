/* Global Variables */
const apiKey = '&appid=e25b1d9606eda9afba28fa9a522eb094&units=metric';
const apiUrl = 'http://localhost:2828/';

const zipElement = document.querySelector('#zip');
const feelingElement = document.querySelector('#feelings');
const dateElement = document.querySelector('#date');
const tempElement = document.querySelector('#temp');
const contentElement = document.querySelector('#content');

const catchError = (error) => console.error('An error has happened => ', error);

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toLocaleDateString();

// Event listener to add function to existing HTML DOM element
document.querySelector('#generate').addEventListener('click', () => {
  let data = {
    //post data to API
    zipCode: zipElement.value,
    content: feelingElement.value,
    date: newDate,
  };

  //Post Data To Api For Getting Zip Code Information
  getZipCodeInformation(data.zipCode)
    .then((zipCodeInfo) => {
      //Return And Show Alert If City Is Not Found
      if (!zipCodeInfo == 200) {
        return alert(zipCodeInfo.message);
      }

      //Now Post Data To Server For Saving And Display In Holder Section
      data.temp = zipCodeInfo.list[0].main.temp;
      postDateToServer(data);
    })
    .catch(catchError);
});

/* Get Zip Code Information From Api */
async function getZipCodeInformation(zipCode) {
  return await (
    await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}${apiKey}`
    )
  ).json();
}

/** Post Data To Server For Saving  */
async function postDateToServer(data) {
  let res = await fetch(`${apiUrl}postData`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  try {
    if (!res.ok) {
      alert('Process is not successful');
      return;
    }
    res
      .json()
      .then((data) => {
        if (res.ok) updateUI();
        //Update UI Now
        else alert('Process is not successful');
      })
      .catch(catchError);
  } catch (error) {
    catchError(error);
  }
}

/** Update UI */
async function updateUI() {
  let res = await fetch(`${apiUrl}getAll`);
  try {
    res
      .json()
      .then((data) => {
        dateElement.innerHTML = `Date Is: ${data.date}`;
        tempElement.innerHTML = `Temp Is: ${data.temp}`;
        contentElement.innerHTML = `I feel: ${data.content}`;
      })
      .catch(catchError);
  } catch (error) {
    catchError(error);
  }
}
