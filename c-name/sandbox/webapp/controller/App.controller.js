sap.ui.define(
    ["sap/ui/core/mvc/Controller",
        "sap/ui/core/Fragment",
        "sap/base/Log"
    ],
    function(Controller, Fragment, Log) {
        "use strict"
        return Controller.extend("com.golit.lp.landingpage.controller.App", {
            onInit: function() {
                if (this.getView().getModel("device").getProperty("/support/touch") === true) {
                    this.getView().addStyleClass("sapUiSizeCozy");
                } else {
                    this.getView().addStyleClass("sapUiSizeCompact");
                }

                // this.getView().setModel(new JS);
            },
            onInitalLoginPress: function(oEvent) {
                debugger
                var oMenuButton = oEvent.getSource();

                // create menu only once
                if (!this._menu) {
                    Fragment.load({
                        name: "com.golit.lp.landingpage.view.LogonMenu",
                        controller: this
                    }).then(function(oMenu) {
                        debugger
                        this._menu = oMenu;
                        this.getView().addDependent(this._menu);
                        this._menu.openBy(oMenuButton);
                    }.bind(this));
                } else {
                    this._menu.openBy(oMenuButton);
                }
            },

            onCloseDialog: function() {
                this.byId("helloDialog").close();
            }


        });
    });