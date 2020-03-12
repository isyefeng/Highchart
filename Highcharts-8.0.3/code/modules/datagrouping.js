/*
 Highstock JS v8.0.3 (2020-03-05)

 Data grouping module

 (c) 2010-2019 Torstein Hnsi

 License: www.highcharts.com/license
*/
(function(d){"object"===typeof module&&module.exports?(d["default"]=d,module.exports=d):"function"===typeof define&&define.amd?define("highcharts/modules/datagrouping",["highcharts"],function(g){d(g);d.Highcharts=g;return d}):d("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(d){function g(d,g,D,f){d.hasOwnProperty(g)||(d[g]=f.apply(null,D))}d=d?d._modules:{};g(d,"parts/DataGrouping.js",[d["parts/Globals.js"],d["parts/Point.js"],d["parts/Tooltip.js"],d["parts/Utilities.js"]],function(d,
g,D,f){"";var x=f.addEvent,B=f.arrayMax,K=f.arrayMin,L=f.correctFloat,E=f.defined,M=f.error,N=f.extend,O=f.format,y=f.isNumber,F=f.merge,G=f.pick,z=d.Axis,P=d.defaultPlotOptions;f=d.Series;var h=d.approximations={sum:function(a){var c=a.length;if(!c&&a.hasNulls)var b=null;else if(c)for(b=0;c--;)b+=a[c];return b},average:function(a){var c=a.length;a=h.sum(a);y(a)&&c&&(a=L(a/c));return a},averages:function(){var a=[];[].forEach.call(arguments,function(c){a.push(h.average(c))});return"undefined"===typeof a[0]?
void 0:a},open:function(a){return a.length?a[0]:a.hasNulls?null:void 0},high:function(a){return a.length?B(a):a.hasNulls?null:void 0},low:function(a){return a.length?K(a):a.hasNulls?null:void 0},close:function(a){return a.length?a[a.length-1]:a.hasNulls?null:void 0},ohlc:function(a,c,b,v){a=h.open(a);c=h.high(c);b=h.low(b);v=h.close(v);if(y(a)||y(c)||y(b)||y(v))return[a,c,b,v]},range:function(a,c){a=h.low(a);c=h.high(c);if(y(a)||y(c))return[a,c];if(null===a&&null===c)return null}},H=function(a,c,
b,v){var e=this,d=e.data,u=e.options&&e.options.data,f=[],m=[],p=[],n=a.length,q=!!c,r=[],k=e.pointArrayMap,g=k&&k.length,w=["x"].concat(k||["y"]),x=0,z=0,t;v="function"===typeof v?v:h[v]?h[v]:h[e.getDGApproximation&&e.getDGApproximation()||"average"];g?k.forEach(function(){r.push([])}):r.push([]);var A=g||1;for(t=0;t<=n&&!(a[t]>=b[0]);t++);for(t;t<=n;t++){for(;"undefined"!==typeof b[x+1]&&a[t]>=b[x+1]||t===n;){var l=b[x];e.dataGroupInfo={start:e.cropStart+z,length:r[0].length};var C=v.apply(e,r);
e.pointClass&&!E(e.dataGroupInfo.options)&&(e.dataGroupInfo.options=F(e.pointClass.prototype.optionsToObject.call({series:e},e.options.data[e.cropStart+z])),w.forEach(function(a){delete e.dataGroupInfo.options[a]}));"undefined"!==typeof C&&(f.push(l),m.push(C),p.push(e.dataGroupInfo));z=t;for(l=0;l<A;l++)r[l].length=0,r[l].hasNulls=!1;x+=1;if(t===n)break}if(t===n)break;if(k)for(l=e.cropStart+t,C=d&&d[l]||e.pointClass.prototype.applyOptions.apply({series:e},[u[l]]),l=0;l<g;l++){var B=C[k[l]];y(B)?
r[l].push(B):null===B&&(r[l].hasNulls=!0)}else l=q?c[t]:null,y(l)?r[0].push(l):null===l&&(r[0].hasNulls=!0)}return{groupedXData:f,groupedYData:m,groupMap:p}},I={approximations:h,groupData:H},w=f.prototype,Q=w.processData,R=w.generatePoints,A={groupPixelWidth:2,dateTimeLabelFormats:{millisecond:["%A, %b %e, %H:%M:%S.%L","%A, %b %e, %H:%M:%S.%L","-%H:%M:%S.%L"],second:["%A, %b %e, %H:%M:%S","%A, %b %e, %H:%M:%S","-%H:%M:%S"],minute:["%A, %b %e, %H:%M","%A, %b %e, %H:%M","-%H:%M"],hour:["%A, %b %e, %H:%M",
"%A, %b %e, %H:%M","-%H:%M"],day:["%A, %b %e, %Y","%A, %b %e","-%A, %b %e, %Y"],week:["Week from %A, %b %e, %Y","%A, %b %e","-%A, %b %e, %Y"],month:["%B %Y","%B","-%B %Y"],year:["%Y","%Y","-%Y"]}},J={line:{},spline:{},area:{},areaspline:{},arearange:{},column:{groupPixelWidth:10},columnrange:{groupPixelWidth:10},candlestick:{groupPixelWidth:10},ohlc:{groupPixelWidth:5}},S=d.defaultDataGroupingUnits=[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,
30]],["hour",[1,2,3,4,6,8,12]],["day",[1]],["week",[1]],["month",[1,3,6]],["year",null]];w.getDGApproximation=function(){return this.is("arearange")?"range":this.is("ohlc")?"ohlc":this.is("column")?"sum":"average"};w.groupData=H;w.processData=function(){var a=this.chart,c=this.options.dataGrouping,b=!1!==this.allowDG&&c&&G(c.enabled,a.options.isStock),d=this.visible||!a.options.chart.ignoreHiddenSeries,e,f=this.currentDataGrouping,u=!1;this.forceCrop=b;this.groupPixelWidth=null;this.hasProcessed=
!0;b&&!this.requireSorting&&(this.requireSorting=u=!0);b=!1===Q.apply(this,arguments)||!b;u&&(this.requireSorting=!1);if(!b){this.destroyGroupedData();b=c.groupAll?this.xData:this.processedXData;var g=c.groupAll?this.yData:this.processedYData,m=a.plotSizeX;a=this.xAxis;var p=a.options.ordinal,n=this.groupPixelWidth=a.getGroupPixelWidth&&a.getGroupPixelWidth();if(n){this.isDirty=e=!0;this.points=null;u=a.getExtremes();var q=u.min;u=u.max;p=p&&a.getGroupIntervalFactor(q,u,this)||1;n=n*(u-q)/m*p;m=a.getTimeTicks(a.normalizeTimeTickInterval(n,
c.units||S),Math.min(q,b[0]),Math.max(u,b[b.length-1]),a.options.startOfWeek,b,this.closestPointRange);g=w.groupData.apply(this,[b,g,m,c.approximation]);b=g.groupedXData;p=g.groupedYData;var r=0;if(c.smoothed&&b.length){var k=b.length-1;for(b[k]=Math.min(b[k],u);k--&&0<k;)b[k]+=n/2;b[0]=Math.max(b[0],q)}for(k=1;k<m.length;k++)m.info.segmentStarts&&-1!==m.info.segmentStarts.indexOf(k)||(r=Math.max(m[k]-m[k-1],r));q=m.info;q.gapSize=r;this.closestPointRange=m.info.totalRange;this.groupMap=g.groupMap;
if(E(b[0])&&b[0]<a.min&&d){if(!E(a.options.min)&&a.min<=a.dataMin||a.min===a.dataMin)a.min=Math.min(b[0],a.min);a.dataMin=Math.min(b[0],a.dataMin)}c.groupAll&&(c=this.cropData(b,p,a.min,a.max,1),b=c.xData,p=c.yData);this.processedXData=b;this.processedYData=p}else this.groupMap=null;this.hasGroupedData=e;this.currentDataGrouping=q;this.preventGraphAnimation=(f&&f.totalRange)!==(q&&q.totalRange)}};w.destroyGroupedData=function(){this.groupedData&&(this.groupedData.forEach(function(a,c){a&&(this.groupedData[c]=
a.destroy?a.destroy():null)},this),this.groupedData.length=0)};w.generatePoints=function(){R.apply(this);this.destroyGroupedData();this.groupedData=this.hasGroupedData?this.points:null};x(g,"update",function(){if(this.dataGroup)return M(24,!1,this.series.chart),!1});x(D,"headerFormatter",function(a){var c=this.chart,b=c.time,d=a.labelConfig,e=d.series,f=e.tooltipOptions,g=e.options.dataGrouping,h=f.xDateFormat,m=e.xAxis,p=f[(a.isFooter?"footer":"header")+"Format"];if(m&&"datetime"===m.options.type&&
g&&y(d.key)){var n=e.currentDataGrouping;g=g.dateTimeLabelFormats||A.dateTimeLabelFormats;if(n)if(f=g[n.unitName],1===n.count)h=f[0];else{h=f[1];var q=f[2]}else!h&&g&&(h=this.getXDateFormat(d,f,m));h=b.dateFormat(h,d.key);q&&(h+=b.dateFormat(q,d.key+n.totalRange-1));e.chart.styledMode&&(p=this.styledModeFormat(p));a.text=O(p,{point:N(d.point,{key:h}),series:e},c);a.preventDefault()}});x(f,"destroy",w.destroyGroupedData);x(f,"afterSetOptions",function(a){a=a.options;var c=this.type,b=this.chart.options.plotOptions,
d=P[c].dataGrouping,e=this.useCommonDataGrouping&&A;if(J[c]||e)d||(d=F(A,J[c])),a.dataGrouping=F(e,d,b.series&&b.series.dataGrouping,b[c].dataGrouping,this.userOptions.dataGrouping)});x(z,"afterSetScale",function(){this.series.forEach(function(a){a.hasProcessed=!1})});z.prototype.getGroupPixelWidth=function(){var a=this.series,c=a.length,b,d=0,e=!1,f;for(b=c;b--;)(f=a[b].options.dataGrouping)&&(d=Math.max(d,G(f.groupPixelWidth,A.groupPixelWidth)));for(b=c;b--;)(f=a[b].options.dataGrouping)&&a[b].hasProcessed&&
(c=(a[b].processedXData||a[b].data).length,a[b].groupPixelWidth||c>this.chart.plotSizeX/d||c&&f.forced)&&(e=!0);return e?d:0};z.prototype.setDataGrouping=function(a,c){var b;c=G(c,!0);a||(a={forced:!1,units:null});if(this instanceof z)for(b=this.series.length;b--;)this.series[b].update({dataGrouping:a},!1);else this.chart.options.series.forEach(function(b){b.dataGrouping=a},!1);this.ordinalSlope=null;c&&this.chart.redraw()};d.dataGrouping=I;"";return I});g(d,"masters/modules/datagrouping.src.js",
[d["parts/DataGrouping.js"]],function(d){return d})});
//# sourceMappingURL=datagrouping.js.map