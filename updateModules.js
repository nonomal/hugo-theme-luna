const fs = require('fs');
const path = require('path');

const modules_path = './assets/modules/';

const modules = {
    'jump.js/dist/jump.js': 'jump.js',
    'clipboard/dist/clipboard.js': 'clipboard.js',
    'vanilla-lazyload/dist/lazyload.js': 'lazyload.js',
    'medium-zoom/dist/medium-zoom.js': 'medium-zoom.js',
    'swup/dist/swup.js': 'swup.js',
    '@swup/fade-theme/dist/SwupFadeTheme.js': 'SwupFadeTheme.js',
    '@swup/ga-plugin/dist/SwupGaPlugin.js': 'SwupGaPlugin.js',
    '@swup/progress-plugin/dist/SwupProgressPlugin.js': 'SwupProgressPlugin.js',
    '@swup/scripts-plugin/dist/SwupScriptsPlugin.js': 'SwupScriptsPlugin.js',
    '@swup/slide-theme/dist/SwupSlideTheme.js': 'SwupSlideTheme.js',
    'swup-morph-plugin/dist/SwupMorphPlugin.js': 'SwupMorphPlugin.js',
    'flexsearch/dist/flexsearch.bundle.js': 'flexsearch.js',
    'katex/dist/katex.js': 'katex/katex.js',
    'katex/dist/katex.css': 'katex/katex.css',
    'katex/dist/fonts': 'katex/fonts',
    'katex/dist/contrib/auto-render.js': 'katex-render.js',
    'katex/dist/contrib/copy-tex.js': 'katex-copy.js',
    'normalize.css/normalize.css': 'normalize.css',
    'eva-icons/style/eva-icons.css': 'eva-icons/eva-icons.css',
    'eva-icons/style/fonts': 'eva-icons/fonts',
}

function copyFolderSync(from, to) {
    try {
        fs.mkdirSync(to);
    } catch (error) {}
    fs.readdirSync(from).forEach(element => {
        if (fs.lstatSync(path.join(from, element)).isFile()) {
            fs.copyFileSync(path.join(from, element), path.join(to, element));
        } else {
            copyFolderSync(path.join(from, element), path.join(to, element));
        }
    });
}

for (let index = 0; index < Object.keys(modules).length; index++) {
    const key = Object.keys(modules)[index];
    const key_path = `node_modules/${key}`;
    const value = modules[key];
    const value_path = `${modules_path}${value}`;
    if (!fs.existsSync(key_path)) {
        console.log(`${key_path} not found`);
        continue;
    }
    
    const dir_path = path.join(value_path, '..');
    if (!fs.existsSync(dir_path)) {
        fs.mkdirSync(dir_path, { recursive: true });
    }
    if (fs.lstatSync(key_path).isDirectory() ) {
        // copy dir
        copyFolderSync(key_path, `${modules_path}${value}`);
    } else {
        // copy file
        fs.copyFileSync(key_path, `${modules_path}${value}`);
    }
}
