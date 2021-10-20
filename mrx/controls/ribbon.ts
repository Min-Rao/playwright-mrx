// playwright-dev-page.ts
import { Locator, Page } from '@playwright/test';
import Constants from '../constants';
import clickLocatorByFullText from '../helpers/clickLocatorByFullText';

export class Ribbon {
    private readonly page: Page;
    private readonly ribbon: Locator;
    private readonly moreButton: Locator;
    private readonly flyoutRoot: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ribbon = page.locator(`div[data-id="editFormRoot"] ul[data-id="CommandBar"]`).first();
        this.moreButton = this.ribbon.locator(`button[data-id="OverflowButton"]`);
        this.flyoutRoot = page.locator(`div[flyoutroot='__flyoutRootNode']`);

    }

    async new() {
        await this.ribbon.locator(`button[data-id$="NewRecord"]`).click();
        await this.page.waitForTimeout(Constants.thinkTime);
    }

    async click(commandName, subCommandName?) {
        await clickLocatorByFullText(await this.findLocator(commandName), commandName);
        await this.page.waitForTimeout(Constants.thinkTime);
        if (subCommandName) {
            await clickLocatorByFullText(this.flyoutRoot.locator(`button:has-text("${subCommandName}")`), subCommandName);
        }
        await this.page.waitForTimeout(Constants.thinkTime);
    }

    private async findLocator(commandName): Promise<Locator> {
        let locator = this.ribbon.locator(`button:has-text("${commandName}")`);
        let count = await locator.count();
        if (count === 0) {
            await this.moreButton.click();
            locator = this.flyoutRoot.locator(`button:has-text("${commandName}")`);
            count = await locator.count();
        }
        return count > 0 ? locator : undefined;
    }

}