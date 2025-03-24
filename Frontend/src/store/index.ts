import { createPinia, defineStore } from 'pinia'
import { ref } from 'vue'

const pinia = createPinia()

// Интерфейсы для карточек туров
export interface ICard {
  id: number
  title: string
  description: string
  image: string
  price: number
  rating: number
  location: string
  images: string[]
  includes: string[]
}

export interface ITour {
  id: number
  title: string
  description: string
  price: number
  images: string[]
  dates: string[]
  duration: string
  includes: string[]
  excludes: string[]
  programDays: { 
    day: number
    title: string
    description: string
    activities: string[]
  }[]
}

// Интерфейс для данных об оплате
export interface IPaymentInfo {
  cardNumber: string
  cardholderName: string
  expiryDate: string
  cvv: string
  isProcessing: boolean
  isCompleted: boolean
  error: string | null
}

// Интерфейс для слайдов карусели
export interface ICarouselSlide {
  title: string
  description: string
  image: string
}

// Интерфейс для отзывов клиентов
export interface ITestimonial {
  text: string
  name: string
  tour: string
  avatar?: string
  rating?: number
}

// Интерфейс для тематических туров
export interface IThemedTour {
  id: string
  title: string
  description: string
  image: string
}

// Интерфейс для новостей
export interface INewsItem {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  category: string
}

export interface INewsCategory {
  id: string
  name: string
}

export interface ICompanyAdvantage {
  icon: string
  title: string
  description: string
}

