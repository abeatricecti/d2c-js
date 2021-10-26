(function() {
  var fn = function() {
    var anchors = {}, impressions = [], xhr = new XMLHttpRequest();
    var query = document.querySelectorAll('a[href*="products.gobankingrates.com/pub/"]');
    if (query.length < 1) return;
    for (var i = 0; i < query.length; i++) {
      var url = new URL(query[i].href);
      var pub = url.pathname.replace('/pub/', '').split('/')[0];
      anchors[pub + url.search] = { "pub": pub, "url": url, "search": url.search };
    }
    if (anchors.length < 1) return;
    for (var i = 0; i < Object.keys(anchors).length; i++) {
      var anchor = anchors[Object.keys(anchors)[i]];
      impressions.push("/pub/id2c?pubid=" + anchor.pub + anchor.search.replace('?', '&'));
    }
    xhr.open('POST', anchors[Object.keys(anchors)[0]].url.origin + '/t/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(impressions));
  };
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(fn, 1);
  } else { document.addEventListener("DOMContentLoaded", fn); }
})();
