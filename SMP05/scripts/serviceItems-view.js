define(["kendo", "data", "utils", "cart", "serviceItems"], function (kendo, data, utils, cart, serviceItems) {
    var _createserviceItemsListView = function () {
        var listViewElement = $("#serviceItems-listview");
        var existingListView = listViewElement.data().kendoMobileListView;
        var viewModel = kendo.observable($.extend({
            serviceItems: data.serviceItems
        }, serviceItems.baseserviceItemViewModel));

        if(existingListView) {
            existingListView.destroy();
        }

        kendo.bind(listViewElement, viewModel, kendo.mobile.ui);
    };

    return {
        show: function (e) {
            var filter = utils.parseQueryStringToObject();
            utils.setViewTitle(e.sender.element, filter.title);
            utils.scrollViewToTop(e.sender.element);

            data.clear(data.serviceItems);
            data.serviceItems.filter(filter);

            _createserviceItemsListView();
        }
    }
});