sap.ui.define(["sap/ui/core/mvc/Controller", "sap/base/Log"], function(
    Controller,
    Log
) {
    "use strict"
    return Controller.extend("com.golit.lp.landingpage.controller.Home", {
        onInit: function() {
            Log.info(this.getView().getControllerName(), "onInit")

            this.getOwnerComponent()
                .getRouter()
                .getRoute("home")
                .attachPatternMatched(this._onPatternMatched, this)
            this.getOwnerComponent()
                .getRouter()
                .attachBypassed(this._onBypassed, this)
        },
        _onPatternMatched: function() {
            Log.info(this.getView().getControllerName(), "_onPatternMatched")
        },
        _onRouteMatched: function() {
            Log.info(this.getView().getControllerName(), "_onRouteMatched")
        },
        _onBypassed: function(oEvent) {
            Log.info(
                this.getView().getControllerName(),
                `_onBypassed Hash="${oEvent.getParameter("hash")}"`
            )
        },
        _onTileBlockPress: function(oEvent) {
            var selectedBindingContext = oEvent.getSource().getBindingContext("sections");
            var selectedTileObject = selectedBindingContext.getObject();
            var navigationInfo = selectedTileObject.navigationInfo;
            const key = navigationInfo.projectName;
            // Log.info(this.getView().getControllerName(), `onItemSelect Key=${key}`)
            this.getOwnerComponent().getRouter().navTo(key);
        }
    })
})