import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { watch } from '@dojo/framework/widget-core/decorators/watch';
import { v } from '@dojo/framework/widget-core/d';

import { customElement } from '@dojo/framework/widget-core/decorators/customElement';
import * as css from './styles/portal-card.m.css';
import { fetchPortalItem } from './support/arcgis';

/**
 * @type PortalCardProperties
 *
 * Properties that can be set on MapWidget components
 */
export interface PortalCardProperties {
  portalUrl?: string,
	itemid?: string;
	onChange?: (data: any) => void;
}

const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const dateFormatter = new Intl.DateTimeFormat(undefined, dateOptions);

@customElement<PortalCardProperties>({
	tag: 'portal-card',
	attributes: ['itemid'],
	properties: [],
	events: ['onChange']
})
@theme(css)
export class PortalCard extends ThemedMixin(WidgetBase)<PortalCardProperties> {
  @watch() state = {
    created: new Date(),
    title: "",
    snippet: "",
    thumbnailUrl: ""
  };
  onAttach() {
    const { itemid, onChange } = this.properties;
    if (itemid) {
      // fetch the portal item
      fetchPortalItem(itemid).then((item) => {
        this.setState({
          create: item.created,
          title: item.title,
          snippet: item.snippet,
          thumbnailUrl: item.thumbnailUrl
        });

        // return portal item to event listener
        if (onChange) {
          onChange(item);
        }
      });
    }
  }

	protected render(): DNode | DNode[] {
		return v('div', { classes: [css.root, css.cardwide] }, [
      // Caption
      v('figure', { classes: [css.imagewrap, css.cardwideimagewrap ] }, [
        v('img', { classes: [css.image, css.cardwideimage],  src: this.state.thumbnailUrl }),
        v('div', { classes: [css.imagecaption] } , [
          `Created: ${dateFormatter.format(this.state.created)}`
        ]),
      ]),
      // Content
      v('div', { classes: [css.content] }, [
        v('h4', {}, [ this.state.title ]),
        v('p', { classes: [css.fontsize1] }, [ this.state.snippet ])
      ])
    ]);
  }
  
  private setState(state: any) {
    this.state = { ...this.state, ...state };
  }
}

export default PortalCard;
