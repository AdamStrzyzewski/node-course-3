const x = true;

const foo = () => 10;

if (x) {
  console.log("-----");
  console.log("Zmienna x jest prawdziwa");
  console.log("-----");
}

const b = x && foo() && 5;
console.log("b", b);

const c = x || foo();
console.log("c", c);
