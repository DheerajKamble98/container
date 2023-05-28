const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    const { webpack } = options;
    Object.assign(config.experiments, { topLevelAwait: true });
    if (!options.isServer) {
      //config.cache=false
      config.plugins.push(
        new NextFederationPlugin({
          name: 'home',
          remotes: {
            home: `home@http://localhost:3000/_next/static/chunks/remoteEntry.js`,
            reportTerminatedParticipant: 'reportTerminatedParticipant@http://localhost:3001/_next/static/chunks/remoteEntry.js',
            reportLoginActivity: 'reportLoginActivity@http://localhost:3002/_next/static/chunks/remoteEntry.js',
          },
          filename: 'static/chunks/remoteEntry.js',
          exposes: {
            './pages-map': './pages-map.tsx',
          },
          shared: {},
        }),
      );
    }

    return config;
  },
};
