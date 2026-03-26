import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface AdminAnalyticsBillingHealth {
  totalPending: number;
  oldPending: number;
  waitingSignup: number;
  userNotFound: number;
}

export interface AdminAnalyticsKpis {
  totalUsers: number;
  newToday: number;
  newWeek: number;
  newCurrentWeek: number;
  avgStreak: number;
  maxStreak: number;
  activeUsers: number;
  usersWithoutStreak: number;
  premiumUsers: number;
  chargebacks: number;
  refunds: number;
  settled: number;
  renewalsTodayCount: number;
  baseUsers: number;
  freelancerUsers: number;
  aiHubUsers: number;
  completedDays: number;
  retention: number;
  activationRate: number;
  avgSessionMinutes: number;
  errorsInRange: number;
  avgErrorsPerDay: number;
}

export interface AdminAnalyticsUserGrowthPoint {
  date: string;
  novos: number;
  total: number;
  label: string;
}

export interface AdminAnalyticsBreakdownPoint {
  name: string;
  value: number;
  color: string;
  description: string;
}

export interface AdminAnalyticsLtvPoint {
  month: number;
  label: string;
  users: number;
  color: string;
}

export interface AdminAnalyticsEngagementPoint {
  name: string;
  value: number;
  fill: string;
}

export interface AdminAnalyticsBillingLog {
  id: string;
  email: string;
  event_type: string;
  status: string;
  processed: boolean | null;
  payload: Record<string, unknown> | null;
  created_at: string | null;
}

export interface AdminAnalyticsTopStreak {
  user_id: string;
  current_streak: number | null;
  longest_streak: number | null;
  last_activity_date: string | null;
  full_name: string;
}

export interface AdminAnalyticsPremiumUser {
  user_id: string;
  is_premium: boolean | null;
  plan_type: string | null;
  purchased_at: string | null;
  full_name: string;
  products: string[];
}

export interface AdminAnalyticsDashboardData {
  kpis: AdminAnalyticsKpis;
  charts: {
    userGrowth: AdminAnalyticsUserGrowthPoint[];
    productDistribution: { name: string; value: number; color: string }[];
    billingEvents: AdminAnalyticsBreakdownPoint[];
    ltvRetention: AdminAnalyticsLtvPoint[];
    engagement: AdminAnalyticsEngagementPoint[];
  };
  tables: {
    billingHealth: AdminAnalyticsBillingHealth;
    billingLogs: AdminAnalyticsBillingLog[];
    cancellations: AdminAnalyticsBillingLog[];
    topStreaks: AdminAnalyticsTopStreak[];
    premiumUsers: AdminAnalyticsPremiumUser[];
  };
}

export interface AdminMigrationReportData {
  startISO: string;
  accountsCreated: number;
  purchasesTotal: number;
  purchasesWithSignup: number;
  eventsWithoutSignup: number;
  recentRegistered: {
    email: string;
    user_id: string | null;
    created_at: string | null;
    status: string;
  }[];
  recentNoSignup: {
    email: string;
    user_id: string | null;
    created_at: string | null;
    status: string;
  }[];
}

const EMPTY_DASHBOARD_DATA: AdminAnalyticsDashboardData = {
  kpis: {
    totalUsers: 0,
    newToday: 0,
    newWeek: 0,
    newCurrentWeek: 0,
    avgStreak: 0,
    maxStreak: 0,
    activeUsers: 0,
    usersWithoutStreak: 0,
    premiumUsers: 0,
    chargebacks: 0,
    refunds: 0,
    settled: 0,
    renewalsTodayCount: 0,
    baseUsers: 0,
    freelancerUsers: 0,
    aiHubUsers: 0,
    completedDays: 0,
    retention: 0,
    activationRate: 0,
    avgSessionMinutes: 0,
    errorsInRange: 0,
    avgErrorsPerDay: 0,
  },
  charts: {
    userGrowth: [],
    productDistribution: [],
    billingEvents: [],
    ltvRetention: [],
    engagement: [],
  },
  tables: {
    billingHealth: {
      totalPending: 0,
      oldPending: 0,
      waitingSignup: 0,
      userNotFound: 0,
    },
    billingLogs: [],
    cancellations: [],
    topStreaks: [],
    premiumUsers: [],
  },
};

const toNumber = (value: unknown) => (typeof value === "number" && Number.isFinite(value) ? value : Number(value || 0));

const toStringArray = (value: unknown) =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];

