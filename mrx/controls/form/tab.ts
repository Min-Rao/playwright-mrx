import { Locator, Page } from '@playwright/test';

export class Tab {
    private page: Page;
    private tab: Locator;

    constructor(page: Page) {
        this.page = page;
        this.tab = page.locator(`ul[role="tablist"]`);
    }

    async setFocus(tabName) {
        await this.tab.locator(`li[aria-label="${tabName}"]`).click();
    }
}