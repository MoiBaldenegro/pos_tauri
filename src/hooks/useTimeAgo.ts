const DATE_UNITS: Record<string, number> = {
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1,
};

const getSecondsDifference = (timestamp: Date): number => {
  if (!(timestamp instanceof Date)) {
    throw new Error("Timestamp inválido: debe ser un objeto Date");
  }
  return (Date.now() - timestamp.getTime()) / 1000;
};

const getUnitAndValueDate = (
  secondsElapsed: number
): { unit: string; value: number } | undefined => {
  for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
    if (secondsElapsed >= secondsInUnit || unit === "second") {
      const value = Math.floor(secondsElapsed / secondsInUnit) * -1;
      return { unit, value };
    }
  }
};

const useTimeAgo = (timestamp: Date, locale: string): string => {
  const rtf = new Intl.RelativeTimeFormat(locale);
  const secondsElapsed = getSecondsDifference(timestamp);
  const result = getUnitAndValueDate(secondsElapsed);

  if (result) {
    const { unit, value } = result;
    return rtf.format(value, unit as Intl.RelativeTimeFormatUnit);
  }

  return "";
};

export default useTimeAgo;
