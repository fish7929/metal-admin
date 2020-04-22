const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        // style: 'css',
        libraryDirectory: 'es',
        style: true,   //自动打包样式 'css',  true,表示处理less文件
    }),
    //对 less变量重新覆盖
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@brand-primary': '#1cae82',
            '@brand-primary-tap': '#1DA57A',
        },
    }),
);