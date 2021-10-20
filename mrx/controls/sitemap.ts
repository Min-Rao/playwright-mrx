// playwright-dev-page.ts
import { Locator, Page } from '@playwright/test';

export class Sitemap {
    private readonly page: Page;
    private readonly sitemap: Locator;
    private readonly navButton: Locator;
    private readonly changeAreaButton: Locator;
    private readonly flyoutRoot: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sitemap = page.locator(`div[data-id='navbar-container']`);
        this.navButton = this.sitemap.locator(`button[data-id='navbutton']`);
        this.changeAreaButton = this.sitemap.locator(`button#areaSwitcherId`);
        this.flyoutRoot = page.locator(`div[flyoutroot='__flyoutRootNode']`);
    }

    private async isNavButtonOpen() {
        const isExpanded = await this.navButton.getAttribute("aria-expanded");
        return isExpanded === "true";
    }

    async open() {
        if( !(await this.isNavButtonOpen()) ) {
            await this.navButton.click();
        }
    }

    async close() {
        if( await this.isNavButtonOpen()) {
            await this.navButton.click();
        }
    }

    async changeArea(areaName) {
        await this.open();
        await this.changeAreaButton.click();
        const area = await this.flyoutRoot.locator(`span[title='${areaName}']`);
        await area.click();
    }

    async click(displayName) {
        await this.page.waitForLoadState('networkidle');
        await this.open();
        const menu = await this.sitemap.locator(`li[data-text="${displayName}"]`);
        await menu.click();
    }
}