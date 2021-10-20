import { Locator, Page } from '@playwright/test';
import { Base } from './base';

export class Datetime extends Base {

    constructor(page: Page, shcema:string) {
        super(page,shcema);
    }

    async setValue(value: string) {
        const [date, time] = value.split(' ');
        await super.setValue(date);
    }
}