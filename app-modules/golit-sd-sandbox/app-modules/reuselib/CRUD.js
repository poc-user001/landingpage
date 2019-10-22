sap.ui.define([
    "sap/ui/base/EventProvider"
], function (EventProvider){
    "use strict";

    return EventProvider.extend("com.golit.reuselib.CRUD", {

        constructor: function (model) {
            // read model
            this._model = model;
        },
        whenRead: function (params) {

            // check params
            if (!params) {
                throw new Error("missing params");
            }
            if (!params.path) {
                throw new Error("missing param: path");
            }
            if (!params.busyControl) {
                throw new Error("missing param: busyControl");
            }
            if (!params.filters) {
                // optional
            }
            if (!params.sorters) {
                // optional
            }

            return new Promise(function (resolve, reject) {
                this._model.metadataLoaded().then(function () {
                    $.ajax({
                        url: url,
                        type: 'GET',
                        datatype: 'json',
                        success: function (oData) {
                            resolve(oData);
                        },
                        error: function (oError) {
                            reject(oError);
                        }.bind(this)

                    });

                }.bind(this), reject);
            }.bind(this));
        }

    });

});