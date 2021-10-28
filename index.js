
var getQueryParams = function(input) {
    var qParms = {};
    input.substring(1).split('&').forEach(function(e) {
        var eArr = e.split('=');
        qParms[decodeURIComponent(eArr[0])] = decodeURIComponent(eArr[1]);
    });
    var qp = {};
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
        targeting: qp['targeting'] ? JSON.stringify(qp['targeting']) : null,
    };  
    return Object.keys(params)
        .filter(function(k) { return params[k] != null; })
        .map(function(k) { return `${k}=${encodeURIComponent(params[k])}`})
        .join('&');
}

var expected = '?targeting=%7B%22category%22%3A%22banking%22%2C%22subcategory%22%3A%22money%22%7D&subid=andrewb';

console.log(getQueryParams(''));
console.log(getQueryParams('?targeting[category]=banking&subid=andrewb&targeting[subcategory]=money'));
console.log(getQueryParams('?targeting%5Bcategory%5D=banking&targeting%5Bsubcategory%5D=money&subid=andrewb'));
