import {
  css,
  customElement,
  html,
  property,
  TemplateResult,
} from 'lit-element';
import { SIMULATED_WEB_SLOWNESS } from '../contacts/helpers';
import { CustomEventType } from '../interfaces';
import { RapidElement } from '../RapidElement';
import { fetchResultsPage, ResultsPage } from '../utils';

const DEFAULT_REFRESH = 10000;

export class TembaList extends RapidElement {
  @property({ type: Array, attribute: false })
  items: any[] = [];

  @property({ type: Object, attribute: false })
  selected: any;

  @property({ type: Number })
  cursorIndex: number;

  @property({ type: String })
  endpoint: string;

  @property({ type: Number })
  tabIndex: number = 1;

  @property({ type: String })
  valueKey: string = 'id';

  @property({ type: Boolean })
  loading: boolean = false;

  @property({ type: String })
  nextSelection: string;

  @property({ attribute: false })
  getNextRefresh: (firstOption: any) => any;

  @property({ attribute: false })
  sanitizeOption: (option: any) => any;

  @property({ attribute: false })
  renderOption: (option: any, selected: boolean) => TemplateResult;

  @property({ attribute: false })
  renderOptionDetail: (option: any, selected: boolean) => TemplateResult;

  @property({ attribute: false, type: Object })
  mostRecentItem: any;

  // changes to the refresh key force a refresh
  @property({ type: String })
  refreshKey: string = '0';

  // our next page from our endpoint
  nextPage: string = null;

  pages: number = 0;
  clearRefreshTimeout: any;

  static get styles() {
    return css`
      :host {
        display: block;
        height: 100%;
        width: 100%;
      }

      temba-options {
        display: block;
        height: 100%;
        width: 100%;
      }
    `;
  }

  constructor() {
    super();
    this.handleSelection.bind(this);

    setInterval(() => {
      this.refreshKey = 'default_' + new Date().getTime();
    }, DEFAULT_REFRESH);
  }

  public updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);

    if (changedProperties.has('endpoint') && this.endpoint) {
      this.loading = true;
      window.setTimeout(() => {
        this.fetchItems();
      }, SIMULATED_WEB_SLOWNESS);
    }

    if (
      changedProperties.has('refreshKey') &&
      !changedProperties.has('endpoint')
    ) {
      this.fetchItems().then(() => {
        if (this.nextSelection) {
          this.setSelection(this.nextSelection);
          this.nextSelection = null;
        }
      });
    }

    if (changedProperties.has('mostRecentItem')) {
      this.fireCustomEvent(CustomEventType.Refreshed);
    }

    if (changedProperties.has('cursorIndex')) {
      this.selected = this.items[this.cursorIndex];
    }
  }

  /** performs setSelection but is deferred until after the next fetch */
  private setNextSelection(value: string) {
    this.nextSelection = value;
  }

  private setSelection(value: string) {
    const index = this.items.findIndex(item => {
      return item[this.valueKey] === value;
    });
    this.cursorIndex = index;
    this.selected = this.items[index];
    const evt = new Event('change', { bubbles: true });
    this.dispatchEvent(evt);
  }

  private async fetchItems() {
    let endpoint = this.endpoint;

    let pagesToFetch = this.pages || 1;
    this.pages = 0;
    this.nextPage = null;

    let fetchedItems: any[] = [];

    while (pagesToFetch > 0 && endpoint) {
      const page = await fetchResultsPage(endpoint);

      // sanitize our options if necessary
      if (this.sanitizeOption) {
        page.results.forEach(this.sanitizeOption);
      }

      fetchedItems = fetchedItems.concat(page.results);

      // save our next pages
      this.nextPage = page.next;
      endpoint = this.nextPage;
      pagesToFetch--;
      this.pages++;
    }

    const topItem = fetchedItems[0];
    if (
      !this.mostRecentItem ||
      JSON.stringify(this.mostRecentItem) !== JSON.stringify(topItem)
    ) {
      this.mostRecentItem = topItem;
    }

    // see if our cursor needs to move to stay on the same item
    const newItem = fetchedItems[this.cursorIndex];

    if (
      this.selected &&
      newItem &&
      newItem[this.valueKey] !== this.selected[this.valueKey]
    ) {
      const index = fetchedItems.findIndex(item => {
        return item[this.valueKey] === this.selected[this.valueKey];
      });
      this.cursorIndex = index;
    }

    // save our results
    this.items = fetchedItems;
    this.loading = false;
  }

  private handleScrollThreshold(event: CustomEvent) {
    if (this.nextPage) {
      fetchResultsPage(this.nextPage).then((page: ResultsPage) => {
        if (this.sanitizeOption) {
          page.results.forEach(this.sanitizeOption);
        }

        this.items = [...this.items, ...page.results];
        this.nextPage = page.next;
        this.pages++;
      });
    }
  }

  private handleSelection(event: CustomEvent) {
    const { selected, index } = event.detail;

    this.selected = selected;
    this.cursorIndex = index;

    const evt = new Event('change', { bubbles: true });
    this.dispatchEvent(evt);
  }

  public render(): TemplateResult {
    return html`<temba-options
      ?visible=${true}
      ?block=${true}
      valueKey=${this.valueKey}
      ?loading=${this.loading}
      .renderOption=${this.renderOption}
      .renderOptionDetail=${this.renderOptionDetail}
      @temba-scroll-threshold=${this.handleScrollThreshold}
      @temba-selection=${this.handleSelection.bind(this)}
      .options=${this.items}
      .cursorIndex=${this.cursorIndex}
    ></temba-options>`;
  }
}
