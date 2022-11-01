
export class CsvFinancySummary {
  date: string;
  total: string;
  cash: string;
  card: string;
  installmentPlan: string;
  entrada: string;
  saidas: string;
  constructor(date: string, total: number, cash: number, card: number, installmentPlan: number, entrada: number, saidas: number) {
    this.date = date;
    this.total = total.toFixed(2);
    this.cash = cash.toFixed(2);
    this.card = card.toFixed(2);
    this.installmentPlan = installmentPlan.toFixed(2);
    this.entrada = entrada.toFixed(2);
    this.saidas = saidas.toFixed(2);
  }

  static header(): string[] {
    return ['date', 'total', 'cash', 'card', 'installmentPlan', 'entrada', 'saidas'];
  }
}
