(function (XMLHttpRequest, Promise, JSON) {

    console.info("Loading FinClusive JS API core");

    function expose(name, thing) {
        window.FinClusive = window.FinClusive || {};
        window.FinClusive.Core = window.FinClusive.Core || {};
        window.FinClusive.Core[name] = thing;
    }

    function doApiRequest(method, url, payload, contentType) {

        var yey;
        var ney;
        var promise = new Promise((y, n) => { yey = y; ney = n; });

        var http = new XMLHttpRequest();
        http.open(method, url);
        http.onreadystatechange = x => {

            if (http.status < 200 || http.status >= 300) {
                ney(http, x);
                return;
            }

            if (http.readyState !== 4) {
                return;
            }

            yey(http.responseText, http, x);
        };
        http.send();

        return promise;
    }

    expose("Http", {
        raw: doApiRequest,
        getJson: async url => JSON.parse(await doApiRequest('GET', url)),
    });

    console.info("Loaded FinClusive JS API core");

})(XMLHttpRequest, Promise, JSON);