import { expect } from '@playwright/test';
import test from '../mrx/index';

test.beforeEach(async ({ mrx }) => {
    await mrx.action.login("https://mrxftdev.crm7.dynamics.com/main.aspx?appid=5e45baba-3630-ec11-b6e6-000d3ace4123");
})

test('mrx.homeGrid.getCurrentView', async ({ mrx, page }) => {
    await expect(await mrx.homeGrid.getCurrentView()).toBe("My Active Accounts");
});

test('mrx.homeGrid.setCurrentView', async ({ mrx, page }) => {
    await mrx.homeGrid.setCurrentView("All Accounts")
    await expect(await mrx.homeGrid.getCurrentView()).toBe("All Accounts");
});

test('mrx.homeGrid.firstPage', async ({ mrx, page }) => {
    await mrx.homeGrid.nextPage();
    await mrx.homeGrid.nextPage();
    await mrx.homeGrid.firstPage();
    await expect(page.locator(`span[class^="pageNumberLabel"]`)).toHaveText("Page 1");
});

test('mrx.homeGrid.nextPage', async ({ mrx, page }) => {
    await mrx.homeGrid.nextPage();
    await expect(page.locator(`span[class^="pageNumberLabel"]`)).toHaveText("Page 2");
});

test('mrx.homeGrid.prePage', async ({ mrx, page }) => {
    await mrx.homeGrid.nextPage();
    await mrx.homeGrid.nextPage();
    await mrx.homeGrid.prePage();
    await expect(page.locator(`span[class^="pageNumberLabel"]`)).toHaveText("Page 2");
});

test('mrx.homeGrid.openRecord', async ({ mrx, page }) => {
    await mrx.homeGrid.openRecord(2);
    await expect(page).toHaveURL(/.*pagetype=entityrecord.*/);
});

test('mrx.homeGrid.search', async ({ mrx, page }) => {
    await mrx.homeGrid.search("A Datum Fabrication");
    await mrx.homeGrid.openRecord(1);
    await expect(page).toHaveURL(/.*pagetype=entityrecord.*/);
});

