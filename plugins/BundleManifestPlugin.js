const path = require('path');
const fs = require('fs');

module.exports = function (bundler) {
  const logger = bundler.logger;

  const readManifestJson = (path) => {
    if (!fs.existsSync(path)) {
      logger.status('✨', 'create manifest file');
      return {};
    };

    logger.status('🖊', 'update manifest file');

    try {
      return JSON.parse(fs.readFileSync(path, 'utf8'));
    } catch(e) {
      logger.error('manifest file is invalid');
      throw e; 
    }
  };

  bundler.on('bundled', (bundle) => {
    const dir = path.dirname(bundle.name);
    logger.status('📦', 'PackageManifestPlugin');
    logger.status('📁', `     dir : ${dir}`);

    const manifestValue = Array.from(bundle.entryAsset.parentBundle.childBundles)
        .map(bundle => path.relative(dir, bundle.name))
    logger.status('✓', `  bundle : ${bundle.name}`);

    const manifestPath = path.resolve(dir, 'parcel-manifest.json');
    logger.status('📄', `manifest : ${manifestPath}`);
    fs.writeFileSync(manifestPath, JSON.stringify(manifestValue));
  });
};
