export type categoryType = {
  id: number;
  name: string;
}

export type imageType = {
  breeds: any[];
  categories: categoryType[];
  height: number;
  id: string;
  url: string;
  width: number;
}

export type sidebarType = {
  name: string;
  items: categoryType[];
}