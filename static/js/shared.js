var _ = require('ep_etherpad-lite/static/js/underscore');

var collectContentPre = function(hook, context){
  var tname = context.tname;
  var state = context.state;
console.log('collectContentPre', tname, state, context);
  if(/(?:^| )sectionblock/.exec(context.cls)){
    console.log('Success');
    context.cc.doAttrib(state, "sectionblock");
  }
};

var collectContentPost = function(hook, context){
  var tname = context.tname;
  var state = context.state;
  var lineAttributes = state.lineAttributes
  var tagIndex = tname;
console.log('collectContentPost', tname, state, lineAttributes);
  if(tagIndex >= 0){
    delete lineAttributes['sectionblock'];
  }
};

exports.collectContentPre = collectContentPre;
exports.collectContentPost = collectContentPost;
