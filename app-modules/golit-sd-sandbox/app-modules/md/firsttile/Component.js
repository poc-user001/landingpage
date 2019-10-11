sap.ui.define(["sap/ui/core/UIComponent"], function (UIComponent) {
	"use strict"
	return UIComponent.extend("com.golit.md.firsttile.Component", {
		metadata: {
			manifest: "json"
		},
		init: function() {
			console.log("i m in first tile");
			UIComponent.prototype.init.apply(this, arguments)
			this.getRouter().initialize()
		}
	})
})
