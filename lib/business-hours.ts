const CLINIC_TIMEZONE = "America/Belem"

type LocalTimeParts = {
  weekday: number
  hour: number
  minute: number
}

function getLocalTimeParts(date: Date, timeZone: string): LocalTimeParts {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })

  const parts = formatter.formatToParts(date)

  const weekdayShort = parts.find((part) => part.type === "weekday")?.value
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0")
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0")

  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  }

  return {
    weekday: weekdayMap[weekdayShort ?? "Sun"] ?? 0,
    hour,
    minute,
  }
}

export function isWithinBusinessHours(date = new Date(), timeZone = CLINIC_TIMEZONE): boolean {
  const { weekday, hour, minute } = getLocalTimeParts(date, timeZone)
  const totalMinutes = hour * 60 + minute

  // Segunda a sexta: 08:00 -> 19:00
  if (weekday >= 1 && weekday <= 5) {
    return totalMinutes >= 8 * 60 && totalMinutes < 19 * 60
  }

  // Sábado: 08:00 -> 12:00
  if (weekday === 6) {
    return totalMinutes >= 8 * 60 && totalMinutes < 12 * 60
  }

  // Domingo: fechado
  return false
}
