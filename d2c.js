(function() {

  var sendImpression = function(host) {
    var xhr = new XMLHttpRequest();
    var url = host + '/t/';
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(["/pub/i?pubid=1234","/pub/td?pubid=1234"]));
  }

  var fn = function() {
    var anchors = document.querySelectorAll('a[href*="products.gobankingrates.com"]');
    for (let i = 0; i < anchors.length; i++) {
      //filter to get distinct pubp + query params
      var anchor = anchors[i];
      var url = new URL(anchor.href);
      console.log(url);
      sendImpression(url.origin);
    }
  };

  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
})();
