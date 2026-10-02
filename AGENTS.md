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

- Keep atomic configuration and representative mass data in `src/data/atomic.ts`; derive educational particle/orbital views from it so all 118 elements share one source.
- Mount the atom viewer only after an element is selected and hydration completes; WebGL depends on browser APIs and should not alter server rendering.
