import { loadCss, loadModules } from 'esri-loader';

export interface initializeProperties {
  webmapid: string;
  container: HTMLElement;
  widgets: string[];
  onChange: (data: any) => void;
}

export async function initialize({ container, webmapid, onChange, widgets = [] }: initializeProperties) {
  loadCss('https://js.arcgis.com/4.11/esri/css/main.css');
  const [MapView, WebMap] = await loadModules(['esri/views/MapView', 'esri/WebMap']);
  // then we load a web map from an id
  const webmap = new WebMap({
    portalItem: {
      id: webmapid
    }
  });
  // and we show that map in a container w/ id #viewDiv
  const view = new MapView({
    map: webmap,
    container: container
  });

  view.watch('center', (center: any) => {
    onChange(center);
  });

  if (widgets.length) {
    const positions: string[] = [];
    const requiredWidgets = widgets.map(w => {
      if (w === 'legend') {
        positions.push('bottom-left');
        return 'esri/widgets/Legend'
      };
      if (w === 'search') {
        positions.push('top-right');
        return 'esri/widgets/Search'
      };
      if (w === 'basemapGallery') {
        positions.push('top-right');
        return 'esri/widgets/BasemapGallery';
      }
      return '';
    }).filter(x => x.length);
    const modules = await loadModules(requiredWidgets);
    modules.forEach((Widget, idx) => {
      view.ui.add(new Widget({ view }), positions[idx]);
    });
  }
}