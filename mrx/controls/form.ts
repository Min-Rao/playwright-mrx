// playwright-dev-page.ts
import { Locator, Page } from '@playwright/test';
import { Field } from './field/field';
import { Bpf } from './form/bpf';
import { Tab } from './form/tab';

export class Form {
    private readonly page: Page;
    private readonly form: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.form = page.locator(`div#mainContent`);
    }

    getAttribute(schema) {
        return new Field(this.page, schema);
    }

    get tab() {
        return new Tab(this.page);
    }

    get bpf() {
        return new Bpf(this.page);
    }
    
}