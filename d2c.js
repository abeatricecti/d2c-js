(function() {

  var fn = function() {
    var anchors = document.querySelectorAll('a[href*="products.gobankingrates.com"]');
    for (let i = 0; i < anchors.length; i++) {
      var anchor = anchors[i];
      var url = new URL(anchor.href);
      console.log(url);
    }
  };

  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
})();
