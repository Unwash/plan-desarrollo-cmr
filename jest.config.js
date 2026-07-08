module.exports = {
    testEnvironment: "node",

    collectCoverage: true,

    collectCoverageFrom: [
        "**/*.js",
        "!node_modules/**",
        "!coverage/**",
        "!**/tests/**"
    ],

    coverageDirectory: "coverage",

    coverageReporters: [
        "text",
        "lcov",
        "cobertura"
    ]
};