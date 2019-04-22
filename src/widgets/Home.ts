import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';

import * as css from './styles/Home.m.css';

import PortalCard from './portal-card/portal-card';
import SceneWidget from './arcgis-widgets/webscene-widget';

export default class Home extends WidgetBase {
	protected render() {
		return v('div', { classes: [ css.root ] }, [
			v('h1', {}, [
				'Home Page'
			]),
			w(PortalCard, { itemid: '5a392557cffb485f8fe004e668e9edc0', onChange: () => {} }),
			w(SceneWidget, { websceneid: '5a392557cffb485f8fe004e668e9edc0', widgets: 'areameasurement3d:expand:bottom-left,search', onChange: () => {} })
		]);
	}
}
