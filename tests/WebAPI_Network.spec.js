const {test, expect, request} = require('@playwright/test');
const {APiUtils} = require('../Utils/APIUtils.js');
const loginPayLoad = {userEmail: "dummydanny@gmail.com", userPassword: "DummyDanny123"}
const orderPayLoad = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
const fakePayLoadOrders = {data :[],message:"No Orders" }
 
 
let response;
test.beforeAll( async()=>
{
   const apiContext = await request.newContext();
   const apiUtils = new APiUtils(apiContext,loginPayLoad);
   response =  await apiUtils.createOrder(orderPayLoad);

   
 
})
 
 
//create order is success
test('@API Place the order', async ({page})=>
{ 
    await page.addInitScript(value => {
 
        window.localStorage.setItem('token',value);
    }, response.token );
await page.goto("https://rahulshettyacademy.com/client");

//Intercepting Playwright, Responses/Requests

//> We Can Mock Response On UI (by injecting a response/request payload on particular page )
// >suppose orders page has some orders , but we want to validate orders page with no orders (we cant delete existing orders, so after clicking 
//orders page)
//1)click on orders page & intercept the page from loading
//2)Inject the response payload with (no orders response payload payload)
//For all of this, we use route  (routing the resposne as we wish (routing to no orders))

//1st param > which network call should be routed, 2nd Param > how we want to route ()
//All Routing must happen before,action is performed (api call is made)
await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6aac47ed2be7a4bc2b567a9e",
   async route=>{
        //1)Optimal response (API Resposnse > Browser > Rendered On To Browser)
        //2)intercepting response ,injecting fake response (API Resposnse > {playwright fake response} > Browser > Rendered On To Browser)
        
        /* page.request ==> turns page mode to API Mode (API Calls can be made), fetch method will capture 
           the response & only request is sent as 1st param, so only request can be passed */
        const response =await page.request.fetch(route.request())
        /*once the fecth request is made, it fulfills our request, before it gets fulfilled,
          we are manipulating reponse by fulfilling with manipulated reponse*/
        let body = JSON.stringify(fakePayLoadOrders);
        //Here we are sending actual respons, but over-riding the response  with body
        route.fulfill(
            {
                response,
                body

            }
        )  
    }
)


await page.locator("button[routerlink*='myorders']").click();
//we are explicitly telling it wait until actual response is generated, then it is routed (* means accepting any member)
await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');

 
});
 
