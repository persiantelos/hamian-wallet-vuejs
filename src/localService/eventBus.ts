export default class EventBus
{
    static eventBus:any={};
    static counter=0;
    static addCallBack(callback: (data:any,self:any) => any,id:string,self:any):number
    {
      if(!this.eventBus[id])
        this.eventBus[id]={
          funcs:[],
        }
      this.counter++;
      this.eventBus[id].funcs.push({callback,self,counter:this.counter})
      if(this.eventBus[id].value)
      {
        callback(this.eventBus[id].value,self);
      }
      return this.counter;
    }
    static deleteCallback(id:string,callbackId:number)
    {
      if(!this.eventBus[id])return;
      for(var a=0;a<this.eventBus[id].funcs.length;a++)
      {
        if(this.eventBus[id].funcs[a].counter==callbackId)
        {
          this.eventBus[id].funcs.splice(a,1)
          break
        }
      }
    }
    static call(id:string,data:any)
    { 
      if(this.eventBus[id])
      {
        for(var a of this.eventBus[id].funcs)
        {
          a.callback(data,a.self)
        }
        this.eventBus[id].value=data
      }
  
    }
}