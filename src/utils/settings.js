const fs = require('fs');
const path = require('path');

const enableBlog = fs.existsSync(
  path.resolve(fs.realpathSync(process.cwd()), 'src', 'content', 'blog'),
);

const enablePortfolio = fs.existsSync(
  path.resolve(fs.realpathSync(process.cwd()), 'src', 'content', 'portfolio'),
);

module.exports = {
  enableBlog,
  enablePortfolio,
};
