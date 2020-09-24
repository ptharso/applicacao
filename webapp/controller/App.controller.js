sap.ui.define([	"sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/ui/model/Filter", "sap/ui/model/FilterOperator","../model/formatter" ],

function( Controller, MessageToast, Filter, FilterOperator, formatter) { "use strict";

	return Controller.extend("opensap.applicacao.controller.App", { 
		
		formatter: formatter, 
		
		onInit: function () {
			var local, data, oModelo;
			local = [0,0,12,9,10,1,1,11,1,6,2,2]; //einstein
			data = this.onCalculations(local);
			oModelo = new sap.ui.model.json.JSONModel(); oModelo.setData(data); this.getView().setModel(oModelo, "Modelo");
			// var sX	= oModelo.getProperty("/Grafico/0/X"); MessageToast.show(sX); para teste
		},
		
		press: function (oEvent) {	
			MessageToast.show("The interactive bar chart is pressed.");	
		},
		selectionChanged: function (oEvent) { 
			var oBar = oEvent.getParameter("bar"); 
			MessageToast.show("The selection changed: " + oBar.getLabel() + " " + ((oBar.getSelected()) ? "selected" : "deselected"));		
		},

		onShowHello: function() {				
			var sRecipient	= this.getView().getModel("dados").getProperty("/caixa/nome");
			var oBundle 	= this.getView().getModel("i18n" ).getResourceBundle();
			var sMsg		= oBundle.getText("helloMsg", [sRecipient]);
			MessageToast.show(sMsg);
		},
		
		onShowChart: function() { //column
			var local, data, oValue, oCateg; 
			local = [0,0,12,9,10,1,1,11,1,6,2,2]; //einstein
			var oMapa, oModel, oData, oValue, oCateg;
			oMapa = new sap.viz.ui5.Pie( "column" , { title:{text: "Talento Natural", visible: true, }, width : "800px", height : "400px" });			
			oModel = new sap.ui.model.json.JSONModel(); oModel.setData( this.onCalculations(local) );
			oData  = new sap.viz.ui5.data.FlattenedDataset({
						dimensions:	[{name:"X", value:"{X}"}],
						measures:	[{name:"Y", value:"{Y}"}], 
						data:		 {path:"/Grafico" }
			});
			oMapa = this.getView().byId("barchart"); 
			oCateg= new sap.viz.ui5.controls.common.feeds.FeedItem({"uid": "categoryAxis", "type": "Dimension","values": ["X"]	}); 
			oValue= new sap.viz.ui5.controls.common.feeds.FeedItem({"uid": "valueAxis",	   "type": "Measure",  "values": ["Y"]	});
			oMapa.setVizProperties({ title: { text: "Talento Natural" }	});
			oMapa.setDataset(oData); 
			oMapa.setModel(oModel);
			oMapa.addFeed(oCateg);
			oMapa.addFeed(oValue);
		},
		onShowChard: function() { //pizza
			var local, oModel, oMapa, oData, oColor, oSize;
			local  = [0,0,12,9,10,1,1,11,1,6,2,2]; //einstein
		    oModel = new sap.ui.model.json.JSONModel(); oModel.setData( this.onCalculations(local) );
		  //oModel = new sap.ui.model.json.JSONModel("./model/dados.json"); oModel.setData("/dados/Regioes");
			oData = new sap.viz.ui5.data.FlattenedDataset({
						dimensions:	[{name:"X", value:"{X}"}],
						measures:	[{name:"Y", value:"{Y}"}], 
					  //data:		 {path:"/Regioes" }		
					    data:		 {path:"/Brain" }		
					  //data:		 {path:"/Grafico" }
			});
			oMapa = this.getView().byId("barchard"); 
			oColor= new sap.viz.ui5.controls.common.feeds.FeedItem({"uid": "color", "type": "Dimension","values": ["X"] }); 
			oSize = new sap.viz.ui5.controls.common.feeds.FeedItem({"uid": "size",	"type": "Measure",  "values": ["Y"] }); 
			oMapa.setVizProperties({ title: { text: "Talento Natural" }	});
			oMapa.setDataset(oData); 
			oMapa.setModel(oModel); 
			oMapa.addFeed(oColor);
			oMapa.addFeed(oSize);
		},
		onCalculations: function(local) { 
			var espectros= new Array([30]), geral, parcial, qmaxi, fator, data;
			var index	 = new Array( 
				  [	4,			4,			4,		  4,		4,			4,		  4,		4,			4,			4,			4,			4			], //Coerencia
				  [	4,			4,			4,		  4,		4,			4,		  4,		4,			4,			4,			4,			4			], //Regencia
				  [	3,			4,			4,		  4,		2,			4,		  0,		4,			4,			4,			1,			4			], //Essencia			
				  [	4,			3,			4,		  2,		4,			4,		  4,		0,			4,			1,			4,			4			], //Apetite		
				  [	2,			4,			4,		  0,		4,			4,		  1,		4,			4,			3,			4,			4			], //Guerreiro
				  [	4,			4,			4,		  4,		4,			0,		  4,		1,			4,			4,			4,			3			], //Afetivo		
				  [	4,			4,			2,		  4,		0,			2,		  4,		4,			1,			4,			3,			4			], //Astucia
				  [	4,			4,			1,		  3,		4,			4,		  4,		4,			2,			0,			4,			4			], //Incentivo
				  [	0,			4,			4,		  1,		4,			4,		  3,		4,			4,			2,			4,			4			], //Restritor
				  [	4,			0,			4,		  4,		1,			4,		  4,		3,			4,			4,			2,			4			], //Criativo		
				  [	4,			4,			4,		  4,		3,			1,		  4,		4,			4,			4,			0,			2			], //Visionario
				  [	4,			1,			4,		  4,		0,			4,		  4,		2,			4,			4,			3,			4			], //Captador
				  [	4,			4,			3,		  2,		2,			2,		  2,		3,			3,			1,			1,			1			], //pesos12
				  [ 1,			2,			6,		  4,		0,			0,		  0,		0,			0,			0,	    	0,	    	0 	    	], //eixod13
				  [	5,			6,			7,		  4,		3,			7,		  6,	   12,			8,			9,		   10,		   11			], //donos14
				  ["Coerencia","Regencia","Essencia","Apetite","Guerreiro","Afetivo","Astucia","Incentivo","Restritor","Criativo","Visionário","Captador"	]  //nomes15
			);						  

			geral = 0;	qmaxi = 0;
			local[1] = local[index[14][local[2] - 1] - 1];
			if (local[3] === local[1] || local[3] === local[2]) {local[0] = local[3];index[12][0] = index[12][3];
			} else {local[0] = 0;index[12][0] = index[12][11];}
			for (var s = 0; s < 12; s++) {espectros[s] = 0;
				for (var p = 0; p < 12; p++) {
					parcial = index[12][p] + index[13][index[s][p]];
					if (local[p] === s + 1) {espectros[s] = espectros[s] + parcial;
					} //document.write( local[s]+": "+ parcial.toFixed(2) + " " ); 
				}
				if (espectros[s] > 10) {espectros[s] = espectros[s] - 1;}
				geral = geral + espectros[s]; //document.write(" " + local[s]  +"->"+ index[15][s] +"->"+ espectros[s].toFixed(2)+"<br>");
			}
			espectros[12] = espectros[0] + espectros[3] + espectros[6] + espectros[9];
			espectros[13] = espectros[1] + espectros[4] + espectros[7] + espectros[10];
			espectros[15] = espectros[0] + espectros[4] + espectros[8];
			espectros[16] = espectros[1] + espectros[5] + espectros[9];
			espectros[17] = espectros[2] + espectros[6] + espectros[10];
			espectros[19] = espectros[0] + espectros[6];
			espectros[20] = espectros[1] + espectros[7];
			espectros[21] = espectros[3] + espectros[4] + espectros[9] + espectros[10];
			espectros[22] = espectros[2] + espectros[11];
			espectros[24] = espectros[0] + espectros[1] + espectros[6] + espectros[7];
			espectros[25] = espectros[2] + espectros[5] + espectros[8] + espectros[11];
			espectros[27] = espectros[0] + espectros[4] + espectros[8] + espectros[2] + espectros[6] + espectros[10];
			for (var i = 0; i < 29; i++) {if (espectros[i] === 0) {	espectros[i] = 0.3;	}espectros[i] = Math.round(espectros[i] * 100 / geral);			}
			espectros[14] = Math.round(100 - espectros[12] - espectros[13]);
			espectros[18] = Math.round(100 - espectros[15] - espectros[16] - espectros[17]);
			espectros[23] = Math.round(100 - espectros[19] - espectros[20] - espectros[21] - espectros[22]);
			espectros[26] = Math.round(100 - espectros[24] - espectros[25]);
			espectros[28] = Math.round(100 - espectros[27]);
			for (var i = 0; i < 29; i++) {
				if (espectros[i] < 0) {	espectros[i] = 0; }
				if (i < 12) {fator = 33 / 10;}
				if (i > 11 && i < 15) {fator = 33 / 33;}
				if (i > 14 && i < 19) {fator = 33 / 25;}
				if (i > 18 && i < 24) {fator = 33 / 20;}
				if (i > 23 && i < 27) {fator = 33 / 33;}
				if (i > 23 && i < 29) {fator = 33 / 50;}
				qmaxi = qmaxi + Math.round(Math.pow(espectros[i] * fator, 2)); //37224=minimo Einstein 
			}
			espectros[29] = 10 * Math.round(10 * (77500 - qmaxi) / 40000);
			//MessageToast.show( qmaxi.toFixed(2) + " Valor : "+ espectros[29].toFixed(2) );
			if (espectros[29] > 100) {espectros[29] = 100;}
			data = { "Grafico" : [	
						{  "X": "Liderança,Afirmação,Iniciativa",		 "Y": espectros[ 0] },
						{  "X": "Diplomacia,Conciliação,Equilibrio",	 "Y": espectros[ 6] }, 
						{  "X": "Otimismo,Motivação,Liberdade",			 "Y": espectros[ 8] },
						{  "X": "Negociação,Astucia,Flexibilidade",		 "Y": espectros[ 2] }, 
						{  "X": "Governança,Distinção,Nobreza", 		 "Y": espectros[ 4] },
						{  "X": "Humanismo,Inovação,Metodico",			 "Y": espectros[10] }, 
						{  "X": "Assessoria,Publicidade,Conservador",	 "Y": espectros[ 3] }, 
						{  "X": "Organização,Laborioso,Responsavel",	 "Y": espectros[ 9] }, 
						{  "X": "Dedicação,Religioso,Musicalidade",		 "Y": espectros[11] },
						{  "X": "Detalhismo,Eficiencia,Praticidade",	 "Y": espectros[ 5] }, 
						{  "X": "Dinamismo,Agregação,Investigação",		 "Y": espectros[ 7] }, 
						{  "X": "Persistente,Financeiro,Construtivo",	 "Y": espectros[ 1] }, 
						{  "X": "Vontade,Decisão,Indução",				 "Y": espectros[12]	}, 
						{  "X": "Inteligencia,Criatividade,Solução",	 "Y": espectros[13]	}, 
						{  "X": "Aprendizado,Amor,Sabedoria",			 "Y": espectros[14]	},
						{  "X": "Global,Universal,Mundial",				 "Y": espectros[15]	}, 
						{  "X": "Social,Empresarial,Publico",			 "Y": espectros[17]	}, 
						{  "X": "Grupal,Familial,Setorial",				 "Y": espectros[18]	},
						{  "X": "Individual,Pessoal,Exclusivo",			 "Y": espectros[16]	}, 
						{  "X": "Planos,Capital,Justiça,Objetivos",		 "Y": espectros[19]	},
						{  "X": "Informações,Noticias,Comunicação",		 "Y": espectros[22]	}, 
						{  "X": "Gerencial,Maestria,Operacional,Centro", "Y": espectros[21]	}, 
						{  "X": "Estudos,Analises,Trabalhos",			 "Y": espectros[23]	},
						{  "X": "Obras,Produtos,Pesquisas,Objetos",		 "Y": espectros[20]	}, 
						{  "X": "Estratégia,Percepção,Intuitivo",		 "Y": espectros[24]	}, 
						{  "X": "Analitico,Minucias,Racional", 			 "Y": espectros[25]	},
						{  "X": "Execução,Operacional,Emocional",		 "Y": espectros[26]	}, 
						{  "X": "Plasticidade,Equilibrado,Dual",		 "Y": espectros[29]	},
						{  "X": "Concreto,LeftBrain,Técnico",			 "Y": espectros[28]	},
						{  "X": "Abstrato,RightBrain,Gerencial",		 "Y": espectros[27]	} 
					],
				"Brain" : [
						{  "X": "Plasticidade,Equilibrado,Dual",		 "Y": espectros[29]	},
						{  "X": "Concreto,LeftBrain,Técnico",			 "Y": espectros[28]	},
						{  "X": "Abstrato,RightBrain,Gerencial",		 "Y": espectros[27]	} 
					]
			};
			return data;
		},
		
		onItemSelected: function(oEvent) {
			//var oSelectedItem = oEvent.getSource(); 
			var oSelectedItem = oEvent.getParameter("listItem");
			var oContext = oSelectedItem.getBindingContext();
			var sPath = oContext.getPath();
			var oPanel = this.byId("productDetailsPanel");
			oPanel.bindElement({ path: sPath });
			oPanel.setVisible(true);
		},
		
		onFilterProducts: function(oEvent) { // build filter array
			var aFilter = []; // apply filter. an empty filter array simply removes the filter, which will make all entries visible again
			var sQuery = oEvent.getParameter("query"); // retrieve list control
			var oList = this.getView().byId("productsList"); // get binding for aggregation 'items'
			var oBinding = oList.getBinding("items");
			if (sQuery) {
				aFilter.push(new Filter("ProductID", FilterOperator.Contains, sQuery));
			}
			oBinding.filter(aFilter);
		}
	});
});