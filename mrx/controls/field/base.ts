// playwright-dev-page.ts
import { Locator, Page, expect } from '@playwright/test';

export class Base {
    protected readonly page: Page;
    protected readonly schema: string;
    protected readonly field: Locator;

    constructor(page: Page, schema: string) {
        this.page = page;
        this.schema = schema;
        this.field = page.locator(`div[data-id="${schema}-FieldSectionItemContainer"]`).first();
    }

    async setValue(value, textSelector = 'input') {
        await this.getVisible(true);
        await this.field.click();
        await this.field.locator(textSelector).fill(value);
        await this.page.locator(`h1[data-id="header_title"]`).click();
    }

    async getValue(textSelector = 'input') {
        await this.getVisible(true);
        const isExisted = await this.field.locator(textSelector).count() > 0
        return isExisted ? this.field.locator(textSelector).getAttribute("value") : null;
    }

    async expect(toBeExpecteds: object) {
        await this.getVisible(true);
        const results = {};
        for (let prop in toBeExpecteds) {
            switch (prop) {
                case 'value':
                    results[prop] = await this.getValue();
                    break;
                case 'isDisabled':
                    results[prop] = await this.getDisabled();
                    break;
                case 'isValid':
                    results[prop] = await this.isValid();
                    break;
                case 'message':
                    results[prop] = await this.message();
                    break;
                case 'label':
                    results[prop] = await this.getLabel();
                    break;
                case 'requiredLevel':
                    results[prop] = await this.getRequiredLevel();
                    break;
            }
        }
        await expect(toBeExpecteds).toMatchObject(results);
    }

    async getDisabled() {
        await this.getVisible(true);
        return await this.field.locator(`div[data-id="${this.schema}-locked-icon"]`).count() > 0;
    }

    async getVisible(throwError = false) {
        const isVisible = await this.field.count() > 0;
        if (!isVisible && throwError) {
            await expect(this.field).toBeVisible();
        }
        return isVisible;
    }

    async isValid() {
        await this.getVisible(true);
        return await this.field.locator(`div[data-id="${this.schema}-error-message"]`).count() < 0;
    }

    async message() {
        if (await this.isValid() === false) {
            return await this.field.locator(`div[data-id="${this.schema}-error-message"]`).textContent();
        }
    }

    async getLabel() {
        await this.getVisible(true);
        return await this.field.locator(`label`).first().textContent();
    }

    async getRequiredLevel() {
        await this.getVisible(true);
        if (await this.field.locator(`div[data-id="${this.schema}-locked-icon"]`).count() > 0) {
            return "required";
        }
        const fieldRequirement = await this.field.getAttribute("data-fieldrequirement");
        return fieldRequirement === "0" ? "none" : "recommended";
    }
}