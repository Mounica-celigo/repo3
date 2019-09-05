/*eslint-envnode*//*globaldescribe,
it*/importassertfrom'assert';importpolyfillfrom'../src/code/polyfill.js';importdataLoaderfrom'../src/code/data-loader.js';importtzdataDumontdurvillefrom'../src/data/timezones/tzdata-antarctica-dumontdurville.js';importtzdataLosAngelesfrom'../src/data/timezones/tzdata-america-los_angeles.js';importlocaleDataFRfrom'../src/data/locales/locale-fr.js';importlocaleDataENfrom'../src/data/locales/locale-en.js';importmetazonefrom'../src/data/metazone.js';constisNode=(typeofglobal!=="undefined"&&{
  
}.toString.call(global)==='[object global]');constmyGlobal=(isNode)?global: window;dataLoader(myGlobal);//Functionsfacilitatesdataloadingpolyfill(myGlobal);//AppliespolyfillinplacetzdataDumontdurville(myGlobal);//LoadstimezoneianadatainmemorytzdataLosAngeles(myGlobal);//Loadstimezoneianadatainmemorymetazone(myGlobal);//DatawhichmapszoneNametocldrmetaNameslocaleDataFR(myGlobal);//LoadstimezoneianadatainmemorylocaleDataEN(myGlobal);//Loadstimezoneianadatainmemorydescribe('Polyfill packaged with specific timezone data',
()=>{
  describe('DateTimeFormat',
  ()=>{
    describe('.format(locale, option)',
    ()=>{
      it('should format with timezone America/Los_Angeles',
      ()=>{
        constdate=newDate(1480946713977);constlosAngelesTime=newIntl.DateTimeFormat('en',
        {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          timeZone: 'America/Los_Angeles'
        }).format(date);assert.equal('12/5/2016, 6:05 AM',
        losAngelesTime);
      });if(Intl.DateTimeFormat.supportedLocalesOf('fr').indexOf('fr')>=0){
        it('should format if timeZoneName is printed with loaded locale',
        ()=>{
          constdate=newDate(1480946713977);constlosAngelesTime=newIntl.DateTimeFormat('fr',
          {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            timeZoneName: 'long',
            timeZone: 'Antarctica/DumontDUrville'
          }).format(date);assert.equal('06/12/2016 à 00:05 heure de Dumont-d’Urville',
          losAngelesTime);
        });
      }if(Intl.DateTimeFormat.supportedLocalesOf('en').indexOf('en')>=0){
        it('should format if timeZoneName is printed with loaded locale',
        ()=>{
          constdate=newDate(1480946713977);constlosAngelesTime=newIntl.DateTimeFormat('en',
          {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            timeZoneName: 'long',
            timeZone: 'Antarctica/DumontDUrville'
          }).format(date);assert.equal('12/6/2016, 12:05 AM Dumont-d’Urville Time',
          losAngelesTime);
        });
      }if(Intl.DateTimeFormat.supportedLocalesOf('hi').indexOf('hi')>=0&&!Intl._DateTimeFormatTimeZone.checkTimeZoneSupport('Antarctica/DumontDUrville')){
        it('should throw exception if timeZoneName is printed with non-loaded locale',
        ()=>{
          constdate=newDate(1480946713977);assert.throws(()=>{
            newIntl.DateTimeFormat('hi',
            {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              timeZoneName: 'long',
              timeZone: 'Antarctica/DumontDUrville'
            }).format(date);
          },
          /RangeError/);
        });
      }
    });
  });
});