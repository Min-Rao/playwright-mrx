const { test, expect } = require('@playwright/test');
import { Mrx } from '../mrx/index';

test('test', async ({ page }) => {
  const mrx = new Mrx(page);

  // await mrx.action.login(url, username, password);
  await page.goto("https://mrxftdev.crm7.dynamics.com/main.aspx?appid=5e45baba-3630-ec11-b6e6-000d3ace4123");

  await mrx.sitemap.click("Automations");
  await mrx.sitemap.close();
  
  await mrx.homeGrid.setCurrentView("Active Automations");
  await mrx.homeGrid.openRecord(1);

  await mrx.ribbon.click("Refresh");

  await mrx.form.bpf.moveNext();
  await mrx.form.bpf.moveBack();
  await mrx.form.bpf.moveNext();
  await mrx.form.bpf.moveNext();
  await mrx.form.bpf.finish();
  await mrx.ribbon.click("Process","Reactivate")
  await mrx.form.bpf.moveBack();
  await mrx.form.bpf.moveBack();

  await mrx.form.tab.setFocus("Details");
  /*  Checkbox toggle */
  await mrx.form.getAttribute("mrx_checkbox1").setValue("1");
  /*  mrx_choices */
  // await mrx.form.getAttribute("mrx_choices").setValue("1");
  await mrx.form.getAttribute("transactioncurrencyid").setValue("US Dollar");
  await mrx.form.getAttribute("mrx_customer").setValue("A Datum Fabrication");
  await mrx.form.getAttribute("mrx_date").setValue("10/20/2021");
  /*  Datetime */
  await mrx.form.getAttribute("mrx_decimal").setValue("100");
  /*  Rating */
  /*  Duration */
  await mrx.form.getAttribute("mrx_email").setValue("test@test.com");
  /*  Whole number input */
  await mrx.form.getAttribute("mrx_whole1").setValue("200");
  await mrx.form.getAttribute("mrx_floatingpoint").setValue("300.12");
  await mrx.form.getAttribute("mrx_language").setValue("1041");
  /*  Rich */
  await mrx.form.getAttribute("mrx_multilinetext1").setValue("mrx_multilinetext1");
  await mrx.form.getAttribute("mrx_optionset").setValue("4204");
  await mrx.form.getAttribute("mrx_phone").setValue("09065299666");
  await mrx.form.getAttribute("mrx_textarea").setValue("mrx_textarea");
  await mrx.form.getAttribute("mrx_textbox").setValue("mrx_textbox");
  await mrx.form.getAttribute("mrx_tickersymbol").setValue("mrx_tickersymbol");
  await mrx.form.getAttribute("mrx_timezone").setValue("2");
  await mrx.form.getAttribute("mrx_url").setValue("www.microsoft.com");

  // await page.pause();

});