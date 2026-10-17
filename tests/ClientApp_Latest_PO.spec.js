const { test, expect } = require('@playwright/test');
const {POManager} = require('../Pages/POManager')

//while parsing JSON, json may have other encoding, so better to cast it to string and then parse it to JSON
//JSON >> String >> JS Object
const placeHolderCreds = JSON.parse(JSON.stringify(require('../Utils/placeHolderCreds.json')));

 
 
for (const data of placeHolderCreds) {
   //while looping, test description cannot be same, playwright will throw error, so we can use template literals to make it unique
    test(`@Webst Client App login with ${data.productName}`, async ({ page }) => {
        const url = "https://rahulshettyacademy.com/client";
        const pomanager = new POManager(page);

        const loginpage = pomanager.getLoginPage();
        await loginpage.launchURL(url);
        await loginpage.login(data.username, data.password);

        const dashboardPage = pomanager.getdashboardPage();
        await dashboardPage.searchProduct(data.productName);
        await dashboardPage.navigateToCartPage();

        const cartPage = pomanager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(data.productName);
        await cartPage.Checkout();

        const ordersReviewPage = pomanager.getOrderReviewPage();
        await ordersReviewPage.searchCountryAndSelect("ind", "India");
        const orderId = await ordersReviewPage.SubmitAndGetOrderId();
        console.log(orderId);
        await cartPage.navigateToOrders();

        const ordersHistoryPage = pomanager.getorderHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    });
}
