---
layout: base.njk
title: Repel
parent: layout
key: repel
github: true
---

The **Repel** layout distributes items with space-between, pushing them to opposite ends of the container. This component creates a layout where items are pushed apart with equal space between them, making it ideal for navigation bars, toolbars, or any interface where you need to separate content groups while maintaining alignment.

{% include "svg/repel.svg" %}

## Example

```html
<div class="repel --center" style="--layout-gap: 1rem">
  <div class="logo">Brand Logo</div>
  <nav>
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </nav>
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
  </tbody>
</table>
</div>
