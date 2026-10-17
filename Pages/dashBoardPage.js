class dashBoardPage{
     constructor(page){
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsTexts = this.page.locator(".card-body b");
        this.ordersLink = this.page.locator("[routerlink*='cart']")


        this.signButton = page.locator('.login-btn');
        this.userName = page.locator('#userEmail'); 
        this.userPassword =  page.locator('#userPassword');
    }

    async searchProduct(productName) {
       await this.products.first().waitFor();
       const productCount = await this.products.count();
       console.log('productCount',productCount);
        for (let index = 0; index < productCount; index++) {
            const product = await this.products.nth(index).locator('b').textContent();
            console.log('product',product);

            if (product === productName) {
                await this.products.nth(index).locator('text= Add To Cart').click();
                await this.page.waitForTimeout(3000);
                break;
            }

        }

    }

    async navigateToCartPage(){
        await this.ordersLink.click();
        await this.page.waitForLoadState('domcontentloaded');

    }
}

module.exports = {dashBoardPage};