var path = require("path");
var Builder = require('systemjs-builder');

// optional constructor options
// sets the baseURL and loads the configuration file
var builder = new Builder('.', 'config.js');

builder
.bundle('src/components/media/media.js & src/components/fileManager/manager.js', 'dist/common.js')
// .bundle('src/components/media/media.js', 'dist/media.js')
.then(function() {
  builder.bundle('src/components/media/media.js - dist/common.js', 'dist/media.js');
  builder.bundle('src/components/fileManager/manager.js - dist/common.js', 'dist/fileManager.js');
  console.log('Build complete');
})
.catch(function(err) {
  console.log('Build error');
  console.log(err);
});
