<template>
  <div class="news-page">
    <div class="container">
      <h1 class="page-title">Новости и события</h1>
      
      <div class="news-filter">
        <div class="search-box">
          <input type="text" v-model="searchQuery" placeholder="Поиск новостей..." @input="filterNews" />
          <button class="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
        
        <div class="category-filter">
          <button 
            class="category-button" 
            :class="{ active: selectedCategory === 'all' }"
            @click="filterByCategory('all')"
          >
            Все
          </button>
          <button 
            class="category-button" 
            :class="{ active: selectedCategory === 'events' }"
            @click="filterByCategory('events')"
          >
            События
          </button>
          <button 
            class="category-button" 
            :class="{ active: selectedCategory === 'tours' }"
            @click="filterByCategory('tours')"
          >
            Новые туры
          </button>
          <button 
            class="category-button" 
            :class="{ active: selectedCategory === 'blog' }"
            @click="filterByCategory('blog')"
          >
            Блог
          </button>
        </div>
      </div>
      
      <div class="news-grid">
        <div v-for="(newsItem, index) in filteredNews" :key="index" class="news-card">
          <div class="news-image">
            <img :src="newsItem.image" :alt="newsItem.title" />
            <div class="news-category">{{ getCategoryName(newsItem.category) }}</div>
          </div>
          <div class="news-content">
            <div class="news-date">{{ formatDate(newsItem.date) }}</div>
            <h2 class="news-title">{{ newsItem.title }}</h2>
            <p class="news-excerpt">{{ newsItem.excerpt }}</p>
            <button class="read-more-button" @click="showFullNews(newsItem)">Читать далее</button>
          </div>
        </div>
      </div>
      
      <div v-if="filteredNews.length === 0" class="no-results">
        <p>По вашему запросу ничего не найдено. Попробуйте изменить параметры поиска.</p>
      </div>
      
      <!-- Модальное окно для полной статьи -->
      <div v-if="selectedNews" class="news-modal" @click.self="closeNewsModal">
        <div class="news-modal-content">
          <button class="close-button" @click="closeNewsModal">&times;</button>
          <div class="news-modal-image">
            <img :src="selectedNews.image" :alt="selectedNews.title" />
            <div class="news-category">{{ getCategoryName(selectedNews.category) }}</div>
          </div>
          <div class="news-modal-body">
            <div class="news-date">{{ formatDate(selectedNews.date) }}</div>
            <h2 class="news-title">{{ selectedNews.title }}</h2>
            <div class="news-full-content" v-html="selectedNews.content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Состояние для фильтрации и поиска
const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedNews = ref(null)

