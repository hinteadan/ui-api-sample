(function (window, document) {

    var baseUrl = 'http://localhost:58881/jsapi'

    function addReference(absolutePath) {

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = absolutePath;
        document.head.append(script);
    }

    function addRelativeReference(relativePath) {
        addReference(`${baseUrl}${(relativePath.startsWith('/') ? relativePath : `/${relativePath}`)}`);
    }

    function wireup() {
        addRelativeReference('core.js');
        addRelativeReference('clientResource.js');

        addRelativeReference('ui/uicore.js');
    }

    function validateApiKey(apiKey) {
        if (apiKey !== '26E7A0D3-FB05-4345-AC42-1836A888F1A1')
            return Promise.reject('The given API key is invalid');
        return Promise.resolve(true);
    }

    async function render(inElement, apiKey) {

        var isApiKeyValid = true;

        await validateApiKey(apiKey).catch(reason => {
            isApiKeyValid = false;
            console.error(reason);
        });

        if (!isApiKeyValid)
            return;

        document.onreadystatechange = x => {
            if (document.readyState !== 'complete')
                return;

            window.FinClusive.UI.render(inElement);

            document.onreadystatechange = null;
        };
    }

    wireup();

    window.FinClusive = window.FinClusive || {};
    window.FinClusive.render = render;

    console.info("FinClusive JS API loaded");

})(window, document);