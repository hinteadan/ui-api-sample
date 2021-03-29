(function () {

    console.info("Loading FinClusive JS API Client Resource");

    const baseUrl = "http://localhost:58881"

    function expose(name, thing) {
        window.FinClusive = window.FinClusive || {};
        window.FinClusive.Resources = window.FinClusive.Resources || {};
        window.FinClusive.Resources[name] = thing;
    }

    async function getAllClients() {
        console.info('Calling getAllClients');
        var clients = await FinClusive.Core.Http.getJson(`${baseUrl}/Bogus`);
        console.log(clients);
        return clients;
    }

    expose('Clients', {
        all: getAllClients,
    });

    console.info("Loaded FinClusive JS API Client Resource");

})();