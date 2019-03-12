const request = require('request'),
      cheerio = require('cheerio');

const { spawn } = require('child_process');

const vmwareLocal = spawn('vmware', ['--version']);

var url = 'https://my.vmware.com/en/web/vmware/info/slug/desktop_end_user_computing/vmware_workstation_pro/15_0';
var downloadURL = 'https://www.vmware.com/go/getworkstation-linux';

vmwareLocal.stdout.on('data', (data) => {

  request(url, function (error, response, body) {

    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
  
    $ = cheerio.load(body);
  
    versions = $('#pdActivitiesLog .child-table .midProductColumn');
    dates = $('#pdActivitiesLog .child-table .midDateColumn');
  
    var version = $(versions).eq(1);
    var date = $(dates).eq(1);
  
    console.log('');
    console.log('LOCAL');
    console.log(`${data}`);
    console.log('----------');

    console.log('');
    console.log('REMOTE');
    console.log(version.text());
    console.log(date.text());
    console.log('');
    console.log('----------');
    console.log('');

    console.log('Download URL : '+ downloadURL);
  
  });

});


