// playwright-dev-page.ts
import { Locator, Page } from '@playwright/test';
import Constants from '../constants';
import clickLocatorByFullText from '../helpers/clickLocatorByFullText';

export class HomeGrid {
    private readonly page: Page;
    private readonly homeGrid: Locator;
    private readonly viewName: Locator;
    private readonly viewSelectorContainer: Locator;
    private readonly firstPageButton: Locator;
    private readonly prePageButton: Locator;
    private readonly nextPageButton: Locator;
    private readonly searchBox: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeGrid = page.locator(`div[data-id="GridRoot"]`);
        this.viewName = this.homeGrid.locator("h1");
        this.viewSelectorContainer = page.locator(`div[data-id^=ViewSelector]`).first();
        this.firstPageButton = this.homeGrid.locator(`i[data-icon-name="Previous"]`);
        this.prePageButton = this.homeGrid.locator(`i[data-icon-name="Back"]`);
        this.nextPageButton = this.homeGrid.locator(`i[data-icon-name="Forward"]`);
        this.searchBox = this.homeGrid.locator('input[data-id^="quickFind"]');
    }

    async getCurrentView() {
        return await this.viewName.getAttribute("title");
    }

    async setCurrentView(viewname) {
        await this.viewName.click();
        await clickLocatorByFullText(
            this.viewSelectorContainer.locator(`span:has-text("${viewname}")`), 
            viewname);
        await this.page.waitForLoadState('networkidle');
    }

    async openRecord(rowIndex) {
        await this.homeGrid.locator(`div[aria-rowindex="${rowIndex+1}"]>div[aria-colindex="1"]`).dblclick();
        await this.page.waitForSelector(`div[data-id="editFormRoot"] ul[data-id="CommandBar"]`);
        await this.page.waitForTimeout(Constants.thinkTime);
    }

    async firstPage() {
        await this.firstPageButton.click();
        await this.page.waitForTimeout(Constants.thinkTime);
    }

    async prePage() {
        await this.prePageButton.click();
        await this.page.waitForTimeout(Constants.thinkTime);
    }

    async nextPage() {
        await this.nextPageButton.click();
        await this.page.waitForTimeout(Constants.thinkTime);
    }

    async search(value) {
        await this.searchBox.fill(value);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(Constants.thinkTime);
    }
}