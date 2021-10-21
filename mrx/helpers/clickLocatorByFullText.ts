import { Locator } from '@playwright/test';

export default async function clickLocatorByFullText(locator: Locator, name:string) {
    await locator.scrollIntoViewIfNeeded();
    const allTextContents = (await locator?.allTextContents()) || [] ;
    for(let i=0; i<allTextContents.length; i++) {
        if (allTextContents[i] === name) {
            await locator.nth(i).click();
            break;
        }
    }
}