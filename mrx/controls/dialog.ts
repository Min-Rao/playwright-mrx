// playwright-dev-page.ts
import { Locator, Page } from '@playwright/test';

export class Dialog {
    private readonly page: Page;
    private readonly dailog: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dailog = page.locator(`div#modalDialogContentContainer`);

    }

    get title() {
        return (async () => {
            return (await this.dailog.locator(`h1#dialogTitleText`)).getAttribute("aria-label");
        })();
    }

    get message() {
        return (async () => {
            return (await this.dailog.locator(`span#dialogMessageText`)).textContent();
        })();
    }

    async confirm() {
        await this.dailog.locator(`button#confirmButton`).click();
    }

    async cancel() {
        await this.dailog.locator(`button#cancelButton`).click();
    }

    async close() {
        await this.dailog.locator(`button#dialogCloseIconButton`).click();
    }
}