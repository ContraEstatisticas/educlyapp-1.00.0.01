import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ADMIN_TIME_ZONE = "America/Sao_Paulo";
const ADMIN_UTC_OFFSET = "-03:00";
const AUTH_USERS_PAGE_SIZE = 1000;
const BULK_FETCH_PAGE_SIZE = 1000;
const COMPLETED_PROGRESS_PAGE_SIZE = 1000;
const DEFAULT_ERROR_RANGE_DAYS = 7;
const DEFAULT_MIGRATION_START_ISO = "2026-01-16T00:00:00.000Z";

const ADMIN_DATE_KEY_FORMATTER = new Intl.DateTimeFormat("en-CA", {
  timeZone: ADMIN_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const SHORT_ADMIN_DATE_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  timeZone: ADMIN_TIME_ZONE,
  day: "2-digit",
  month: "2-digit",
});

const resolveAdminDisplayDate = (value: string | Date) => {
  if (value instanceof Date) return value;

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return new Date(`${value}T12:00:00${ADMIN_UTC_OFFSET}`);
  }

  return new Date(value);
};

const getDateParts = (value: string | Date) => {
  const date = resolveAdminDisplayDate(value);

  return ADMIN_DATE_KEY_FORMATTER.formatToParts(date).reduce<Record<string, string>>((acc, part) => {
    if (part.type !== "literal") {
      acc[part.type] = part.value;
    }

    return acc;
  }, {});
};

const getAdminDateKey = (value: string | Date = new Date()) => {
  const { year, month, day } = getDateParts(value);
  return `${year}-${month}-${day}`;
};

const getAdminDayStartIso = (value: string | Date = new Date()) => {
  return new Date(`${getAdminDateKey(value)}T00:00:00${ADMIN_UTC_OFFSET}`).toISOString();
};

const getAdminDayEndIso = (value: string | Date = new Date()) => {
  const start = new Date(getAdminDayStartIso(value));
  start.setUTCDate(start.getUTCDate() + 1);
  return start.toISOString();
};

const getAdminDaysAgoStartIso = (daysAgo: number, baseValue: string | Date = new Date()) => {
  const start = new Date(getAdminDayStartIso(baseValue));
  start.setUTCDate(start.getUTCDate() - daysAgo);
  return start.toISOString();
};

const getAdminCurrentWeekStartIso = (baseValue: string | Date = new Date()) => {
  const start = new Date(getAdminDayStartIso(baseValue));
  const daysSinceSunday = start.getUTCDay();
  start.setUTCDate(start.getUTCDate() - daysSinceSunday);
  return start.toISOString();
};

const formatShortAdminDate = (value: string | Date) => {
  return SHORT_ADMIN_DATE_FORMATTER.format(resolveAdminDisplayDate(value));
};

const normalizeBillingEmail = (email: string | null | undefined) =>
  (email || "").trim().replace(/\.+$/, "").toLowerCase();

const getBillingWebhookSource = (payload: Record<string, unknown> | null | undefined) =>
  typeof payload?._webhook_source === "string" ? payload._webhook_source.toLowerCase() : null;

const getBillingSubscription = (payload: Record<string, unknown> | null | undefined) =>
  (payload?.subscription as Record<string, unknown> | undefined) || undefined;

const getHotmartPurchase = (payload: Record<string, unknown> | null | undefined) => {
  const data = payload?.data as Record<string, unknown> | undefined;
  return (data?.purchase as Record<string, unknown> | undefined) || undefined;
};

const toNumberOrNull = (value: unknown) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;

  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
};

const getFunnelfoxIteration = (payload: Record<string, unknown> | null | undefined) =>
  toNumberOrNull(getBillingSubscription(payload)?.iteration);

const getHotmartRecurrenceNumber = (payload: Record<string, unknown> | null | undefined) =>
  toNumberOrNull(getHotmartPurchase(payload)?.recurrence_number);

const getHotmartTransactionId = (payload: Record<string, unknown> | null | undefined) => {
  const transactionId = getHotmartPurchase(payload)?.transaction;
  return typeof transactionId === "string" && transactionId.length > 0 ? transactionId : null;
};

const getHotmartApprovedDate = (payload: Record<string, unknown> | null | undefined) => {
  const approvedDate = getHotmartPurchase(payload)?.approved_date;
  return typeof approvedDate === "string" && approvedDate.length > 0 ? approvedDate : null;
};

