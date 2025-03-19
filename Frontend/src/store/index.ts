import { createPinia, defineStore } from 'pinia'
import { ref } from 'vue'

const pinia = createPinia()

interface ICard {
  id: number
  title: string
  description: string
  image: string
  price: number
  rating: number
  location: string
}

interface ITour {
  images: string[]
  title: string
  description: string
  price: number
  rating: number
  includes: string[]
}

interface IPaymentInfo {
  tourTitle: string
  tourPrice: number
  persons: number
  totalPrice: number
  isPaymentComplete: boolean
}

export const useCardsStore = defineStore('cards', () => {
  const cards = ref<ICard[]>([])
  const selectedTour = ref<ITour>({
    images: [],
    title: '',
    description: '',
    price: 0,
    rating: 0,
    includes: []
  })
  
  const paymentInfo = ref<IPaymentInfo>({
    tourTitle: '',
    tourPrice: 0,
    persons: 1,
    totalPrice: 0,
    isPaymentComplete: false
  })
  
  const getCards = async () => {
    const fetchedCards = [
      { 
        id: 1, 
        title: 'Уральские горы', 
        description: 'Путешествие по живописным местам Урала', 
        image: 'https://avatars.mds.yandex.net/i?id=e2c0baa8bdd40b63155df3b7161d9bd7_l-12416107-images-thumbs&n=13', 
        price: 100, 
        rating: 4.5,
        location: 'Урал'
      },
      { 
        id: 2, 
        title: 'Озеро Тургояк', 
        description: 'Экскурсия на красивейшее озеро Урала', 
        image: 'https://avatars.mds.yandex.net/i?id=e2c0baa8bdd40b63155df3b7161d9bd7_l-12416107-images-thumbs&n=13', 
        price: 200, 
        rating: 4.8,
        location: 'Челябинская область'
      },
      { 
        id: 3, 
        title: 'Таганай', 
        description: 'Поход в национальный парк', 
        image: 'https://avatars.mds.yandex.net/i?id=e2c0baa8bdd40b63155df3b7161d9bd7_l-12416107-images-thumbs&n=13', 
        price: 300, 
        rating: 4.7,
        location: 'Национальный парк'
      }
    ]
    
    cards.value = fetchedCards
    return cards.value
  }

  const setSelectedTour = (card: ICard) => {
    selectedTour.value = {
      images: [card.image, card.image], // Здесь должны быть реальные изображения тура
      title: card.title,
      description: card.description,
      price: card.price,
      rating: card.rating,
      includes: ['Проживание', 'Питание', 'Экскурсии', 'Транспорт'] // Примеры включенных услуг
    }
  }

  const setPaymentInfo = (title: string, price: number, persons: number) => {
    paymentInfo.value = {
      tourTitle: title,
      tourPrice: price,
      persons: persons,
      totalPrice: price * persons,
      isPaymentComplete: false
    }
  }

  const completePayment = () => {
    paymentInfo.value.isPaymentComplete = true
  }

  const resetPaymentInfo = () => {
    paymentInfo.value = {
      tourTitle: '',
      tourPrice: 0,
      persons: 1,
      totalPrice: 0,
      isPaymentComplete: false
    }
  }

  return { 
    cards, 
    getCards, 
    selectedTour, 
    setSelectedTour, 
    paymentInfo, 
    setPaymentInfo, 
    completePayment,
    resetPaymentInfo
  }
})

export default pinia 