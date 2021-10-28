(function() {
  var getQP = function(input) {
    var qParms = {}, qp = {};
    input.substring(1).split('&').forEach(function(e) {
      var eArr = e.split('=');
      qParms[decodeURIComponent(eArr[0])] = decodeURIComponent(eArr[1]);
    });
    Object.keys(qParms).forEach(function(k) {
      var i = k.indexOf('[');
      if (i === -1) return qp[k] = qParms[k];
      var pKey = k.substring(0, i);
      var cKey = k.substring(i+1, k.length-1);
      if (!qp[pKey]) { qp[pKey] = cKey ? {} : []; }
      if (cKey) {
          qp[pKey][cKey] = qParms[k];
      } else {
          qp[pKey].push(qParms[k]);
      }
    });
    var params = {
      subid: qp['subid'] || null,
      dfp: qp['dfp'] || null,
      bing: qp['bing'] ? JSON.stringify(qp['bing']) : null,
      adwords: qp['adwords'] ? JSON.stringify(qp['adwords']) : null,
      targeting: qp['targeting'] ? JSON.stringify(qp['targeting']) : null
    };
    return Object.keys(params)
      .filter(function(k) { return params[k] != null; })
      .map(function(k) { return k + "=" + encodeURIComponent(params[k])})
      .join('&');
  }
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
      impressions.push("/pub/id2c?pubid=" + anchor.pub + '&' + getQP(anchor.search));
    }
    xhr.open('POST', anchors[Object.keys(anchors)[0]].url.origin + '/t/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(impressions));
  };
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(fn, 1);
  } else { document.addEventListener("DOMContentLoaded", fn); }
})();
