import { Locator, Page } from '@playwright/test';
import Constants from '../../constants';

export class Bpf {
    private page: Page;
    private bpf: Locator;
    private flyoutRoot: Locator;
    private selectedStage: Locator;
    private preStageButton: Locator;
    private nextStageButton: Locator;
    private finishButton: Locator;
    private activeStage: Locator;
    private activeStageName: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.bpf = page.locator(`div#bpfContainer`);
        this.flyoutRoot = page.locator(`div[flyoutroot='__flyoutRootNode']`);
        this.selectedStage = this.bpf.locator(`li[aria-selected="true"]`);
        this.preStageButton = this.flyoutRoot.locator(`button[id="MscrmControls.Containers.ProcessStageControl-previousButtonContainer"]`);
        this.nextStageButton = this.flyoutRoot.locator(`button[id="MscrmControls.Containers.ProcessStageControl-nextButtonContainer"]`);
        this.finishButton = this.flyoutRoot.locator(`button[id="MscrmControls.Containers.ProcessStageControl-finishButtonContainer"]`);
        this.activeStage = this.bpf.locator(`li:near(label[id="MscrmControls.Containers.ProcessBreadCrumb-stageStatusLabel"])`);
        this.activeStageName = this.activeStage.locator(`div[id^="MscrmControls.Containers.ProcessBreadCrumb-processHeaderStageName"]`);
    }
    
    async preStage() {
        await this.selectedStage.click();
        await this.preStageButton.click();
        await this.page.locator(`h1[data-id="header_title"]`).click();
        await this.page.waitForTimeout(Constants.thinkTime);
    }

    async nextStage() {
        await this.selectedStage.click();
        await this.nextStageButton.click();
        await this.page.locator(`h1[data-id="header_title"]`).click();
        await this.page.waitForTimeout(Constants.thinkTime);
    }

    async getCurrentStageName() {
        return await this.activeStageName.textContent();
    }

    async selectStage(index) {
        return await this.bpf.locator(`li`).nth(index-1).click();
    }

    async finish() {
        await this.selectedStage.click();
        await this.finishButton.click();
        await this.page.locator(`h1[data-id="header_title"]`).click();
        await this.page.waitForTimeout(Constants.thinkTime);
    }
}