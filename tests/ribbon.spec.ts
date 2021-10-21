import { expect } from '@playwright/test';
import test from '../mrx/index';

test.beforeEach(async ({ mrx }) => {
    await mrx.action.login("https://mrxftdev.crm7.dynamics.com/main.aspx?appid=5e45baba-3630-ec11-b6e6-000d3ace4123");
})

test('mrx.ribbon.click one level', async ({ mrx , page }) => {
    await mrx.ribbon.click("New");
    await expect(page).toHaveURL(/.*pagetype=entityrecord.*/);
});

test('mrx.ribbon.click two level', async ({ mrx , page }) => {
    await mrx.ribbon.click("Excel Templates", "Upload Template");
    await expect(page.locator(`h1[id^="doctemplateuploadheader"]`)).toHaveText("Select file to upload as a template");
})

test('mrx.ribbon.new', async ({ mrx , page }) => {
    await mrx.ribbon.new();
    await expect(page).toHaveURL(/.*pagetype=entityrecord.*/);
});


