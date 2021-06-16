import format from 'string-format'
import get from 'lodash.get'

// Automatically loads all js files from src/data/copy folder.
// Each file creates a node in the data object
// Continue using as usual: copy('equipment.title')
const data = {};
const context = require.context('../data/copy', false, /^.\/.*js$/);
context.keys().forEach((key) => {
  const name = key.replace('./', '').replace('.js', '');
  data[name] = context(key).default;
});

function copy(id, args) {
  const values = { br: '<br />', ...args };
  let str = get(data, id);
  if (str) {
    if (typeof str !== 'string') return str;
    str = str.replace(/\n/g, '{br}');
    return format(str, values);
  }
  console.log('STRING NOT FOUND:', `'${id}'`);
  return id;
}

export default copy;
