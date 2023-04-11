// Send a message to the content script requesting the DOM tree
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(tabs[0].id, { action: "getDOMTree" }, function (response) {
    // Recursively build the HTML tree from the DOM tree
    var treeHtml = buildTreeHtml(response.domTree);
    // Add the HTML tree to the popup
    document.getElementById("tree").innerHTML = treeHtml;
  });
});

// Recursively build the HTML tree from the DOM tree
function buildTreeHtml(node) {
  var html = "";
  // Check if the node has an ID and include it in the text content
  var text = node.tag + (node.id ? " " + node.id : "") + (node.classNames ? " " + node.classNames : "");
  html += "<li>" + text;
  if (node.children.length > 0) {
    html += "<ul>";
    // Recursively build the HTML for each child node
    for (var i = 0; i < node.children.length; i++) {
      html += buildTreeHtml(node.children[i]);
    }
    html += "</ul>";
  }
  html += "</li>";
  return html;
}