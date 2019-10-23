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
				this.oSF = this.getView().byId("searchField");
				// Log.info(this.crud);
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
				/* var oModel = this.getView().getModel();
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
					url: url,
					type: 'GET',
					datatype: 'json',
					success: function (oResult) {
						debugger
					},
					error: function (oResult) {
						debugger
					}
				}); */
				this.crud.whenRead({
					path: "SalesOrgSet"
				}).then(function(oData){
					debugger
					this.showData();
				}.bind(this),
				function(error){
					debugger

				}.bind(this));
			},
			showData:function(){

			},
			menuButtonPressed:function(){
				debugger
				this.checkCreateMethod();
			},
			checkCreateMethod:function(){
				var newRecord = {
					"salesorg": "1236",
					"salesorgname": "ui create tested",
					"ccode": "1235",
					"currency": "INR",
					"address": "banglore",
					"headertext": "UI5",
					"footertext": "TEST POST from UI",
					"signaturetext": "ODATA UI",
					"sendertext": "AMARJEET",
					"refstoresalesdocid": 123,
					"custintercobill": 123455677,
					"salesorgcalendar": null
				};
				this.crud.whenCreate({
					path: "SalesOrgSet",
					data: newRecord
				}).then(function (oData) {
						debugger
						this.showData();
					}.bind(this),
					function (error) {
						debugger

					}.bind(this));
			},
			handlerSearchSuggestEvent: function (oEvent) {
				var sValue = oEvent.getParameter("suggestValue"),
					aFilters = [];

				if (sValue) {
					aFilters = [
						new Filter([
							new Filter("salesorg", function (sText) {
								return (sText || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
							}),
							new Filter("salesorgname", function (sDes) {
								return (sDes || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
							})
						])
					];
				}

				this.oSF.getBinding("suggestionItems").filter(aFilters);
				this.oSF.suggest();
			}


		});
	});
