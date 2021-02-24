export default ({ command, mode }) => {
    const obj = {
        root: __dirname,
        resolve: {
            alias: {
                '@': '/src/'
            }
        },
        css: {}
    };

    if (command === 'serve') {
        return obj;
    } else {
        return obj;
    }
};
