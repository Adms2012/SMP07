define(["jQuery", "kendo"], function ($, kendo) {
    "use strict";
    
    var cartAggregates = kendo.observable({
        total: 0,
        formattedTotal: function () {
            return kendo.toString(this.get("total"), "c");
        }
    });
    
    var cartItems = new kendo.data.DataSource({
            data: [],
            change: function () {
                var totalPrice = 0;
                var serviceItems = cartItems.data();
                for (var i = 0; i < serviceItems.length; i++) {
                    var cartEntry = serviceItems[i];
                    totalPrice += cartEntry.get("qty") * cartEntry.get("serviceItem.serviceItemUnitPrice");
                }
                cartAggregates.set("total", totalPrice);
            },
            schema: {
                model: {
                    fields: {
                        qty: { type: "number", min: 1, max: 99 },
                        deleteMode: { type: "boolean" },
                        serviceItem: {}
                    }
                }
            },
            aggregate: [{field: "qty", aggregate: "sum"}]
        }),

        findserviceItem = function (serviceItemId) {
            var data = cartItems.data();
            for(var i = 0; i < data.length; i++) {
                if(data[i].serviceItem.serviceItemId === serviceItemId) {
                    return data[i];
                }
            }
            return undefined;
        },

        addserviceItem = function (serviceItem) {
            var existing = findserviceItem(serviceItem.serviceItemId);
            if(existing) {
                existing.set("qty", existing.qty + 1);
            } else {
                cartItems.add({ serviceItem: $.extend(true, {}, serviceItem), qty: 1, deleteMode: false });
            }
        },

        clear = function () {
            for(var i = cartItems.data().length - 1; i >= 0; i--) {
                cartItems.remove(cartItems.data()[i]);
            }
        };

    return {
        items: cartItems,
        add: addserviceItem,
        find: findserviceItem,
        aggregates: cartAggregates,
        clear: clear
    };
});