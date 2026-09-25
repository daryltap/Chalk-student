// Small markdown helper for club posts.
// Supports the handful of bits people actually type on a wall.

//This part replaces the original escapeUnused function to escape HTML characters in the input string with their corresponding HTML entities
function escapeHtml(src) {
  return src.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

//This part checks if the href starts with certain characters, and it either returns the href as is or returns"#"
function safeHref(href) {
  return /^(?:https?:\/\/|\/|#)/i.test(href) ? href : "#";
}

function renderMarkdown(src) {
  const text = String(src ?? "");

  //This part replaces the original return escapeUnused to treat it as text, rather than executable code
  return escapeHtml(text)
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, href) => (
      `<a href="${safeHref(href)}">${label}</a>`
    ))
    .replace(/^[-*] (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")
    .replace(/\n/g, "<br>");
}

module.exports = { renderMarkdown };
