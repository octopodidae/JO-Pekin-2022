require([
  "esri/Map",
  "esri/layers/FeatureLayer",
  "esri/views/MapView",
  "esri/widgets/Home",
  "esri/core/watchUtils",
  "esri/config"
], function (Map, FeatureLayer, MapView, Home, watchUtils, esriConfig) {
  $(document).ready(function () {
    //
    esriConfig.apiKey =
      "AAPK551c88f8d25e4cb6a6fa84e30ea07c240tXPQnH9X28B5uBat8NrS16NXKresOv90auUds7afDCcdpnlA4rLVheETm_yQlL_";
    //
    const orSym = {
      type: "simple-marker",
      color: "#fbbd08",
      outline: {
        color: "#fbbd08",
        width: 1
      }
    };
    //
    const argentSym = {
      type: "simple-marker",
      color: "#838383",
      outline: {
        color: "#838383",
        width: 1
      }
    };
    //
    const bronzeSym = {
      type: "simple-marker",
      color: "#975b33",
      outline: {
        color: "#975b33",
        width: 1
      }
    };
    //
    const totalSym = {
      type: "simple-marker",
      color: "#27292a",
      outline: {
        color: "#27292a",
        width: 1
      }
    };
    //
    const defaultRenderer = {
      type: "simple",
      symbol: {
        type: "simple-marker",
        color: [0, 0, 0, 0],
        outline: {
          color: [0, 0, 0, 0],
          width: 1
        }
      }
    };
    //
    let rendererOr = {
      type: "simple",
      symbol: orSym,
      visualVariables: [
        {
          type: "size",
          field: "medals_csv_GOLD",
          // minDataValue: 0,
          // minDataValue: 0,  // 10% of population in poverty
          // maxDataValue: 100,  // 35% of population in poverty
          // minSize: "0px",  // extruded by 10,0000 meters
          // maxSize: "80px"  // extruded by 500,000 meters
          stops: [
            {
              value: 0,
              size: 0
            },
            {
              value: 1,
              size: 14
            },
            {
              value: 5,
              size: 14
            },
            {
              value: 10,
              size: 20
            },
            {
              value: 30,
              size: 32
            }
          ]
        }
      ]
    };
    //
    let rendererArgent = {
      type: "simple",
      symbol: argentSym,
      visualVariables: [
        {
          type: "size",
          field: "medals_csv_SILVER",
          // minDataValue: 0,
          // minDataValue: 0,  // 10% of population in poverty
          // maxDataValue: 100,  // 35% of population in poverty
          // minSize: "0px",  // extruded by 10,0000 meters
          // maxSize: "80px"  // extruded by 500,000 meters
          stops: [
            {
              value: 0,
              size: 0
            },
            {
              value: 1,
              size: 14
            },
            {
              value: 5,
              size: 14
            },
            {
              value: 10,
              size: 20
            },
            {
              value: 30,
              size: 32
            }
          ]
        }
      ]
    };
    //
    let rendererBronze = {
      type: "simple",
      symbol: bronzeSym,
      visualVariables: [
        {
          type: "size",
          field: "medals_csv_BRONZE",
          // minDataValue: 0,
          // minDataValue: 0,  // 10% of population in poverty
          // maxDataValue: 100,  // 35% of population in poverty
          // minSize: "0px",  // extruded by 10,0000 meters
          // maxSize: "80px"  // extruded by 500,000 meters
          stops: [
            {
              value: 0,
              size: 0
            },
            {
              value: 1,
              size: 14
            },
            {
              value: 5,
              size: 14
            },
            {
              value: 10,
              size: 20
            },
            {
              value: 30,
              size: 32
            }
          ]
        }
      ]
    };
    //
    let rendererTotal = {
      type: "simple",
      symbol: totalSym,
      visualVariables: [
        {
          type: "size",
          field: "medals_csv_TOTAL",
          // minDataValue: 0,
          // minDataValue: 0,  // 10% of population in poverty
          // maxDataValue: 100,  // 35% of population in poverty
          // minSize: "0px",  // extruded by 10,0000 meters
          // maxSize: "80px"  // extruded by 500,000 meters
          stops: [
            {
              value: 0,
              size: 0
            },
            {
              value: 1,
              size: 14
            },
            {
              value: 5,
              size: 14
            },
            {
              value: 10,
              size: 20
            },
            {
              value: 30,
              size: 32
            }
          ]
        }
      ]
    };
    //
    const labelClassOr = {
      symbol: {
        type: "text",
        color: "white",
        haloColor: "black",
        haloSize: 1,
        font: {
          family: "Ubuntu Mono",
          size: 14,
          weight: "bold"
        }
      },
      labelPlacement: "center-center",
      deconflictionStrategy: "none",
      labelExpressionInfo: {
        expression: "$feature.medals_csv_GOLD"
      },
      where: "medals_csv_GOLD > 0"
    };
    //
    const labelClassBronze = {
      symbol: {
        type: "text",
        color: "white",
        haloColor: "black",
        haloSize: 1,
        font: {
          family: "Ubuntu Mono",
          size: 14,
          weight: "bold"
        }
      },
      labelPlacement: "center-center",
      deconflictionStrategy: "none",
      labelExpressionInfo: {
        expression: "$feature.medals_csv_BRONZE"
      },
      where: "medals_csv_BRONZE > 0"
    };
    //
    const labelClassArgent = {
      symbol: {
        type: "text",
        color: "white",
        haloColor: "black",
        haloSize: 1,
        font: {
          family: "Ubuntu Mono",
          size: 14,
          weight: "bold"
        }
      },
      labelPlacement: "center-center",
      deconflictionStrategy: "none",
      labelExpressionInfo: {
        expression: "$feature.medals_csv_SILVER"
      },
      where: "medals_csv_SILVER > 0"
    };
    //
    const labelClassTotal = {
      symbol: {
        type: "text",
        color: "white",
        haloColor: "black",
        haloSize: 1,
        font: {
          family: "Ubuntu Mono",
          size: 14,
          weight: "bold"
        }
      },
      labelPlacement: "center-center",
      deconflictionStrategy: "none",
      labelExpressionInfo: {
        expression: "$feature.medals_csv_TOTAL"
      },
      where: "medals_csv_TOTAL > 0"
    };
    //
    const layer = new FeatureLayer({
      url:
        "https://services.arcgis.com/OMbfIFNCWRclU5sp/arcgis/rest/services/DATA_JO_2022_01/FeatureServer",
      //https://services.arcgis.com/OMbfIFNCWRclU5sp/arcgis/rest/services/DATA_JO_2022_01/FeatureServer
      // portalItem: {
      //   id: "79f1a3d3e7c6443792a0a41dd77ec70b"
      // },
      popupTemplate: {
        title: "{NAME_FR}",
        content:
          '<span class="ui yellow circular label" style="margin-right: 20px;">{medals_csv_GOLD}</span><span class="ui grey circular label" style="margin-right: 20px; margin-bottom: 20px;">{medals_csv_SILVER}</span><span class="ui brown circular label" style="margin-right: 20px;">{medals_csv_BRONZE}</span><span class="ui black circular label" style="margin-right: 20px;">{medals_csv_TOTAL}</span>'
      },
      outFields: ["*"],
      renderer: defaultRenderer
    });
    //
    const map = new Map({
      basemap: "arcgis-light-gray", //arcgis-light-gray
      layers: [layer]
    });
    //
    const view = new MapView({
      container: "viewDiv",
      map: map,
      zoom: 2,
      constraints: {
        maxZoom: 5,
        minZoom: 2
      },
      center: [6.609381437299921, 24.910349595402007]
    });
    //
    view.popup.dockOptions = {
      position: "bottom-left"
    };
    //
    view.ui.move(["zoom", "compass", "navigation-toggle"], "top-right");
    view.ui.add(
      new Home({
        view: view
      }),
      "top-right"
    );
    view.ui.add([
      {
        component: document.getElementById("title"),
        position: "top-left"
      },
      {
        component: document.getElementById("myContainer"),
        position: "top-left"
      }
    ]);
    //
    const radioColorPicker = $(".colorPicker > input");
    radioColorPicker.click(function () {
      let cat = $(this).val();
      // console.log("cat", cat);
      if (cat === "O") {
        layer.renderer = rendererOr;
        layer.labelingInfo = [labelClassOr];
      }
      if (cat === "A") {
        layer.renderer = rendererArgent;
        layer.labelingInfo = [labelClassArgent];
      }
      if (cat === "B") {
        layer.renderer = rendererBronze;
        layer.labelingInfo = [labelClassBronze];
      }
      if (cat === "T") {
        layer.renderer = rendererTotal;
        layer.labelingInfo = [labelClassTotal];
      }
    });

    view.when(function () {
      layer.renderer = rendererOr;
      layer.labelingInfo = [labelClassOr];
      // watchUtils.whenTrue(view, "stationary", () => {
      //   // Get the new center of the view only when view is stationary.
      //   if (view.center) {
      //     console.log(view.center);
      //   }
      // });
    });
  });
});