const normalizeDashboardData = (data: unknown): AdminAnalyticsDashboardData => {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return EMPTY_DASHBOARD_DATA;
  }

  const raw = data as Partial<AdminAnalyticsDashboardData>;

  return {
    kpis: {
      ...EMPTY_DASHBOARD_DATA.kpis,
      ...(raw.kpis || {}),
      totalUsers: toNumber(raw.kpis?.totalUsers),
      newToday: toNumber(raw.kpis?.newToday),
      newWeek: toNumber(raw.kpis?.newWeek),
      newCurrentWeek: toNumber(raw.kpis?.newCurrentWeek),
      avgStreak: toNumber(raw.kpis?.avgStreak),
      maxStreak: toNumber(raw.kpis?.maxStreak),
      activeUsers: toNumber(raw.kpis?.activeUsers),
      usersWithoutStreak: toNumber(raw.kpis?.usersWithoutStreak),
      premiumUsers: toNumber(raw.kpis?.premiumUsers),
      chargebacks: toNumber(raw.kpis?.chargebacks),
      refunds: toNumber(raw.kpis?.refunds),
      settled: toNumber(raw.kpis?.settled),
      renewalsTodayCount: toNumber(raw.kpis?.renewalsTodayCount),
      baseUsers: toNumber(raw.kpis?.baseUsers),
      freelancerUsers: toNumber(raw.kpis?.freelancerUsers),
      aiHubUsers: toNumber(raw.kpis?.aiHubUsers),
      completedDays: toNumber(raw.kpis?.completedDays),
      retention: toNumber(raw.kpis?.retention),
      activationRate: toNumber(raw.kpis?.activationRate),
      avgSessionMinutes: toNumber(raw.kpis?.avgSessionMinutes),
      errorsInRange: toNumber(raw.kpis?.errorsInRange),
      avgErrorsPerDay: toNumber(raw.kpis?.avgErrorsPerDay),
    },
    charts: {
      userGrowth: Array.isArray(raw.charts?.userGrowth) ? raw.charts.userGrowth : [],
      productDistribution: Array.isArray(raw.charts?.productDistribution) ? raw.charts.productDistribution : [],
      billingEvents: Array.isArray(raw.charts?.billingEvents) ? raw.charts.billingEvents : [],
      ltvRetention: Array.isArray(raw.charts?.ltvRetention) ? raw.charts.ltvRetention : [],
      engagement: Array.isArray(raw.charts?.engagement) ? raw.charts.engagement : [],
    },
    tables: {
      billingHealth: {
        totalPending: toNumber(raw.tables?.billingHealth?.totalPending),
        oldPending: toNumber(raw.tables?.billingHealth?.oldPending),
        waitingSignup: toNumber(raw.tables?.billingHealth?.waitingSignup),
        userNotFound: toNumber(raw.tables?.billingHealth?.userNotFound),
      },
      billingLogs: Array.isArray(raw.tables?.billingLogs) ? raw.tables.billingLogs : [],
      cancellations: Array.isArray(raw.tables?.cancellations) ? raw.tables.cancellations : [],
      topStreaks: Array.isArray(raw.tables?.topStreaks) ? raw.tables.topStreaks : [],
      premiumUsers: Array.isArray(raw.tables?.premiumUsers)
        ? raw.tables.premiumUsers.map((user) => ({
            ...user,
            products: toStringArray(user.products),
          }))
        : [],
    },
  };
};

const normalizeMigrationReportData = (data: unknown): AdminMigrationReportData => {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return {
      startISO: "",
      accountsCreated: 0,
      purchasesTotal: 0,
      purchasesWithSignup: 0,
      eventsWithoutSignup: 0,
      recentRegistered: [],
      recentNoSignup: [],
    };
  }

  const raw = data as Partial<AdminMigrationReportData>;

  return {
    startISO: typeof raw.startISO === "string" ? raw.startISO : "",
    accountsCreated: toNumber(raw.accountsCreated),
    purchasesTotal: toNumber(raw.purchasesTotal),
    purchasesWithSignup: toNumber(raw.purchasesWithSignup),
    eventsWithoutSignup: toNumber(raw.eventsWithoutSignup),
    recentRegistered: Array.isArray(raw.recentRegistered) ? raw.recentRegistered : [],
    recentNoSignup: Array.isArray(raw.recentNoSignup) ? raw.recentNoSignup : [],
  };
};

export const formatAdminAnalyticsError = (error: unknown) =>
  error instanceof Error ? error.message : "Nao foi possivel carregar os dados administrativos.";

export const useAdminAnalyticsDashboard = (errorRangeDays = 7) =>
  useQuery({
    queryKey: ["admin-analytics-dashboard", errorRangeDays],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("admin-analytics-dashboard", {
        body: {
          mode: "dashboard",
          errorRangeDays,
        },
      });

      if (error) {
        throw error;
      }

      if (data?.error) {
        throw new Error(String(data.error));
      }

      return normalizeDashboardData(data);
    },
    staleTime: 300000,
    refetchOnMount: false,
    refetchInterval: 300000,
  });

export const useAdminMigrationReport = (startISO: string) =>
  useQuery({
    queryKey: ["admin-migration-report", startISO],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("admin-analytics-dashboard", {
        body: {
          mode: "migration",
          startISO,
        },
      });

      if (error) {
        throw error;
      }

      if (data?.error) {
        throw new Error(String(data.error));
      }

      return normalizeMigrationReportData(data);
    },
    staleTime: 300000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
