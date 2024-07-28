const BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies";
const dropdownselect = document.querySelectorAll("select");
const btn = document.querySelector("button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
// ye dropdown mn codes.js mn jo country code h use lane ke liye h.
for (let select of dropdownselect) {
  for (currcode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = currcode;
    newoption.value = currcode;
    select.append(newoption);
    //By default selection k liye h
    if (select.name === "from" && currcode === "USD") {
      newoption.selected = "selected";
    } else if (select.name === "to" && currcode === "INR") {
      newoption.selected = "selected";
    }
  }
  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
  // Change flag according to country
  const updateflag = (element) => {
    //here element refers to select
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
  };
}
btn.addEventListener("click", (evt) => {
  evt.preventDefault(); //form jab submit hota h to uska default behavior hota h page ko refresh krna, to use prevent krne ke liye hum is se use krte h.
  update_Exchange_Rate();
});
// jab page load hoga to updated value ayegi for eg. 1 usd to 82.80
const update_Exchange_Rate = async () => {
  let amount = document.querySelector("input");
  let amtval = amount.value;
  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }
  // console.log(fromcurr.value,tocurr.value);
  const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
  let responce = await fetch(URL);
  let data = await responce.json();
  let all_rate = data[fromcurr.value.toLowerCase()];
  let target_rate = all_rate[tocurr.value.toLowerCase()];
  // console.log(rate);
  let final_amt = target_rate * amtval;
  msg.innerText = `${amtval} ${fromcurr.value} = ${final_amt}  ${tocurr.value}`;
  // console.log(final_amt);
};
// acessing the window for updating the value when the page load at first
window.addEventListener("load", () => {
  update_Exchange_Rate();
});
