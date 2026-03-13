

## Problem

The `pending-signup` edge function returns `409 ALREADY_EXISTS` because the account for `Jessicamiller@educly.app` already exists in `auth.users`. The error handling in Auth.tsx and ThankYou.tsx correctly catches this and redirects to login, but the user then can't log in because they don't know their password (the account may have been created via admin tools or a previous attempt).

This creates a dead-end: can't create account (already exists) and can't log in (unknown password).

## Solution

Two changes to improve this flow:

### 1. Improve ALREADY_EXISTS handling in all signup flows

Instead of just showing a generic "you already have an account" toast and redirecting to login, offer a **password reset** option. When the user gets ALREADY_EXISTS:
- Show a more helpful toast/UI that says "Account already exists. If you forgot your password, use the 'Forgot password' option."
- Redirect to `/auth?email=...&tab=login` (already done) but auto-trigger the forgot password flow or highlight the reset option.

**Files to change:**
- `src/pages/Auth.tsx` (lines 211-218): Update the ALREADY_EXISTS handler to navigate with a `showReset=true` param
- `src/pages/ThankYou.tsx` (lines 253-260): Same change
- `src/pages/SignupFromEmail.tsx` (lines 127-129): Update to redirect to login with reset hint instead of just showing the "already have account" card

### 2. Fix the blank screen issue

The `pending-signup` edge function creates users with `email_confirm: false`. If the user tries to sign in after being created by `pending-signup`, Supabase may reject the login because the email isn't confirmed. This could cause an unhandled state leading to a blank screen.

**File to change:**
- `supabase/functions/pending-signup/index.ts` (line 90): Change `email_confirm: false` to `email_confirm: true` so users created via this flow can immediately log in.

### Summary of changes
1. **`supabase/functions/pending-signup/index.ts`**: Set `email_confirm: true`
2. **`src/pages/Auth.tsx`**: Improve ALREADY_EXISTS handler to suggest password reset
3. **`src/pages/ThankYou.tsx`**: Same improvement
4. **`src/pages/SignupFromEmail.tsx`**: Same improvement

