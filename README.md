# Scratch SVG Editor

Scratch Paintを利用したSVGエディタです。

## 今回の修正

GitHub Actionsで発生した

`Module parse failed: Unexpected token`

および

`Support for the experimental syntax 'jsx' isn't currently enabled`

に対応しています。

原因は `scratch-paint` がnpmパッケージとしてインストールされた後も
`node_modules/scratch-paint/src/*.jsx` をWebpackが直接読んでいたことです。

`webpack.config.js` でアプリ本体だけでなく
`node_modules/scratch-paint` も `babel-loader` の対象にしています。

## GitHub Pages

リポジトリのルートへこのZIPの中身を上書きしてCommitしてください。

Settings > Pages > Source を `GitHub Actions` にします。

その後、mainへのpushで自動ビルド・デプロイされます。

## License

AGPL-3.0-only
