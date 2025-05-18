
const BASE_URL= "https://2024-03-06.currency-api.pages.dev/v1/currencies/";

const btn=document.querySelector("button");

const selecter= document.querySelectorAll("select");
const fromCode=document.querySelector(".amount-from select");
const toCode=document.querySelector(".amount-to select");
const msg=document.querySelector(".msg")
  
for (let select of selecter){
for (codes in countryList){
    let newOption=document.createElement("option");
    newOption.innerText=codes;
    newOption.value=codes;
     if(select.name==="from"&& codes==="USD"){
        newOption.selected="selected";
     } else if (select.name==="to" && codes==="INR" ){
         newOption.selected="selected";
     }
    select.append(newOption);
}
select.addEventListener( "change",(evt)=>{
    flagUp(evt.target);
 });
 
}
  
  const update = async () =>{
    let amout=document.querySelector("input");
   let value=amout.value;
    if (value===""|| value < 0 ){
        value=0;
    }

    const URL= `${BASE_URL}/${fromCode.value.toLowerCase()}.json `;
    let response= await fetch (URL);
    let data= await response.json();
    let rate = data[toCode.value.toLowerCase()];
    let finalAmount = (data[fromCode.value.toLowerCase()][toCode.value.toLowerCase()]*parseInt(value)).toFixed(2);
    msg.innerText = `${value} ${fromCode.value} = ${finalAmount} ${toCode.value}`;
   };

 
 const flagUp=(element)=>{
   let code=element.value;
   let countryCode= countryList[code];
   let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
   let img= element.parentElement.querySelector("img");
   img.src=newSrc;
 }

 btn.addEventListener("click", (evt)=>{
   evt.preventDefault();
     update();
   
   });

    window.addEventListener("load",()=>{
   update();
});