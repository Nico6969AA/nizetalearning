<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep atomic configurations, representative nucleon mass numbers and sourced element properties in `src/data/atomic.ts`; derive educational views from this single source for all elements.
- Mount the atom viewer only after an element is selected and hydration completes; WebGL depends on browser APIs and should not alter server rendering.
- Keep deterministic close-packing and hydrogen-like cloud sampling in `src/data/atomic-view.ts`; separate testable geometry from React rendering and label the compressed educational scale.