const getHotmartOrderDate = (payload: Record<string, unknown> | null | undefined) => {
  const orderDate = getHotmartPurchase(payload)?.order_date;
  return typeof orderDate === "string" && orderDate.length > 0 ? orderDate : null;
};

const isBillingPaymentEvent = (eventType: string) => {
  const normalizedType = eventType.toUpperCase();
  return normalizedType.includes("SETTLED") ||
    normalizedType.includes("APPROVED") ||
    normalizedType.includes("COMPLETE");
};

const isManualBillingImport = (payload: Record<string, unknown> | null | undefined) =>
  getBillingWebhookSource(payload) === "manual_csv_import";

const fetchAllAuthEmails = async (
  // deno-lint-ignore no-explicit-any
  supabaseAdmin: any,
) => {
  const authEmails = new Set<string>();

  for (let page = 1; page <= 100; page += 1) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({
      page,
      perPage: AUTH_USERS_PAGE_SIZE,
    });

    if (error) throw error;

    const users = data?.users || [];

    users.forEach((user: { email?: string | null }) => {
      const normalizedEmail = normalizeBillingEmail(user.email);
      if (normalizedEmail) {
        authEmails.add(normalizedEmail);
      }
    });

    if (users.length < AUTH_USERS_PAGE_SIZE) {
      break;
    }
  }

  return authEmails;
};

const isHotmartBillingEvent = (event: { event_type: string; payload: Record<string, unknown> | null }) => {
  const payload = event.payload;
  const source = getBillingWebhookSource(payload);
  const purchase = getHotmartPurchase(payload);
  const normalizedType = event.event_type.toUpperCase();

  return !isManualBillingImport(payload) && (
    source === "hotmart" ||
    normalizedType.startsWith("PURCHASE_") ||
    !!purchase
  );
};

const getRenewalDedupKey = (
  event: {
    email: string | null;
    event_type: string;
    payload: Record<string, unknown> | null;
  },
  todayKey: string,
) => {
  const payload = event.payload;
  const normalizedEmail = normalizeBillingEmail(event.email);
  const source = getBillingWebhookSource(payload);

  if (isHotmartBillingEvent(event)) {
    const transactionId = getHotmartTransactionId(payload);
    if (transactionId) return `hotmart:tx:${transactionId}`;

    const approvedDate = getHotmartApprovedDate(payload);
    if (approvedDate) return `hotmart:approved:${normalizedEmail}:${approvedDate}`;

    const orderDate = getHotmartOrderDate(payload);
    if (orderDate) return `hotmart:order:${normalizedEmail}:${orderDate}`;

    const recurrenceNumber = getHotmartRecurrenceNumber(payload);
    if (recurrenceNumber) return `hotmart:email-recurrence:${normalizedEmail}:${recurrenceNumber}:${todayKey}`;

    return `hotmart:email-day:${normalizedEmail}:${todayKey}`;
  }

  const subscriptionId = getBillingSubscription(payload)?.id;
  if (typeof subscriptionId === "string" && subscriptionId.length > 0) {
    return `${source || "billing"}:subscription:${subscriptionId}`;
  }

  const iteration = getFunnelfoxIteration(payload);
  if (iteration) {
    return `${source || "billing"}:email-iteration:${normalizedEmail}:${iteration}:${todayKey}`;
  }

  return `${source || "billing"}:email-event:${normalizedEmail}:${event.event_type}:${todayKey}`;
};

const getMonthColor = (iteration: number): string => {
  const realMonth = iteration - 1;
  if (realMonth === 2) return "#4ade80";
  if (realMonth === 3) return "#22c55e";
  if (realMonth === 4) return "#16a34a";
  return "#15803d";
};

const getSupabaseAuthClient = (authHeader: string) =>
  createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } },
  );

const getSupabaseAdminClient = () =>
  createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Unknown error";

interface PagedQueryResult<T> {
  data: T[] | null;
  error: { message?: string } | null;
}

const fetchAllRows = async <T>(
  fetchPage: (from: number, to: number) => Promise<PagedQueryResult<T>>,
) => {
  const rows: T[] = [];
  let from = 0;

  while (true) {
    const to = from + BULK_FETCH_PAGE_SIZE - 1;
    const { data, error } = await fetchPage(from, to);

    if (error) {
      throw error;
    }

    const batch = data || [];
    rows.push(...batch);

    if (batch.length < BULK_FETCH_PAGE_SIZE) {
      break;
    }

    from += BULK_FETCH_PAGE_SIZE;
  }

  return rows;
};