export const useCardsStore = defineStore('cards', () => {
  // Карточки туров
  const cards = ref<ICard[]>([])  // Инициализируем пустым массивом
  const isLoading = ref(false)
  const selectedTour = ref<ICard | null>(null)
  
  // Данные для главной страницы
  const carouselSlides = ref<ICarouselSlide[]>([
    {
      title: 'Исследуй Урал',
      description: 'Незабываемые путешествия по уникальным местам',
      image: 'https://proza.ru/pics/2022/11/03/1598.jpg'
    },
    {
      title: 'Природа Урала',
      description: 'Первозданная красота уральских гор и озёр',
      image: 'https://proza.ru/pics/2022/11/03/1598.jpg'
    },
    {
      title: 'Активный отдых',
      description: 'Походы, сплавы и экскурсии по живописным местам',
      image: 'https://avatars.mds.yandex.net/i?id=e51022439a06709fabbbc838ce8ddf75_l-9146551-images-thumbs&n=13'
    }
  ])
  
  // Отзывы клиентов
  const testimonials = ref<ITestimonial[]>([
    {
      text: 'Прекрасный тур! Увидели столько красивых мест, о которых даже не подозревали. Гид был очень внимательным и знающим. Всем рекомендую!',
      name: 'Анна Петрова',
      tour: 'Тур "Уральские горы"',
      rating: 5
    },
    {
      text: 'Отличная организация, комфортные условия и захватывающие виды. Поездка на озеро Тургояк стала одним из лучших впечатлений этого лета.',
      name: 'Сергей Иванов',
      tour: 'Тур "Озеро Тургояк"',
      rating: 5
    },
    {
      text: 'Великолепный маршрут! Наконец-то увидел настоящий Урал. Обязательно поеду ещё раз, но уже на более длительный срок.',
      name: 'Дмитрий Соколов',
      tour: 'Тур "Таганай"',
      rating: 4
    }
  ])
  
  // Тематические туры
  const themedTours = ref<IThemedTour[]>([
    {
      id: 'nature',
      title: 'Природа Урала',
      description: 'Озера, горы, заповедники',
      image: 'https://avatars.mds.yandex.net/i?id=13050183b8757b09711f6d7d9414f639d5560707-5603739-images-thumbs&n=13'
    },
    {
      id: 'history',
      title: 'Исторические места',
      description: 'Памятники, музеи, архитектура',
      image: 'https://i.pinimg.com/originals/18/21/ea/1821ea8a9db97e62f2c68c821eac3958.jpg'
    },
    {
      id: 'adventure',
      title: 'Активный отдых',
      description: 'Походы, сплавы, восхождения',
      image: 'https://cdn2.tu-tu.ru/image/pagetree_node_data/1/fe0707f36ec41d8b2005cc3752b5a412/'
    }
  ])

  // Преимущества компании
  const companyAdvantages = ref<ICompanyAdvantage[]>([
    {
      icon: '🏆',
      title: 'Опыт и профессионализм',
      description: 'Более 10 лет мы организуем уникальные туры по Уралу. Наши гиды - опытные профессионалы, влюбленные в свой край.'
    },
    {
      icon: '🌲',
      title: 'Уникальные маршруты',
      description: 'Мы предлагаем эксклюзивные маршруты, которые позволят вам увидеть настоящий Урал с его первозданной природой.'
    },
    {
      icon: '🏕️',
      title: 'Комфорт и безопасность',
      description: 'Мы заботимся о вашем комфорте и безопасности во время путешествия, предоставляя качественное снаряжение и транспорт.'
    },
    {
      icon: '💰',
      title: 'Доступные цены',
      description: 'Мы предлагаем туры различной ценовой категории, чтобы каждый мог найти подходящий вариант.'
    }
  ])
  
  // Информационный блок о компании
  const companyInfo = ref({
    title: 'Путешествуйте по Уралу с нами',
    image: 'https://stihi.ru/pics/2022/06/06/2533.jpg',
    paragraphs: [
      'Урал – загадочный край, полный легенд и преданий, с богатой историей и удивительной природой. Здесь величественные горы соседствуют с бескрайними лесами, а кристально чистые озера отражают красоту синего неба.',
      'С компанией "Память Урала" вы откроете для себя все многообразие этого уникального региона. Наши туры охватывают самые интересные места: от Национального парка Таганай с его причудливыми скалами до таинственного озера Тургояк, от исторических городов до затерянных в лесах деревень.',
      'Присоединяйтесь к нашим путешествиям, и мы покажем вам настоящий Урал!'
    ]
  })
  
  // Секция с новостями
  const newsPreview = ref({
    title: 'Последние новости и события',
    description: 'Узнайте о новых маршрутах, специальных предложениях и интересных фактах об Урале в нашем разделе новостей.'
  })
  
  // Категории новостей
  const newsCategories = ref<INewsCategory[]>([
    { id: 'tours', name: 'Новые туры' },
    { id: 'events', name: 'События' },
    { id: 'offers', name: 'Спецпредложения' },
    { id: 'articles', name: 'Статьи об Урале' }
  ])
  
  // Новости
  const newsItems = ref<INewsItem[]>([
    {
      id: 1,
      title: 'Новый маршрут по горным озерам Урала',
      excerpt: 'Мы рады представить вам новый увлекательный маршрут, который проходит через самые живописные горные озера Уральских гор',
      content: `<p>Мы рады представить вам новый увлекательный маршрут, который проходит через самые живописные горные озера Уральских гор. Маршрут "Голубое ожерелье Урала" позволит вам увидеть кристально чистые воды озер Тургояк, Увильды, Иткуль и многих других.</p>
      <p>Протяженность маршрута составляет 8 дней, за которые вы посетите более 12 уникальных озер, каждое из которых имеет свою неповторимую историю и легенды.</p>
      <h3>Особенности маршрута:</h3>
      <ul>
        <li>Профессиональные гиды с многолетним опытом</li>
        <li>Комфортное размещение в живописных местах</li>
        <li>Возможность искупаться в чистейших озерах</li>
        <li>Фотографии с самых красивых видовых точек</li>
      </ul>
      <p>Первые группы отправятся по новому маршруту уже в июне. Успейте забронировать места!</p>`,
      image: 'https://proza.ru/pics/2022/11/03/1598.jpg',
      date: '2023-04-15',
      category: 'tours'
    },
    {
      id: 2,
      title: 'Фестиваль "Уральские самоцветы" пройдет в июле',
      excerpt: 'Приглашаем всех на ежегодный фестиваль камнерезного искусства и минералов "Уральские самоцветы", который состоится в июле',
      content: `<p>Ежегодный фестиваль камнерезного искусства и минералов "Уральские самоцветы" пройдет с 15 по 20 июля в городе Екатеринбург. Фестиваль соберет лучших мастеров камнерезного дела, ювелиров и коллекционеров со всей России.</p>
      <p>В программе фестиваля:</p>
      <ul>
        <li>Выставка-продажа минералов и изделий из камня</li>
        <li>Мастер-классы по обработке камня</li>
        <li>Лекции о геологии Урала</li>
        <li>Экскурсии на месторождения самоцветов</li>
        <li>Конкурс ювелирного мастерства</li>
      </ul>
      <p>Для наших клиентов мы подготовили специальный тур, включающий посещение фестиваля и экскурсии по историческим местам, связанным с добычей и обработкой уральских самоцветов.</p>`,
      image: 'https://proza.ru/pics/2022/11/03/1598.jpg',
      date: '2023-05-02',
      category: 'events'
    },
    {
      id: 3,
      title: 'Скидка 15% на все туры по Южному Уралу',
      excerpt: 'Только до конца мая действует специальное предложение - скидка 15% на все туры по Южному Уралу',
      content: `<p>Только до конца мая действует специальное предложение - скидка 15% на все туры по Южному Уралу при бронировании на летний сезон 2023 года.</p>
      <p>Южный Урал - это регион с богатейшим историческим наследием и удивительной природой. Здесь вы можете увидеть:</p>
      <ul>
        <li>Национальный парк "Таганай" с его причудливыми скалами и чистейшими реками</li>
        <li>Озеро Тургояк - "младший брат" Байкала</li>
        <li>Ильменский минералогический заповедник</li>
        <li>Историко-культурный заповедник "Аркаим"</li>
      </ul>
      <p>Чтобы получить скидку, при бронировании укажите промокод "ЮЖНЫЙ_УРАЛ_2023". Предложение действует для групп от 4 человек.</p>`,
      image: 'https://avatars.mds.yandex.net/i?id=e51022439a06709fabbbc838ce8ddf75_l-9146551-images-thumbs&n=13',
      date: '2023-05-10',
      category: 'offers'
    },
    {
      id: 4,
      title: 'Легенды и мифы уральских гор',
      excerpt: 'Урал богат не только природными ресурсами, но и удивительными легендами, которые передавались из поколения в поколение',
      content: `<p>Урал богат не только природными ресурсами, но и удивительными легендами, которые передавались из поколения в поколение. Многие из этих легенд связаны с таинственными существами, подземными городами и волшебными сокровищами.</p>
      <h3>Хозяйка Медной горы</h3>
      <p>Самой известной уральской легендой, безусловно, является сказание о Хозяйке Медной горы - могущественном духе, хранительнице подземных богатств. В образе прекрасной женщины с волосами цвета малахита она появлялась перед горняками, испытывая их на честность и мастерство. Те, кто заслуживал ее уважения, могли рассчитывать на помощь в поиске богатых жил.</p>
      <h3>Золото Колчака</h3>
      <p>Еще одна знаменитая легенда связана с утерянным золотым запасом России, который был вывезен войсками адмирала Колчака во время Гражданской войны. По преданию, несколько вагонов с золотом были спрятаны в горах Южного Урала, и до сих пор многие искатели приключений пытаются найти это сокровище.</p>
      <h3>Тайны горы Иремель</h3>
      <p>Вторая по высоте гора Южного Урала - Иремель - окутана множеством мистических историй. Местные жители верят, что гора обладает особой энергетикой, а в древности здесь располагались священные места для проведения обрядов. Некоторые легенды утверждают, что внутри горы существует проход в параллельный мир.</p>`,
      image: 'https://avatars.mds.yandex.net/i?id=13050183b8757b09711f6d7d9414f639d5560707-5603739-images-thumbs&n=13',
      date: '2023-05-20',
      category: 'articles'
    },
    {
      id: 5,
      title: 'Новые экскурсии по промышленному Уралу',
      excerpt: 'Представляем вам новое направление наших экскурсий - "Промышленный Урал", которое позволит познакомиться с уникальными индустриальными объектами',
      content: `<p>Представляем вам новое направление наших экскурсий - "Промышленный Урал", которое позволит познакомиться с уникальными индустриальными объектами региона, от старинных заводов до современных производств.</p>
      <p>В программу экскурсий входит посещение:</p>
      <ul>
        <li>Нижнетагильского музея-заповедника "Горнозаводской Урал"</li>
        <li>Белорецкого металлургического комбината</li>
        <li>Демидовских заводов в Невьянске и Нижнем Тагиле</li>
        <li>Музея золота в Березовском</li>
        <li>Уральского завода тяжелого машиностроения</li>
      </ul>
      <p>Экскурсии проводятся опытными гидами с техническим образованием, которые расскажут об истории промышленного освоения Урала и о том, какую роль этот регион сыграл в становлении российской индустрии.</p>`,
      image: 'https://i.pinimg.com/originals/18/21/ea/1821ea8a9db97e62f2c68c821eac3958.jpg',
      date: '2023-06-01',
      category: 'tours'
    }
  ])
  
  // Данные для платежной информации
  const paymentInfo = ref<IPaymentInfo>({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
    isProcessing: false,
    isCompleted: false,
    error: null
  })
  
  // Методы для работы с турами и карточками
  const getCards = async () => {
    console.log('getCards вызван, текущее состояние:', {
      cardsLength: cards.value.length,
      isLoading: isLoading.value
    })
    
    if (isLoading.value) {
      console.log('Загрузка уже выполняется')
      return cards.value
    }
    
    try {
      isLoading.value = true
      
      // Если карточки еще не загружены, инициализируем их данными
      if (cards.value.length === 0) {
        console.log('Инициализация данных в cards')
        cards.value = [
          {
            id: 1,
            title: 'Природа Южного Урала',
            description: 'Тур по самым живописным местам Южного Урала с посещением национального парка Таганай.',
            image: 'https://proza.ru/pics/2022/11/03/1598.jpg',
            price: 12500,
            rating: 4.8,
            location: 'Южный Урал',
            images: [
              'https://proza.ru/pics/2022/11/03/1598.jpg',
              'https://proza.ru/pics/2022/11/03/1598.jpg',
              'https://avatars.mds.yandex.net/i?id=e51022439a06709fabbbc838ce8ddf75_l-9146551-images-thumbs&n=13'
            ],
            includes: [
              'Проживание в палатках',
              'Питание (завтрак, обед, ужин)',
              'Транспорт от Челябинска и обратно',
              'Услуги гида',
              'Аренда туристического снаряжения'
            ]
          },
          {
            id: 2,
            title: 'Таганай за 2 дня',
            description: 'Короткое, но насыщенное путешествие в национальный парк «Таганай» — жемчужину Южного Урала.',
            image: 'https://avatars.mds.yandex.net/i?id=13050183b8757b09711f6d7d9414f639d5560707-5603739-images-thumbs&n=13',
            price: 7800,
            rating: 4.6,
            location: 'Челябинская область',
            images: [
              'https://avatars.mds.yandex.net/i?id=13050183b8757b09711f6d7d9414f639d5560707-5603739-images-thumbs&n=13',
              'https://i.pinimg.com/originals/18/21/ea/1821ea8a9db97e62f2c68c821eac3958.jpg',
              'https://cdn2.tu-tu.ru/image/pagetree_node_data/1/fe0707f36ec41d8b2005cc3752b5a412/'
            ],
            includes: [
              'Проживание в приюте',
              'Питание (завтрак, обед, ужин)',
              'Транспорт от Челябинска и обратно',
              'Услуги гида',
              'Входные билеты в национальный парк'
            ]
          },
          {
            id: 3,
            title: 'Озеро Тургояк и гора Вишневая',
            description: 'Поездка на живописное озеро Тургояк, называемое "младшим братом Байкала" и восхождение на гору Вишневая.',
            image: 'https://i.pinimg.com/originals/18/21/ea/1821ea8a9db97e62f2c68c821eac3958.jpg',
            price: 9500,
            rating: 4.9,
            location: 'Челябинская область',
            images: [
              'https://i.pinimg.com/originals/18/21/ea/1821ea8a9db97e62f2c68c821eac3958.jpg',
              'https://cdn2.tu-tu.ru/image/pagetree_node_data/1/fe0707f36ec41d8b2005cc3752b5a412/',
              'https://proza.ru/pics/2022/11/03/1598.jpg'
            ],
            includes: [
              'Проживание в гостевом доме',
              'Питание (завтрак и ужин)',
              'Транспорт по маршруту',
              'Услуги гида',
              'Экскурсии по программе'
            ]
          },
          {
            id: 4,
            title: 'Сплав по реке Белая',
            description: 'Увлекательный сплав по одной из красивейших рек Южного Урала. Подходит для начинающих и семей с детьми.',
            image: 'https://cdn2.tu-tu.ru/image/pagetree_node_data/1/fe0707f36ec41d8b2005cc3752b5a412/',
            price: 14200,
            rating: 4.7,
            location: 'Башкирия',
            images: [
              'https://cdn2.tu-tu.ru/image/pagetree_node_data/1/fe0707f36ec41d8b2005cc3752b5a412/',
              'https://proza.ru/pics/2022/11/03/1598.jpg',
              'https://proza.ru/pics/2022/11/03/1598.jpg'
            ],
            includes: [
              'Проживание в палатках',
              'Трехразовое питание',
              'Транспорт до места начала сплава и обратно',
              'Аренда сплавного снаряжения',
              'Услуги инструктора',
              'Спасательные жилеты'
            ]
          },
          {
            id: 5,
            title: 'По следам древних цивилизаций: Аркаим',
            description: 'Путешествие в одно из самых загадочных мест на Урале - древнее городище Аркаим, возраст которого около 4000 лет.',
            image: 'https://proza.ru/pics/2022/11/03/1598.jpg',
            price: 16800,
            rating: 4.5,
            location: 'Челябинская область',
            images: [
              'https://proza.ru/pics/2022/11/03/1598.jpg',
              'https://avatars.mds.yandex.net/i?id=e51022439a06709fabbbc838ce8ddf75_l-9146551-images-thumbs&n=13',
              'https://avatars.mds.yandex.net/i?id=13050183b8757b09711f6d7d9414f639d5560707-5603739-images-thumbs&n=13'
            ],
            includes: [
              'Проживание в гостинице',
              'Питание по программе',
              'Транспорт и трансферы',
              'Экскурсии с профессиональным гидом',
              'Входные билеты в музеи'
            ]
          },
          {
            id: 6,
            title: 'Зимний Урал: горные лыжи и снегоходы',
            description: 'Активный зимний отдых на лучших горнолыжных курортах Урала с катанием на снегоходах по заснеженным лесам.',
            image: 'https://i.pinimg.com/originals/18/21/ea/1821ea8a9db97e62f2c68c821eac3958.jpg',
            price: 19500,
            rating: 4.8,
            location: 'Челябинская область, Башкирия',
            images: [
              'https://proza.ru/pics/2022/11/03/1598.jpg',
              'https://avatars.mds.yandex.net/get-altay/5626432/2a00000187f8c3fde94e4889fbda1c63cbb4/orig',
              'https://avatars.mds.yandex.net/get-altay/4831158/2a00000187f8c3fec15c33f45ba79f35be3a/orig'
            ],
            includes: [
              'Проживание в отеле 4*',
              'Завтраки',
              'Ски-пассы на 3 дня',
              'Аренда снегоходов на 2 часа',
              'Трансферы по программе',
              'Услуги инструктора'
            ]
          }
        ]
      }
      
      console.log('getCards завершен, данные:', {
        cardsLength: cards.value.length,
        cards: cards.value
      })
      
      return cards.value
    } catch (error) {
      console.error('Ошибка загрузки карточек:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  // Методы для работы с новостями
  const getFilteredNews = (categoryId: string, query: string) => {
    let filtered = [...newsItems.value]
    
    // Фильтрация по категории
    if (categoryId !== 'all') {
      filtered = filtered.filter(item => item.category === categoryId)
    }
    
    // Фильтрация по поисковому запросу
    if (query) {
      const lowercasedQuery = query.toLowerCase()
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(lowercasedQuery) ||
        item.excerpt.toLowerCase().includes(lowercasedQuery) ||
        item.content.toLowerCase().includes(lowercasedQuery)
      )
    }
    
    // Сортировка по дате (от новых к старым)
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  const getNewsById = (id: number) => {
    return newsItems.value.find(item => item.id === id) || null
  }

  // Загрузка данных о новостях
  const loadNews = () => {
    // Здесь можно реализовать загрузку новостей с сервера
    // В данном примере используем уже имеющиеся данные
    console.log('Новости загружены')
  }

  // Установка выбранного тура
  const setSelectedTour = (tour: ICard) => {
    selectedTour.value = tour
  }

  // Имитация обработки платежа
  const processPayment = async () => {
    paymentInfo.value.isProcessing = true
    paymentInfo.value.error = null
    
    // Имитация запроса на сервер
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        const isSuccessful = Math.random() > 0.2 // 80% шанс успеха
        
        if (isSuccessful) {
          paymentInfo.value.isCompleted = true
          resolve(true)
        } else {
          paymentInfo.value.error = 'Произошла ошибка при обработке платежа. Пожалуйста, проверьте данные карты и попробуйте снова.'
          resolve(false)
        }
        
        paymentInfo.value.isProcessing = false
      }, 2000)
    })
  }

  return {
    cards,
    isLoading,
    selectedTour,
    carouselSlides,
    companyAdvantages,
    companyInfo,
    themedTours,
    testimonials,
    newsPreview,
    newsCategories,
    newsItems,
    paymentInfo,
    getCards,
    getFilteredNews,
    getNewsById,
    loadNews,
    setSelectedTour,
    processPayment
  }
})

export default pinia 