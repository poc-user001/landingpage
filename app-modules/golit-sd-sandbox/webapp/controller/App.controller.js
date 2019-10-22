sap.ui.define(
	["sap/ui/core/mvc/Controller",
		"sap/base/Log",
		"sap/ui/model/FilterOperator",
		"sap/ui/model/Filter",
		"com/golit/reuselib/CRUD"
	],
	function (Controller, Log, FilterOperator, Filter, CRUD) {
		"use strict"
		return Controller.extend("com.golit.lp.landingpage.controller.App", {
			onInit: function () {
				
				Log.info(this.getView().getControllerName(), "onInit");
				this.crud = new CRUD(this.getView().getModel());
				Log.info(this.crud);
				this.getOwnerComponent().getRouter().attachRouteMatched(this._onRouteMatched, this)
			},
			_onRouteMatched: function (oEvent) {
				Log.info(this.getView().getControllerName(), "_onRouteMatched")
			},
			onSideNavButtonPress: function () {
				var toolPage = this.byId("toolPage")
				toolPage.setSideExpanded(!toolPage.getSideExpanded())
			},
			onProfileButtonPress: function () {
				Log.info(this.getView().getControllerName(), "onUserNamePress");
				debugger
				var oModel = this.getView().getModel();
				var vFilters = [];
				vFilters.push(new Filter("id", FilterOperator.EQ, '1'));
				vFilters.push(new Filter("description", FilterOperator.EQ, 'test'));
				// masterdata.svc / SalesOrgSet ? $orderby = description & $select = id & $skip = 0 & $top = 100
				// var filter = "id eq 'Smith and jhone'and description eq 'Mary'and currencyCode eq 'IN'";
				var filter = "salesorg eq '1234' and ccode eq '1234'";
				var select = "salesorgname,ccode,currency,address,headertext,footertext,signaturetext,sendertext,refstoresalesdocid,custintercobill,salesorgcalendar";
				var url = oModel.sServiceUrl + "SalesOrgSet?$filter=" + filter + "&$select=" + select;
				console.log(url);
				$.ajax({
					// url: oModel.sServiceUrl + "SalesOrgSet/?$filter=id eq 'Smith and jhone' and description eq 'Mary' and currencyCode eq 'IN'",
					url: url,
					type: 'GET',
					/* or POST or DELETE or PUT or PATCH or MERGE */
					datatype: 'json',
					success: function (oResult) {
						/* do something */
						debugger
					},
					error: function (oResult) {
						debugger
						/* do something */
					}
				});
			}

		})
	})
