#!/usr/local/bin/node

var fs = require('fs');

var sqlDump   = typeof process.argv[2] != "undefined" ? process.argv[2] : (function(){console.log('You must provide a sql dump file.'); return false; })();
var outFolder = typeof process.argv[3] != "undefined" ? process.argv[3] : (function(){console.log('You must provide an output folder.'); return false; })();;


if(!sqlDump || !outFolder){
    console.log('Usage: ./split.js mysqlfile.sql ~/workspace/tables');
    return false;
}

if(outFolder[outFolder.length - 1] == "/") outFolder = outFolder.slice(0, outFolder.length - 1);

fs.readFile(sqlDump, 'utf-8', function(err,  data){
    if(err) throw "Shit shit shit:" + err;
    var tableMatches = data.match(/Table structure for table.+/g);
    var tables = data.split(/Table structure for table.+/);
    tables.shift()
   console.log('tablematches', tableMatches.length);
   console.log('tables', tables.length);

    for(var i = 0; i < tableMatches.length; i++){

            tableMatch = tableMatches[i];
            tableNameStart = tableMatch.search('`') + 1;
            tableNameEnd = tableMatch.length - 1;
            tableName = tableMatch.slice(tableNameStart, tableNameEnd);

            console.log(tableName);

            fs.writeFile(outFolder + "/" +  tableName  + ".sql", tables[i], function(err, data) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("The file was saved!");
                }
           }); 
    }

});
