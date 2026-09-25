// Client-side docs search: lazy-loads /search.json and ranks with TF-IDF.
// Each doc is precompiled to a bag of pre-weighted terms (tier x tf x idf),
// so a query score is just the sum of weights of the terms it hits.
// Wired via [data-search-*] hooks; no-ops on pages without a search input.
(function () {
  const input = document.querySelector("[data-search-input]");
  if (!input) return;

  const results = document.querySelector("[data-search-results]");
  const empty = document.querySelector("[data-search-empty]");
  const def = document.querySelector("[data-search-default]");

  // the search UI ships hidden: without JS it would be a dead input
  input.closest("search").hidden = false;

  // tier multipliers — retune ranking priority here (folded into the index)
  const WEIGHTS = { title: 1000, heading: 30, corpus: 1 };
  const STOP = new Set(
    "a an and are as at be but by for from has have how i in is it its of on or that this to the was were what when where which who will with you your".split(
      " ",
    ),
  );

  const tokenize = (s) =>
    (s || "")
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((t) => t.length >= 2 && !STOP.has(t));

  let docs = null; // [{ data, weight: { term: score } }]
  let loading = null;

  function buildIndex(data) {
    const df = {};
    const fielded = data.map((d) => {
      const f = {
        title: tokenize(d.title),
        heading: tokenize(d.keywords + " " + d.parent),
        corpus: tokenize(d.summary),
      };
      new Set([...f.title, ...f.heading, ...f.corpus]).forEach((t) => (df[t] = (df[t] || 0) + 1));
      return { data: d, f };
    });
    const N = fielded.length;
    const idf = (t) => Math.log(1 + N / (df[t] || 0.5));

    return fielded.map(({ data, f }) => {
      const weight = {};
      for (const tier in WEIGHTS) for (const t of f[tier]) weight[t] = (weight[t] || 0) + WEIGHTS[tier] * idf(t);
      return { data, weight };
    });
  }

  function search(query) {
    const q = tokenize(query);
    if (!q.length) return [];
    return docs
      .map((doc) => {
        let score = 0;
        // prefix hits (search-as-you-type) count half, so "index" ranks Z-Index over Indexed
        for (const term in doc.weight)
          if (q.includes(term)) score += doc.weight[term];
          else if (q.some((w) => term.startsWith(w))) score += doc.weight[term] / 2;
        return { data: doc.data, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map((r) => r.data);
  }

  function resultItem(d) {
    const li = document.createElement("li");
    li.className = "fl"; // feo's first-letter utility: "layout: Center" -> "Layout: Center"
    const a = document.createElement("a");
    a.href = d.url;
    a.textContent = d.parent ? `${d.parent}: ${d.title}` : d.title;
    li.append(a);
    return li;
  }

  function render(query) {
    const searching = query.trim() !== "";
    const matches = searching ? search(query) : [];
    results.replaceChildren(...matches.map(resultItem));
    results.hidden = matches.length === 0;
    empty.hidden = !searching || matches.length !== 0;
    def.hidden = searching;
  }

  function ensureIndex() {
    if (docs) return Promise.resolve(docs);
    if (loading) return loading;
    loading = fetch("/search.json")
      .then((r) => r.json())
      .then((data) => (docs = buildIndex(data)))
      .catch(() => ((loading = null), null));
    return loading;
  }

  let timer;
  input.addEventListener("input", () => {
    const val = input.value;
    clearTimeout(timer);
    timer = setTimeout(() => ensureIndex().then((d) => d && render(val)), 120);
  });
  input.addEventListener("focus", ensureIndex, { once: true });
})();
