const { test, expect,request } = require('@playwright/test');
const payload = {userEmail: "dummydanny@gmail.com", userPassword: "DummyDanny123"}
const orderPayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
let loginToken;
 
test.beforeAll(async ()=>{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:payload
        })
     //Validating Response (returns boolean if code is in range of '200-299')
     
    expect( loginResponse.ok()).toBeTruthy();
     
     //Parsing response to JSON
     const  loginJSON = await loginResponse.json();
    loginToken = loginJSON.token;
     console.log('Login Token:', loginToken);

     //Placing Order
     const placeOrderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data:orderPayload,
            headers:{
                'Authorization':loginToken,
                'content-type' :"application/json"
            }
        }
     
     )
     
      const  orderJSON = await placeOrderResponse.json();
      const productOrderId = orderJSON.orders[0];
    
    });


 
 
 
test('Order Succesful', async ({ page }) => {

   //Once the login token is generated, it should in inserted/stored in session storage
   //we use JS execution, to complete the insertion (since it is not an UI insertion)

   page.addInitScript(value =>{
    window.localStorage.setItem('token',value)
   },loginToken);



   //js file- Login js, DashboardPage
   const email = "dummydanny@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
//    await page.getByPlaceholder("email@example.com").fill(email);
//    await page.getByPlaceholder("enter your passsword").fill("DummyDanny123");
//    await page.getByRole('button',{name:"Login"}).click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   
   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
   .getByRole("button",{name:"Add to Cart"}).click();
 
   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
 
   //await page.pause();
   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
 
   await page.getByRole("button",{name :"Checkout"}).click();
 
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
 
   await page.getByRole("button",{name :"India"}).nth(1).click();
   await page.getByText("PLACE ORDER").click();
 
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
})
