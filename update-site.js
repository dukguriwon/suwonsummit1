// Simple script to update site content and trigger auto-commit
const fs = require('fs');
const path = require('path');

// Update timestamp in a hidden element for auto-commit detection
const updateTimestamp = () => {
  const htmlPath = path.join(__dirname, 'index.html');
  let htmlContent = fs.readFileSync(htmlPath, 'utf8');
  
  // Add or update a hidden timestamp element
  const timestamp = new Date().toISOString();
  const timestampElement = `<!-- Last updated: ${timestamp} -->`;
  
  // Check if timestamp element already exists
  if (htmlContent.includes('<!-- Last updated:')) {
    htmlContent = htmlContent.replace(/<!-- Last updated: .*? -->/g, timestampElement);
  } else {
    // Add timestamp element after the opening body tag
    htmlContent = htmlContent.replace('<body>', `<body>\n  ${timestampElement}`);
  }
  
  fs.writeFileSync(htmlPath, htmlContent);
  console.log(`Site updated at ${timestamp}`);
};

// Run the update
updateTimestamp();