const buildDashboardSnapshot = async (
  // deno-lint-ignore no-explicit-any
  supabaseAdmin: any,
  errorRangeDays: number,
) => {
  const rangeDays = Number.isFinite(errorRangeDays) && errorRangeDays > 0
    ? Math.floor(errorRangeDays)
    : DEFAULT_ERROR_RANGE_DAYS;

  const todayKey = getAdminDateKey();
  const yesterdayKey = getAdminDateKey(getAdminDaysAgoStartIso(1));
  const todayStartIso = getAdminDayStartIso();
  const tomorrowStartIso = getAdminDayEndIso();
  const lastSevenDaysStartIso = getAdminDaysAgoStartIso(6);
  const currentWeekStartIso = getAdminCurrentWeekStartIso();
  const thirtyDaysAgoStartIso = getAdminDaysAgoStartIso(29);
  const errorRangeStartIso = getAdminDaysAgoStartIso(rangeDays);
  const sevenDaysAgoKey = getAdminDateKey(lastSevenDaysStartIso);

  const [
    totalUsersResult,
    newTodayResult,
    newLastSevenDaysResult,
    newCurrentWeekResult,
    premiumUsersCountResult,
    chargebacksResult,
    refundsResult,
    errorsCountResult,
    billingLogsResult,
    cancellationsResult,
    topStreaksResult,
    premiumAccessResult,
  ] = await Promise.all([
    supabaseAdmin.from("profiles").select("id", { count: "exact", head: true }),
    supabaseAdmin
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .gte("created_at", todayStartIso)
      .lt("created_at", tomorrowStartIso),
    supabaseAdmin
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .gte("created_at", lastSevenDaysStartIso)
      .lt("created_at", tomorrowStartIso),
    supabaseAdmin
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .gte("created_at", currentWeekStartIso)
      .lt("created_at", tomorrowStartIso),
    supabaseAdmin
      .from("user_premium_access")
      .select("user_id", { count: "exact", head: true })
      .in("plan_type", ["premium", "base"]),
    supabaseAdmin
      .from("billing_event_logs")
      .select("id", { count: "exact", head: true })
      .ilike("event_type", "%chargeback%"),
    supabaseAdmin
      .from("billing_event_logs")
      .select("id", { count: "exact", head: true })
      .gte("created_at", errorRangeStartIso)
      .ilike("event_type", "%refund%"),
    supabaseAdmin
      .from("billing_event_logs")
      .select("id", { count: "exact", head: true })
      .eq("status", "error")
      .gte("created_at", errorRangeStartIso),
    supabaseAdmin
      .from("billing_event_logs")
      .select("id, email, event_type, status, processed, payload, created_at")
      .order("created_at", { ascending: false })
      .limit(30),
    supabaseAdmin
      .from("billing_event_logs")
      .select("id, email, event_type, status, processed, payload, created_at")
      .or("event_type.ilike.%chargeback%,event_type.ilike.%refund%,event_type.ilike.%cancel%,event_type.ilike.%dispute%")
      .order("created_at", { ascending: false })
      .limit(20),
    supabaseAdmin
      .from("user_streaks")
      .select("user_id, current_streak, longest_streak, last_activity_date")
      .filter("last_activity_date", "gte", yesterdayKey)
      .order("current_streak", { ascending: false })
      .limit(10),
    supabaseAdmin
      .from("user_premium_access")
      .select("user_id, is_premium, plan_type, purchased_at")
      .eq("is_premium", true)
      .order("purchased_at", { ascending: false })
      .limit(20),
  ]);

  const [
    profilesLastThirtyDays,
    streakData,
    billingEventsLastSevenDays,
    activeProducts,
    billingHealth,
    billingPaymentsForLtv,
  ] = await Promise.all([
    fetchAllRows<{ id: string; created_at: string | null }>((from, to) =>
      supabaseAdmin
        .from("profiles")
        .select("id, created_at")
        .gte("created_at", thirtyDaysAgoStartIso)
        .lt("created_at", tomorrowStartIso)
        .order("created_at", { ascending: true })
        .range(from, to)
    ),
    fetchAllRows<{
      user_id: string;
      current_streak: number | null;
      longest_streak: number | null;
      last_activity_date: string | null;
    }>((from, to) =>
      supabaseAdmin
        .from("user_streaks")
        .select("user_id, current_streak, longest_streak, last_activity_date")
        .order("user_id", { ascending: true })
        .range(from, to)
    ),
    fetchAllRows<{
      email: string | null;
      event_type: string;
      created_at: string | null;
      payload: Record<string, unknown> | null;
      status: string;
    }>((from, to) =>
      supabaseAdmin
        .from("billing_event_logs")
        .select("email, event_type, created_at, payload, status")
        .gte("created_at", lastSevenDaysStartIso)
        .order("created_at", { ascending: true })
        .range(from, to)
    ),
    fetchAllRows<{ user_id: string; product_type: string; is_active: boolean | null }>((from, to) =>
      supabaseAdmin
        .from("user_product_access")
        .select("user_id, product_type, is_active")
        .eq("is_active", true)
        .order("user_id", { ascending: true })
        .range(from, to)
    ),
    fetchAllRows<{ id: string; email: string | null; event_type: string; status: string; created_at: string | null }>((from, to) =>
      supabaseAdmin
        .from("billing_event_logs")
        .select("id, email, event_type, status, created_at")
        .eq("processed", false)
        .in("status", ["pending", "USER_NOT_FOUND"])
        .order("created_at", { ascending: false })
        .range(from, to)
    ),
    fetchAllRows<{
      email: string | null;
      event_type: string;
      payload: Record<string, unknown> | null;
      created_at: string | null;
    }>((from, to) =>
      supabaseAdmin
        .from("billing_event_logs")
        .select("email, event_type, payload, created_at")
        .order("created_at", { ascending: true })
        .range(from, to)
    ),
  ]);

  const dashboardErrors = [
    totalUsersResult.error,
    newTodayResult.error,
    newLastSevenDaysResult.error,
    newCurrentWeekResult.error,
    premiumUsersCountResult.error,
    chargebacksResult.error,
    refundsResult.error,
    errorsCountResult.error,
    billingLogsResult.error,
    cancellationsResult.error,
    topStreaksResult.error,
    premiumAccessResult.error,
  ].filter(Boolean);

  if (dashboardErrors.length > 0) {
    throw dashboardErrors[0];
  }

  const totalUsers = Number(totalUsersResult.count || 0);
  const newToday = Number(newTodayResult.count || 0);
  const newWeek = Number(newLastSevenDaysResult.count || 0);
  const newCurrentWeek = Number(newCurrentWeekResult.count || 0);
  const premiumUsers = Number(premiumUsersCountResult.count || 0);
  const chargebacks = Number(chargebacksResult.count || 0);
  const refunds = Number(refundsResult.count || 0);
  const errorsInRange = Number(errorsCountResult.count || 0);
  const billingLogs = billingLogsResult.data || [];
  const cancellations = cancellationsResult.data || [];
  const topStreaks = topStreaksResult.data || [];
  const premiumAccess = premiumAccessResult.data || [];

  const processedStreaks = streakData.map((streak: {
    user_id: string;
    current_streak: number | null;
    longest_streak: number | null;
    last_activity_date: string | null;
  }) => ({
    ...streak,
    current_streak: streak.last_activity_date && streak.last_activity_date >= yesterdayKey
      ? Number(streak.current_streak || 0)
      : 0,
  }));

  const actuallyActiveStreaks = processedStreaks.filter(s => s.current_streak > 0);

  const avgStreak = actuallyActiveStreaks.length
    ? Number(
        (
          actuallyActiveStreaks.reduce(
            (acc: number, streak) => acc + streak.current_streak,
            0,
          ) / actuallyActiveStreaks.length
        ).toFixed(1),
      )
    : 0;

  const maxStreak = streakData.length
    ? Math.max(...streakData.map((streak: { longest_streak: number | null }) => Number(streak.longest_streak || 0)))
    : 0;

  const usersWithCompletedDays = new Set<string>();
  const usersActiveInLast7Days = new Set<string>();
  let completedDays = 0;
  let completedProgressFrom = 0;

  while (true) {
    const { data: completedProgressBatch, error: completedProgressError } = await supabaseAdmin
      .from("user_day_progress")
      .select("user_id, completed_at")
      .eq("completed", true)
      .range(completedProgressFrom, completedProgressFrom + COMPLETED_PROGRESS_PAGE_SIZE - 1);

    if (completedProgressError) throw completedProgressError;

    completedDays += completedProgressBatch?.length || 0;

    completedProgressBatch?.forEach((row: { user_id: string | null; completed_at: string | null }) => {
      if (row.user_id) {
        usersWithCompletedDays.add(row.user_id);

        if (
          row.completed_at &&
          row.completed_at >= lastSevenDaysStartIso &&
          row.completed_at < tomorrowStartIso
        ) {
          usersActiveInLast7Days.add(row.user_id);
        }
      }
    });

    if (!completedProgressBatch || completedProgressBatch.length < COMPLETED_PROGRESS_PAGE_SIZE) {
      break;
    }

    completedProgressFrom += COMPLETED_PROGRESS_PAGE_SIZE;
  }

  const usersWithoutStreak = Math.max(totalUsers - usersWithCompletedDays.size, 0);
  const activeUsers = usersActiveInLast7Days.size;
  const activationRate = totalUsers > 0
    ? Number(((usersWithCompletedDays.size / totalUsers) * 100).toFixed(1))
    : 0;
  const retention = totalUsers > 0
    ? Number(((activeUsers / totalUsers) * 100).toFixed(1))
    : 0;

  const billingEventsChart = [
    {
      name: "Pagamentos",
      value: billingPaymentsForLtv.filter((event: { event_type: string }) => isBillingPaymentEvent(event.event_type)).length,
      color: "#10b981",
      description: "SETTLED + PURCHASE_APPROVED + PURCHASE_COMPLETE",
    },
    {
      name: "Trials",
      value: billingPaymentsForLtv.filter((event: { event_type: string }) => event.event_type.toUpperCase().includes("TRIAL")).length,
      color: "#3b82f6",
      description: "STARTING_TRIAL",
    },
    {
      name: "Chargebacks",
      value: billingPaymentsForLtv.filter((event: { event_type: string }) => event.event_type.toUpperCase().includes("CHARGEBACK")).length,
      color: "#ef4444",
      description: "PURCHASE_CHARGEBACK",
    },
    {
      name: "Reembolsos",
      value: billingPaymentsForLtv.filter((event: { event_type: string }) => event.event_type.toUpperCase().includes("REFUND")).length,
      color: "#f59e0b",
      description: "PURCHASE_REFUNDED",
    },
    {
      name: "Concessoes",
      value: billingPaymentsForLtv.filter((event: { event_type: string }) => event.event_type.toUpperCase() === "GRANTED").length,
      color: "#8b5cf6",
      description: "GRANTED (acesso concedido manualmente)",
    },
  ].filter((item) => item.value > 0);

  const todayPaymentEvents = billingEventsLastSevenDays.filter((event: {
    created_at: string | null;
    event_type: string;
  }) =>
    event.created_at &&
    getAdminDateKey(event.created_at) === todayKey &&
    isBillingPaymentEvent(event.event_type)
  );

  const todayHotmartEvents = todayPaymentEvents.filter((event: {
    event_type: string;
    payload: Record<string, unknown> | null;
  }) => isHotmartBillingEvent(event));

  const todayHotmartRawEmails = Array.from(
    new Set(
      todayHotmartEvents
        .map((event: { email: string | null }) => event.email)
        .filter((email: string | null): email is string => typeof email === "string" && email.length > 0),
    ),
  );

  let priorHotmartPaymentEmails = new Set<string>();

  if (todayHotmartRawEmails.length > 0) {
    const hotmartHistoryLookbackStart = getAdminDaysAgoStartIso(365);
    const { data: priorHotmartEvents, error: priorHotmartEventsError } = await supabaseAdmin
      .from("billing_event_logs")
      .select("email, event_type, created_at, payload, status")
      .in("email", todayHotmartRawEmails)
      .lt("created_at", todayStartIso)
      .gte("created_at", hotmartHistoryLookbackStart);

    if (priorHotmartEventsError) throw priorHotmartEventsError;

    priorHotmartPaymentEmails = new Set(
      ((priorHotmartEvents as {
        email: string | null;
        event_type: string;
        payload: Record<string, unknown> | null;
      }[] | null) || [])
        .filter((event) => isHotmartBillingEvent(event) && isBillingPaymentEvent(event.event_type))
        .map((event) => normalizeBillingEmail(event.email))
        .filter(Boolean),
    );
  }

  const renewalKeys = new Set<string>();

  todayPaymentEvents.forEach((event: {
    email: string | null;
    event_type: string;
    payload: Record<string, unknown> | null;
  }) => {
    const payload = event.payload;
    if (isManualBillingImport(payload)) return;

    const funnelfoxIteration = getFunnelfoxIteration(payload);
    if (funnelfoxIteration && funnelfoxIteration > 1) {
      renewalKeys.add(getRenewalDedupKey(event, todayKey));
      return;
    }

    if (!isHotmartBillingEvent(event)) return;

    const hotmartRecurrence = getHotmartRecurrenceNumber(payload);
    if (hotmartRecurrence && hotmartRecurrence > 1) {
      renewalKeys.add(getRenewalDedupKey(event, todayKey));
      return;
    }

    if (
      hotmartRecurrence == null &&
      priorHotmartPaymentEmails.has(normalizeBillingEmail(event.email))
    ) {
      renewalKeys.add(getRenewalDedupKey(event, todayKey));
    }
  });

  const renewalsTodayCount = renewalKeys.size;
  const settled = billingPaymentsForLtv.filter((event: { event_type: string }) =>
    isBillingPaymentEvent(event.event_type)
  ).length;

  const productUsers = {
    base: new Set<string>(),
    freelancer: new Set<string>(),
    ai_hub: new Set<string>(),
  };

  activeProducts.forEach((product: { user_id: string; product_type: string }) => {
    const type = product.product_type;
    if (type === "base" || type === "freelancer" || type === "ai_hub") {
      productUsers[type].add(product.user_id);
    }
  });

  const productDistribution = [
    { name: "Base", value: productUsers.base.size, color: "#10b981" },
    { name: "Freelancer", value: productUsers.freelancer.size, color: "#3b82f6" },
    { name: "AI Hub", value: productUsers.ai_hub.size, color: "#8b5cf6" },
  ].filter((item) => item.value > 0);

  const avgFirstSessionResponse = await supabaseAdmin.rpc("get_avg_first_session_minutes");
  if (avgFirstSessionResponse.error) throw avgFirstSessionResponse.error;

  const avgSessionMinutes = avgFirstSessionResponse.data
    ? Number(Number(avgFirstSessionResponse.data).toFixed(1))
    : 0;

  const avgErrorsPerDay = Number((errorsInRange / rangeDays).toFixed(2));

  const userGrowthByDate = new Map<string, number>();
  for (let index = 29; index >= 0; index -= 1) {
    const dateKey = getAdminDateKey(getAdminDaysAgoStartIso(index));
    userGrowthByDate.set(dateKey, 0);
  }

  profilesLastThirtyDays.forEach((profile: { created_at: string | null }) => {
    if (!profile.created_at) return;
    const dateKey = getAdminDateKey(profile.created_at);
    if (userGrowthByDate.has(dateKey)) {
      userGrowthByDate.set(dateKey, Number(userGrowthByDate.get(dateKey) || 0) + 1);
    }
  });

  let cumulativeUsers = 0;
  const userGrowth = Array.from(userGrowthByDate.entries()).map(([date, novos]) => {
    cumulativeUsers += novos;
    return {
      date,
      novos,
      total: cumulativeUsers,
      label: formatShortAdminDate(date),
    };
  });

  const ltvMonthCounts = new Map<number, Set<string>>();

  billingPaymentsForLtv.forEach((event: {
    email: string | null;
    event_type: string;
    payload: Record<string, unknown> | null;
  }) => {
    const eventType = event.event_type.toUpperCase();
    if (
      !eventType.includes("SETTLED") &&
      !eventType.includes("APPROVED") &&
      !eventType.includes("COMPLETE") &&
      !eventType.includes("RENEWING") &&
      !eventType.includes("RECOVERING")
    ) {
      return;
    }

    const normalizedEmail = normalizeBillingEmail(event.email);
    if (!normalizedEmail) return;

    let iteration = 1;
    const funnelfoxIteration = getFunnelfoxIteration(event.payload);
    const hotmartRecurrence = getHotmartRecurrenceNumber(event.payload);

    if (funnelfoxIteration) {
      iteration = funnelfoxIteration;
    } else if (hotmartRecurrence) {
      iteration = hotmartRecurrence;
    }

    if (iteration < 2) return;

    if (!ltvMonthCounts.has(iteration)) {
      ltvMonthCounts.set(iteration, new Set<string>());
    }

    ltvMonthCounts.get(iteration)?.add(normalizedEmail);
  });

  const ltvRetention = Array.from(ltvMonthCounts.entries())
    .sort(([a], [b]) => a - b)
    .map(([iteration, emails]) => ({
      month: iteration,
      label: `Mes ${iteration - 1}`,
      users: emails.size,
      color: getMonthColor(iteration),
    }));

  const streakDistribution = {
    "0 dias": 0,
    "1-3 dias": 0,
    "4-7 dias": 0,
    "8-14 dias": 0,
    "15+ dias": 0,
  };

  processedStreaks.forEach((streak) => {
    const value = streak.current_streak;
    if (value === 0) streakDistribution["0 dias"] += 1;
    else if (value <= 3) streakDistribution["1-3 dias"] += 1;
    else if (value <= 7) streakDistribution["4-7 dias"] += 1;
    else if (value <= 14) streakDistribution["8-14 dias"] += 1;
    else streakDistribution["15+ dias"] += 1;
  });

  const engagement = [
    { name: "0 dias", value: streakDistribution["0 dias"], fill: "#ef4444" },
    { name: "1-3 dias", value: streakDistribution["1-3 dias"], fill: "#f59e0b" },
    { name: "4-7 dias", value: streakDistribution["4-7 dias"], fill: "#3b82f6" },
    { name: "8-14 dias", value: streakDistribution["8-14 dias"], fill: "#10b981" },
    { name: "15+ dias", value: streakDistribution["15+ dias"], fill: "#8b5cf6" },
  ];

  const topStreakUserIds = topStreaks.map((streak: { user_id: string }) => streak.user_id);
  const premiumUserIds = premiumAccess.map((user: { user_id: string }) => user.user_id);
  const profileIds = Array.from(new Set([...topStreakUserIds, ...premiumUserIds]));

  const profileNamesById = new Map<string, string>();
  if (profileIds.length > 0) {
    const { data: profiles, error: profilesError } = await supabaseAdmin
      .from("profiles")
      .select("id, full_name")
      .in("id", profileIds);

    if (profilesError) throw profilesError;

    profiles?.forEach((profile: { id: string; full_name: string | null }) => {
      profileNamesById.set(profile.id, profile.full_name || "Usuario");
    });
  }

  const productsByUserId = new Map<string, string[]>();
  activeProducts.forEach((product: { user_id: string; product_type: string }) => {
    const currentProducts = productsByUserId.get(product.user_id) || [];
    currentProducts.push(product.product_type);
    productsByUserId.set(product.user_id, currentProducts);
  });

  const premiumUsersTable = premiumAccess.map((user: {
    user_id: string;
    is_premium: boolean | null;
    plan_type: string | null;
    purchased_at: string | null;
  }) => ({
    ...user,
    full_name: profileNamesById.get(user.user_id) || "Usuario",
    products: productsByUserId.get(user.user_id) || [],
  }));

  const topStreaksTable = topStreaks.map((streak: {
    user_id: string;
    current_streak: number | null;
    longest_streak: number | null;
    last_activity_date: string | null;
  }) => ({
    ...streak,
    full_name: profileNamesById.get(streak.user_id) || "Usuario",
  }));

  let waitingSignup = 0;
  if (billingHealth.length > 0) {
    const authEmails = await fetchAllAuthEmails(supabaseAdmin);
    const pendingEmailsWithoutAccount = new Set(
      billingHealth
        .map((row: { email: string | null }) => normalizeBillingEmail(row.email))
        .filter((email): email is string => Boolean(email) && !authEmails.has(email)),
    );

    waitingSignup = pendingEmailsWithoutAccount.size;
  }

  const now = new Date();
  const oldPending = billingHealth.filter((row: { created_at: string | null }) => {
    if (!row.created_at) return false;
    const createdAt = new Date(row.created_at);
    const hoursAgo = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
    return hoursAgo > 24;
  }).length;

  const billingHealthSummary = {
    totalPending: billingHealth.length,
    oldPending,
    waitingSignup,
    userNotFound: billingHealth.filter((row: { status: string }) => row.status === "USER_NOT_FOUND").length,
  };

  return {
    kpis: {
      totalUsers,
      newToday,
      newWeek,
      newCurrentWeek,
      avgStreak,
      maxStreak,
      activeUsers,
      usersWithoutStreak,
      premiumUsers,
      chargebacks,
      refunds,
      settled,
      renewalsTodayCount,
      baseUsers: productUsers.base.size,
      freelancerUsers: productUsers.freelancer.size,
      aiHubUsers: productUsers.ai_hub.size,
      completedDays,
      retention,
      activationRate,
      avgSessionMinutes,
      errorsInRange,
      avgErrorsPerDay,
    },
    charts: {
      userGrowth,
      productDistribution,
      billingEvents: billingEventsChart,
      ltvRetention,
      engagement,
    },
    tables: {
      billingHealth: billingHealthSummary,
      billingLogs,
      cancellations,
      topStreaks: topStreaksTable,
      premiumUsers: premiumUsersTable,
    },
  };
};

