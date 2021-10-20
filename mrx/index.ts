import { Page } from '@playwright/test';
import { LoginPage } from './pages/login';
import { Sitemap } from './controls/sitemap';
import { HomeGrid } from './controls/homeGrid';
import { Ribbon } from './controls/ribbon';
import { Dialog } from './controls/dialog';
import { Form } from './controls/form';

export class Mrx{
    private readonly page: Page;
    readonly sitemap: Sitemap;
    readonly homeGrid: HomeGrid;
    readonly ribbon: Ribbon;
    readonly dialog: Dialog;
    readonly form: Form;

    constructor(page:Page) {
        this.page = page; 
        this.sitemap = new Sitemap(page);
        this.homeGrid = new HomeGrid(page);
        this.ribbon = new Ribbon(page);
        this.dialog = new Dialog(page);
        this.form = new Form(page);

    }

    get action() {
        return {
            login: async (url, username, password) => {
                const loginPage = new LoginPage(this.page, url, username, password);
                await loginPage.login();
            }
        }
    }
}
