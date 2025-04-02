module.exports = {
    transform: {
      "^.+\\.vue$": "@vue/vue3-jest",
      "^.+\\.js$": "babel-jest"
    },
    moduleFileExtensions: ["js", "vue"],
      testEnvironment: "jsdom"
  };
  