import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { createRouter, createMemoryHistory } from 'vue-router'
import Loader from '@/components/Loader.vue'
import PokemonDetail from '@/components/PokemonDetail.vue'

const mockPokemon = {
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  sprites: {
    front_default:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
  types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
}

describe('PokemonDetail.vue', () => {
  let store
  let router

  beforeEach(() => {
    store = createStore({
      state: {
        selectedPokemon: mockPokemon,
        isLoading: false,
      },
      getters: {
        selectedPokemon: (state) => state.selectedPokemon,
        isLoading: (state) => state.isLoading,
      },
      actions: {
        fetchPokemon: jest.fn(),
      },
    })

    const routes = [
      { path: '/', name: 'Home', component: {} },
      { path: '/pokemons', name: 'PokemonList', component: {} },
      {
        path: '/pokemon/:name',
        name: 'PokemonDetail',
        component: PokemonDetail,
        props: true,
      },
    ]
    router = createRouter({
      history: createMemoryHistory(),
      routes,
    })
    router.push({ name: 'PokemonDetail', params: { name: 'bulbasaur' } })
  })

  it('renders pokemon details correctly', async () => {
    const mockToast = { triggerToast: jest.fn() }
    const wrapper = mount(PokemonDetail, {
      global: {
        plugins: [store, router],
        provide: {
          toast: mockToast,
        },
        stubs: { Loader },
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain(mockPokemon.name)
    expect(wrapper.find('img').attributes('src')).toBe(
      mockPokemon.sprites.front_default,
    )
    expect(wrapper.text()).toContain('GRASS, POISON')
  })

  it('handles unavailable Pokemon data', () => {
    const mockToast = { triggerToast: jest.fn() }
    store.state.selectedPokemon = null
    const wrapper = mount(PokemonDetail, {
      global: {
        plugins: [store, router],
        provide: {
          toast: mockToast,
        },
        stubs: { Loader },
      },
    })

    expect(wrapper.text()).toContain('No Pokemon Found')
  })
})
