// @todo Remove when fixed in gas-estimation

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        util: false,
      },
    },
  });
};
