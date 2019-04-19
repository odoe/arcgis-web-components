import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';

import * as css from './styles/Home.m.css';

import PortalCard from './portal-card/portal-card';
import MapWidget from './map-widget/map-widget';

export default class Home extends WidgetBase {
	protected render() {
		return v('div', { classes: [ css.root ] }, [
			v('h1', {}, [
				'Home Page'
			]),
			w(PortalCard, { itemid: 'db71cf1dae7745789f4555d942a7cca1', onChange: () => {} }),
			w(MapWidget, { webmapid: 'db71cf1dae7745789f4555d942a7cca1', widgets: 'legend,search', onChange: () => {} })
		]);
	}
}