// Модели данных для новостей
const newsData = ref([
  {
    title: 'Открытие нового маршрута на гору Таганай',
    date: new Date(2023, 5, 15),
    category: 'tours',
    image: 'https://avatars.mds.yandex.net/get-altay/4374841/2a0000017706403316ba81896cf7ca802576/orig',
    excerpt: 'Мы рады сообщить об открытии нового пешего маршрута на гору Таганай. Этот маршрут подходит как для начинающих, так и для опытных туристов.',
    content: `
      <p>Мы рады сообщить об открытии нового пешего маршрута на гору Таганай. Этот маршрут подходит как для начинающих, так и для опытных туристов.</p>
      <p>Гора Таганай – одна из самых красивых и загадочных вершин Южного Урала. Её название переводится с башкирского как "Подставка луны", что отражает величие этой горной системы. Национальный парк "Таганай" был основан в 1991 году для сохранения уникальных природных комплексов.</p>
      <p>Новый маршрут проходит через живописные места, включая:</p>
      <ul>
        <li>Долину сказок – место с причудливыми каменными образованиями</li>
        <li>Откликной гребень – знаменитый отрог, создающий многократное эхо</li>
        <li>Круглицу – высшую точку хребта Таганай (1178 м)</li>
      </ul>
      <p>Протяженность маршрута составляет 12 км, а ориентировочное время прохождения – 6-7 часов. На маршруте оборудованы места для отдыха, установлены информационные щиты с описанием флоры и фауны.</p>
      <p>Первая группа туристов отправится по новому маршруту уже 25 июня 2023 года. Присоединяйтесь к нам, чтобы увидеть неповторимую красоту Уральских гор!</p>
    `
  },
  {
    title: 'Фестиваль "Уральские самоцветы" пройдет в июле',
    date: new Date(2023, 5, 21),
    category: 'events',
    image: 'https://avatars.mds.yandex.net/i?id=e2c0baa8bdd40b63155df3b7161d9bd7_l-12416107-images-thumbs&n=13',
    excerpt: 'Ежегодный фестиваль "Уральские самоцветы" пройдет 15-17 июля в Екатеринбурге. Гостей ждут выставки минералов, мастер-классы и экскурсии.',
    content: `
      <p>Ежегодный фестиваль "Уральские самоцветы" пройдет 15-17 июля в Екатеринбурге. Гостей ждут выставки минералов, мастер-классы и экскурсии.</p>
      <p>Фестиваль "Уральские самоцветы" – это важное событие для всех любителей геологии, минералогии и ювелирного искусства. Урал славится своими природными богатствами, и этот фестиваль – отличная возможность познакомиться с многообразием уральских камней.</p>
      <p>В программе фестиваля:</p>
      <ul>
        <li>Выставка уральских минералов и самоцветов</li>
        <li>Мастер-классы по огранке камней и созданию ювелирных украшений</li>
        <li>Экскурсии в музей минералогии</li>
        <li>Лекции известных геологов и минералогов</li>
        <li>Ярмарка изделий из уральских камней</li>
      </ul>
      <p>Специальным гостем фестиваля станет известный геолог и исследователь Александр Петров, который представит свою новую книгу "Тайны уральских недр".</p>
      <p>Вход на основную площадку фестиваля бесплатный. Для участия в некоторых мастер-классах требуется предварительная регистрация на сайте фестиваля.</p>
    `
  },
  {
    title: 'Скидки на летние туры в Башкирию',
    date: new Date(2023, 6, 5),
    category: 'tours',
    image: 'https://avatars.mds.yandex.net/i?id=e2c0baa8bdd40b63155df3b7161d9bd7_l-12416107-images-thumbs&n=13',
    excerpt: 'С 10 июля по 30 августа действует специальное предложение: скидка 15% на все туры в Башкирию. Спешите забронировать!',
    content: `
      <p>С 10 июля по 30 августа действует специальное предложение: скидка 15% на все туры в Башкирию. Спешите забронировать!</p>
      <p>Башкирия – удивительный край с богатой природой, включающей горы, реки, озера и пещеры. Это идеальное место для активного отдыха и экотуризма.</p>
      <p>В рамках акции со скидкой можно приобрести следующие туры:</p>
      <ul>
        <li>"Заповедники Башкирии" – 5-дневный тур с посещением Башкирского заповедника и заповедника Шульган-Таш</li>
        <li>"Пещеры и горы" – 7-дневный тур с посещением знаменитой Капової пещеры и восхождением на гору Ямантау</li>
        <li>"Сплав по Белой" – 4-дневный сплав по главной реке Башкирии</li>
      </ul>
      <p>Все туры включают проживание, питание, транспорт и услуги профессиональных гидов. Для получения скидки используйте промокод BASHKIRIA2023 при бронировании на нашем сайте.</p>
      <p>Количество мест ограничено, поэтому рекомендуем бронировать заранее. Скидка не суммируется с другими акциями и специальными предложениями.</p>
    `
  },
  {
    title: 'Топ-5 малоизвестных мест Южного Урала',
    date: new Date(2023, 6, 12),
    category: 'blog',
    image: 'https://avatars.mds.yandex.net/get-altay/4374841/2a0000017706403316ba81896cf7ca802576/orig',
    excerpt: 'В нашем новом блоге мы расскажем о пяти удивительных местах Южного Урала, о которых знают не все туристы. Откройте для себя новые маршруты!',
    content: `
      <p>В нашем новом блоге мы расскажем о пяти удивительных местах Южного Урала, о которых знают не все туристы. Откройте для себя новые маршруты!</p>
      <h3>1. Озеро Инышко</h3>
      <p>Это небольшое озеро, расположенное в районе Большой Инышко, поражает своей красотой. Озеро окружено хвойным лесом и скалами, а его воды кристально чисты. Здесь практически нет туристов, что позволяет насладиться тишиной и покоем природы. На берегу озера можно найти удобные места для пикника и кемпинга.</p>
      <h3>2. Скалы Шихан</h3>
      <p>Эти древние коралловые рифы, образовавшиеся около 230 миллионов лет назад в Пермском море, сегодня представляют собой уникальные горы-одиночки. Из четырех первоначальных Шиханов сохранилось только три: Торатау, Куштау и Юрактау. Они являются не только геологическими памятниками, но и священными местами для башкир.</p>
      <h3>3. Река Юрюзань</h3>
      <p>Эта река менее популярна среди туристов, чем Белая или Ай, но не менее красива. Юрюзань протекает в живописном ущелье, окруженном скалами и лесами. Здесь можно организовать сплав на 2-3 дня, во время которого вы увидите множество пещер и скальных выходов.</p>
      <h3>4. Пещера Сухая Атя</h3>
      <p>Эта пещера расположена в Ашинском районе и знаменита своими красивыми сталактитами и сталагмитами. В отличие от более известных пещер, Сухая Атя не так часто посещается туристами, что позволяет в полной мере ощутить атмосферу подземного мира.</p>
      <h3>5. Долина реки Тюлюк</h3>
      <p>Это живописное место, где река Тюлюк протекает у подножия хребта Зигальга. Здесь можно увидеть красивые водопады, скальные выходы и альпийские луга. В деревне Тюлюк сохранилась аутентичная атмосфера уральской глубинки.</p>
      <p>Каждое из этих мест заслуживает отдельного путешествия. Если вы хотите увидеть настоящий Урал, вдали от популярных туристических маршрутов, обязательно включите их в свой путеводитель.</p>
    `
  },
  {
    title: 'Зимние маршруты 2023-2024: что нового?',
    date: new Date(2023, 7, 8),
    category: 'tours',
    image: 'https://avatars.mds.yandex.net/i?id=e2c0baa8bdd40b63155df3b7161d9bd7_l-12416107-images-thumbs&n=13',
    excerpt: 'Представляем новые зимние маршруты на сезон 2023-2024. В этом году мы подготовили несколько совершенно новых программ, включая лыжные туры.',
    content: `
      <p>Представляем новые зимние маршруты на сезон 2023-2024. В этом году мы подготовили несколько совершенно новых программ, включая лыжные туры.</p>
      <p>Зима на Урале – это особое время года, когда заснеженные горы, замерзшие озера и покрытые инеем леса создают сказочную атмосферу. И хотя многие предпочитают путешествовать летом, зимние маршруты имеют свое особое очарование.</p>
      <p>В новом сезоне мы представляем следующие зимние туры:</p>
      <h3>1. "Зимний Таганай"</h3>
      <p>Это трехдневный тур с проживанием в отапливаемых домиках на кордоне "Белый ключ". В программе восхождение на Двуглавую сопку, посещение Откликного гребня и Черной скалы. Тур подходит для начинающих туристов с хорошей физической подготовкой.</p>
      <h3>2. "Лыжный тур по Зюраткулю"</h3>
      <p>Новинка этого сезона! Пятидневный лыжный тур вокруг озера Зюраткуль с восхождением на хребет Зюраткуль и посещением Медвежьей долины. Уровень сложности: средний. Необходимо умение ходить на беговых лыжах.</p>
      <h3>3. "Снегоходные сафари"</h3>
      <p>Однодневные и двухдневные туры на снегоходах по разным районам Урала. Вы можете выбрать маршрут в соответствии с вашим опытом управления снегоходом.</p>
      <h3>4. "Зимняя рыбалка на озерах Урала"</h3>
      <p>Трехдневный тур для любителей зимней рыбалки. В программе рыбалка на озерах Иткуль, Синара и Большие Касли. Обеспечиваем всем необходимым оборудованием.</p>
      <p>Все туры сопровождаются опытными гидами, знающими местность и особенности зимних походов. Для участников предоставляется специальное зимнее снаряжение.</p>
      <p>Бронирование на зимний сезон уже открыто, и до 1 октября действует скидка 10% на раннее бронирование. Не упустите шанс увидеть зимний Урал во всей его красоте!</p>
    `
  }
])

