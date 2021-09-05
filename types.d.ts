declare module "*.pdf";

import {Aurelia} from 'aurelia-framework';

export function configure(aurelia: Aurelia) {
  // ...
}

window.dataLayer = window.dataLayer || [];

declare global {
  interface Window {
    // TODO: replace this with a more specific type based on usage
    dataLayer: any[];
  }
}
