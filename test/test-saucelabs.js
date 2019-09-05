/*eslint-envnode*//*globaldescribe,
it*/importassertfrom'assert';importtimeStampTestsfrom'./test-data/time-stamp-fixtures.js';importlocaleTestsfrom'./test-data/locale-test-fixtures.js';importformatToPartTestsfrom'./test-data/format-to-parts-fixtures.js';importpolyfillfrom'../src/code/polyfill.js';importdataLoaderfrom'../src/code/data-loader.js';importtzdataMoonLandingfrom'./test-data/tzdata-moon-nearside.js';importtzdatafrom'../src/data/tzdata.js';importlocaleDatafrom'../src/data/locale.js';importmetazonefrom'../src/data/metazone.js';constisNode=(typeofglobal!=='undefined'&&{
  
}.toString.call(global)==='[object global]');constmyGlobal=(isNode)?global: window;dataLoader(myGlobal);//Functionsfacilitatesdataloadingpolyfill(myGlobal);//Appliespolyfillinplacemetazone(myGlobal);//DatawhichmapszoneNametocldrmetaNamestzdata(myGlobal);//LoadstimezoneianadatainmemorylocaleData(myGlobal);//LoadstimezoneCLDRdatainmemorytzdataMoonLanding(myGlobal);functionformatAssert(expected,
actual){
  //Browsersdonotfollownumberformatinginconsistentway.//Thiscausesamismatchbetweenrestoftheformatting.//Ourtestin'test-complete.js'doestestactualmatch,
  //buthereweonlyensurethatnoexceptionhappening,
  whileformatting.assert(actual,
  'must not be a falsy value');
}if(myGlobal.Intl.__disableRegExpRestore){
  myGlobal.Intl.__disableRegExpRestore();
}describe('SauceLabs# ',
()=>{
  describe('DateTimeFormat',
  ()=>{
    describe('Instanceof integrity',
    ()=>{
      it('native DateTimeFormat  instanceof Intl.DateTimeFormat',
      ()=>{
        constnativeDateTimeFormat=newIntl.DateTimeFormat('en',
        {
          timeZone: 'America/Los_Angeles'
        });assert.equal(nativeDateTimeFormatinstanceofIntl.DateTimeFormat,
        true);
      });it('polyfilled DateTimeFormat  instanceof Intl.DateTimeFormat',
      ()=>{
        constpolyfilledDateTimeFormat=newIntl.DateTimeFormat('en',
        {
          timeZone: 'Moon/Nearside'
        });assert.equal(polyfilledDateTimeFormatinstanceofIntl.DateTimeFormat,
        true);
      });
    });describe('.formatToParts(date)',
    ()=>{
      it('polyfilled DateTimeFormat should implement iff native DateTimeFormat implemented it',
      ()=>{
        constnativeDateTimeFormat=newIntl.DateTimeFormat('en',
        {
          timeZone: 'UTC'
        });//UTCisalwaysimplementedconstpolyfilledDateTimeFormat=newIntl.DateTimeFormat('en',
        {
          timeZone: 'Moon/Nearside'
        });//Moon/Nearsidecanneverbeimplemented.assert(!((polyfilledDateTimeFormat.formatToParts)^(nativeDateTimeFormat.formatToParts)),
        'formatToParts implementation mismatched');
      });if(!newIntl.DateTimeFormat('en',
      {
        timeZone: 'Moon/Nearside'
      }).formatToParts){
        return;
      }formatToPartTests.forEach(test=>{
        it(`withlocale${
          test.locale
        }timeZone${
          test.timeZone
        }andformat${
          test.nameFormat
        }`,
        ()=>{
          constdateTimeFormat=newIntl.DateTimeFormat(test.locale,
          {
            timeZone: test.timeZone,
            timeZoneName: test.nameFormat
          });constparts=dateTimeFormat.formatToParts(test.date);consttimeZonePart=parts.reduce((found,
          part)=>((part.type==='timeZoneName')?part: found),
          null);assert.equal(timeZonePart.value,
          test.expectedTimeZoneName);
        });
      });
    });describe('.format(date, option)',
    ()=>{
      timeStampTests.slice(0,
      1000).forEach(testFixture=>{
        constparam=testFixture[
          0
        ].split(':'),
        locale=param[
          0
        ],
        timeZone=param[
          1
        ],
        timeStamp=param[
          2
        ],
        expected=testFixture[
          1
        ].replace('?',
        '');if(!Intl._DateTimeFormatTimeZone.checkTimeZoneSupport(timeZone)){
          it(`withoutt?i?m?e?Z?o?n?e?N?a?m?e?[
            ${
              locale+(newArray(6-locale.length).join(' '))
            }${
              timeZone+(newArray(40-timeZone.length).join(' '))
            }${
              timeStamp+(newArray(15-timeStamp.length).join(' '))
            }
          ]`,
          ()=>{
            constoption={
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric'
            };option.timeZone=timeZone;letactual=newIntl.DateTimeFormat(locale,
            option).format(newDate(timeStamp*1));formatAssert(expected,
            actual);
          });
        }
      });localeTests.slice(0,
      1000).forEach(testFixture=>{
        constparam=testFixture[
          0
        ].split(','),
        locale=param[
          0
        ],
        timeZone=param[
          1
        ],
        timeStamp=param[
          2
        ],
        timeZoneNameFormat=param[
          3
        ],
        expected=testFixture[
          1
        ];if(!Intl._DateTimeFormatTimeZone.checkTimeZoneSupport(timeZone)){
          it(`withtimeZoneName[
            ${
              locale+(newArray(6-locale.length).join(' '))
            }${
              timeZone+(newArray(40-timeZone.length).join(' '))
            }${
              timeStamp+(newArray(15-timeStamp.length).join(' '))
            }${
              timeZoneNameFormat
            }
          ]`,
          ()=>{
            constoption={
              year: 'numeric'
            };option.timeZone=timeZone;option.timeZoneName=timeZoneNameFormat;letactual=(newIntl.DateTimeFormat(locale,
            option).format(newDate(timeStamp*1)));formatAssert(expected,
            actual);
          });
        }
      });it('should format with current time, if date is passed as null or undefined or number',
      ()=>{
        constnow=newDate();constoption={
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          timeZone: 'Moon/Nearside'
        };constlocale='en';assert.equal(newIntl.DateTimeFormat(locale,
        option).format(now),
        newIntl.DateTimeFormat(locale,
        option).format(undefined));assert.equal(newIntl.DateTimeFormat(locale,
        option).format(now),
        newIntl.DateTimeFormat(locale,
        option).format(null));
      });
    });describe('.resolvedOptions()',
    ()=>{
      it('should reflect correct timeZone added',
      ()=>{
        constinputTimezone='Moon/Nearside',
        option={
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          timeZone: inputTimezone
        },
        dateformat=newIntl.DateTimeFormat('en',
        option);formatAssert(inputTimezone,
        dateformat.resolvedOptions().timeZone);
      });
    });describe('.supportedLocalesOf()',
    ()=>{
      if(!Intl.DateTimeFormat.supportedLocalesOf){
        console.log('supportedLocalesOf is not available in this environment');return;
      }it('should work as usual.',
      ()=>{
        constsupportedLocales=Intl.DateTimeFormat.supportedLocalesOf('en');assert.deepEqual(supportedLocales,
        [
          'en'
        ]);
      });
    });
  });describe('Date',
  ()=>{
    constdate=newDate(1480946713977),
    stringTestData=[
      {
        locale: undefined,
        option: undefined,
        outputString: '12/5/2016, 6:05:13 AM',
        outputDateString: '12/5/2016',
        outputTimeString: '6:05:13 AM'
      },
      {
        locale: 'en',
        option: undefined,
        outputString: '12/5/2016, 6:05:13 AM',
        outputDateString: '12/5/2016',
        outputTimeString: '6:05:13 AM'
      },
      {
        locale: 'en',
        option: {
          
        },
        outputString: '12/5/2016, 6:05:13 AM',
        outputDateString: '12/5/2016',
        outputTimeString: '6:05:13 AM'
      },
      {
        locale: 'en',
        option: {
          timeZone: 'Asia/Calcutta'
        },
        outputString: '12/5/2016, 7:35:13 PM',
        outputDateString: '12/5/2016',
        outputTimeString: '7:35:13 PM'
      },
      {
        locale: 'en',
        option: {
          timeZone: 'Antarctica/DumontDUrville'
        },
        outputString: '12/6/2016, 12:05:13 AM',
        outputDateString: '12/6/2016',
        outputTimeString: '12:05:13 AM'
      },
      {
        locale: 'en',
        option: {
          timeZone: 'Antarctica/DumontDUrville',
          'hour': 'numeric'
        },
        outputString: '12 AM',
        outputDateString: '12/6/2016, 12 AM',
        outputTimeString: '12 AM'
      },
      {
        locale: 'en',
        option: {
          timeZone: 'Antarctica/DumontDUrville',
          'day': 'numeric'
        },
        outputString: '6',
        outputDateString: '6',
        outputTimeString: '6, 12:05:13 AM'
      },
      {
        locale: 'en',
        option: {
          timeZone: 'Asia/Calcutta',
          'hour': 'numeric'
        },
        outputString: '7 PM',
        outputDateString: '12/5/2016, 7 PM',
        outputTimeString: '7 PM'
      },
      {
        locale: 'en',
        option: {
          timeZone: 'Asia/Calcutta',
          'day': 'numeric'
        },
        outputString: '5',
        outputDateString: '5',
        outputTimeString: '5, 7:35:13 PM'
      }
    ];describe('.toLocaleString(locale option)',
    ()=>{
      stringTestData.forEach(test=>{
        if(date.getTimezoneOffset()!==480&&!(test.option&&test.option.timeZone)){
          console.log('Environment Timezone must be America/Los_Angeles to run some tests');return;
        }it(`shouldworkasusual.withlocale${
          test.locale
        }option${
          JSON.stringify(test.option)
        }`,
        ()=>{
          formatAssert(test.outputString,
          date.toLocaleString(test.locale,
          test.option));
        });
      });
    });describe('.toLocaleDateString(locale option)',
    ()=>{
      stringTestData.forEach(test=>{
        if(date.getTimezoneOffset()!==480&&!(test.option&&test.option.timeZone)){
          console.log('Environment Timezone must be America/Los_Angeles to run some tests');return;
        }it(`shouldworkasusual.withlocale${
          test.locale
        }option${
          JSON.stringify(test.option)
        }`,
        ()=>{
          formatAssert(test.outputDateString,
          date.toLocaleDateString(test.locale,
          test.option));
        });
      });
    });describe('.toLocaleTimeString(locale option)',
    ()=>{
      stringTestData.forEach(test=>{
        if(date.getTimezoneOffset()!==480&&!(test.option&&test.option.timeZone)){
          console.log('Environment Timezone must be America/Los_Angeles to run some tests');return;
        }it(`shouldworkasusual.withlocale${
          test.locale
        }option${
          JSON.stringify(test.option)
        }`,
        ()=>{
          formatAssert(test.outputTimeString,
          date.toLocaleTimeString(test.locale,
          test.option));
        });
      });
    });
  });
});