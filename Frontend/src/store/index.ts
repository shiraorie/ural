import { createPinia, defineStore } from 'pinia'
import { ref } from 'vue'

const pinia = createPinia()

interface ICard {
  id: number
  title: string
  description: string
  image: string
  price: number
}

export const useCardsStore = defineStore('cards', () => {
  const cards = ref<ICard[]>([])
  
  const getCards = async () => {
    const getCards = [
        { id: 1, title: 'Card 1', description: 'This is the first card', image: 'https://avatars.mds.yandex.net/i?id=e2c0baa8bdd40b63155df3b7161d9bd7_l-12416107-images-thumbs&n=13', price: '100' },
        { id: 2, title: 'Card 2', description: 'This is the second card', image: 'https://avatars.mds.yandex.net/i?id=e2c0baa8bdd40b63155df3b7161d9bd7_l-12416107-images-thumbs&n=13', price: '200' },
      ]
      cards.value = getCards
      return cards.value
  }

  return { cards, getCards }
})

export default pinia 