var _, $, jQuery;
var $ = require('ep_etherpad-lite/static/js/rjquery').$;
var _ = require('ep_etherpad-lite/static/js/underscore');

// Bind the event handler to the toolbar buttons
var postAceInit = function(hook, context){
  $('#section-button').click(function(){
    context.ace.callWithAce(function(ace){
      ace.ace_doToggleSectionBlock();
    },'insertSectionBlock' , true);
  })
};

exports.aceEditEvent = function(hook, call, info, rep, attr){
  // If it's not a click or a key event and the text hasn't changed then do nothing
  if(!(call.callstack.type == "handleClick") && !(call.callstack.type == "handleKeyEvent") && !(call.callstack.docTextChanged)){
    return false;
  }
  setTimeout(function(){ // avoid race condition..
    // the caret is in a new position..  Let's do some funky shit
    if ( call.editorInfo.ace_getAttributeOnSelection("sectionblock") ) {
      // show the button as being depressed..  Not sad, but active.. You know the drill bitches.
      $('.sectionblock > a').addClass('activeButton');
    }else{
      $('.sectionblock > a').removeClass('activeButton');
    }
  },250);
}

// Our sectionblock attribute will result in a sectionblock:1 class
function aceAttribsToClasses(hook, context){
  if(context.key == 'sectionblock'){
    return ['sectionblock:' + 1 ];
  }
}

exports.addCSS = function () {
  return ['ep_sections/static/css/editor.css'];
}

// Here we convert the class sectionblock into a tag
exports.aceCreateDomLine = function(name, context){
  var cls = context.cls;
  var domline = context.domline;
  var sectionblock = /(?:^| )sectionblock:([A-Za-z0-9]*)/.exec(cls);
  var tagIndex;
  if (sectionblock){
    tagIndex = true;
  }

  if (tagIndex){
    var modifier = {
      extraOpenTags: '<span class="section-block">',
      extraCloseTags: '</span>',
      cls: cls
    };
    return [modifier];
  }
  return [];
};

function doToggleSectionBlock(){
  this.editorInfo.ace_toggleAttributeOnSelection("sectionblock");
}

// Once ace is initialized, we set ace_doToggleSectionBlock and bind it to the context
function aceInitialized(hook, context){
  var editorInfo = context.editorInfo;
  editorInfo.ace_doToggleSectionBlock = _(doToggleSectionBlock).bind(context);
}

// Export all hooks
exports.aceInitialized = aceInitialized;
exports.postAceInit = postAceInit;
exports.aceAttribsToClasses = aceAttribsToClasses;
