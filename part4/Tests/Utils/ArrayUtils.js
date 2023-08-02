function InvalidArrayInputTest(fn) {
  expect(() => fn(undefined)).toThrow('Not an array.');
  expect(() => fn(null)).toThrow('Not an array.');
  expect(() => fn()).toThrow('Not an array.');
  expect(() => fn('asdfasd')).toThrow('Not an array.');
  expect(() => fn(1)).toThrow('Not an array.');
}

export default { InvalidArrayInputTest };
