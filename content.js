// Listen for a message from the extension popup
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // Check the message is requesting the DOM tree
    if (msg.action === "getDOMTree") {
      // Get the DOM tree of the current page
      var domTree = createDOMTree(document.body);
      // Send the DOM tree back to the extension popup
      sendResponse({ domTree: domTree });
    }
  });
  
  // Recursively create the DOM tree
  function createDOMTree(node) {
    // Create an empty list to hold the children
    var children = [];
    // Loop through the child nodes
    for (var i = 0; i < node.childNodes.length; i++) {
      var child = node.childNodes[i];
      // Only add element nodes (type 1)
      if (child.nodeType === 1) {
        // Recursively create the child's DOM tree
        var childTree = createDOMTree(child);
        // Add the child's DOM tree to the list of children
        children.push(childTree);
      }
    }
    // Get the ID and class of the node, if it has any
    var id = node.getAttribute("id");
    var classNames = node.getAttribute("class");
    // Create an object to represent the current node
    var obj = {
      tag: node.tagName.toLowerCase(),
      id: id ? "{id=" + id + "}" : "",
      classNames: classNames ? "{class=" + classNames + "}" : "",
      children: children
    };
    // Return the object
    return obj;
  }