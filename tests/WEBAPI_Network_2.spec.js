const {test, expect, request} = require('@playwright/test');
const { addAbortListener } = require('events');

/*Suppose  given task of automating a sceanario, to verify user is able/unable to view an order that does not
 belong to the user(we are intercepting the view request with order ID of other member) */


test("security test request intercept", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");
    //blocking images file from loading
    await page.route('**/*.{jpeg,jpg,png}',route => route.abort())
   
    await page.locator('#userEmail').fill('dummydanny@gmail.com');
    await page.locator('#userPassword').fill('DummyDanny123');
    //we can log all requests & responses made during a API Call
    page.on("request",request => console.log(request.url()));
     page.on("response",response => console.log(response.url(),response.status()));
    await page.locator('.login-btn').click();
    await page.getByRole('button', { name: 'ORDERS' }).click();
    
    
  
    /*we are telling palywright,to watch for this type of API Call patterns, in route will specfiy, 
    what we want to modify (we can modify either through body, url, headers)*/
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue(
            {
                url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6ac25f3be7a4bc2b890779"
            }
        )
    )
    //we will put all manipulations before action is performed
    /* continue vs fulfill ('continue' is manipulating request before sent to server, 'fulfill' is manipulating
    response to be rendered to browser after actual response is received*/
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

}

)
