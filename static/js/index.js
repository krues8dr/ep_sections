var _, $, jQuery;
var $ = require('ep_etherpad-lite/static/js/rjquery').$;
var _ = require('ep_etherpad-lite/static/js/underscore');

// Bind the event handler to the toolbar buttons
var postAceInit = function(hook, context){
  $('.superscript').click(function(){
    context.ace.callWithAce(function(ace){
      ace.ace_doToggleSuperscript();
    },'insertSuperscript' , true);
  })
};

// Our superscript attribute will result in a superscript:1 class
function aceAttribsToClasses(hook, context){
  if(context.key == 'superscript'){
    return ['superscript:' + 1 ];
  }
}

// Here we convert the class superscript into a tag
exports.aceCreateDomLine = function(name, context){
  var cls = context.cls;
  var domline = context.domline;
  var superscript = /(?:^| )superscript:([A-Za-z0-9]*)/.exec(cls);
  var tagIndex;
  if (superscript){
    tagIndex = true;
  }

  if (tagIndex){
    var modifier = {
      extraOpenTags: '<sup>',
      extraCloseTags: '</sup>',
      cls: cls
    };
    return [modifier];
  }
  return [];
};

function doToggleSuperscript(){
  this.editorInfo.ace_toggleAttributeOnSelection("superscript");
}

// Once ace is initialized, we set ace_doToggleSuperscript and bind it to the context
function aceInitialized(hook, context){
  var editorInfo = context.editorInfo;
  editorInfo.ace_doToggleSuperscript = _(doToggleSuperscript).bind(context);
}

// Export all hooks
exports.aceInitialized = aceInitialized;
exports.postAceInit = postAceInit;
exports.aceAttribsToClasses = aceAttribsToClasses;
