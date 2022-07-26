const info = (string) => console.log("[INFO]", string);
const getFoo = () => console.log("[FOO]", global.foo);
const setFoo = (n) => {
  global.foo = n;
};

module.exports = { info, getFoo, setFoo };
