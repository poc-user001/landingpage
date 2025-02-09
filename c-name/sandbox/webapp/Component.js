sap.ui.define(
    ["sap/ui/core/UIComponent",
        "sap/ui/model/json/JSONModel",
        "sap/ui/Device"
    ],
    function(UIComponent, JSONModel, Device) {
        "use strict"
        return UIComponent.extend("com.golit.lp.landingpage.Component", {
            metadata: {
                manifest: "json"
            },
            init: function() {
                // call the init function of the parent
                UIComponent.prototype.init.apply(this, arguments);
                var jsonTemplate = new JSONModel(jQuery.sap.getModulePath("com.golit.lp.landingpage.model", "/TileList.json"));
                this.setModel(jsonTemplate, "sections");

                // set device model
                var oDeviceModel = new JSONModel(Device);
                oDeviceModel.setDefaultBindingMode("OneWay");
                this.setModel(oDeviceModel, "device");

                // create the views based on the url/hash
                this.getRouter().initialize();


                // set data model
                var oData = {
                    recipient: {
                        name: "Graham Robbo"
                    }
                };
                var oModel = new JSONModel(oData);
                this.setModel(oModel, "jsonModel");

            }
        })
    }
)