# Blog publishing setup

The portfolio uses Supabase Auth and Postgres for new articles. The public
Supabase key is intended for browser use; row-level security (RLS) protects
drafts and write operations. Never put a Supabase service-role key in a
`VITE_` variable.

## 1. Create the project and owner account

1. Create a Supabase project and add GitHub as an Authentication provider.
2. In GitHub OAuth app settings, set the callback URL to
   `https://dshgsglkmianyorkfsco.supabase.co/auth/v1/callback`.
3. Enter the GitHub OAuth client ID and secret in Supabase Authentication →
   Providers → GitHub, then enable the provider.
4. Add `http://localhost:5173/admin` and your deployed `/admin` URL to Supabase
   Authentication → URL Configuration → Redirect URLs.
5. Copy the project URL and publishable (or legacy `anon`) key from Project
   Settings → API.

## 2. Create the posts table

Open the SQL editor, verify the owner email in
[`supabase-schema.sql`](./supabase-schema.sql), then run the script. Public
roles can read only published posts. Only the matching authenticated owner
email can read drafts, insert, update, or delete.

The policies intentionally authorize by the verified JWT email instead of
`user_metadata.user_name`. Supabase users can edit their own user metadata, so
using that claim alone would let another account impersonate the author.

## 3. Configure the portfolio

The provided Supabase URL and publishable key are configured in `.env.local`,
which is ignored by Git. Set `VITE_ADMIN_EMAIL` and `VITE_SITE_URL` there if
they differ from the defaults. The admin email in the UI is not security
boundary; the database's RLS policies are the actual access control.

For deployment, add the same variables to the hosting provider's environment
settings and redeploy. Because Vite variables are embedded into the frontend,
only use the Supabase publishable/anon key there—never the service-role key.

## 4. Write and publish

Start the portfolio and visit `/admin`. Sign in with GitHub using the
authorized email, write Markdown, preview it, then choose **Save draft** or
**Publish**. Published posts appear in `/blog` and have portfolio-native detail
pages at `/blog/:slug`. The `/blog` page also contains the lazily mounted arcade.

Configure the GitHub OAuth provider and redirect allowlist in Supabase before
sign-in. Configure Vercel environment variables before deploying. Never put a
Supabase service-role key in the frontend.
