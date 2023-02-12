const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@Assets': path.resolve(__dirname, './src/assets/'),
      '@Components': path.resolve(__dirname, './src/components/'),
      '@Constants': path.resolve(__dirname, './src/constants/'),
      '@Pages': path.resolve(__dirname, './src/pages/'),
      '@Store': path.resolve(__dirname, './src/store/'),
      '@Utils': path.resolve(__dirname, './src/utils/')
    }
  },
};