import ual from "../localService/ual";
import Config from "./config";

export default class Global
{
    static async runTransaction(actions:any[])
    {

        var index=parseInt(window.localStorage.walletIndex);
        var authenticator= ual.authenticators[index];
        await authenticator.init();  
        const users = await authenticator.login(Config.username);
        const account = users[0];
        console.log('sssssssssss')
        await account.signTransaction({
          actions
        },
        {
          blocksBehind: 3,
          expireSeconds: 30
        });
    }
}