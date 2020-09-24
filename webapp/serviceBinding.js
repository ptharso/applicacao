function initModel() {
	var sUrl = "/sap/opu/odata/iwfnd/CATALOGSERVICE/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}