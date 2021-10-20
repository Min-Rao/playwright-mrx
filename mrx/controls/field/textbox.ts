// playwright-dev-page.ts
import { Locator, Page } from '@playwright/test';
import { Base } from './base';

export class TextBox extends Base {

    constructor(page: Page, shcema:string) {
        super(page,shcema);
    }

    
}