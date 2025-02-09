sap.ui.define(["yelcho/reuse/BaseController", "sap/base/Log"], function(
	Controller,
	Log
) {
	"use strict"
	return Controller.extend("yelcho.reuse.categories.controller.Detail", {
		onInit: function() {
			Controller.prototype.onInit.apply(this, arguments)

			this.getOwnerComponent()
				.getRouter()
				.getRoute("detail")
				.attachPatternMatched(this._onPatternMatched, this)
		},
		_onPatternMatched: function(oEvent) {
			Log.info(this.getView().getControllerName(), "_onPatternMatched")
			const args = oEvent.getParameter("arguments")

			this.getOwnerComponent()
				.getModel()
				.metadataLoaded()
				.then(this._bindData.bind(this, args.id))
		},
		_bindData: function(id) {
			Log.info(this.getView().getControllerName(), "_bindData")

			var sObjectPath = this.getOwnerComponent()
				.getModel()
				.createKey("Categories", { CategoryID: id })

			this.getView().bindElement({
				path: "/" + sObjectPath,
				events: {
					change: function() {
						Log.info(this.getView().getControllerName(), "_bindData change")
						this.getView().setBusy(false)
					}.bind(this),
					dataRequested: function() {
						Log.info(
							this.getView().getControllerName(),
							"_bindData dataRequested"
						)
						this.getView().setBusy(true)
					}.bind(this),
					dataReceived: function() {
						Log.info(
							this.getView().getControllerName(),
							"_bindData dataReceived"
						)
						this.getView().setBusy(false)
						if (this.getView().getBindingContext() === null)
							this.getOwnerComponent()
								.getRouter()
								.getTargets()
								.display("notFound")
					}.bind(this)
				}
			})
		},
		northwindImageFormatter: function(picture) {
			return picture ? "data:image/bmp;base64," + picture.substr(104) : null
		},
		onPressProduct: function(oEvent) {
			Log.info(
				this.getView().getControllerName(),
				"onPressProduct " +
					oEvent
						.getSource()
						.getBindingContext()
						.getObject().ProductID
			)
			this.getOwnerComponent()
				.getRouter()
				.navTo("products", {
					id: oEvent
						.getSource()
						.getBindingContext()
						.getObject().ProductID
				})
		}
	})
})
