define([], function () {
    var domain = "www.kendouimusicstore.com",
        serverUrl = "http://" + domain,
        serviceUrl = serverUrl + "/Services/MusicStore.svc";
    
    return {
        domain: domain,
        serverUrl: serverUrl,
        hairServiceUrl: "https://script.google.com/macros/s/AKfycbypiAmszdLTpnEAcA3U_kuWvwDBZizHV7e4Sl6qAHoduooBx-5l/exec?id=0AiE_AinARYzYdDk4aVk2ODN2clpLdFVIaEktTlhMRXc&sheet=ServicesHair",
        genresUrl: serviceUrl + "/Genres",
        artistsUrl: serviceUrl + "/Artists",
        albumsUrl: serviceUrl + "/Albums",
        loginUrl: serverUrl + "/Api/AccountApi",
        cartSubmitUrl: serverUrl + "/Api/CheckoutApi",
        orderHistoryUrl: serverUrl + "/OrderHistory"
    };
});