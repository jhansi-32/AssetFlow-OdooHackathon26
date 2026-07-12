export interface ReportSummary {
  id: string;
  title: string;
  category: 'Department' | 'Maintenance' | 'Booking' | 'Asset';
  generatedAt: string;
  format: 'PDF' | 'XLSX' | 'CSV';
}

export interface ReportFilters {
  category?: ReportSummary['category'];
  dateFrom?: string;
  dateTo?: string;
}
