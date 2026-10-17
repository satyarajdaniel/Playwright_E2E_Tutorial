const { test, expect,request } = require('@playwright/test');
const { customtest } = require('../Utils/Fixtures.js');


customtest('Fixtures Demo', async ({ authenticatedPage,createOrder }) => {
    //while running this test, playwright will first execute the custom fixture
    await authenticatedPage.goto("https://rahulshettyacademy.com/client");
    await authenticatedPage.getByRole('button', { name: 'ORDERS' }).click();
    await authenticatedPage.locator("tbody").waitFor(); 
    await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();

})

test.only('Screen Shots Tutorial' , async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/client");
    //Screen Shot At Locator Level
    await page.locator('#userEmail').screenshot({path:'maillogin.png'});
    await page.locator('#userEmail').fill('dummydanny@gmail.com');
    await page.locator('#userPassword').fill('DummyDanny123');
    await page.screenshot({path:'creds.png'});
    await page.locator('.login-btn').click();

}


)