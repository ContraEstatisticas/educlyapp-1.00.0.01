import { supabase } from "@/integrations/supabase/client";

export const FREELANCER_CERTIFICATE_TOOL_SLUG = "freelancer";
export const FREELANCER_CERTIFICATE_TYPE = "freelancer_completion";
export const FREELANCER_CERTIFICATE_TOTAL_MODULES = 14;

export const getExistingFreelancerCertificateId = async (): Promise<string | null> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("user_certificates")
    .select("id")
    .eq("user_id", user.id)
    .eq("tool_slug", FREELANCER_CERTIFICATE_TOOL_SLUG)
    .eq("certificate_type", FREELANCER_CERTIFICATE_TYPE)
    .maybeSingle();

  if (error) throw error;

  return data?.id ?? null;
};

export const generateOrFetchFreelancerCertificateId = async (): Promise<string | null> => {
  const existingId = await getExistingFreelancerCertificateId();
  if (existingId) return existingId;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) throw profileError;

  const fullName =
    profile?.full_name ||
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    "Student";

  const { data, error } = await supabase.rpc("generate_freelancer_certificate", {
    p_user_full_name: fullName,
  });

  if (error) throw error;

  return data ?? null;
};
