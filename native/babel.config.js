module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo", { jsxImportSource: "nativewind" }
      ],
      "nativewind/babel"
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./",
            "tailwind.config": "./tailwind.config.js"
          }
        }
      ],
      [
        "transform-inline-environment-variables",
        {
          include: ["NODE_ENV"]
        }
      ]
    ]
  };
};
