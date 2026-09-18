const {test, expect} = require('@playwright/test')


test("test declaration ",async function(){

});

/*since above function doesn't have any name(function is just a keyword, since it expectes 
 function as param) , we can use a anonymous function*/

test("test declaration anonymous function",async () =>{

});

//fixtures
test("browser fixture",async ({browser}) =>{
    //Browser Fixture is universal, accesible to each test annotation
    //whenever a test annotation is declared, Few Fixtures are available immediately

    //Browser New Context ==> New Incognito Tab, but it also provides browser options like cookies, proxy to be included while launching
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName = page.locator('#username');
    const password = page.locator('[name ="password"]');
    const signin_button = page.locator('#signInBtn');
    const products = page.locator('.card-body a');

    //Incorrect Details
    await userName.fill('Daniel')
    await password.fill('Daniel')
    await signin_button.click();
    const errorMessage = await page.locator('[style*="block"]').textContent();
    console.log('errorMessage',errorMessage);
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect');

    //Clearing Fields
    await userName.fill('')
    await password.fill('')


    //Correct Details
    await userName.fill('rahulshettyacademy')
    await password.fill('Learning@830$3mK2')
    await signin_button.click();

    console.log(await products.last().textContent());
    console.log(await products.nth(1).textContent());



});

test("page fixture",async ({page}) =>{
    /*playwright also provides page fixture, which we can use directly to launch pages without need to
    declare browser/context*/
    await page.goto("https://google.com");
    const title = await page.title();
    await expect(page).toHaveTitle('Google');


});

test("UI Controls",async ({page}) =>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     const userName = page.locator('#username');
     const password = page.locator('[name ="password"]');
     const selectDropDown = page.locator('select.form-control');
     const signin_button = page.locator('#signInBtn');
     const banner = page.locator("[href*='documents-request']")
    //   await selectDropDown.selectOption('Consultant')
    //  await page.locator('#usertype').last().click();
    //  await page.locator('#okayBtn').click();
    //  console.log('radio button check',await page.locator('#usertype').last().isChecked());
    //  await expect(page.locator('#usertype').last()).toBeChecked();

    //  console.log('check button initially',await page.locator('#terms').isChecked());
    //  expect(await page.locator('#terms').isChecked()).toBeFalsy();
    //  await page.locator('#terms').check();
    //  console.log('check button after checked',await page.locator('#terms').isChecked());
    //  expect(await page.locator('#terms').isChecked()).toBeTruthy();
    //  await page.locator('#terms').uncheck();
    //  console.log('check button after unchecked',await page.locator('#terms').isChecked());
    //  expect(await page.locator('#terms').isChecked()).toBeFalsy();

    // await expect(banner).toHaveAttribute('class','blinkingText');
    


})

test.only("New Page",async ({browser}) =>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const banner = page.locator("[href*='documents-request']")
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        banner.click()
    ]);

    console.log(await newPage.locator('.red').textContent());

   
   

});




