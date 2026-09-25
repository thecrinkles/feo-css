---
layout: base.njk
title: Flow
parent: layout
key: flow
github: true
---

The **Flow** layout creates consistent vertical spacing between consecutive sibling elements. Originally inspired by the "lobotomized owl" selector, this component uses the `* + *` pattern to add margin-top to all elements except the first child, ensuring consistent vertical rhythm throughout your content.

## Example

```html
<div class="flow" style="--layout-gap: 1.5rem">
  <h1>First element (no margin)</h1>
  <p>Second element (gets margin-top)</p>
  <p>Third element (gets margin-top)</p>
  <blockquote>Fourth element (gets margin-top)</blockquote>
</div>
```

## Custom Properties

<div class="scroll">
<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>--layout-gap</code></td>
      <td><code>1em</code></td>
      <td>Vertical spacing between elements. Set it on the <code>.flow</code> element; children that are layouts themselves keep this spacing.</td>
    </tr>
  </tbody>
</table>
</div>
