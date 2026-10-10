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
- Render sourced element properties through `ElementProperties`; explicitly label missing values, pressure exceptions and predicted states rather than filling gaps with invented measurements.
- Accounts use Supabase Auth with synthetic emails `<username>@nizeta.local`; never collect or surface a real email for password accounts. Registration inserts the `profiles` row first (unique `username_normalized` resolves races), then the auth user; roll back the profile row if the auth user fails.
- `custom_elements` is the per-account store for the personalized table; localStorage stays the anonymous fallback. On sign-in, merge with a union (local wins on equal `z`), never delete server rows during merge.
