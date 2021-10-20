// playwright-dev-page.ts
import { Locator, Page } from '@playwright/test';
import Constants from '../../constants';
import { Datetime } from './datetime';
import { OptionSet } from './optionset';
import { SimpleLookup } from './simpleLookup';
import { TextBox } from './textbox';

export class Field {
    private readonly page: Page;
    private readonly field: Locator;
    private readonly schema: string;
    private instance: any;

    constructor(page: Page, schema: string) {
        this.page = page;
        this.field = page.locator(`div[data-id="${schema}-FieldSectionItemContainer"]`).first();
        this.schema = schema;
        this.initialInstance();
    }

    private async initialInstance() {
        if (this.instance) return this.instance;
        switch (await this.getControlType()) {

            case 'DateTimeControl':
            case 'DateControl':
                this.instance = new Datetime(this.page, this.schema);
                break;

            case 'DurationControl':
                //   this.instance = new DurationControl(this.page, this.schema);
                break;

            case 'CheckboxControl':
            case 'OptionSet':
            case 'TimeZonePickListControl':
            case 'LanguagePickerControl':
                this.instance = new OptionSet(this.page, this.schema);
                break;

            case 'CurrencyControl':
                //   this.instance = new CurrencyControl(this.page, this.schema);
                break;

            case 'SimpleLookupControl':
                this.instance = new SimpleLookup(this.page, this.schema);
                break;

            case 'TextBoxControl':
            case 'EmailAddressControl':
            case 'UrlControl':
            case 'DecimalNumberControl':
            case 'WholeNumberControl':
            case 'FloatingPointNumberInput':
            case 'PhoneNumberControl':
            case 'TickerSymbolControl':
                this.instance = new TextBox(this.page, this.schema);
                break;

            case 'MultiSelectPicklist':
            default:
            //   this.instance = new MultiselectOptionSet(this.page, this.schema);
        }
    }

    private async getControlType() {
        const dataLpId = await this.field.locator(`div[data-lp-id^='MscrmControls.FieldControls']`).last().getAttribute("data-lp-id");
        return dataLpId ? dataLpId.split('|')[0].split('.')[2] : 'MultiSelectPicklist';
    }

    async getDisabled() {
        return false;
    }

    async setValue(value: string) {
        await this.initialInstance();
        await this.getDisabled()
        await this.instance.setValue(value);
        await this.page.waitForTimeout(Constants.thinkTime);
    }

}