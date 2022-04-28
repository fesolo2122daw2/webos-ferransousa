var $jscomp={scope:{}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(c.get||c.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.symbolCounter_=0;$jscomp.Symbol=function(a){return $jscomp.SYMBOL_PREFIX+(a||"")+$jscomp.symbolCounter_++};
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(a){var b=0;return $jscomp.iteratorPrototype(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};$jscomp.array=$jscomp.array||{};$jscomp.iteratorFromArray=function(a,b){$jscomp.initSymbolIterator();a instanceof String&&(a+="");var c=0,d={next:function(){if(c<a.length){var e=c++;return{value:b(e,a[e]),done:!1}}d.next=function(){return{done:!0,value:void 0}};return d.next()}};d[Symbol.iterator]=function(){return d};return d};
$jscomp.polyfill=function(a,b,c,d){if(b){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})}};$jscomp.polyfill("Array.prototype.keys",function(a){return a?a:function(){return $jscomp.iteratorFromArray(this,function(a){return a})}},"es6-impl","es3");
var path=require("path"),async=require("async"),log=require("npmlog"),nopt=require("nopt"),inspectLib=require("./../lib/inspect"),commonTools=require("./../lib/base/common-tools"),cliControl=commonTools.cliControl,version=commonTools.version,help=commonTools.help,setupDevice=commonTools.setupDevice,appdata=commonTools.appdata,errHndl=commonTools.errMsg,processName=path.basename(process.argv[1],".js");
process.on("uncaughtException",function(a){log.error("uncaughtException",a.toString());log.verbose("uncaughtException",a.stack);cliControl.end(-1)});
var knownOpts={device:[String,null],app:[String,null],service:[String,Array],"device-list":Boolean,open:Boolean,"host-port":[String,null],version:Boolean,help:Boolean,"hidden-help":Boolean,level:"silly verbose info http warn error".split(" ")},shortHands={d:["--device"],a:["--app"],s:["--service"],o:["--open"],P:["--host-port"],D:["--device-list"],V:["--version"],h:["--help"],hh:["--hidden-help"],v:["--level","verbose"]},argv=nopt(knownOpts,shortHands,process.argv,2);log.heading=processName;
log.level=argv.level||"warn";log.verbose("argv",argv);argv.level&&(delete argv.level,0===argv.argv.remain.length&&1===Object.keys(argv).length&&(argv.help=!0));var options={device:argv.device,appId:argv.app||argv.argv.remain[0],serviceId:argv.service,open:argv.open,hostPort:argv["host-port"]},op;argv.help||argv["hidden-help"]?(showUsage(argv["hidden-help"]),cliControl.end()):argv.version?version.showVersionAndExit():argv["device-list"]?setupDevice.showDeviceList(finish):op=inspect;
op&&version.checkNodeVersion(function(){async.series([op.bind(this)],finish)});function showUsage(a){a?help.display(processName,appdata.getConfig(!0).profile,a):help.display(processName,appdata.getConfig(!0).profile)}
function inspect(){log.info("inspect():","AppId:",options.appId,"ServiceId:",options.serviceId);if(options.appId||options.serviceId){if(options.appId&&"true"===options.appId[0]||"true"===options.appId)return finish(errHndl.changeErrMsg("EMPTY_VALUE","APP_ID"));if(options.serviceId&&"true"===options.serviceId[0])return finish(errHndl.changeErrMsg("EMPTY_VALUE","SERVICE_ID"));async.series([inspectLib.inspect.bind(inspectLib,options,null),function(){}],function(a){finish(a)})}else showUsage(),cliControl.end(-1)}
function finish(a,b){a?(log.error(a.toString()),log.verbose(a.stack),cliControl.end(-1)):(b&&b.msg&&console.log(b.msg),cliControl.end())};
