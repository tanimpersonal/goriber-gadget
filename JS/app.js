const inputField= document.getElementById('input');
const searchButton= document.getElementById('search');
const cardSection= document.getElementById('card-section');
searchButton.addEventListener('click',function(event){
    const inputValue= inputField.value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
    .then(Response=>Response.json())
    .then(data=>display(data))
})
const display= data=>{
    if(data.data.length>0){
        for(const myData of data.data){
            const div= document.createElement('div');
            div.innerHTML=`<div class="card h-100 custom-card">
            <img src="${myData.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${myData.phone_name}</h5>
              <p class="card-text">Brand Name: ${myData.brand}</p>
              <button class="btn btn-primary" onclick="moreDetail(${myData.slug})">Explore More!</button>
            </div>
          </div>`
            div.classList.add('col');
            cardSection.appendChild(div);
        }
    } else{
        cardSection.innerHTML= `
        <div class="not-found"><i class="fa-solid d-inline-block fa-exclamation"></i><i class="fa-solid d-inline-block fa-heart-crack"></i>
        <p>No Result Found</p></div>
        `
    }
}
const detailSection= document.getElementById('detail-section');
function moreDetail(id){
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(Response=>Response.json())
    .then(data=>displayMore(data))
}
const displayMore= data=>{
    detailSection.innerHTML= data.mainFeatures.storage;
}