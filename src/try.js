function template(strings, ...keys) {
  return function(...values) {
    let dict = values[values.length - 1] || {};
    let result = [strings[0]];
    keys.forEach(function(key, i) {
      let value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join("");
  };
}

let t1Closure = template`${0}${1}${0}!`;
t1Closure("Y", "A"); // "YAY!"
let t2Closure = template`${0} ${"foo"}!`;
t2Closure("Hello", { foo: "World" }); // "Hello World!"
