function preSavePageFunction (options) {
for(var i=0;i<options.data.length;i++){
	var d=options.data[i]
    for(var j=0;j<d.payload.application.candidate.addresses.length;j++)
    {
		var changeaddress=d.payload.application.candidate.addresses[j]
    	if(changeaddress.type =='home')
    	{
     		var found = changeaddress.value.split("\n")
      		changeaddress.street = found[0]
      		changeaddress.City = found[1]
      		changeaddress.State = found[2]
      		changeaddress.Country = found[3]
          	changeaddress.Zipcode = found[4]
    	}
   	}
}
  return {
    data: options.data,
    errors: options.errors
  }
}
