const {test, expect} = require('@playwright/test')

test("New Page",async ({browser}) =>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill('dummydanny@gmail.com');
    await page.locator('#userPassword').fill('DummyDanny123');
    await page.locator('.login-btn').click();
    await page.waitForLoadState('networkidle');

    const products = await page.locator('.card-body');
    const productsCount = await products.count()
    const target_product_name = "ZARA COAT 3";
    const productTexts = await page.locator('.card-body b').allTextContents();

    // WAY1
    for (let index = 0; index < productsCount; index++) {
        const product = await products.nth(index).locator('b').textContent();
        if (product===target_product_name) {
            await products.nth(index).locator('text= Add To Cart').click();
            break;
        }
        
    }

    


    //Cart Validation
    await page.locator("[routerlink*='cart']").click();
    //since isVisible Doesnt have autowait we will wait until, item carts are loaded
    await page.locator('div li').first().waitFor();
    const productBoolean = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(productBoolean).toBeTruthy();

    // const cartProductTexts = await page.locator('.cartSection h3').allTextContents();
    // expect(cartProductTexts).toHaveProperty(target_product_name)

    //CheckOut
    await page.locator('text=Checkout').click();
    await page.locator('select.input').first().selectOption('02');
    await page.locator('select.input').last().selectOption('31');
    await page.locator("//div[normalize-space()='CVV Code ?'][@class='field small']/input").fill('123');
    await page.locator("//div[normalize-space()='Name on Card'][@class='field']/input").fill('DAnny');
    const selectCountry =  page.locator("[placeholder='Select Country']");
    //Instead of Fill, we can use pressSequentially for auto-suggestions
    await selectCountry.pressSequentially('Ind',{delay:100}); 
    const searchResults = page.locator('section.ta-results button span');
    await searchResults.first().waitFor()
    const resultsCount = await searchResults.count();
    for (let index = 0; index < resultsCount; index++) {
        const resultText  = await searchResults.nth(index).textContent();
        if ((resultText.trim())==='India') {
            await searchResults.nth(index).click();
            break;
            
        }
        
    }

    await page.locator('.action__submit').click();
    await expect(page.locator('.hero-primary')).toContainText('Thankyou for the order.');
    let orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    orderId = orderId.replaceAll('|','').trim();
    console.log('orderId',orderId);

    //orders page
     await page.locator('[routerlink*=orders]').click();

     const orderIds = await page.locator('tbody tr th').allTextContents();
     if (orderIds.includes(orderId)) {
        console.log('orderId Found In Orders',orderId)
        
     }

      



});
