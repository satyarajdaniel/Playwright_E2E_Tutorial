const {expect} = require('@playwright/test');
class cartPage {
    constructor(page) {
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
        this.checkout = page.locator("text=Checkout");

    }

    async VerifyProductIsDisplayed(productName) {
        await this.cartProducts.waitFor();
        const productLocator = this.page.locator("h3:has-text('" + productName + "')");
        console.log('productLocator',productLocator);
        const bool = await productLocator.isVisible();
        console.log('bool',bool);
        expect(bool).toBeTruthy();

    }

    async Checkout() {
        await this.checkout.click();
    }
    async navigateToOrders() {
        await this.orders.click();
    }

}
module.exports = {cartPage};