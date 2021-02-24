const { createServer } = require('vite');
(async () => {
    const serve = await createServer({
        configFile: false,
        root: __dirname,
        server: {
            listen: 2233
        }
    });
    await serve.listen();
})();

/**
 * todo
 * 1、vue3.0官方文档从头到尾完整看一遍（可以的话，尽量所有功能都尝试一遍）
 * 2、react官网从到到尾完成看一遍，包括mobx，router等。
 * 3、vite官方文档从头到尾看一遍。
 * 4、prettier官网。
 * 5、eslint官网。
 * 6、babel官网。
 * 7、esbuild、pnpm、snowpack、parcel等官网。。。
 */
