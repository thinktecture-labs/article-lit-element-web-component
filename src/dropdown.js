import { css, html, LitElement } from "lit-element";

export class DropDown extends LitElement {

    static get properties() {
        return {
            title: { type: String, reflect: true },
            selected: { type: String, reflect: true },
            closed: { type: Boolean, reflect: true },
            options: { type: Array }
        };
    }

    static get styles() {
    return css`
        :host {
            --primary-color: #ff584f;
            --text-color: #4d5464;
            font-family: 'Poppins';
            font-size: 16px;
            color: var(--text-color);
        }
        .dd-container {
            min-width: 240px;
            display: flex;
            flex-direction: column;
            background-color: transparent;
            user-select: none;
            margin: 20px 40px;
        }

        .dd-label {
            font-size: 12px;
            color: var(--primary-color);
        }

        .dd-head {
            border-bottom: 1px solid var(--primary-color);
            display: flex;
            justify-content: space-between;
        }

        .dd-head {
            min-height: 24px;
            padding: 8px;
        }

        .dd-choice {
            display: flex;
            justify-content: flex-start;            
            align-items: center;
            color: var(--text-color);
            height: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .dd-toggle {
            width: 24px;
            height: 24px;
            background-color: var(--primary-color);
            -webkit-mask-image: url('data:image/svg+xml;utf8,<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" class="svg-inline--fa fa-chevron-down fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg>');
            -webkit-mask-repeat: no-repeat;            
            transition: transform .3s linear;            
        }
        .dd-toggle.open {
            transform: rotate(180deg);
        }

        .dd-body {
            max-height: 0px;
            opacity: 0;
            overflow-y: scroll;
            overflow-x: hidden;
            box-shadow: 2px 2px 2px 2px rgba(0,0,0,.6);
            transition: max-height .3s linear, opacity .3s linear;
        }
        .dd-body.open {
            max-height: 13vw;
            opacity: 1;
        }
        .dd-body.closed {
            max-height: 0px;
            opacity: 0;
        }

        ::slotted(p) {
            margin:0;
        }

        .dd-option {
            color: var(--text-color);
            position: relative;
            padding-left: 8px;
            display: flex;
            align-items: center;
            transition: padding .5s linear, background-color .25s linear, color .25s linear;
            opacity: 1 !important;
        }

        .dd-option::after {
            content: '';
            width: 100%;
            height: 1px;
            background-color: rgba(255, 255, 255, .15);
            position: absolute;
            bottom: 0;
            left: 0;
        }

        .dd-option:hover {
            background-color: var(--primary-color);
            color: #fff;
            padding-left: 16px;
        }
    `;
    }

    constructor() {
        super();
        this.title = 'Chose your language';
        this.selected = '---None---';   
        this.options = ['German', 'English', 'France']; 
        this.closed = true;    
    }

    toggleMenu(event) {
        this.closed = !this.closed;
    }

    handleMenuOption(event, option) {
        this.selected = option;
        const customEvent = new CustomEvent('selectionChanged', {
            detail: {
                option: this.selected
            }
        });
        this.dispatchEvent(customEvent);
        this.toggleMenu(event);
    }

    render() {
        return html`
            <div class="dd-container">
                <div class="dd-label">${this.title}</div>
                <div class="dd-head" @click="${this.toggleMenu}">
                    <div class="dd-choice">${this.selected}</div>
                    <div class="dd-toggle ${this.closed ? 'open' : 'closed'}"></div>
                </div>
                <div class="dd-body ${this.closed ? 'open' : 'closed'}">
                    ${this.options.map(option => html`<div class="dd-option" @click="${(e) => this.handleMenuOption(e, option)}">${option}</div>`)}
                </div>
            </div>
        `;
    }
}

window.customElements.define('lit-element-drop-down', DropDown);