// Фильтрованные новости
const filteredNews = computed(() => {
  let result = [...newsData.value]
  
  // Фильтрация по категории
  if (selectedCategory.value !== 'all') {
    result = result.filter(item => item.category === selectedCategory.value)
  }
  
  // Фильтрация по поисковому запросу
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(
      item => 
        item.title.toLowerCase().includes(query) || 
        item.excerpt.toLowerCase().includes(query)
    )
  }
  
  // Сортировка по дате (от новых к старым)
  return result.sort((a, b) => b.date - a.date)
})

// Методы для управления фильтрацией
const filterByCategory = (category) => {
  selectedCategory.value = category
}

const filterNews = () => {
  // Функция уже реализована через вычисляемое свойство
}

// Отображение полной новости
const showFullNews = (newsItem) => {
  selectedNews.value = newsItem
  document.body.style.overflow = 'hidden' // Предотвращение прокрутки основной страницы
}

const closeNewsModal = () => {
  selectedNews.value = null
  document.body.style.overflow = '' // Восстановление прокрутки
}

// Вспомогательные функции
const formatDate = (date) => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

const getCategoryName = (category) => {
  const categories = {
    'events': 'События',
    'tours': 'Туры',
    'blog': 'Блог'
  }
  return categories[category] || 'Новости'
}
</script>

