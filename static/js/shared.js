var _ = require('ep_etherpad-lite/static/js/underscore');

var collectContentPre = function(hook, context){
  var tname = context.tname;
  var state = context.state;
console.log('collectContentPre', tname, state);
  if(tname == "span"){
    context.cc.doAttrib(state, "sectionBlock");
  }
};

var collectContentPost = function(hook, context){
  var tname = context.tname;
  var state = context.state;
  var lineAttributes = state.lineAttributes
  var tagIndex = tname;

  if(tagIndex >= 0){
    delete lineAttributes['section-block'];
  }
};

exports.collectContentPre = collectContentPre;
exports.collectContentPost = collectContentPost;
