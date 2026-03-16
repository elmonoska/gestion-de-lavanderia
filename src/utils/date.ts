import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
} from "date-fns";
import { es } from "date-fns/locale";

const createDate = (dateStr: string): Date => new Date(dateStr);

export const formatDateForSupabase = (date: Date): string => date.toISOString();

export const formatDateToDDMMYY = (dateStr: string) => {
  const date = createDate(dateStr);
  return format(date, "dd/MM/yy", {locale: es});
};

export const formatDateToDDMMYYHHMM = (dateStr: string) => {
  const date = createDate(dateStr);
  return format(date, "dd/MM/yy hh:mm a", {locale: es});
};

export const getDateRangeByType = (
  type: string,
): { from: string; to: string } => {
  const now = new Date();

  // dia de la semana empieza por lunes
  const weekOptions = { weekStartsOn: 1 as const };

  switch (type) {
    case "today": {
      return {
        from: startOfDay(now).toISOString(),
        to: endOfDay(now).toISOString(),
      };
    }

    case "yesterday": {
      const yesterday = subDays(now, 1);
      return {
        from: startOfDay(yesterday).toISOString(),
        to: endOfDay(yesterday).toISOString(),
      };
    }

    case "week": {
      return {
        from: startOfWeek(now, weekOptions).toISOString(),
        to: endOfWeek(now, weekOptions).toISOString(),
      };
    }

    case "lastweek": {
      const pastWeek = subWeeks(now, 1);
      return {
        from: startOfWeek(pastWeek, weekOptions).toISOString(),
        to: endOfWeek(pastWeek, weekOptions).toISOString(),
      };
    }

    case "month": {
      return {
        from: startOfMonth(now).toISOString(),
        to: endOfMonth(now).toISOString(),
      };
    }

    case "lastmonth": {
      const pastMonth = subMonths(now, 1);
      return {
        from: startOfMonth(pastMonth).toISOString(),
        to: endOfMonth(pastMonth).toISOString(),
      };
    }

    default:
      return {
        from: startOfDay(now).toISOString(),
        to: endOfDay(now).toISOString(),
      };
  }
};

export const getCustomDateRange = (
  from: string,
  to: string,
): { from: string; to: string } => {
  const fromDate = parseISO(from);
  const toDate = parseISO(to);
  return {
    from: startOfDay(fromDate).toISOString(),
    to: startOfDay(toDate).toISOString(),
  }
};
