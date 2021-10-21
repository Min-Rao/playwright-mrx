// playwright-dev-page.ts
import { Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly userNameInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly url: string;
    readonly username: string;
    readonly password: string;

    constructor(page: Page, url: string, username?: string, password?: string) {
        this.page = page;
        this.userNameInput = page.locator(`input[type='email']`);
        this.passwordInput = page.locator(`input[type='password']`);
        this.submitButton = page.locator(`input[type='submit']`);
        this.url = url;
        this.username = username;
        this.password = password;
    }

    async setUsername() {
        await this.userNameInput.fill(this.username);
        await this.submit();
    }

    async setPassword() {
        await this.passwordInput.click();
        await this.passwordInput.fill(this.password);
        await this.submit();
    }

    async submit() {
        await this.submitButton.click();
    }

    async login() {
        await this.page.goto(this.url);
        if (this.username && this.password) {
            await this.setUsername();
            await this.setPassword();
            await this.submit();
        }
    }
}