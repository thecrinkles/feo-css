import { sort } from "./helpers.js";

export function navigation(collection) {
  const items = {};

  // main navigation items
  let _c = collection.filter((c) => !c.data.parent);
  for (let i in _c) {
    const item = _c[i].data;
    items[item.key] = {
      title: item.title,
      order: item.order,
      url: item.page.url,
      md: `${item.page.filePathStem}.md`,
      sub: [],
    };
  }

  // sub items
  _c = collection.filter((c) => c.data.parent).sort(sort("title"));
  for (let i in _c) {
    const item = _c[i].data;
    items[item.parent].sub.push({
      title: item.title,
      url: item.page.url,
      md: `${item.page.filePathStem}.md`,
      key: item.key,
    });
  }
  return Object.entries(items).sort((a, b) => Math.sign(a[1].order - b[1].order));
}

export function subitems(collection, key) {
  return collection.filter((c) => c.data.parent === key && c.data.key).sort(sort("title"));
}

export function selected(item, itemKey, key) {
  return itemKey === key || item.sub?.some((i) => i.key === key);
}

// --- search index -------------------------------------------------------

const STOPWORDS = new Set(
  "a an and are as at be but by for from has have how i in is it its of on or that the this to was were what when where which who will with you your".split(
    " ",
  ),
);

// rendered HTML -> plain text (entities dropped, they only split words anyway)
function toText(html) {
  return (html || "").replace(/<[^>]+>/g, " ").replace(/&[#a-z0-9]+;/gi, " ");
}

function tokenize(text) {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length >= 2 && !STOPWORDS.has(t));
}

// Compact, ranked search index: meta + keywords (h2/h3 and inline code, i.e.
// the class and property names people search for) + a per-page "fingerprint"
// (top TF-IDF terms of the body). Code blocks are stripped as noise.
export function searchIndex(collection) {
  const docs = collection.map((doc) => {
    const html = (doc.templateContent || "").replace(/<pre[\s\S]*?<\/pre>/gi, " ");
    const keywords = html.match(/<h[23][^>]*>[\s\S]*?<\/h[23]>|<code>[\s\S]*?<\/code>/gi) || [];
    const tf = {};
    for (const t of tokenize(toText(html))) tf[t] = (tf[t] || 0) + 1;
    return { doc, tf, keywords: [...new Set(tokenize(toText(keywords.join(" "))))].join(" ") };
  });

  const df = {};
  for (const { tf } of docs) for (const t in tf) df[t] = (df[t] || 0) + 1;

  return docs.map(({ doc, tf, keywords }) => ({
    url: doc.url,
    title: doc.data.title,
    parent: doc.data.parent || "",
    keywords,
    summary: Object.keys(tf)
      .map((t) => [t, tf[t] * Math.log(docs.length / df[t])])
      .sort((a, b) => b[1] - a[1])
      .slice(0, 25)
      .map(([t]) => t)
      .join(" "),
  }));
}
