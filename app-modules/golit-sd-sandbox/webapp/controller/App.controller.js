sap.ui.define(
	["sap/ui/core/mvc/Controller",
		"sap/base/Log",
		"sap/ui/model/FilterOperator",
		"sap/ui/model/Filter"
	],
	function (Controller, Log, FilterOperator, Filter) {
		"use strict"
		return Controller.extend("com.golit.lp.landingpage.controller.App", {
			onInit: function () {
				Log.info(this.getView().getControllerName(), "onInit")

				this.getOwnerComponent()
					.getRouter()
					.attachRouteMatched(this._onRouteMatched, this)
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
				var filter = "id eq 'Smith and jhone'and description eq 'Mary'and currencyCode eq 'IN'";
				var urlFilter = oModel.sServiceUrl + "SalesOrgSet?$filter=" + filter;
				$.ajax({
					url: oModel.sServiceUrl + "SalesOrgSet/?$filter=id eq 'Smith and jhone' and description eq 'Mary' and currencyCode eq 'IN'",
					type: 'GET',
					/* or POST or DELETE or PUT or PATCH or MERGE */
					datatype: 'json',
					success: function (oResult) {
						/* do something */
						debugger
					 },
					error: function (oResult) {
						debugger
						/* do something */ }
				});
				/* var oListBinding = oModel.bindList({
							path: '/SalesOrgSet',
							sorter: {
								path: 'description'
							}
						}, {
					$select: ["description", "currency", "address", "headerText"]
				});

				oListBinding.attachChange(function (oEvent) {
					var aContexts = oListBinding.getContexts(0, Infinity);
						// further code
				});
				debugger
				oListBinding.getContexts(0, Infinity); */
				/* jQuery.get({
					url: oModel.sServiceUrl + "SalesOrgSet",
					success:function(data){
						debugger
					},
					error:function(){

					}
					
				}); */
				/* var oMealConfigList = model.bindList("/SalesOrgSet", undefined, undefined, vFilters);
				 //setup of callback to process the data once they have been retrieved
				 oMealConfigList.attachChange(function () {
					 debugger
				 	var aMealContexts = oMealConfigList.getContexts();
				 	this.updateMealConfigs(aMealContexts, aMealConfigs)
				 }.bind(this));

				 // this trigger the request if the data are not yet there and activates attachChange as 
				 // registered above
				 var aMealContexts = oMealConfigList.getContexts();
				 debugger
				 if (aMealContexts.length) {
				 	this.updateMealConfigs(aMealContexts, aMealConfigs);
				 } */
				console.log("test");
				/* model.read("/SalesOrgSet",{
					success:function(data){
						debugger
					},
					error:function(error){
								debugger
					}
					
				}); */
			}

		})
	})
