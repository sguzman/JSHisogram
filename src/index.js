const rp = require('request-promise');
const _ = require('lodash');
const arg = process.argv[2];

function body(text) {
  const cache = {};
  for (const ch of text) {
    cache[ch] = (cache[ch] || 0) + 1
  }

  const chs = Object.keys(cache).map(t => [t, cache[t]]);
  const totalCount = _.sum(Object.keys(cache).map(t => cache[t]));
  console.log(`Total count is ${totalCount}`);

  const items = _.sortBy(chs, k => k[1]).reverse().map(t => [t[0], t[1], t[1] / totalCount]);

  const entropy = -1 * _.sum(items.map(t => t[2] * (Math.log2(t[2]))));
  console.log(`Entropy of page is ${entropy}`);

  return items;
}

rp(arg)
.then(function (html) {
  body(html).forEach(function (item) {
    console.log(item[0], item[1], item[2]);
  })
});
