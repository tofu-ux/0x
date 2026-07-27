# 0x component kit

`assets/components.css` is the optional, zero-dependency component layer. It
contains reusable primitives for product sites, documentation, and developer
tools. Every rule consumes variables from `assets/tokens.css`; no token is
re-derived.

```html
<link rel="stylesheet" href="assets/tokens.css">
<link rel="stylesheet" href="assets/components.css">
```

All public classes use the `h-` prefix. The stylesheet does not reset global
elements, so it can be added to an existing project without taking ownership of
unrelated markup.

## Inventory

| Group | Classes |
| --- | --- |
| Layout | `h-stack`, `h-cluster`, `h-grid` |
| Actions | `h-btn`, `h-btn-primary`, `h-btn-quiet`, `h-btn-danger`, `h-icon-btn`, `h-btn-group` |
| Fields | `h-field`, `h-label`, `h-help`, `h-error`, `h-input`, `h-select`, `h-textarea` |
| Choices | `h-checks`, `h-check`, `h-switch`, `h-switch-track` |
| Feedback | `h-badge`, `h-status-*`, `h-callout-*`, `h-progress-*` |
| Navigation | `h-breadcrumbs`, `h-tabs`, `h-tab`, `h-pagination`, `h-page-link` |
| Content | `h-card-*`, `h-data-list`, `h-table-wrap`, `h-table`, `h-empty`, `h-skeleton` |
| Disclosure | `h-details`, `h-summary`, `h-details-body`, `h-dialog-*` |

The [living showcase](index.html#components) renders the full inventory and
places copy-ready HTML beside every pattern.

## Behavior contract

- Buttons, icon buttons, inputs, and navigation targets have a 44px minimum
  interactive size.
- Focus is always visible and uses `--shine`.
- Form labels remain visible. Help and error text use `aria-describedby`.
- Validation state uses `aria-invalid="true"` in addition to color.
- Tabs use links with `aria-current="page"` for navigation. If tabs switch
  content in place, implement the full ARIA tab keyboard model instead.
- Horizontal tables live in a named, focusable `h-table-wrap` region.
- Callouts use `role="status"` only for polite dynamic updates and
  `role="alert"` only for urgent dynamic errors.
- Progress bars expose `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`.
- `details` and `dialog` retain their native elements and keyboard behavior.
- Skeleton motion stops under `prefers-reduced-motion: reduce`.

## JavaScript boundary

The component stylesheet has no JavaScript dependency. Native buttons,
controls, links, `details`, and `dialog` provide their own semantics.

A product that opens a dialog from an external button needs a small controller:

```js
const dialog = document.querySelector("#confirm");
const open = document.querySelector("[data-open-confirm]");

open?.addEventListener("click", () => dialog?.showModal());
dialog?.querySelector("[data-close]")?.addEventListener("click", () => dialog.close());
```

`assets/showcase.js` is documentation-site behavior for source-copy controls
and the dialog specimen. It is not part of the component package contract.

## Copy rules

Copy the semantic HTML from the showcase, not only the class names. Keep:

- the input's label and its matching `for`/`id`;
- accessible names on icon-only buttons and regions;
- `scope="col"` on table headers;
- `aria-current` on the active navigation item;
- explicit `type="button"` on non-submit buttons;
- native control elements instead of styled generic containers.

Replace sample text, URLs, IDs, and form names. Do not copy inline widths from
the progress and skeleton demos as fixed product values; set them from real
state.
