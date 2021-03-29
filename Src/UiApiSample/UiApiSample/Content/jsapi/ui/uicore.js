(function (window, document) {
    console.info("Loading FinClusive JS API UI core");

    function expose(name, thing) {
        window.FinClusive = window.FinClusive || {};
        window.FinClusive.UI = window.FinClusive.UI || {};
        window.FinClusive.UI[name] = thing;
    }

    function buildDebugger() {
        var debugCanvas = document.createElement('div');

        var debugResult = document.createElement('div');

        var debugButton = document.createElement('button');
        debugButton.append('Debug (Refresh Clients)');

        debugButton.onclick = async x => {
            debugButton.disabled = true;
            try {
                debugResult.innerHTML = '';
                var clients = await window.FinClusive.Resources.Clients.all();
                var list = document.createElement('ol');
                debugResult.append(list);
                clients.forEach(client => {
                    var item = document.createElement('li');
                    item.innerText = client;
                    list.append(item);
                });
            }
            finally {
                debugButton.disabled = false;
            }
        };

        debugCanvas.append(debugButton);
        debugCanvas.append(debugResult);

        return debugCanvas;
    }

    function buildFinClusiveUi() {
        var root = document.createElement('div');
        var debug = buildDebugger();

        root.append(debug);

        return root;
    }

    function render(canvas) {
        canvas.append(buildFinClusiveUi());
    }

    expose('render', render);

    console.info("Loaded FinClusive JS API UI core");
})(window, document);