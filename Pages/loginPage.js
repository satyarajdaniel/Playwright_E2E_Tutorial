class loginPage{
     constructor(page){
        this.page = page;
        this.signButton = page.locator('.login-btn');
        this.userName = page.locator('#userEmail'); 
        this.userPassword =  page.locator('#userPassword');
    }

    async launchURL(url){
        await this.page.goto(url);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async login(userName,userPassword) {
        await this.userName.fill(userName);
        await this.userPassword.fill(userPassword);
        await this.signButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        
    }

}

module.exports = {loginPage};