(function(settings) {
  settings.hnDataUrl =
    'https://hn.algolia.com/api/v1/search_by_date?page=0&tags=story&hitsPerPage=1000';
  settings.hnSearchUrl = 'http://hn.algolia.com/api/v1/search?tags=story&query=';
})((window.appSettings = window.appSettings || {}));
