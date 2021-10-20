import { Locator, Page } from '@playwright/test';
import { Base } from './base';

export class OptionSet extends Base {

    constructor(page: Page, shcema:string) {
        super(page,shcema);
    }

    async setValue(value: string) {
        await this.field.locator(`select`).selectOption(value);
        await this.page.locator(`h1[data-id="header_title"]`).click();
    }
}