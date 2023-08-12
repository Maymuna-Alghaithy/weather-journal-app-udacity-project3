/* Global Variables */

// get generate button
const btn = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// declare zip code input from html file to find its value
const zipCode = document.getElementById("zip");

// my api key , pls dont share and use 
const apiKey = '4bd9b38ece0768c246154b8caf475cb2';

// declare api url to fetch later 
const baseAPIURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode.value}&appid=${apiKey}&units=metric`

// get dtae,temp,and content
let date = document.getElementById("newDate");
let temp = document.getElementById("newTemp");
let content = document.getElementById("newContent");

// useing click event listener on the Generate Button 
btn.addEventListener('click', handlBtnClk);

// Function called by event listener 
function handlBtnClk() {
    const zipCode = document.getElementById("zip");
    const felingText = document.getElementById("feelings").value;
    if (zipCode.value === "") {
        alert("Wrong ZIP Code, Please Enter a Valid One!");
    } else {
        getData().then((data) => {
            postData("/projectData", { temp: data.main.temp, date: newDate, feelings: felingText })
        })
            .then(() => updateUi())
    }
}
//get web API data using baseAPIURL
const getData = async () => {
    // get API url
    const baseAPIURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode.value}&appid=${apiKey}&units=metric`
    const req = await fetch(baseAPIURL)
    try {
        const data = await req.json()
        console.log(data.main.temp)
        return data
    } catch (error) {
        console.log(error);
    }
};

// post request
const postData = async (url = "", data = {}) => {
    const res = await fetch(url, {
        "method": "POST",
        "credentials": "same-origin",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        return;
    } catch (error) {
        console.log("Error", error);
    }
}

// function to update html content based on server data 
const updateUi = async () => {
    const req = await fetch("/projectData")
    try {
        const udata = await req.json()
        console.log(udata)
        date.innerHTML = udata.date
        temp.innerHTML = udata.temp
        content.innerHTML = udata.feelings
    } catch (error) {
        console.log(error)
    }
}