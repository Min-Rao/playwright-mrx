import { expect } from '@playwright/test';
import test from '../mrx/index';

test.beforeEach(async ({ mrx }) => {
    await mrx.action.login("https://mrxftdev.crm7.dynamics.com/main.aspx?appid=5e45baba-3630-ec11-b6e6-000d3ace4123");
})

test('mrx.sitemap.open', async ({ mrx , page }) => {
    await mrx.sitemap.open();
    await expect(page.locator(`button[data-id='navbutton']`)).toHaveAttribute("aria-expanded", "true");
});

test('mrx.sitemap.close', async ({ mrx , page }) => {
    await mrx.sitemap.close();
    await expect(page.locator(`button[data-id='navbutton']`)).toHaveAttribute("aria-expanded", "false");
});

test('mrx.sitemap.changeArea', async ({ mrx , page }) => {
    await mrx.sitemap.changeArea('Area2');
    await expect(page.locator(`button[data-id='sitemap-areaSwitcher-expand-btn'] span:has-text("Area2")`)).toHaveText("Area2");
});

test('mrx.sitemap.click', async ({ mrx , page }) => {
    await mrx.sitemap.click('Automations');
    await expect(page).toHaveURL(/.*etn=mrx_automation.*/);
});

