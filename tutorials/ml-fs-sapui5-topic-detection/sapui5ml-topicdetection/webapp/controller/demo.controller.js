sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/Image"
], function(Controller, MessageBox, Image) {
	"use strict";
	return Controller.extend("sapui5ml.controller.demo", {

		fileUploadChange: function(oControlEvent) {
			// get the current view
			var oView = this.getView();

			// start the busy indicator
			var oBusyIndicator = new sap.m.BusyDialog();
			oBusyIndicator.open();

			// generate the options and stringify
			var options = {
				"numTopics": oView.getModel("demo").getProperty("/options/numTopics"),
				"numTopicsPerDoc": oView.getModel("demo").getProperty("/options/numTopicsPerDoc"),
				"numKeywordsPerTopic": oView.getModel("demo").getProperty("/options/numKeywordsPerTopic"),
				"numFeatures": oView.getModel("demo").getProperty("/options/numFeatures")
			};
			oView.getModel("demo").setProperty("/optionsJs", JSON.stringify(options));

			// keep a reference in the view to close it later
			this.oBusyIndicator = oBusyIndicator;
		},
		fileUploadComplete: function(oControlEvent) {
			// get the current view
			var oView = this.getView();

			if (oControlEvent.getParameters().status === 200) {
				// get the resvice respnse as JSON
				var oTopicDetection = JSON.parse(oControlEvent.getParameters().responseRaw).predictions;

				// create a JSON model
				var documents = new Array(oTopicDetection.length);
				for (var iTopicDetection = 0; iTopicDetection < oTopicDetection.length; iTopicDetection++) {
					var oTopicDetectionDocument = {
						"name": oTopicDetection[iTopicDetection].docName
					};
					oTopicDetectionDocument.topics = [];
					for (var iTopics = 0; iTopics < oTopicDetection[iTopicDetection].topics.length; iTopics++) {
						var oTopicDetectionTopic = {
							"rank": iTopics,
							"id": oTopicDetection[iTopicDetection].topics[iTopics],
							"score": oTopicDetection[iTopicDetection].scores[iTopics],
							"keywords": oTopicDetection[iTopicDetection].keywords[iTopics]
						};

						oTopicDetectionDocument.topics.push(oTopicDetectionTopic);
					}
					documents[iTopicDetection] = oTopicDetectionDocument;
				}
				oView.getModel("demo").setProperty("/result", documents);
				// display the result table
				oView.getModel("demo").setProperty("/resultVisible", true);
			} else {
				oView.getModel("demo").setProperty("/resultVisible", false);
                MessageBox.show("Error " + oControlEvent.getParameters().status + " : " + JSON.parse(oControlEvent.getParameters().responseRaw).error.message);
			}
			this.oBusyIndicator.close();
		}
	});
});