const base = require('@playwright/test');
const loginPayLoad = {userEmail: "dummydanny@gmail.com", userPassword: "DummyDanny123"}
const orderPayLoad = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
const {APiUtils} = require('./APIUtils.js');
const {request} = require('@playwright/test'); 


exports.customtest = base.test.extend(
    //fixtures are piece of code(setup/teardown), which are reusable, to cut down execution time

{
authenticatedPage : 
    async ({page},use) =>{
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill('dummydanny@gmail.com');
    await page.locator('#userPassword').fill('DummyDanny123');
    await page.locator('.login-btn').click();
    await page.waitForLoadState('networkidle');
    //page is returned on which, actions are performed
    await use(page);

    //TearDown
    //post 'use' it will not execute , it will exexute teardown code only after fixtures are completed
    await page.close();

    },
 
createOrder : 
    async ({},use) =>{
   const apiContext = await request.newContext();
   const apiUtils = new APiUtils(apiContext,loginPayLoad);
   const response =  await apiUtils.createOrder(orderPayLoad);
   await use(response)

   //Teardown
   await apiContext.dispose();

    }
    


}   

)