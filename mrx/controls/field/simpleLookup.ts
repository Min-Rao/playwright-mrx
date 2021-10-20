import { Locator, Page } from '@playwright/test';
import clickLocatorByFullText from '../../helpers/clickLocatorByFullText';
import { Base } from './base';

export class SimpleLookup extends Base {
    private readonly flyoutRoot: Locator;
    private deleteButton: Locator;
    // private searchButton: Locator;

    constructor(page: Page, shcema:string) {
        super(page,shcema);
        this.flyoutRoot = page.locator(`div[flyoutroot='__flyoutRootNode']`);
        this.deleteButton = this.field.locator(`button[data-id$="${this.schema}_selected_tag_delete"]`);
        // this.searchButton = this.field.locator(`button[data-id$="${this.schema}_search"]`);
    }

    async setValue(value: string) {
        await this.delete();
        await this.field.hover();
        await this.field.locator(`input`).fill(value);
        await this.page.waitForSelector(`span:has-text("${value}")`);
        await clickLocatorByFullText(this.flyoutRoot.locator(`span:has-text("${value}")`), value)
    }

    private async delete() {
        if ( await this.getValue() === null) {
            await this.field.hover();
            await this.deleteButton?.click();
        }
    }

    
}