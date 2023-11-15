
function template (strings, ...keys) {
  console.log(strings[0])
  return (...values) => {
    const dict = values[values.length - 1] || {}
    
    const result = [strings[0]]
    keys.forEach((key, i) => {
      const value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join("");
  }
}

const closure1 = template`a${"test"}${1}${"test"}, charon`

console.log(closure1('dsa', 'fds', { test: 'jk' }))