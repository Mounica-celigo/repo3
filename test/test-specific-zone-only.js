/*eslint-envnode*//*globaldescribe,
it*/importassertfrom'assert';importpolyfillfrom'../src/code/polyfill.js';importdataLoaderfrom'../src/code/data-loader.js';importtzdataDumontdurvillefrom'../src/data/timezones/tzdata-antarctica-dumontdurville.js';importtzdataLosAngelesfrom'../src/data/timezones/tzdata-america-los_angeles.js';constisNode=(typeofglobal!=="undefined"&&{
  
}.toString.call(global)==='[object global]');constmyGlobal=(isNode)?global: window;dataLoader(myGlobal);//Functionsfacilitatesdataloadingpolyfill(myGlobal);//AppliespolyfillinplacetzdataDumontdurville(myGlobal);//LoadstimezoneianadatainmemorytzdataLosAngeles(myGlobal);//Loadstimezoneianadatainmemorydescribe('Polyfill packaged with specific timezone data',
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
      });it('should format with timezone Antarctica/DumontDUrville',
      ()=>{
        constdate=newDate(1480946713977);constdumontDUrvilleTime=newIntl.DateTimeFormat('en',
        {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          timeZone: 'Antarctica/DumontDUrville'
        }).format(date);assert.equal('12/6/2016, 12:05 AM',
        dumontDUrvilleTime);
      });it('should throw RangeError if timeZoneName is printed',
      ()=>{
        constdate=newDate(1480946713977);assert.throws(()=>{
          newIntl.DateTimeFormat('en',
          {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            timeZoneName: 'long',
            timeZone: 'Moon/Nearside'
          }).format(date);
        },
        /RangeError/);
      });it('should throw RangeError with timezone random/wrong',
      ()=>{
        constdate=newDate(1480946713977);assert.throws(()=>{
          newIntl.DateTimeFormat('en',
          {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            timeZone: 'random/wrong'
          }).format(date);
        },
        /RangeError/);
      });
    });
  });
});