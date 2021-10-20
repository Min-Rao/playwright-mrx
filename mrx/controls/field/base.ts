// playwright-dev-page.ts
import { Locator, Page } from '@playwright/test';

export class Base {
    protected readonly page: Page;
    protected readonly schema: string;
    protected readonly field: Locator;

    constructor(page: Page, schema: string) {
        this.page = page;
        this.schema = schema;
        this.field = page.locator(`div[data-id="${schema}-FieldSectionItemContainer"]`).first();
    }

    private async isTextArea() {
        return await this.field.locator(`textarea`).count() !== 0;
    }

    async setValue(value) {
        await this.field.click();
        await this.isTextArea() ?
            (await this.field.locator(`textarea`).fill(value)) :
            (await this.field.locator(`input`).fill(value));
        await this.page.locator(`h1[data-id="header_title"]`).click();
    }

    async getValue() {
        const isExisted = await this.isTextArea() ?
            (await this.field.locator(`textarea`).count()) > 0 :
            (await this.field.locator(`input`).count()) > 0;
        return isExisted ? this.field.locator(`input`).getAttribute("value") : null;
    }
}