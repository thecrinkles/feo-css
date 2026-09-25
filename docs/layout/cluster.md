---
layout: base.njk
title: Cluster
parent: layout
key: cluster
github: true
---

The **Cluster** layout groups items that automatically wrap to create clusters, such as tag clouds, button groups, or navigation elements. This component uses flexbox with wrapping enabled to create flexible groupings of related items that flow naturally based on available space.

{% include "svg/cluster.svg" %}

## Example

```html
<div class="cluster --justify-center" style="--layout-gap: 1rem">
  <button>Home</button>
  <button>About</button>
  <button>Services</button>
  <button>Contact</button>
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
      <td>Gap between child elements</td>
    </tr>
    <tr>
      <td><code>--layout-items</code></td>
      <td><code>center</code></td>
      <td>Align items on cross axis</td>
    </tr>
    <tr>
      <td><code>--layout-justify</code></td>
      <td><code>start</code></td>
      <td>Justify content on main axis</td>
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
      <td><code>.--start</code>, <code>.--end</code>, <code>.--center</code>, <code>.--stretch</code></td>
      <td>Controls cross-axis alignment of items</td>
    </tr>
    <tr>
      <td><code>.--justify-*</code></td>
      <td>Controls main-axis distribution of items (start, end, center, between, around)</td>
    </tr>
  </tbody>
</table>
</div>