<style scoped lang="sass">
// Общие стили
.container
  max-width: 1200px
  margin: 0 auto
  padding: 0 20px

.page-title
  text-align: center
  margin: 40px 0
  color: #2c3e50
  font-size: 32px
  font-weight: 700

// Фильтры и поиск
.news-filter
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 30px
  flex-wrap: wrap
  gap: 20px
  
  @media (max-width: 768px)
    flex-direction: column
    align-items: flex-start

.search-box
  position: relative
  width: 300px
  
  @media (max-width: 768px)
    width: 100%
  
  input
    width: 100%
    padding: 12px 40px 12px 16px
    border: 1px solid #ddd
    border-radius: 30px
    font-size: 16px
    
    &:focus
      outline: none
      border-color: #3498db

.search-button
  position: absolute
  right: 8px
  top: 50%
  transform: translateY(-50%)
  background: none
  border: none
  color: #7f8c8d
  cursor: pointer
  
  &:hover
    color: #3498db

.category-filter
  display: flex
  gap: 10px
  flex-wrap: wrap
  
  @media (max-width: 768px)
    width: 100%
    justify-content: space-between

.category-button
  padding: 8px 16px
  background: #f0f0f0
  border: none
  border-radius: 20px
  font-size: 14px
  cursor: pointer
  transition: all 0.3s
  
  &:hover
    background: #e0e0e0
  
  &.active
    background: #3498db
    color: white

// Сетка новостей
.news-grid
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr))
  gap: 30px
  margin-bottom: 50px
  
  @media (max-width: 576px)
    grid-template-columns: 1fr

// Карточка новости
.news-card
  border-radius: 12px
  overflow: hidden
  box-shadow: 0 5px 15px rgba(0,0,0,0.1)
  transition: transform 0.3s, box-shadow 0.3s
  background: white
  
  &:hover
    transform: translateY(-5px)
    box-shadow: 0 15px 30px rgba(0,0,0,0.15)

.news-image
  position: relative
  height: 200px
  overflow: hidden
  
  img
    width: 100%
    height: 100%
    object-fit: cover
    transition: transform 0.5s
    
    &:hover
      transform: scale(1.05)

.news-category
  position: absolute
  bottom: 10px
  left: 10px
  background: rgba(52, 152, 219, 0.9)
  color: white
  padding: 5px 10px
  border-radius: 20px
  font-size: 12px
  font-weight: 600

.news-content
  padding: 20px

.news-date
  color: #7f8c8d
  font-size: 14px
  margin-bottom: 10px

.news-title
  color: #2c3e50
  font-size: 18px
  margin-bottom: 10px
  line-height: 1.4

.news-excerpt
  color: #5d6d7e
  font-size: 14px
  line-height: 1.6
  margin-bottom: 20px
  display: -webkit-box
  -webkit-line-clamp: 3
  -webkit-box-orient: vertical
  overflow: hidden

.read-more-button
  background: none
  border: none
  color: #3498db
  cursor: pointer
  font-size: 14px
  font-weight: 600
  padding: 0
  display: flex
  align-items: center
  
  &:hover
    text-decoration: underline

// Сообщение об отсутствии результатов
.no-results
  text-align: center
  padding: 40px 0
  color: #7f8c8d

// Модальное окно для полной статьи
.news-modal
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: rgba(0,0,0,0.8)
  display: flex
  align-items: center
  justify-content: center
  z-index: 1000
  padding: 20px
  
  @media (max-width: 768px)
    align-items: flex-start
    padding: 10px

.news-modal-content
  background: white
  border-radius: 12px
  overflow: hidden
  width: 800px
  max-width: 95%
  max-height: 90vh
  display: flex
  flex-direction: column
  position: relative
  
  @media (max-width: 768px)
    max-height: 95vh

.close-button
  position: absolute
  top: 10px
  right: 10px
  background: rgba(255,255,255,0.8)
  border: none
  width: 32px
  height: 32px
  border-radius: 50%
  font-size: 24px
  cursor: pointer
  z-index: 10
  display: flex
  align-items: center
  justify-content: center
  
  &:hover
    background: white

.news-modal-image
  position: relative
  height: 300px
  
  @media (max-width: 768px)
    height: 200px
  
  img
    width: 100%
    height: 100%
    object-fit: cover

.news-modal-body
  padding: 24px
  overflow-y: auto

.news-full-content
  color: #5d6d7e
  line-height: 1.8
  font-size: 16px
  
  h3
    color: #2c3e50
    margin: 24px 0 16px
    font-size: 20px
  
  ul
    padding-left: 20px
    margin-bottom: 20px
    
    li
      margin-bottom: 8px
</style> 