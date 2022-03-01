// variables for use
const inputField = document.getElementById('input');
const searchButton = document.getElementById('search');
const cardSection = document.getElementById('card-section');
const loadMore = document.getElementById('load-more');
loadMore.style.display = 'none';
const loadButton= document.getElementById('load-button');
const spinner= document.getElementById('my-spinner');
// variable end
// search click
searchButton.addEventListener('click', function (event) {
  const inputValue = inputField.value;
  inputField.value='';
  cardSection.textContent='';
  detailSection.textContent='';
  fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
    .then(Response => Response.json())
    .then(data => display(data))
})
// search click end
// display card
const display = data => {
  const length= data.data.length;
  console.log(length);
  if (data.data.length > 0) {    
    if (data.data.length < 20) {
      loadMore.style.display = 'none';
      spinner.classList.add('spinner-border');
      for (const myData of data.data) {
        // console.log(myData);
        cardCreator(myData);
      }
      spinner.classList.add('d-none');
    } else if (data.data.length > 20) {
      spinner.classList.add('spinner-border');
      loadButton.removeAttribute('disabled');
      loadMore.style.display = 'block';
      spinner.style.display= 'flex';
      for(let i=0; i<20; i++){
        console.log(data.data[i]);
        cardCreator(data.data[i]);
      }
      spinner.classList.add('d-none');
      loadButton.addEventListener('click',function(){
        for(let i=length-1; i>=20; i--){
          console.log(data.data[i]);
          cardCreator(data.data[i]);
        }
        loadButton.setAttribute('disabled',true);
      })
      
    }

  } else {
    spinner.classList.add('spinner-border');
    spinner.classList.add('d-flex');
    loadMore.style.display = 'none';
    cardSection.innerHTML = `
        <div class="not-found"><i class="fa-solid d-inline-block fa-exclamation"></i><i class="fa-solid d-inline-block fa-heart-crack"></i>
        <p>No Result Found</p></div>
        `
  }
  spinner.classList.remove('d-flex');
  spinner.classList.add('d-none');
}
// display card end
// detail section
const detailSection = document.getElementById('detail-section');
// detail section end
// function moredetail
function moreDetail(id, image) {
  console.log(id);
  fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(Response => Response.json())
    .then(data => displayMore(data, image))
}
// function more detail end
// details section
const displayMore = (data, image) => {
  detailSection.textContent='';
  detailSection.innerHTML = `<div class="card h-100 w-50 custom-card">
    <img src="${image}" class="card-img-top" alt="...">
    <div class="card-body">
      <p id="release" class="card-text"></p>
      <p id="sensor"></p>
    </div>
  </div>`
  const release = document.getElementById('release');
  if (data.data.releaseDate != '') {
    release.innerText = data.data.releaseDate;
  } else {
    release.innerText = 'Release Date: Not Found';
  }
  const span = document.getElementById('sensor');
  console.log(data.data.mainFeatures.sensors);
  if (data.data.mainFeatures.sensors != '') {
    let total = '';
    for (const sensor of data.data.mainFeatures.sensors) {
      total = total + sensor + ',';
    }
    span.innerText = 'Sensors: ' + total;
  }
  window.scroll({
    top: 60,
    behavior: 'smooth'
  });
}
//details section end
// card create
const cardCreator = (myData) => {
  const div = document.createElement('div');
  div.innerHTML = `<div class="card h-100 custom-card">
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
// card create end