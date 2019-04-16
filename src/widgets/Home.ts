import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';

import * as css from './styles/Home.m.css';

import PortalCard from './portal-card/portal-card';

export default class Home extends WidgetBase {
	protected render() {
		return v('h1', { classes: [css.root] }, ['Home Page', w(PortalCard, { itemid: "db71cf1dae7745789f4555d942a7cca1", onChange: () => {} })]);
	}
}
