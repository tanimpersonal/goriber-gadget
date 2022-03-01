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
            const num1=8;
            const div= document.createElement('div');
            div.innerHTML=`<div class="card h-100 custom-card">
            <img src="${myData.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${myData.phone_name}</h5>
              <p class="card-text">Brand Name: ${myData.brand}</p>
              <button class="btn btn-primary" onclick="moreDetail('${myData.slug}','${myData.image}')">Explore More!</button>
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
function moreDetail(id,image){
    console.log(id);
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(Response=>Response.json())
    .then(data=>displayMore(data,image))
}
const displayMore= (data,image) =>{
    detailSection.innerHTML=`<div class="card h-100 custom-card" style="width: 18rem;">
    <img src="${image}" class="card-img-top" alt="...">
    <div class="card-body">
      <p id="release" class="card-text"></p>
      <p id="sensor"></p>
    </div>
  </div>`
  const release=document.getElementById('release');
    if(data.data.releaseDate!=''){
        release.innerText=data.data.releaseDate;
    }else{
        release.innerText='Release Date: Not Found';
    }
    const span= document.getElementById('sensor');
    console.log(data.data.mainFeatures.sensors);
    if(data.data.mainFeatures.sensors!=''){
        let total='';
        for(const sensor of data.data.mainFeatures.sensors){
            total=total+sensor+',';
        }
        span.innerText= 'Sensors: '+total;
    }
}