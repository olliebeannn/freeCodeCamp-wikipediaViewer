$(document).ready(function() {
  // Test loading jQ
  console.log("jquery loaded!");

  // Attach search button click handler
  $('.search-button').on('click', function() {
    var searchString = $('.search-input').val();
    getSearchResults(searchString);
  });

  // Search function
  function getSearchResults(searchTerm) {
    console.log(searchTerm);

    // Make ajax request
    $.ajax({
      // Prefix for URL to use CORS if needed: https://cors-anywhere.herokuapp.com/
      // Trying anonymous request with origin: '*' instead
      url: 'https://en.wikipedia.org/w/api.php',
      data: {
        action: 'query',
        list: 'search',
        srsearch: searchTerm,
        format: 'json',
        origin: '*'
      },
      success: function(response) {
        console.log(response.query.search);

        // Show search results in page
        var results = response.query.search;

        results.forEach(function(result, index) {
          var url = "https://en.wikipedia.org/wiki/" + encodeURI(result.title);
          console.log(url);

          var htmlString = "<div class='search-result'>";
          htmlString += "<p class='search-result__title'><a target='_blank' href='" + url + "'>" + result.title + "</a></p>";
          console.log(htmlString);
          htmlString += "<p class='search-result__snippet'>" + result.snippet + "...</p>";
          htmlString += "</div>";

          $('.search-results-container').append(htmlString);
        });
      }
    });
  }
});
