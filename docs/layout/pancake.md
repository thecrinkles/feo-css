---
layout: base.njk
title: Pancake
parent: layout
key: pancake
github: true
---

The **Pancake** layout creates a three-layer layout pattern where the middle layer fills available space, commonly used for header/content/footer structures. This component uses CSS Grid to create a full-height layout with auto-sized header and footer sections while the content area expands to fill the remaining vertical space.

{% include "svg/pancake.svg" %}

## Example

```html
<div class="pancake" style="min-height: 100vh; --layout-gap: 1rem">
  <header>Header content</header>
  <main>Main content that fills available space</main>
  <footer>Footer content</footer>
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
      <td><code>0</code></td>
      <td>Gap between the three layers</td>
    </tr>
  </tbody>
</table>
</div>
