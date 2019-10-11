sap.ui.define(["sap/ui/core/mvc/Controller", "sap/base/Log"], function(
	Controller,
	Log
) {
	"use strict"
	return Controller.extend("com.golit.lp.landingpage.controller.App", {
		onInit: function() {
			Log.info(this.getView().getControllerName(), "onInit")

			this.getOwnerComponent()
				.getRouter()
				.attachRouteMatched(this._onRouteMatched, this)
		},
		_onRouteMatched: function(oEvent) {
			Log.info(this.getView().getControllerName(), "_onRouteMatched")
		},
		onSideNavButtonPress: function() {
			var toolPage = this.byId("toolPage")
			toolPage.setSideExpanded(!toolPage.getSideExpanded())
		},
		onUserNamePress: function() {
			Log.info(this.getView().getControllerName(), "onUserNamePress")
		}
		
	})
})
