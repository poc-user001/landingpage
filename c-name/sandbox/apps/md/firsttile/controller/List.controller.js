sap.ui.define(["sap/ui/core/mvc/Controller", "sap/base/Log"], function(
	Controller,
	Log
) {
	"use strict"
	return Controller.extend("com.golit.md.firsttile.controller.List", {
		onInit: function() {
			// Controller.prototype.onInit.apply(this, arguments)

			this.getOwnerComponent()
				.getRouter()
				.getRoute("list")
				.attachPatternMatched(this._onPatternMatched, this)
		},
		_onPatternMatched: function() {
			Log.info(this.getView().getControllerName(), "_onPatternMatched")

			const oRouter = this.getOwnerComponent().getRouter()
			try {
				const aHash = oRouter.oHashChanger.parent.hash.split("/")
				if (aHash.length > 1) {
					switch (aHash[0]) {
						case "categories":
							oRouter.navTo(
								"detail",
								{
									id: aHash[1]
								},
								true
							)
							break
						default:
					}
				}
			} catch {}
		},
		onPressListItem: function(oEvent) {
			Log.info(this.getView().getControllerName(), "onPressListItem")
			this.getOwnerComponent()
				.getRouter()
				.navTo("detail", {
					id: oEvent
						.getSource()
						.getBindingContext()
						.getObject().CategoryID
				})
		}
	})
})
