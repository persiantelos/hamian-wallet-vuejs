import SocketService from "src/localService/socketService";

 
export default class Config
{
    static server:string="https://megaapi.hamian-wallet.com/"; 
    static chainAddress:string="https://telos.greymass.com"; 
    static soket:SocketService;
    static payloadOrigin:string='Mega App';
    // static areaXBaseURL:string='https://api1.areaxnft.com';
    static areaXBaseURL:string='http://localhost:9201';
    static areaXBaseURL2:string='https://api.areaxnft.com';
    static persianTelos:string='https://mainnet.persiantelos.com';


}