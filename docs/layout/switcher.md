---
layout: base.njk
title: Switcher
parent: layout
key: switcher
github: true
---

The **Switcher** layout creates a multi-column layout that switches from horizontal to vertical when children become too narrow. This component uses a clever flexbox technique to automatically wrap based on child element minimum width, making it perfect for responsive card layouts, form sections, or any content that needs to gracefully transition between horizontal and vertical arrangements based on available space.

{% include "svg/switcher.svg" %}

## Example

```html
<div class="switcher" style="--layout-gap: 1rem; --layout-threshold: 20rem">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
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
      <td><code>--layout-direction</code></td>
      <td><code>row</code></td>
      <td>Flex direction</td>
    </tr>
    <tr>
      <td><code>--layout-gap</code></td>
      <td><code>0</code></td>
      <td>Gap between child elements</td>
    </tr>
    <tr>
      <td><code>--layout-items</code></td>
      <td><code>stretch</code></td>
      <td>Align items on cross axis</td>
    </tr>
    <tr>
      <td><code>--layout-justify</code></td>
      <td><code>start</code></td>
      <td>Justify content on main axis</td>
    </tr>
    <tr>
      <td><code>--layout-threshold</code></td>
      <td><code>0</code></td>
      <td>Minimum width of each child element before wrapping</td>
    </tr>
  </tbody>
</table>
</div>

## Class Utilities

<div class="scroll">
<table>
  <thead>
    <tr>
      <th>Class</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>.--column</code>, <code>.--row</code></td>
      <td>Controls the flex direction</td>
    </tr>
    <tr>
      <td><code>.--start</code>, <code>.--end</code>, <code>.--center</code>, <code>.--stretch</code></td>
      <td>Controls cross-axis alignment of items</td>
    </tr>
    <tr>
      <td><code>.--justify-*</code></td>
      <td>Controls main-axis distribution of items (start, end, center, between, around)</td>
    </tr>
    <tr>
      <td><code>.--fixed</code></td>
      <td>Prevents children from growing, centers them instead</td>
    </tr>
    <tr>
      <td><code>.counted</code></td>
      <td>Works with .counted utility to calculate threshold based on child count</td>
    </tr>
  </tbody>
</table>
</div>