const buildMigrationReport = async (
  // deno-lint-ignore no-explicit-any
  supabaseAdmin: any,
  startISO: string | null | undefined,
) => {
  const normalizedStartISO = typeof startISO === "string" && !Number.isNaN(Date.parse(startISO))
    ? startISO
    : DEFAULT_MIGRATION_START_ISO;

  const purchaseEventTypes = ["PURCHASE_COMPLETE", "SETTLED", "settled"];

  const [
    accountsCreatedResult,
    purchasesTotalResult,
    purchasesWithSignupResult,
    eventsWithoutSignupResult,
    recentRegisteredResult,
    recentNoSignupResult,
  ] = await Promise.all([
    supabaseAdmin
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .gte("created_at", normalizedStartISO),
    supabaseAdmin
      .from("billing_event_logs")
      .select("id", { count: "exact", head: true })
      .gte("created_at", normalizedStartISO)
      .in("event_type", purchaseEventTypes),
    supabaseAdmin
      .from("billing_event_logs")
      .select("id", { count: "exact", head: true })
      .gte("created_at", normalizedStartISO)
      .in("event_type", purchaseEventTypes)
      .not("user_id", "is", null),
    supabaseAdmin
      .from("billing_event_logs")
      .select("id", { count: "exact", head: true })
      .gte("created_at", normalizedStartISO)
      .in("event_type", purchaseEventTypes)
      .eq("status", "USER_NOT_FOUND"),
    supabaseAdmin
      .from("billing_event_logs")
      .select("email, user_id, created_at, status")
      .gte("created_at", normalizedStartISO)
      .in("event_type", purchaseEventTypes)
      .not("user_id", "is", null)
      .order("created_at", { ascending: false })
      .limit(50),
    supabaseAdmin
      .from("billing_event_logs")
      .select("email, user_id, created_at, status")
      .gte("created_at", normalizedStartISO)
      .in("event_type", purchaseEventTypes)
      .eq("status", "USER_NOT_FOUND")
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  const migrationErrors = [
    accountsCreatedResult.error,
    purchasesTotalResult.error,
    purchasesWithSignupResult.error,
    eventsWithoutSignupResult.error,
    recentRegisteredResult.error,
    recentNoSignupResult.error,
  ].filter(Boolean);

  if (migrationErrors.length > 0) {
    throw migrationErrors[0];
  }

  return {
    startISO: normalizedStartISO,
    accountsCreated: Number(accountsCreatedResult.count || 0),
    purchasesTotal: Number(purchasesTotalResult.count || 0),
    purchasesWithSignup: Number(purchasesWithSignupResult.count || 0),
    eventsWithoutSignup: Number(eventsWithoutSignupResult.count || 0),
    recentRegistered: recentRegisteredResult.data || [],
    recentNoSignup: recentNoSignupResult.data || [],
  };
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAuth = getSupabaseAuthClient(authHeader);
    const { data: isAdmin, error: isAdminError } = await supabaseAuth.rpc("is_admin");

    if (isAdminError) {
      throw isAdminError;
    }

    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Forbidden: admin only" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));
    const mode = typeof body?.mode === "string" ? body.mode : "dashboard";
    const supabaseAdmin = getSupabaseAdminClient();

    if (mode === "migration") {
      const report = await buildMigrationReport(supabaseAdmin, body?.startISO);

      return new Response(JSON.stringify(report), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const snapshot = await buildDashboardSnapshot(
      supabaseAdmin,
      Number(body?.errorRangeDays ?? DEFAULT_ERROR_RANGE_DAYS),
    );

    return new Response(JSON.stringify(snapshot), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error in admin-analytics-dashboard:", error);

    return new Response(JSON.stringify({ error: getErrorMessage(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
