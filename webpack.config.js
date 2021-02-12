let env = process.env.NODE_ENV;

console.log(`NODE_ENV: ${env}`);

module.exports = function () {
    return require(`./config/webpack.config.${env}.js`);
}
