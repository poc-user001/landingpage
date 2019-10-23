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
                throw new Error("missing param: entitySetName");
            }
            if (!params.filters) {
                // optional
            }
            if (!params.sorters) {
                // optional
            }
            var url = this._model.sServiceUrl + params.path;
            return new Promise(function (resolve, reject) {
                // this._model.metadataLoaded().then(function () {
                    $.ajax({
                        url: url,
                        type: 'GET',
                        datatype: 'json',
                        success: function (oData) {resolve(oData);},
                        error: function (oError) {reject(oError);}.bind(this)
                    });
                }.bind(this));
        },
        whenCreate: function (params) {
            // check params
            if (!params) {
                throw new Error("missing params");
            }
            if (!params.path) {
                throw new Error("missing param: entitySetName");
            }
            if (!params.data) {
                throw new Error("missing param: data! No data to Save!");
            }
            
            var url = this._model.sServiceUrl + params.path;
            return new Promise(function (resolve, reject) {
                // this._model.metadataLoaded().then(function () {
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: JSON.stringify(params.data),
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (oData) {
                        resolve(oData);
                    },
                    error: function (oError) {
                        reject(oError);
                    }.bind(this)
                });
            }.bind(this));
        }

    });

});