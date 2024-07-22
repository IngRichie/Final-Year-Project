const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Customize the config before returning it
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "vm": require.resolve("vm-browserify")
  };

  // Enable code splitting
  config.optimization = {
    ...config.optimization,
    splitChunks: {
      chunks: 'all',
    },
  };

  return config;
};
