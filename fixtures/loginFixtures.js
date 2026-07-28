import { test as base } from '@playwright/test';
import Login from '../pages/login.page';

export const test = base.extend({
    overdraftUser: async ({page}, use)=>{
        const login = new Login(page);
        await login.validlogin('overdraft_user','bank_sauce');
        await use(page);
    },
    


});