export interface ICategory {
  menus: ICategoryMenu[]
}

export interface ICategoryMenu {
  name: string
  url?: string
  depth?: ICategory
  bannerUrl?: string
}
