const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns=document.getElementsByClassName("dropdown");
const btn=document.getElementById("submit-btn");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
for(let select of dropdowns)
{
    for(currcode in countryList)
    {
        let newoption=document.createElement("option");
        newoption.textContent=currcode;
        newoption.value=currcode;  
        if(select.name==="from" && currcode==="USD")
        {
            newoption.selected="selected";
        }
        else if(select.name==="to" && currcode==="INR")
        {
            newoption.selected="selected";
        }
        select.appendChild(newoption);
    }
    select.addEventListener("change",(e)=>
    {
        updateFlag(e.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;              // USD, INR
    let countryCode = countryList[currCode];  // US, IN

    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click",async (e)=>
{
    e.preventDefault();
    let amount=document.getElementById("amount");
    let amtvalue=amount.value;
    if(amtvalue==="" || amtvalue<1)
    {
        amtvalue=1;
        amount.value="1";
    }

    const URL= `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount=amtvalue*rate;
    msg.textContent=`${amtvalue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});