function preSavePageFunction (options) {
// sample code that simply passes on what has been exported

  for(var i=0; i<options.data.length; i++) {
   	
    var itemList = [];
    var order = options.data[i];
    if (!order) {
      continue;
    }
    for(var j=0; j<order.OrderAllocationItems.length; j++) {
     
      var item = order.OrderAllocationItems[j];
      var foundItem = false;
      for(var k=0; k<itemList.length; k++) {
        
        if(itemList[k].LineItemNumber == item.LineItemNumber) { 
          itemList[k].QuantityAllocated = parseInt(itemList[k].QuantityAllocated) + parseInt(item.QuantityAllocated);
          if(!item.LotNumber) {
          } else {
          	itemList[k].InvDetail.push({LotNumber: item.LotNumber, QuantityAllocated: item.QuantityAllocated});
          }
          foundItem = true;
          break;
        }
      }
      
      if(!foundItem) {
       
        itemList.push({
          ExpirationDate: item.ExpirationDate,
          ItemComment: item.ItemComment,
          LineItemNumber: item.LineItemNumber,
          ProductDescription: item.ProductDescription,
          QuantityAllocated: item.QuantityAllocated,
          SKU: item.SKU,
          InvDetail: !item.LotNumber?[]:[{LotNumber: item.LotNumber, QuantityAllocated: item.QuantityAllocated}]
        });
        
      }

    }
    order.OrderAllocationItems = itemList;   
    order.OrderAllocationItems1 = itemList1; 
  }
  
  return {
    data: options.data,
    errors: options.errors
  }
}
