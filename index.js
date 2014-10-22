var eejs = require('ep_etherpad-lite/node/eejs/');
var Changeset = require("ep_etherpad-lite/static/js/Changeset");
exports.eejsBlock_editbarMenuLeft = function (hook_name, args, cb) {
  args.content = args.content + eejs.require("ep_sections/templates/buttons.ejs");
  return cb();
}

function getInlineStyle(sectionblock) {
  return "sectionblock: "+sectionblock+";";
}

exports.addStyles = function (name, args, cb) {
  args.content = args.content + "<link href='../static/plugins/ep_sections/static/css/editor.css' rel='stylesheet'>";
  return cb();
}

// line, apool,attribLine,text
exports.getLineHTMLForExport = function (hook, context) {
  var header = _analyzeLine(context.attribLine, context.apool);
  if (header) {
    var inlineStyle = getInlineStyle(header);
    return "<span class=\"section-block\">" + context.text.substring(1) + "</span>";
  }
}

function _analyzeLine(alineAttrs, apool) {
  var header = null;
  if (alineAttrs) {
    var opIter = Changeset.opIterator(alineAttrs);
    if (opIter.hasNext()) {
      var op = opIter.next();
      header = Changeset.opAttributeValue(op, 'sectionblock', apool);
    }
  }
  return header;
}
