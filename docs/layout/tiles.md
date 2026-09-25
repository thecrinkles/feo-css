---
layout: base.njk
title: Tiles
parent: layout
key: tiles
github: true
---

The **Tiles** layout creates an auto-responsive grid system that determines column count based on minimum tile width. This component creates as many columns as can fit while respecting the minimum width constraint, making it perfect for image galleries, product grids, or any content that needs to automatically adjust its layout based on available space and content requirements.

{% include "svg/tiles.svg" %}

## Example

```html
<div class="tiles" style="--layout-gap: 1rem; --layout-threshold: 15rem">
  <div>Tile 1</div>
  <div>Tile 2</div>
  <div>Tile 3</div>
  <div>Tile 4</div>
  <div>Tile 5</div>
  <div>Tile 6</div>
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
      <td><code>--layout-threshold</code></td>
      <td><code>0</code></td>
      <td>Minimum width of each tile</td>
    </tr>
    <tr>
      <td><code>--tiles-repeat</code></td>
      <td><code>auto-fill</code></td>
      <td>Grid repeat function</td>
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
      <td><code>.--fit</code></td>
      <td>Uses auto-fit instead of auto-fill (collapses empty columns)</td>
    </tr>
  </tbody>
</table>
</div>
