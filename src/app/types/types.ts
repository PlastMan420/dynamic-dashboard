export interface TablePage {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: TableData[];
  support: Support;
}

export interface TableData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface Support {
    url: string;
    text: string;
}

export interface UserDetails {
  data: TableData;
  support: Support;
}
