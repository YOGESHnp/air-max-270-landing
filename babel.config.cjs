module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }], // Compiles modern JS to current Node version
    ['@babel/preset-react', { runtime: 'automatic' }], // Handles JSX automatically (no need to import React)
  ],
};
