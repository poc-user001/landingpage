sap.ui.define(["yelcho/reuse/BaseComponent"], function(UIComponent) {
	"use strict"
	return UIComponent.extend("yelcho.reuse.categories.Component", {
		metadata: {
			manifest: "json"
		},
		init: function() {
			UIComponent.prototype.init.apply(this, arguments)
			this.getRouter().initialize()
		}
	})
})

sap.ui.define(["yelcho/reuse/BaseController"], function(Controller) {
	"use strict"
	return Controller.extend("yelcho.mydemo.categories.controller.App", {
		onInit: function() {
			Controller.prototype.onInit.apply(this, arguments)
		}
	})
})

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

sap.ui.define(["yelcho/reuse/BaseController", "sap/base/Log"], function(
	Controller,
	Log
) {
	"use strict"
	return Controller.extend("yelcho.reuse.categories.controller.List", {
		onInit: function() {
			Controller.prototype.onInit.apply(this, arguments)

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

sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
	"use strict"
	return Controller.extend("com.golit.md.firsttile.controller.App", {
		onInit: function() {
			// Controller.prototype.onInit.apply(this, arguments)
		}
	})
})

sap.ui.define(["sap/ui/core/mvc/Controller", "sap/base/Log"], function(
	Controller,
	Log
) {
	"use strict"
	return Controller.extend("com.golit.md.firsttile.controller.Detail", {
		onInit: function() {
			// Controller.prototype.onInit.apply(this, arguments)

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

sap.ui.define(
	["sap/ui/core/UIComponent",
	 "sap/ui/model/json/JSONModel"],
	function(UIComponent, JSONModel) {
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
		_onRouteMatched: function () {
			Log.info(this.getView().getControllerName(), "_onRouteMatched")
		},
		_onBypassed: function(oEvent) {
			Log.info(
				this.getView().getControllerName(),
				`_onBypassed Hash="${oEvent.getParameter("hash")}"`
			)
		},
		_onTileBlockPress: function (oEvent) {
			debugger
			var selectedBindingContext = oEvent.getSource().getBindingContext("sections");
			var selectedTileObject = selectedBindingContext.getObject();
			var navigationInfo = selectedTileObject.navigationInfo;
			const key = navigationInfo.projectName;
			// Log.info(this.getView().getControllerName(), `onItemSelect Key=${key}`)
			this.getOwnerComponent().getRouter().navTo(key);
		}
	})
})

<mvc:View controllerName="yelcho.reuse.categories.controller.App" 
  xmlns:mvc="sap.ui.core.mvc" 
  xmlns="sap.m" 
  displayBlock="true">
  <App id="app" />
</mvc:View>
<mvc:View controllerName="yelcho.reuse.categories.controller.Detail" 
  xmlns:mvc="sap.ui.core.mvc" 
  xmlns="sap.m" 
  xmlns:l="sap.ui.layout" 
  xmlns:f="sap.ui.layout.form" 
  xmlns:core="sap.ui.core" 
  displayBlock="true" 
  busyIndicatorDelay="0">
  <Page id="page" 
    showHeader="false" 
    showNavButton="true" 
    enableScrolling="true" 
    class="categoriesPage" 
    navButtonPress="onNavButtonPress">
    <VBox class="sapUiSmallMargin">
      <f:Form id="FormDisplay354" 
        editable="false">
        <f:title>
          <core:Title text="{i18n>detailViewTitle}" />
        </f:title>
        <f:layout>
          <f:ResponsiveGridLayout labelSpanXL="3" 
            labelSpanL="3" 
            labelSpanM="3" 
            labelSpanS="12" 
            adjustLabelSpan="false" 
            emptySpanXL="4" 
            emptySpanL="4" 
            emptySpanM="4" 
            emptySpanS="0" 
            columnsXL="1" 
            columnsL="1" 
            columnsM="1" 
            singleContainerFullSize="false" />
        </f:layout>
        <f:formContainers>
          <f:FormContainer>
            <f:formElements>
              <f:FormElement label="ID">
                <f:fields>
                  <Text text="{CategoryID}" />
                </f:fields>
              </f:FormElement>
              <f:FormElement label="Name">
                <f:fields>
                  <Text text="{CategoryName}" />
                </f:fields>
              </f:FormElement>
              <f:FormElement label="Description">
                <f:fields>
                  <Text text="{Description}" />
                </f:fields>
              </f:FormElement>
              <f:FormElement label="Image">
                <f:fields>
                  <Image src="{path:'Picture', formatter:'.northwindImageFormatter'}" />
                </f:fields>
              </f:FormElement>
            </f:formElements>
          </f:FormContainer>
        </f:formContainers>
      </f:Form>
      <Table inset="false" 
        growingThreshold="10" 
        busyIndicatorDelay="0" 
        items="{path:'Products',parameters:{expand:'Supplier'}}">
        <headerToolbar>
          <OverflowToolbar>
            <content>
              <Title text="{i18n>productListTitle}" 
                level="H2" />
              <ToolbarSpacer />
            </content>
          </OverflowToolbar>
        </headerToolbar>
        <columns>
          <Column width="12em">
            <Text text="ID" />
          </Column>
          <Column>
            <Text text="Name" />
          </Column>
          <Column>
            <Text text="Supplier" />
          </Column>
          <Column>
            <Text text="Price" />
          </Column>
        </columns>
        <items>
          <ColumnListItem type="Navigation" 
            press="onPressProduct">
            <cells>
              <Text text="{ProductID}" />
              <Text text="{ProductName}" />
              <Text text="{Supplier/CompanyName}" />
              <Text text="{path:'UnitPrice', formatter:'.priceFormatter'}" />
            </cells>
          </ColumnListItem>
        </items>
      </Table>
    </VBox>
  </Page>
</mvc:View>
<mvc:View controllerName="yelcho.reuse.categories.controller.List" 
  xmlns:mvc="sap.ui.core.mvc" 
  xmlns="sap.m" 
  displayBlock="true">
  <Page id="page" 
    showHeader="false" 
    enableScrolling="true" 
    class="categoriesPage">
    <Table inset="false" 
      busyIndicatorDelay="0" 
      items="{/Categories}">
      <headerToolbar>
        <OverflowToolbar>
          <content>
            <Title text="{i18n>listViewTitle}" 
              level="H2" />
            <ToolbarSpacer />
          </content>
        </OverflowToolbar>
      </headerToolbar>
      <columns>
        <Column width="12em">
          <Text text="ID" />
        </Column>
        <Column>
          <Text text="Name" />
        </Column>
        <Column>
          <Text text="City" />
        </Column>
      </columns>
      <items>
        <ColumnListItem type="Navigation" 
          press="onPressListItem">
          <cells>
            <Text text="{CategoryID}" />
            <Text text="{CategoryName}" />
            <Text text="{Description}" />
          </cells>
        </ColumnListItem>
      </items>
    </Table>
  </Page>
</mvc:View>
<mvc:View xmlns="sap.m" 
  xmlns:mvc="sap.ui.core.mvc">
  <MessagePage title="{i18n>detailViewTitle} Not Found" 
    text="This resource was not found" 
    description="Check your code" 
    class="categoriesPage" />
</mvc:View>
<mvc:View controllerName="com.golit.md.firsttile.controller.App" 
  xmlns:mvc="sap.ui.core.mvc" 
  xmlns="sap.m" 
  displayBlock="true">
  <App id="app" />
</mvc:View>
<mvc:View controllerName="com.golit.md.firsttile.controller.Detail" 
  xmlns:mvc="sap.ui.core.mvc" 
  xmlns="sap.m" 
  xmlns:l="sap.ui.layout" 
  xmlns:f="sap.ui.layout.form" 
  xmlns:core="sap.ui.core" 
  displayBlock="true" 
  busyIndicatorDelay="0">
  <Page id="page" 
    showHeader="false" 
    showNavButton="true" 
    enableScrolling="true" 
    class="categoriesPage" 
    navButtonPress="onNavButtonPress">
    <VBox class="sapUiSmallMargin">
      <f:Form id="FormDisplay354" 
        editable="false">
        <f:title>
          <core:Title text="{i18n>detailViewTitle}" />
        </f:title>
        <f:layout>
          <f:ResponsiveGridLayout labelSpanXL="3" 
            labelSpanL="3" 
            labelSpanM="3" 
            labelSpanS="12" 
            adjustLabelSpan="false" 
            emptySpanXL="4" 
            emptySpanL="4" 
            emptySpanM="4" 
            emptySpanS="0" 
            columnsXL="1" 
            columnsL="1" 
            columnsM="1" 
            singleContainerFullSize="false" />
        </f:layout>
        <f:formContainers>
          <f:FormContainer>
            <f:formElements>
              <f:FormElement label="ID">
                <f:fields>
                  <Text text="{CategoryID}" />
                </f:fields>
              </f:FormElement>
              <f:FormElement label="Name">
                <f:fields>
                  <Text text="{CategoryName}" />
                </f:fields>
              </f:FormElement>
              <f:FormElement label="Description">
                <f:fields>
                  <Text text="{Description}" />
                </f:fields>
              </f:FormElement>
              <f:FormElement label="Image">
                <f:fields>
                  <Image src="{path:'Picture', formatter:'.northwindImageFormatter'}" />
                </f:fields>
              </f:FormElement>
            </f:formElements>
          </f:FormContainer>
        </f:formContainers>
      </f:Form>
      <Table inset="false" 
        growingThreshold="10" 
        busyIndicatorDelay="0" 
        items="{path:'Products',parameters:{expand:'Supplier'}}">
        <headerToolbar>
          <OverflowToolbar>
            <content>
              <Title text="{i18n>productListTitle}" 
                level="H2" />
              <ToolbarSpacer />
            </content>
          </OverflowToolbar>
        </headerToolbar>
        <columns>
          <Column width="12em">
            <Text text="ID" />
          </Column>
          <Column>
            <Text text="Name" />
          </Column>
          <Column>
            <Text text="Supplier" />
          </Column>
          <Column>
            <Text text="Price" />
          </Column>
        </columns>
        <items>
          <ColumnListItem type="Navigation" 
            press="onPressProduct">
            <cells>
              <Text text="{ProductID}" />
              <Text text="{ProductName}" />
              <Text text="{Supplier/CompanyName}" />
              <Text text="{path:'UnitPrice', formatter:'.priceFormatter'}" />
            </cells>
          </ColumnListItem>
        </items>
      </Table>
    </VBox>
  </Page>
</mvc:View>
<mvc:View controllerName="com.golit.md.firsttile.controller.List" 
  xmlns:mvc="sap.ui.core.mvc" 
  xmlns="sap.m" 
  displayBlock="true">
  <Page id="page" 
    showHeader="true" 
    enableScrolling="true" 
    class="categoriesPage"
    title="first Tiles">
    <Table inset="false" 
      busyIndicatorDelay="0" 
      items="{/Categories}">
      <headerToolbar>
        <OverflowToolbar>
          <content>
            <Title text="{i18n>listViewTitle}" 
              level="H2" />
            <ToolbarSpacer />
          </content>
        </OverflowToolbar>
      </headerToolbar>
      <columns>
        <Column width="12em">
          <Text text="ID" />
        </Column>
        <Column>
          <Text text="Name" />
        </Column>
        <Column>
          <Text text="City" />
        </Column>
      </columns>
      <items>
        <ColumnListItem type="Navigation" 
          press="onPressListItem">
          <cells>
            <Text text="{CategoryID}" />
            <Text text="{CategoryName}" />
            <Text text="{Description}" />
          </cells>
        </ColumnListItem>
      </items>
    </Table>
  </Page>
</mvc:View>
<mvc:View xmlns="sap.m" 
  xmlns:mvc="sap.ui.core.mvc">
  <MessagePage title="{i18n>detailViewTitle} Not Found" 
    text="This resource was not found" 
    description="Check your code" 
    class="categoriesPage" />
</mvc:View>
<mvc:View controllerName="com.golit.lp.landingpage.controller.App" 
  xmlns:mvc="sap.ui.core.mvc" 
  xmlns="sap.m" 
  xmlns:f="sap.f" 
  displayBlock="true"
  xmlns:core="sap.ui.core"
  >
  <f:ShellBar title="header" 
   homeIcon="" showMenuButton="true" showNavButton="false" showCopilot="true"
    showSearch="false" showNotifications="false" avatarPressed="onProfileButtonPress"
    showProductSwitcher="false">
    <f:profile>
      <f:Avatar initials="Amarjeet"/>
    </f:profile>
    <f:searchManager>
      <f:SearchManager id="searchField" search="handlerSearchFieldSearch" 
      liveChange="handlerSearchFieldLiveEvent" suggest="handlerSearchSuggestEvent" 
      enableSuggestions="true" 
      suggestionItems="{
					path: '/SalesOrgSet',
					sorter: { path: 'description' }
				}"
        >
        <f:suggestionItems>
          <SuggestionItem text="{Name}" description="{path:'Price'} {path:'CurrencyCode'}" key="{ProductId}"/>
        </f:suggestionItems>
      </f:SearchManager>
    </f:searchManager>
    </f:ShellBar>
  <App class="sapUiBody" id="_landingpageShellId" defaultTransitionName="flip">
  </App>
  
</mvc:View>
<mvc:View controllerName="com.golit.lp.landingpage.controller.Home" 
  xmlns:mvc="sap.ui.core.mvc" 
  xmlns="sap.m" xmlns:core="sap.ui.core"
  xmlns:l="sap.ui.layout" xmlns:tnt="sap.tnt" xmlns:u="sap.ui.unified" xmlns:ux="sap.uxap" 
  displayBlock="true">
 <ux:ObjectPageLayout class="landingPageBackPanel" sections="{path:'sections>/',templateShareable:true}" enableLazyLoading="false">
    <ux:sections >
      <ux:ObjectPageSection title="{sections>SecTitle}">
        <ux:subSections>
          <ux:ObjectPageSubSection title=" ">
            <ux:blocks>
              <Panel content="{path:'sections>tileItems/',templateShareable:true}" 
                expandable="false" expanded="true" expandAnimation="false" 
                   class="sapUiNoMargin">
                <GenericTile class="sapUiTinyMarginBegin sapUiTinyMarginTop" 
                   header="{sections>header}" subheader="{sections>subheader}" 
                    press="_onTileBlockPress">
                  <TileContent unit="{sections>unit}" footer="{sections>footer}">
                    <ImageContent src="{sections>src}"/>
                  </TileContent>
                </GenericTile>
              </Panel>
            </ux:blocks>
          </ux:ObjectPageSubSection>
        </ux:subSections>
      </ux:ObjectPageSection>
    </ux:sections>
  </ux:ObjectPageLayout>
</mvc:View>
<mvc:View xmlns="sap.m" 
  xmlns:mvc="sap.ui.core.mvc">
  <MessagePage title="{i18n>appTitle} Not Found" 
    text="{i18n>appTitle} could not locate this resource" 
    description="Check URL hash" />
</mvc:View>
{
	"_version": "2.3.0",
	"sap.app": {
		"id": "yelcho.reuse.categories",
		"type": "application",
		"i18n": "i18n/i18n.properties",
		"title": "{{appTitle}}",
		"description": "{{appDescription}}",
		"applicationVersion": {
			"version": "2.03.8"
		},
		"dataSources": {
			"northwind": {
				"uri": "https://cors-anywhere.herokuapp.com/https://services.odata.org/V2/Northwind/Northwind.svc",
				"type": "OData",
				"settings": {
					"odataVersion": "2.0"
				}
			}
		}
	},
	"sap.ui": {
		"technology": "UI5",
		"deviceTypes": {
			"desktop": true,
			"tablet": true,
			"phone": true
		}
	},
	"sap.ui5": {
		"rootView": {
			"viewName": "yelcho.reuse.categories.view.App",
			"type": "XML",
			"async": true,
			"id": "app"
		},
		"componentUsages": {
			"productsComponent": {
				"name": "yelcho.reuse.products",
				"settings": {},
				"componentData": {},
				"lazy": true
			}
		},
		"dependencies": {
			"minUI5Version": "1.69",
			"libs": {
				"sap.m": {}
			}
		},
		"models": {
			"i18n": {
				"type": "sap.ui.model.resource.ResourceModel",
				"settings": {
					"bundleName": "yelcho.reuse.categories.i18n.i18n"
				}
			},
			"": {
				"dataSource": "northwind",
				"defaultBindingMode": "TwoWay",
				"settings": {
					"useBatch": false,
					"defaultCountMode": "Inline"
				}
			}
		},
		"resources": {
			"css": [
				{
					"uri": "css/style.css"
				}
			]
		},
		"routing": {
			"config": {
				"routerClass": "sap.m.routing.Router",
				"viewType": "XML",
				"viewPath": "yelcho.reuse.categories.view",
				"controlId": "app",
				"controlAggregation": "pages",
				"transition": "slide",
				"bypassed": {
					"target": "notFound"
				},
				"async": true
			},
			"routes": [
				{
					"name": "list",
					"pattern": "",
					"target": "list"
				},
				{
					"name": "detail",
					"pattern": "detail/{id}",
					"target": "detail"
				},
				{
					"name": "products",
					"pattern": "products/{id}",
					"target": {
						"name": "products",
						"prefix": "p"
					}
				},
				{
					"name": "notfound",
					"pattern": "notFound",
					"target": "notFound"
				}
			],
			"targets": {
				"list": {
					"viewId": "list",
					"viewName": "List"
				},
				"detail": {
					"viewId": "detail",
					"viewName": "Detail"
				},
				"products": {
					"type": "Component",
					"usage": "productsComponent"
				},
				"notFound": {
					"viewId": "notFound",
					"viewName": "NotFound",
					"transition": "show"
				}
			}
		}
	}
}

{
	"_version": "2.3.0",
	"sap.app": {
		"id": "com.golit.md.firsttile",
		"type": "application",
		"i18n": "i18n/i18n.properties",
		"title": "{{appTitle}}",
		"description": "{{appDescription}}",
		"applicationVersion": {
			"version": "2.03.8"
		},
		"dataSources": {
			"northwind": {
				"uri": "https://cors-anywhere.herokuapp.com/https://services.odata.org/V2/Northwind/Northwind.svc",
				"type": "OData",
				"settings": {
					"odataVersion": "2.0"
				}
			}
		}
	},
	"sap.ui": {
		"technology": "UI5",
		"deviceTypes": {
			"desktop": true,
			"tablet": true,
			"phone": true
		}
	},
	"sap.ui5": {
		"rootView": {
			"viewName": "com.golit.md.firsttile.view.App",
			"type": "XML",
			"async": true,
			"id": "app"
		},
		"componentUsages": {
			"productsComponent": {
				"name": "yelcho.reuse.products",
				"settings": {},
				"componentData": {},
				"lazy": true
			}
		},
		"dependencies": {
			"minUI5Version": "1.69",
			"libs": {
				"sap.m": {}
			}
		},
		"models": {
			"i18n": {
				"type": "sap.ui.model.resource.ResourceModel",
				"settings": {
					"bundleName": "com.golit.md.firsttile.i18n.i18n"
				}
			},
			"": {
				"dataSource": "northwind",
				"defaultBindingMode": "TwoWay",
				"settings": {
					"useBatch": false,
					"defaultCountMode": "Inline"
				}
			}
		},
		"resources": {
			"css": [
				{
					"uri": "css/style.css"
				}
			]
		},
		"routing": {
			"config": {
				"routerClass": "sap.m.routing.Router",
				"viewType": "XML",
				"viewPath": "com.golit.md.firsttile.view",
				"controlId": "app",
				"controlAggregation": "pages",
				"transition": "slide",
				"bypassed": {
					"target": "notFound"
				},
				"async": true
			},
			"routes": [
				{
					"name": "list",
					"pattern": "",
					"target": "list"
				},
				{
					"name": "detail",
					"pattern": "detail/{id}",
					"target": "detail"
				},
				{
					"name": "products",
					"pattern": "products/{id}",
					"target": {
						"name": "products",
						"prefix": "p"
					}
				},
				{
					"name": "notfound",
					"pattern": "notFound",
					"target": "notFound"
				}
			],
			"targets": {
				"list": {
					"viewId": "list",
					"viewName": "List"
				},
				"detail": {
					"viewId": "detail",
					"viewName": "Detail"
				},
				"products": {
					"type": "Component",
					"usage": "productsComponent"
				},
				"notFound": {
					"viewId": "notFound",
					"viewName": "NotFound",
					"transition": "show"
				}
			}
		}
	}
}

{
	"_version": "1.8.0",
	"sap.app": {
		"id": "com.golit.lp.landingpage",
		"type": "application",
		"i18n": "i18n/i18n.properties",
		"title": "{{appTitle}}",
		"description": "{{appDescription}}",
		"applicationVersion": {
			"version": "1.0.0"
		},
		"dataSources": {
			"mainService": {
				"uri": "/golit/odata/app/md/masterdata.svc/",
				"type": "OData",
				"settings": {
					"odataVersion": "4.0",
					"localUri": "localService/metadata.xml"
				}
			}
		}
	},
	"sap.ui": {
		"technology": "UI5",
		"deviceTypes": {
			"desktop": true,
			"tablet": true,
			"phone": true
		}
	},
	"sap.ui5": {
		"rootView": {
			"viewName": "com.golit.lp.landingpage.view.App",
			"type": "XML",
			"async": true,
			"id": "app"
		},
		"componentUsages": {
			"firsttilesComponent": {
				"name": "com.golit.md.firsttile",
				"settings": {},
				"componentData": {},
				"lazy": true
			},
			"categoriesComponent": {
				"name": "com.golit.categories",
				"settings": {},
				"componentData": {},
				"lazy": true
			},
			"productsComponent": {
				"name": "com.golit.products",
				"settings": {},
				"componentData": {},
				"lazy": true
			}
		},
		"dependencies": {
			"minUI5Version": "1.65",
			"libs": {
				"sap.m": {}
			}
		},
		"models": {
			"i18n": {
				"type": "sap.ui.model.resource.ResourceModel",
				"settings": {
					"bundleName": "com.golit.lp.landingpage.i18n.i18n"
				}
			},
			"": {
				"dataSource": "mainService",
				"preload": true,
				"settings": {
					"autoExpandSelect": true,
					"earlyRequests": true,
					"synchronizationMode": "None",
					"operationMode": "Server",
					"groupId": "$direct",
					"updateGroupId": "$auto"
				}
			}
		},
		"resources": {
			"css": [{
				"uri": "css/style.css"
			}]
		},
		"routing": {
			"config": {
				"routerClass": "sap.m.routing.Router",
				"viewType": "XML",
				"viewPath": "com.golit.lp.landingpage.view",
				"controlId": "_landingpageShellId",
				"controlAggregation": "pages",
				"transition": "slide",
				"bypassed": {
					"target": "notFound"
				},
				"async": true
			},
			"routes": [{
					"name": "home",
					"pattern": "",
					"target": "home"
				},
				{
					"name": "firsttiles",
					"pattern": "firsttiles",
					"target": {
						"name": "firsttiles",
						"prefix": "fs"
					}
				},
				{
					"name": "categories",
					"pattern": "categories",
					"target": {
						"name": "categories",
						"prefix": "c"
					}
				},
				{
					"name": "products",
					"pattern": "products",
					"target": {
						"name": "products",
						"prefix": "p"
					}
				}
			],
			"targets": {
				"home": {
					"viewId": "home",
					"viewName": "Home"
				},
				"firsttiles": {
					"type": "Component",
					"usage": "firsttilesComponent"
				},
				"categories": {
					"type": "Component",
					"usage": "categoriesComponent"
				},
				"products": {
					"type": "Component",
					"usage": "productsComponent"
				},
				"notFound": {
					"viewId": "notFound",
					"viewName": "NotFound",
					"transition": "show"
				}
			}
		}
	}
}

[{
    "SecTitle": "Master Data",
    "tileItems": [{
        "header": "CompanCode",
        "subheader": "Company Code",
        "unit": "",
        "footer": "Company Code Information",
        "src": "sap-icon://company-view",
        "navigationInfo": {
            "uriToLoad": "./mscompanycode/webapp/",
            "projectName": "firsttiles",
            "componentName": "com.golit.ut.uitemplate",
            "projectId": "",
            "tileType": "display",
            "semanticObject": "firsttiles",
            "navigationParameter": ""
        }
    }, {
        "header": "First Tile Header2",
        "subheader": "First Tile SubHeader2",
        "unit": "INR",
        "footer": "First Tile footer2",
        "src": "sap-icon://home",
        "navigationInfo": {
            "uriToLoad": "",
            "projectName": "FirstHeader2",
            "componentName": "",
            "projectId": "",
            "tileType": "display",
            "semanticObject": "Dealer",
            "navigationParameter": ""
        }
    }, {
        "header": "First Tile Header3",
        "subheader": "First Tile SubHeader3",
        "unit": "INR",
        "footer": "First Tile footer3",
        "src": "sap-icon://home-share",
        "navigationInfo": {
            "uriToLoad": "",
            "projectName": "FirstHeader3",
            "componentName": "",
            "projectId": "",
            "navigationParameter": ""
        }
    }, {
        "header": "First Tile Header4",
        "subheader": "First Tile SubHeader4",
        "unit": "INR",
        "footer": "First Tile footer4",
        "src": "sap-icon://home-share",
        "navigationInfo": {
            "uriToLoad": "",
            "projectName": "FirstHeader4",
            "componentName": "",
            "projectId": "",
            "navigationParameter": ""
        }
    }, {
        "header": "First Tile Header5",
        "subheader": "First Tile SubHeader5",
        "unit": "INR",
        "footer": "First Tile footer5",
        "src": "sap-icon://home-share",
        "navigationInfo": {
            "uriToLoad": "",
            "componentName": "",
            "projectId": "",
            "navigationParameter": ""
        }
    }, {
        "header": "First Tile Header6",
        "subheader": "First Tile SubHeader6",
        "unit": "INR",
        "footer": "First Tile footer6",
        "src": "sap-icon://home-share",
        "navigationInfo": {
            "uriToLoad": "",
            "componentName": "",
            "projectId": "",
            "navigationParameter": ""
        }
    }, {
        "header": "First Tile Header",
        "subheader": "First Tile SubHeader",
        "unit": "INR",
        "footer": "First Tile footer",
        "src": "sap-icon://home-share",
        "navigationInfo": {
            "uriToLoad": "",
            "componentName": "",
            "projectId": "",
            "navigationParameter": ""
        }
    }, {
        "header": "First Tile Header2",
        "subheader": "First Tile SubHeader2",
        "unit": "INR",
        "footer": "First Tile footer2",
        "src": "sap-icon://home-share",
        "navigationInfo": {
            "uriToLoad": "",
            "componentName": "",
            "projectId": "",
            "navigationParameter": ""
        }
    }, {
        "header": "First Tile Header3",
        "subheader": "First Tile SubHeader3",
        "unit": "INR",
        "footer": "First Tile footer3",
        "src": "sap-icon://home-share",
        "navigationInfo": {
            "uriToLoad": "",
            "componentName": "",
            "projectId": "",
            "navigationParameter": ""
        }
    }, {
        "header": "First Tile Header4",
        "subheader": "First Tile SubHeader4",
        "unit": "INR",
        "footer": "First Tile footer4",
        "src": "sap-icon://home-share",
        "navigationInfo": {
            "uriToLoad": "",
            "componentName": "",
            "projectId": "",
            "navigationParameter": ""
        }
    }, {
        "header": "First Tile Header5",
        "subheader": "First Tile SubHeader5",
        "unit": "INR",
        "footer": "First Tile footer5",
        "src": "sap-icon://home-share",
        "navigationInfo": {
            "uriToLoad": "",
            "componentName": "",
            "projectId": "",
            "navigationParameter": ""
        }
    }, {
        "header": "First Tile Header6",
        "subheader": "First Tile SubHeader6",
        "unit": "INR",
        "footer": "First Tile footer6",
        "src": "sap-icon://home-share",
        "navigationInfo": {
            "uriToLoad": "",
            "componentName": "",
            "projectId": "",
            "navigationParameter": ""
        }
    }]
}, {
    "SecTitle": "Second Section",
    "tileItems": [{
        "header": "Second Tile Header",
        "subheader": "Second Tile SubHeader",
        "unit": "INR",
        "footer": "Second Tile footer",
        "src": "sap-icon://home-share",
        "navigationInfo": {
            "uriToLoad": "",
            "componentName": "",
            "projectId": "",
            "navigationParameter": ""
        }
    }]
}]
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta charset="utf-8" />
		<title>Categories Test</title>
		<script
			id="sap-ui-bootstrap"
			src="https://openui5.hana.ondemand.com/resources/sap-ui-core.js"
			data-sap-ui-theme="sap_fiori_3"
			data-sap-ui-libs="sap.m"
			data-sap-ui-compatVersion="edge"
			data-sap-ui-async="true"
			data-sap-ui-frameOptions="trusted"
			data-sap-ui-onInit="module:sap/ui/core/ComponentSupport"
			data-sap-ui-logLevel="info"
			data-sap-ui-resourceroots='{"yelcho.reuse": "../"}'
		></script>
	</head>
	<body class="sapUiBody">
		<div
			data-sap-ui-component
			data-name="yelcho.reuse.categories"
			data-id="container"
			data-settings='{"id": "app"}'
		></div>
	</body>
</html>

<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta charset="utf-8" />
		<title>Categories Test</title>
		<script
			id="sap-ui-bootstrap"
			src="https://openui5.hana.ondemand.com/resources/sap-ui-core.js"
			data-sap-ui-theme="sap_fiori_3"
			data-sap-ui-libs="sap.m"
			data-sap-ui-compatVersion="edge"
			data-sap-ui-async="true"
			data-sap-ui-frameOptions="trusted"
			data-sap-ui-onInit="module:sap/ui/core/ComponentSupport"
			data-sap-ui-logLevel="info"
			data-sap-ui-resourceroots='{"yelcho.reuse": "../"}'
		></script>
	</head>
	<body class="sapUiBody">
		<div
			data-sap-ui-component
			data-name="yelcho.reuse.categories"
			data-id="container"
			data-settings='{"id": "app"}'
		></div>
	</body>
</html>

<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta charset="utf-8" />
    <title>Component Based Navigation</title>
    <script id="sap-ui-bootstrap" 
        src="https://openui5.hana.ondemand.com/resources/sap-ui-core.js"
        data-sap-ui-theme="sap_belize" 
        data-sap-ui-libs="sap.m" 
        data-sap-ui-compatVersion="edge"
        data-sap-ui-async="true" 
        data-sap-ui-frameOptions="trusted"
        data-sap-ui-onInit="module:sap/ui/core/ComponentSupport" 
        data-sap-ui-logLevel="info"
        data-sap-ui-resourceroots='{"com.golit.lp.landingpage": "webapp/","com.golit": "app-modules/"}'></script>
</head>

<body class="sapUiBody">
    <div data-sap-ui-component data-name="com.golit.lp.landingpage"
          data-id="container" 
          data-height="100%"
          style="height: 92.5%"
          data-settings='{"id": "_landingpageShellId"}'>
    </div>
</body>

</html>



appTitle=Category Component
appDescription=Category Reusable Component

listViewTitle=Categories
detailViewTitle=Category Detail
productListTitle=Products in this Category


appTitle=Category Component
appDescription=Category Reusable Component

listViewTitle=Categories
detailViewTitle=Category Detail
productListTitle=Products in this Category


appTitle=Component Based Navigation Demo
appDescription=Component Based Navigation Demo

homePageTitle=Home Page
view1Title=Home Page View1 Title