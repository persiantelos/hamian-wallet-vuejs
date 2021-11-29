export default class AccountModel
{
    buypackages:any;
    expireAt:number;
    folderId:number;
    space:number;
    usedSpace:number;
    _id:string;
    types:FileType[]=[];
    services:UsedService[]=[];
    plan:PlanDataModel;
}
  
export class FileType
{
    type:string='';
    count:number=0;
    size:number=0;
}
export class PlanDataModel
{
    id:string;
    activePlan:string;
    paidAmount:string;
    renewDate:string;
} 
export class UsedService
{
    name:string;
    folderid:number; 

}