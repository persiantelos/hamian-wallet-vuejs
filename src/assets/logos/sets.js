//sets
var accountName = window.localStorage.getItem("account")

static async getSetsByCreator(accountName , creator , skip=0 , top=10){
  var b = {
    $filter:"creator eq '"+creator+"'",
    $skip:skip,
    $top:top,
    $orderby:'_id desc'
  };
  var t = await base.post(this.url+"hyberion/getSets",b);
  if(t.data.value.length == 0)
    return null;
    
  var res = [];
  var ind = 0;
  var serial_filter = []
  for (const row of t.data.value) {
    serial_filter.push(`${row._id}`)
    row.minImage=this.url+'set/'+(Math.floor(row.id/100))+'/'+row.id+'_min.png'
    if(row.url)
    {
      row.minImage=this.url+row.url
    }
    res[ind] = {
      item : row,
    }
    ind++;
  } 

  var likes = await this.isSetLikeByListOfSerials(accountName , serial_filter)
  for(var i in res){
    res[i].item['isLiked'] = likes[i] == 1 ? true : false
  }
  
  return {result:res,nextKey:skip+top,more:t.data.value.length==top};
   
}

//collection
static async getCollectionsByOwner(accountName , owner , skip , top=20){
  var fltr='owner eq \''+owner+'\'';  
  var f = {
    $filter: fltr,
    $skip:skip,
    $top:top, 
    $orderby:'_id desc',
  }
  var t = await base.post("https://api1.areaxnft.com/web/getCollections",f);
  var serial_filter = []
  for(var a of t.data.value){
    serial_filter.push(a._id)
  }
  var likes = await this.isCollcLikeByListOfSerials(accountName , serial_filter)
  console.log(likes);
  for(var i in t.data.value){
    t.data.value[i]['isLiked'] = likes[i] == 1 ? true : false
  }
  return t
}

//follower
static async getFollowers(account,skip=0,top=10){

  var t = await base.post(this.url+"hyberion/getFollowers",{$skip:skip,$top:top,$filter:'scope eq \''+account+'\''});
  return {items:t.data.value,more:t.data.value.length==top,nextKey:skip+top};
}

//following
static async getFollowings(account,skip=0,top=10){

  var t = await base.post(this.url+"hyberion/getFollowing",{$skip:skip,$top:top,$filter:'scope eq \''+account+'\''});
  return {items:t.data.value,more:t.data.value.length==top,nextKey:skip+top};
}

//incoming
static async getOfferItems(accountName , owner , skip=0 , top=10)
  {
    var t = await base.post(this.url+"hyberion/getOffersItems",{$filter:'owner eq \''+owner+'\''});
    var strOr='';
    var serial_filter = []

    for(var a of t.data.value)
    {
      serial_filter.push(`${a.serial}`)
      strOr+='_id eq '+a.serial+ ' or ';
    }
    if(strOr)
    {
      strOr=strOr.substr(0,strOr.length-4)
      var f = {
        $filter:strOr,
        $skip:skip,
        $top:top,
      };
      var items= await base.post(this.url+"hyberion/getAllItems",f);
      
      for(var a of t.data.value)
      {
        a.item = items.data.value.filter(p=>p._id==a.serial)[0];
      }
    }

    var likes = await this.isItemLikeByListOfSerials(accountName , serial_filter)
    for(var i in t.data.value){
      t.data.value[i]['isLiked'] = likes[i] == 1 ? true : false
    }
    
    return {items:t.data.value,more:t.data.value.length==top,nextKey:skip+top};
  }

  //submitted
  static async getOffers(accountName , serial , from , skip=0 , top=10)
  {
    var filter='';
    if(serial)filter='serial eq \''+serial+'\'';
    if(from)
    {
      if(filter) filter+=' and '
      filter+='from eq \''+from+'\''
    }
    var query={
      $top:top,
    }
    if(filter)
    {
      query['$filter']=filter
    }
    query['$orderby'] = '_id desc'
    var t = await base.post(this.url+"hyberion/getOffers",query);
    var strOr='';
    for(var a of t.data.value)
    {
      strOr+='_id eq '+a.serial+ ' or ';
    }
    if(strOr)
    {
      strOr=strOr.substr(0,strOr.length-4)
      var items= await base.post(this.url+"hyberion/getAllItems",{$filter:strOr});
      for(var a of t.data.value)
      {
        a.item = items.data.value.filter(p=>p._id==a.serial)[0];
      }
      
    }

    //covert main owner with market.code
    var fltr = ""
    var serial_filter = []

    for(var a in t.data.value){
      serial_filter.push(`${t.data.value[a].serial}`)
      if(t.data.value[a].owner == base.newMarketContract){
        fltr+= 'nftSerial eq \''+t.data.value[a].serial+'\' or '
      }
    }
    if(fltr)
    {
      fltr=fltr.substr(0,fltr.length-4);
      var marketItems = await this.getNewMarketItemsByQueryFilter(fltr)
      marketItems.forEach(item => {
        var x = t.data.value.find(listItm => listItm.serial == item.nftSerial)
        x.owner = item.owner
      });
    }

    var likes = await this.isItemLikeByListOfSerials(accountName , serial_filter)
    for(var i in t.data.value){
      t.data.value[i]['isLiked'] = likes[i] == 1 ? true : false
    }

    return {items:t.data.value,more:t.data.value.length==top,nextKey:skip+top};
  }

  static async getNewMarketItemsByQueryFilter(filter , skip=0 , top=24){
    var f = {
      $filter:filter,
      $skip:skip,
      $top:top,
      $orderby:'_id desc',
      version:'1'
    };

    var t = await base.post(this.url+"hyberion/getMarket",f);
    return t.data.value
  }