var _ = require('ep_etherpad-lite/static/js/underscore');

var collectContentPre = function(hook, context){
  var tname = context.tname;
  var state = context.state;

  if(tname == "sup"){
    context.cc.doAttrib(state, "superscript");
  }
};

var collectContentPost = function(hook, context){
  var tname = context.tname;
  var state = context.state;
  var lineAttributes = state.lineAttributes
  var tagIndex = tname;

  if(tagIndex >= 0){
    delete lineAttributes['superscript'];
  }
};

exports.collectContentPre = collectContentPre;
exports.collectContentPost = collectContentPost;
