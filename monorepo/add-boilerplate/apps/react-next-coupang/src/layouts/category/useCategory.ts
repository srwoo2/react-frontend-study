import { ICategory } from './category.model'

export const useCategory = () => {
  // API call

  return {
    category: {
      menus: [
        {
          bannerUrl: '',
          name: '패션의류/잡화',
          depth: {
            menus: [
              {
                name: '여성패션',
                depth: {
                  menus: [
                    {
                      name: '의류',
                      depth: {
                        menus: [
                          {
                            name: '의류',
                          },
                        ],
                      },
                    },
                    {
                      name: '속옷/잠옷',
                    },
                    {
                      name: '신발',
                    },
                    {
                      name: '가방/잡화',
                    },
                  ],
                },
              },
              {
                name: '남성패션',
                depth: {
                  menus: [
                    {
                      name: '의류',
                    },
                    {
                      name: '속옷/잠옷',
                    },
                    {
                      name: '신발',
                    },
                    {
                      name: '가방/잡화',
                    },
                  ],
                },
              },
              {
                name: '남녀 공용 의류',
              },
              {
                name: '유아동패션',
              },
            ],
          },
        },
        {
          name: '뷰티',
        },
        {
          name: '출산/유아동',
        },
        {
          name: '식품',
        },
        {
          name: '주방용품',
        },
        {
          name: '생활용품',
        },
        {
          name: '홈인테리어',
        },
        {
          name: '가전/디지털',
        },
        {
          name: '스포츠/레저',
        },
        {
          name: '자동차용품',
        },
        {
          name: '도서/음반/DVD',
        },
        {
          name: '완구/취미',
        },
        {
          name: '문구/오피스',
        },
        {
          name: '반려동물용품',
        },
        {
          name: '헬스/건강식품',
        },
        {
          name: '전통주',
          depth: {
            menus: [
              {
                name: '막걸리/탁주',
              },
              {
                name: '증류주',
              },
              {
                name: '약주/청주',
              },
              {
                name: '과실주',
              },
            ],
          },
        },
      ],
    } as ICategory,
  }
}
