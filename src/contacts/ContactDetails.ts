import {
  css,
  customElement,
  html,
  property,
  TemplateResult,
} from "lit-element";
import { Group } from "../interfaces";
import RapidElement from "../RapidElement";
import { isDate, timeSince } from "../utils";
import Button from "../button/Button";
import Store from "../store/Store";

@customElement("temba-contact-details")
export default class ContactDetails extends RapidElement {
  @property({ type: Object })
  contact: any;

  @property({ attribute: false })
  flow: any = null;

  // the fields with values for this contact
  @property({ type: Array })
  fields: string[] = [];

  static get styles() {
    return css`
      :host {
        background: #f2f2f2;
        display: block;
        height: 100%;
        padding: 1.5em;
      }

      a {
        color: var(--color-link-primary);
      }

      .field-links {
        font-size: 0.8em;
      }

      .contact > .name {
        font-size: 18px;
        font-weight: 400;
      }

      .group-label {
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
          0 1px 2px 0 rgba(0, 0, 0, 0.06);
        line-height: 1.25;
        text-decoration: none;
        cursor: default;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
        display: inline-block;
        font-size: 0.75rem;
        font-weight: 400;
        border-radius: 9999px;
        background-color: rgba(0, 0, 0, 0.05);
        color: rgba(0, 0, 0, 0.5);
        letter-spacing: 0.025em;
        white-space: nowrap;
        text-align: center;
        margin-right: 6px;
        margin-top: 6px;
      }

      .group-label::before {
        // content: "\ebeb";
        // font-family: "temba";
      }

      .start-flow {
      }

      .actions {
        margin-top: 16px;
        border: 0px solid #ddd;
        border-radius: 0.5em;
        padding: 0px;
      }

      .fields-wrapper {
        margin-top: 1em;
        background: #fff;
        border-radius: 0.5em;
        overflow: hidden;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
          0 1px 2px 0 rgba(0, 0, 0, 0.06);
      }

      .fields {
        padding: 1em;
        max-height: 200px;
        border-radius: 0.5em;
        overflow-y: auto;
        -webkit-mask-image: -webkit-radial-gradient(white, black);
      }

      .field {
        border-radius: 0.5em;

        display: flex;
        flex-direction: column;
        // align-items: center;
        margin-bottom: 0.3em;
      }

      .field .name {
        margin-right: 8px;
        font-weight: 400;
        color: #666;
        font-size: 0.9em;
      }
      .field .value {
        font-size: 0.8em;
      }

      temba-button {
        margin-top: 5px;
        display: block;
        --button-y: 0;
      }
    `;
  }

  public updated(changes: Map<string, any>) {
    super.updated(changes);
    if (changes.has("contact")) {
      this.flow = null;
      this.expandFields = false;
      this.fields = Object.keys(this.contact.fields).filter(
        (key: string) => !!this.contact.fields[key]
      );
    }
  }

  private handleFlowChanged(evt: CustomEvent) {
    this.flow = evt.detail.selected as any;
  }

  private handleExpandFields(): void {
    this.expandFields = true;
  }

  private handleHideFields(): void {
    this.expandFields = false;
  }

  @property({ type: Boolean })
  expandFields: boolean = false;

  public render(): TemplateResult {
    const store: Store = document.querySelector("temba-store");
    if (this.contact) {
      return html`<div class="contact">
        <div class="name">${this.contact.name}</div>
        <div>
          ${this.contact.groups.map((group: Group) => {
            return html`<div class="group-label">${group.name}</div>`;
          })}
        </div>
        <div class="fields-wrapper">
          <div class="fields">
            ${this.fields
              .slice(0, this.expandFields ? 255 : 3)
              .map((key: string) => {
                let value = this.contact.fields[key];

                if (value) {
                  if (isDate(value)) {
                    value = timeSince(new Date(value));
                  }
                  return html`<div class="field">
                    <div class="name">${store.getContactField(key).label}</div>
                    <div class="value">${value}</div>
                  </div>`;
                }
              })}

            <div class="field-links">
              ${this.fields.length > 3
                ? !this.expandFields
                  ? html`<a href="#" @click="${this.handleExpandFields}"
                      >more</a
                    >`
                  : html`<a href="#" @click="${this.handleHideFields}">less</a>`
                : null}
            </div>
          </div>
        </div>

        <div class="actions">
          <div class="start-flow">
            <temba-select
              endpoint="/api/v2/flows.json?archived=false"
              placeholder="Start Flow"
              flavor="small"
              .values=${this.flow ? [this.flow] : []}
              @temba-selection=${this.handleFlowChanged}
            ></temba-select>
          </div>
        </div>
      </div>`;
    }
  }
}
