$(document).ready(() => {
  $( 'body' ).fadeIn(1000);
});

let searchField = document.getElementById( 'searchField' );

searchField.addEventListener("keydown", e => {
    if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
        getWiki();
    }
});

$( 'button#getwiki' ).click(event => {
  event.preventDefault()
  getWiki()
})

function getWiki() {
  // var url = "https://crossorigin.me/https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&exsentences=2&explaintext=&indexpageids&titles=";
  const url = `https://en.wikipedia.org/w/api.php?format=json&action=opensearch&limit=10&namespace=0&callback=?&search=`
  const query = document.getElementById( 'searchField' ).value;
  console.log(query);
  
  $( '#results' ).empty();
  
  $.getJSON(url + query, data => {
    // var pageid = data.query.pageids[0];
    // console.log(pageid)
    // result = data.query.pages[pageid].extract;
    console.log(data[1]["length"]);
    console.log(data)
    let results = [];
    
    if (data[1]["length"] === 0) {
      results = [];
      results.push([`<li><strong>Nothing was found, try again.</strong></li>`]);
      $(results).appendTo( '#results' ).fadeIn(160);
    } else {
      for (let i = 0; i < 10; i++) {
        const title = data[1][i];
        const summary = data[2][i];
        const link = data[3][i];
        results.push(`<a href='${link}' target='_blank'><li><strong>${title}</strong><br/>${summary}<br/></li></a><br/>`);
        $(results[i]).appendTo( '#results' ).fadeIn(160);
      }; 
    }
    $( '#results' ).fadeIn(160);
      console.log(results);
  });
};