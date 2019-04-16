import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import MetaBase from '@dojo/framework/widget-core/meta/Base';
import { v } from '@dojo/framework/widget-core/d';

import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
import * as css from './styles/map-widget.m.css';

import { initialize } from "./support/arcgis";

/**
 * @type MapWidgetProperties
 *
 * Properties that can be set on MapWidget components
 */
export interface MapWidgetProperties {
	webmapid: string;
	widgets: string | string[];
	onChange: (data: any) => void;
}

class HtmlMeta extends MetaBase {
  get(key: string): Element {
    const node = this.getNode(key);
    return node as Element;
  }
}

@customElement<MapWidgetProperties>({
	tag: 'map-widget',
	attributes: ['webmapid', 'widgets'],
	properties: [],
	events: ['onChange']
})
@theme(css)
export class MapWidget extends ThemedMixin(WidgetBase)<MapWidgetProperties> {
  onAttach() {
		const container = this.meta(HtmlMeta).get("elemRef") as HTMLElement;
		const propWidgets = this.properties.widgets
		const widgets = Array.isArray(propWidgets) ? propWidgets : (typeof propWidgets === "string" ? propWidgets.split(",") : []);
		initialize({
			container,
			webmapid: this.properties.webmapid,
			onChange: this.properties.onChange,
			widgets
		});
  }

	protected render(): DNode | DNode[] {
		return v('div', { classes: [css.root], key: "elemRef" });
	}
}

export default MapWidget;
