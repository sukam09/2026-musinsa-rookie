export const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI'] as const;

export const PERIODS = [1, 2, 3, 4, 5, 6] as const;

export const PERIOD_TIMES: Record<number, string> = {
  1: '09:00-10:30',
  2: '10:30-12:00',
  3: '12:00-13:30',
  4: '13:30-15:00',
  5: '15:00-16:30',
  6: '16:30-18:00',
};

export type Day = (typeof DAYS)[number];
export type Period = (typeof PERIODS)[number];
export type TimeSlot = `${Day}_${Period}`;

export function formatSchedule(slots: string[]): string {
  return slots
    .map(slot => {
      const [day, period] = slot.split('_');
      const dayKorean: Record<string, string> = {
        MON: '월',
        TUE: '화',
        WED: '수',
        THU: '목',
        FRI: '금',
      };
      return `${dayKorean[day]} ${PERIOD_TIMES[Number(period)]}`;
    })
    .join(', ');
}
