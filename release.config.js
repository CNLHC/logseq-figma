module.exports = {
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "conventionalcommits",
      },
    ],
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    [
      "@semantic-release/npm",
      {
        npmPublish: false,
      },
    ],
    "@semantic-release/git",
    [
      "@semantic-release/exec",
      {
        prepareCmd:
          "zip -qq -r logseq-figma-${nextRelease.version}.zip dist readme.md icon.png LICENSE package.json assets",
      },
    ],
    [
      "@semantic-release/github",
      {
        assets: "logseq-figma-*.zip",
      },
    ],
  ],
};
