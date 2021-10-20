import { Locator, Page } from '@playwright/test';
import Constants from '../../constants';

export class Bpf {
    private page: Page;
    private bpf: Locator;
    private flyoutRoot: Locator;
    private selectedStage: Locator;
    private movePreButton: Locator;
    private moveNextButton: Locator;
    private finishButton: Locator
    
    constructor(page: Page) {
        this.page = page;
        this.bpf = page.locator(`div#bpfContainer`);
        this.flyoutRoot = page.locator(`div[flyoutroot='__flyoutRootNode']`);
        this.selectedStage = this.bpf.locator(`li[aria-selected="true"]`);
        this.movePreButton = this.flyoutRoot.locator(`button[id="MscrmControls.Containers.ProcessStageControl-previousButtonContainer"]`);
        this.moveNextButton = this.flyoutRoot.locator(`button[id="MscrmControls.Containers.ProcessStageControl-nextButtonContainer"]`);
        this.finishButton = this.flyoutRoot.locator(`button[id="MscrmControls.Containers.ProcessStageControl-finishButtonContainer"]`);
    }
    
    async moveBack() {
        await this.selectedStage.click();
        await this.movePreButton.click();
        await this.page.locator(`h1[data-id="header_title"]`).click();
        await this.page.waitForTimeout(Constants.thinkTime);
    }

    async moveNext() {
        await this.selectedStage.click();
        await this.moveNextButton.click();
        await this.page.locator(`h1[data-id="header_title"]`).click();
        await this.page.waitForTimeout(Constants.thinkTime);
    }

    async finish() {
        await this.selectedStage.click();
        await this.finishButton.click();
        await this.page.locator(`h1[data-id="header_title"]`).click();
        await this.page.waitForTimeout(Constants.thinkTime);
    }




}