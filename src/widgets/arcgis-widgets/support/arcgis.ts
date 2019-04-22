import { loadCss, loadModules } from "esri-loader";

export interface initializeProperties {
  type: '2d' | '3d';
  webmapid: string;
  container: HTMLElement;
  widgets: string[];
  onChange: (data: any) => void;
}

interface ValidWidgets {
  areameasurement2d: "esri/widgets/AreaMeasurement2D";
  areameasurement3d: "esri/widgets/AreaMeasurement3D";
  basemapgallery: "esri/widgets/BasemapGallery";
  basemaptoggle: "esri/widgets/BasemapToggle";
  bookmarks: "esri/widgets/Bookmarks";
  compass: "esri/widgets/Compass";
  coordinateconversion: "esri/widgets/CoordinateConversion";
  directions: "esri/widgets/Directions";
  directlinemeasurement3d: "esri/widgets/DirectLineMeasurement3D";
  distancemeasurement2d: "esri/widgets/DistanceMeasurement2D";
  editor: "esri/widgets/Editor";
  featureform: "esri/widgets/FeatureForm";
  featuretemplates: "esri/widgets/FeatureTemplates";
  home: "esri/widgets/Home";
  layerlist: "esri/widgets/LayerList";
  legend: "esri/widgets/Legend";
  locate: "esri/widgets/Locate";
  navigationtoggle: "esri/widgets/NavigationToggle";
  print: "esri/widgets/Print";
  scalebar: "esri/widgets/ScaleBar";
  search: "esri/widgets/Search";
  sketch: "esri/widgets/Sketch";
  slice: "esri/widgets/Slice";
  track: "esri/widgets/Track";
}

interface WidgetOptions {
  expand: boolean;
  position: string;
}

const lowerCase = (a: string = "") => a.toLowerCase();

// Format
// search:expand:top-right
const widgetMap: ValidWidgets = {
  areameasurement2d: "esri/widgets/AreaMeasurement2D",
  areameasurement3d: "esri/widgets/AreaMeasurement3D",
  basemapgallery: "esri/widgets/BasemapGallery",
  basemaptoggle: "esri/widgets/BasemapToggle",
  bookmarks: "esri/widgets/Bookmarks",
  compass: "esri/widgets/Compass",
  coordinateconversion: "esri/widgets/CoordinateConversion",
  directions: "esri/widgets/Directions",
  directlinemeasurement3d: "esri/widgets/DirectLineMeasurement3D",
  distancemeasurement2d: "esri/widgets/DistanceMeasurement2D",
  editor: "esri/widgets/Editor",
  featureform: "esri/widgets/FeatureForm",
  featuretemplates: "esri/widgets/FeatureTemplates",
  home: "esri/widgets/Home",
  layerlist: "esri/widgets/LayerList",
  legend: "esri/widgets/Legend",
  locate: "esri/widgets/Locate",
  navigationtoggle: "esri/widgets/NavigationToggle",
  print: "esri/widgets/Print",
  scalebar: "esri/widgets/ScaleBar",
  search: "esri/widgets/Search",
  sketch: "esri/widgets/Sketch",
  slice: "esri/widgets/Slice",
  track: "esri/widgets/Track"
};

export async function initialize({
  type,
  container,
  webmapid,
  onChange,
  widgets = []
}: initializeProperties) {
  loadCss("https://js.arcgis.com/4.11/esri/themes/light/main.css");


  const modules = type == '2d' ? [
    "esri/views/MapView",
    "esri/WebMap",
    "esri/widgets/Expand"
  ] : [
    "esri/views/SceneView",
    "esri/WebScene",
    "esri/widgets/Expand"
  ]
  const [View, WebMap, Expand] = await loadModules(modules);
  // then we load a web map from an id
  const webmap = new WebMap({
    portalItem: {
      id: webmapid
    }
  });
  // and we show that map in a container w/ id #viewDiv
  const view = new View({
    map: webmap,
    container: container
  });

  view.watch("center", (center: any) => {
    onChange(center);
  });

  if (widgets.length) {
    const options: WidgetOptions[] = [];
    const requiredWidgets = widgets
      .map(w => {
        const [n, expand, position] = w.split(":");
        const name = lowerCase(n) as keyof ValidWidgets;
        const path = widgetMap[name];
        options.push({
          expand: expand == "expand",
          position: position || "top-right"
        });
        return path;
      })
      .filter(x => x.length);
    const modules = await loadModules(requiredWidgets);
    modules.forEach((Widget, idx) => {
      const option = options[idx];
      if (option.expand) {
        view.ui.add(
          new Expand({
            content: new Widget({ view })
          }),
          option.position
        );
      } else {
        view.ui.add(new Widget({ view }), option.position);
      }
    });
  }
}
