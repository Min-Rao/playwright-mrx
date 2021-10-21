// playwright-dev-page.ts
import { Locator, Page } from '@playwright/test';
import { Base } from './base';

export class TextBox extends Base {

    constructor(page: Page, shcema:string) {
        super(page,shcema);
    }

    private async isTextArea() {
        return await this.field.locator(`textarea`).count() !== 0;
    }
    
    async setValue(value) {
        await this.isTextArea() ? 
            await super.setValue(value, 'textarea') :
            await super.setValue(value, 'input');        
    }

    async getValue() {
        return await this.isTextArea() ? 
                await super.getValue('textarea') :
                await super.getValue('input'); 
    }
}