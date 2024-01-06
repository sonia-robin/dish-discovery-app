document.getElementById('recipe-form').addEventListener('submit', function (event) {
  event.preventDefault(); 

var apiKey = "AIzaSyBz2fXaCNuTho3B_k-OLJpoMlLzrnw7KfA"
var baseSearchUrl = "https://www.youtube.com/watch?v="
var keyword = document.querySelector('#keyword').value;
var diet = [];
var allergies = [];

var checkedDietary = document.querySelectorAll("input[type='checkbox'][name='dietary']:checked");
var checkedAllergies = document.querySelectorAll("input[type='checkbox'][name='allergies']:checked");

checkedDietary.forEach(function(checkbox) {
    diet.push(checkbox.value);
});
console.log(diet);

checkedAllergies.forEach(function (checkbox) {
  var labelFor = checkbox.getAttribute("id");
  if (labelFor) {
    allergies.push(labelFor);
  }
});
console.log(allergies);

var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=" + keyword + "+" + diet + "+recipe&key=" + apiKey;

var youTubeDiv = document.querySelector("#youtube-api");

fetch(queryURL)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  
  console.log(data);
  // empty YouTube section first
  youTubeDiv.textContent = "";
  // retrieve video ID needed to create a link, title, thumbnail
  for (var i = 0; i < data.items.length; i++){
  var videoId = data.items[i].id.videoId;
  var titleVideo = data.items[i].snippet.title;
  var thumbnailImg = data.items[i].snippet.thumbnails.medium.url;

  // create collumn div
  var colDiv = document.createElement("div");
  colDiv.setAttribute("class", "col");
  // create card div element which is a link to YouTube video and set bootsrap class card, append
  var cardDiv = document.createElement("a");
  cardDiv.setAttribute("href", baseSearchUrl + videoId);
  cardDiv.setAttribute("target", "blank");
  cardDiv.setAttribute("class", "card link-underline link-underline-opacity-0 mt-3");
  youTubeDiv.appendChild(cardDiv);
  // create img element and set class and src, append to card div
  var imgEl = document.createElement("img");
  imgEl.setAttribute("class", "card-img-top");
  imgEl.setAttribute("src", thumbnailImg);
  imgEl.setAttribute("alt", "thumbnail");
  cardDiv.appendChild(imgEl);
  // create card body el, set class, append to card div
  var cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");
  cardDiv.append(cardBody);
  // create title el
  var cardTitle = document.createElement("h6");
  cardTitle.setAttribute("class", "card-title text-center");
  cardTitle.textContent = titleVideo;
  cardBody.appendChild(cardTitle);
  }  
})
});
