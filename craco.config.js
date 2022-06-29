const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@Assets': path.resolve(__dirname, './src/assets/'),
      '@Components': path.resolve(__dirname, './src/components/'),
      '@Constants': path.resolve(__dirname, './src/constants/'),
      '@Containers': path.resolve(__dirname, './src/containers/'),
      '@Screens': path.resolve(__dirname, './src/screens/'),
      '@Utils': path.resolve(__dirname, './src/utils/')
    }
  },
};