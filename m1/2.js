// require()
// npm init

const { info, getFoo, setFoo } = require("./info");

global.foo = 3;
// process.env

getFoo();
setFoo(5);
getFoo();
// info("test");
