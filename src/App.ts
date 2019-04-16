import WidgetBase from '@dojo/framework/widget-core/WidgetBase';
import { v, w } from '@dojo/framework/widget-core/d';
import Outlet from '@dojo/framework/routing/Outlet';

import Menu from './widgets/Menu';
import Home from './widgets/Home';

import * as css from './App.m.css';

export default class App extends WidgetBase {
	protected render() {
		return v('div', { classes: [ css.root ] }, [
			w(Menu, {}),
			v('div', [ w(Outlet, { key: 'home', id: 'home', renderer: () => w(Home, {}) }) ])
		]);
	}
}
