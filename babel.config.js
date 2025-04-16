export default {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: "> 0.25%, iOS 10",
        useBuiltIns: "usage",
        corejs: 3,
      },
    ],
  ],
};
