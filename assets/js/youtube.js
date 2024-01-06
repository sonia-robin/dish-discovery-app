var URLaddress = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=lasagna+cheese&key=AIzaSyBz2fXaCNuTho3B_k-OLJpoMlLzrnw7KfA"

var apiKey = "AIzaSyBz2fXaCNuTho3B_k-OLJpoMlLzrnw7KfA"
var baseSearchUrl = "https://www.youtube.com/watch?v="
var userInput = "pasta";
var parameter = "vegan";
var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=" + userInput + "+" + parameter + "&key=" + apiKey;

var youTubeDiv = document.querySelector("#youtube-api");

fetch(queryURL)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  
  console.log(data);
  // retrieve video ID needed to create a link, title, thumbnail
  for (var i = 0; i < data.items.length; i++){
  var videoId = data.items[i].id.videoId;
  var titleVideo = data.items[i].snippet.title;
  var thumbnailImg = data.items[i].snippet.thumbnails.medium.url;

  // create collumn div
  var colDiv = document.createElement("div");
  colDiv.setAttribute("class", "col");
  // create card div element and set bootsrap class card, append
  var cardDiv = document.createElement("div");
  cardDiv.setAttribute("class", "card");
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
  var cardTitle = document.createElement("h5");
  cardTitle.setAttribute("class", "card-title");
  cardTitle.textContent = titleVideo;
  cardBody.appendChild(cardTitle);
  // create button element for link
  var linkBtn = document.createElement("a");
  linkBtn.setAttribute("class", "btn btn-primary");
  linkBtn.setAttribute("href", baseSearchUrl + videoId);
  linkBtn.setAttribute("target", "blank");
  linkBtn.innerHTML = "YouTube";
  cardBody.appendChild(linkBtn);
  }  
});
