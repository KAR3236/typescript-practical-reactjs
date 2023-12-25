export interface AddEditBlogDataInterface {
  title: string;
  description: string;
  publised_date: string;
  modify_date: string;
  status: string;
  category: string;
  author: string;
}

export interface ActiveUserInterface {
  email: string;
  status: string;
}

export interface LoginDataInterface {
  email: string;
  password: string;
}
