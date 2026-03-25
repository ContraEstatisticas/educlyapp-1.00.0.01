ALTER VIEW public.user_session_details SET (security_invoker = on);

CREATE POLICY "Admins can view session details"
ON public.user_sessions
FOR SELECT
TO authenticated
USING (public.is_admin());