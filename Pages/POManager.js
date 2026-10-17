const {loginPage} = require('../Pages/loginPage')
const { dashBoardPage} = require('../Pages/dashBoardPage')
const {cartPage } = require('../Pages/cartPage')
const { ordersHistoryPage} = require('../Pages/ordersHistoryPage')
const {ordersReviewPage } = require('../Pages/ordersReviewPage')

class POManager{
    constructor(page){
        this.page = page
        
        this.loginpage =  new loginPage(this.page);
        this.dashboardpage = new dashBoardPage(this.page)
        this.cartpage = new cartPage(this.page)
        this.ordershistoryPage = new ordersHistoryPage(this.page)
        this.ordersreviewPage = new ordersReviewPage(this.page)
    }

    getLoginPage(){
        return this.loginpage;
    }

    getdashboardPage(){
        return this.dashboardpage;
    }

    getCartPage(){
        return this.cartpage;
    }

    getorderHistoryPage(){
        return this.ordershistoryPage;
    }

    getOrderReviewPage(){
        return this.ordersreviewPage;
    }
}

module.exports = {POManager};