$(document).ready(function() {
  $('body').hide().fadeIn(1000);
});

var searchField = document.getElementById("searchField");

searchField.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        getWiki();
    }
});

function getWiki() {
  // var url = "https://crossorigin.me/https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&exsentences=2&explaintext=&indexpageids&titles=";
  var url = "https://crossorigin.me/https://en.wikipedia.org/w/api.php?format=json&action=opensearch&limit=10&namespace=0&search="
  var query = document.getElementById("searchField").value;
  console.log(query);
  
  $( ".results" ).empty();
  
  $.getJSON(url + query, function(data) {
    // var pageid = data.query.pageids[0];
    // console.log(pageid)
    // result = data.query.pages[pageid].extract;
    var results = [];

    for (var i = 0; i < 10; i++) {
      var title = data[1][i];
      var summary = data[2][i];
      var link = data[3][i];
      results.push("<a href=" + link + " target='_blank'><li>" + "<strong>" + title + "</strong>" + "<br/>" + summary + "<br/>" + "</li></a><br/>");
      $(results[i]).hide().appendTo("#results").fadeIn(1000);
    };
    $('.results').hide().fadeIn(1000);
      console.log(results);
  });
};