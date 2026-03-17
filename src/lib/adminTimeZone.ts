export const ADMIN_TIME_ZONE = "America/Sao_Paulo";
const ADMIN_UTC_OFFSET = "-03:00";

const ADMIN_DATE_KEY_FORMATTER = new Intl.DateTimeFormat("en-CA", {
  timeZone: ADMIN_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const getDateParts = (value: string | Date) => {
  const date = value instanceof Date ? value : new Date(value);

  return ADMIN_DATE_KEY_FORMATTER.formatToParts(date).reduce<Record<string, string>>((acc, part) => {
    if (part.type !== "literal") {
      acc[part.type] = part.value;
    }

    return acc;
  }, {});
};

const resolveAdminDisplayDate = (value: string | Date) => {
  if (value instanceof Date) return value;

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return new Date(`${value}T12:00:00${ADMIN_UTC_OFFSET}`);
  }

  return new Date(value);
};

export const getAdminDateKey = (value: string | Date = new Date()) => {
  const { year, month, day } = getDateParts(value);
  return `${year}-${month}-${day}`;
};

export const getAdminTodayKey = () => getAdminDateKey(new Date());

export const getAdminDayStartIso = (value: string | Date = new Date()) => {
  return new Date(`${getAdminDateKey(value)}T00:00:00${ADMIN_UTC_OFFSET}`).toISOString();
};

export const getAdminDayEndIso = (value: string | Date = new Date()) => {
  const start = new Date(getAdminDayStartIso(value));
  start.setUTCDate(start.getUTCDate() + 1);
  return start.toISOString();
};

export const getAdminDaysAgoStartIso = (daysAgo: number, baseValue: string | Date = new Date()) => {
  const start = new Date(getAdminDayStartIso(baseValue));
  start.setUTCDate(start.getUTCDate() - daysAgo);
  return start.toISOString();
};

export const getAdminDateKeysForLastDays = (days: number, baseValue: string | Date = new Date()) => {
  const todayStart = new Date(getAdminDayStartIso(baseValue));
  const keys: string[] = [];

  for (let index = days - 1; index >= 0; index -= 1) {
    const current = new Date(todayStart);
    current.setUTCDate(todayStart.getUTCDate() - index);
    keys.push(getAdminDateKey(current));
  }

  return keys;
};

export const formatAdminDateTime = (
  value: string | Date | null | undefined,
  locale = "pt-BR",
  options: Intl.DateTimeFormatOptions = {},
) => {
  if (!value) return "-";

  const date = resolveAdminDisplayDate(value);

  return new Intl.DateTimeFormat(locale, {
    timeZone: ADMIN_TIME_ZONE,
    ...options,
  }).format(date);
};

export const formatAdminDate = (
  value: string | Date | null | undefined,
  locale = "pt-BR",
  options: Intl.DateTimeFormatOptions = {},
) => {
  return formatAdminDateTime(value, locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...options,
  });
};
