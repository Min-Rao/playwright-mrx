import { expect } from '@playwright/test';
import test from '../mrx/index';

test.beforeEach(async ({ mrx }) => {
    await mrx.action.login("https://mrxftdev.crm7.dynamics.com/main.aspx?appid=5e45baba-3630-ec11-b6e6-000d3ace4123");
})

test('mrx.form.bpf.nextStage', async ({ mrx, page }) => {
    await mrx.sitemap.click('Automations');
    await mrx.homeGrid.openRecord(1);
    while(await mrx.form.bpf.getCurrentStageName() !== 'Stage 1') {
        await mrx.form.bpf.preStage();
    }
    await mrx.form.bpf.nextStage();
    await expect(await mrx.form.bpf.getCurrentStageName()).toBe('Stage 2');
    // clean up
    await mrx.form.bpf.preStage();
});

test('mrx.form.bpf.preStage', async ({ mrx, page }) => {
    await mrx.sitemap.click('Automations');
    await mrx.homeGrid.openRecord(1);
    while(await mrx.form.bpf.getCurrentStageName() !== 'Stage 1') {
        await mrx.form.bpf.preStage();
    }
    await mrx.form.bpf.nextStage();
    await mrx.form.bpf.preStage();
    await expect(await mrx.form.bpf.getCurrentStageName()).toBe('Stage 1');

});

test('mrx.form.bpf.getCurrentStageName', async ({ mrx, page }) => {
    await mrx.sitemap.click('Automations');
    await mrx.homeGrid.openRecord(3);
    await expect(await mrx.form.bpf.getCurrentStageName()).toBe('Stage 1');

});

test('mrx.form.bpf.selectStage', async ({ mrx, page }) => {
    await mrx.sitemap.click('Automations');
    await mrx.homeGrid.openRecord(3);
    await mrx.form.bpf.selectStage(2);
    await expect(page.locator(`ul[id="MscrmControls.Containers.ProcessBreadCrumb-headerStageContainer"] li`).nth(1))
            .toHaveAttribute('aria-selected','true');
});

test('mrx.form.bpf.finish', async ({ mrx, page }) => {
    await mrx.sitemap.click('Automations');
    await mrx.homeGrid.openRecord(1);
    while(await mrx.form.bpf.getCurrentStageName() !== 'Stage 3') {
        await mrx.form.bpf.nextStage();
    }
    await mrx.form.bpf.finish();
    await mrx.form.bpf.selectStage(3);
    await expect(page.locator(`label[id="MscrmControls.Containers.ProcessStageControl-Finished"]`)).toBeVisible();
    // clean up
    await mrx.ribbon.click("Process","Reactivate");
    await mrx.form.bpf.preStage();
    await mrx.form.bpf.preStage();
});

