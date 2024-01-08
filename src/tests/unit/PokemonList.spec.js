import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { createRouter, createMemoryHistory } from 'vue-router'
import Loader from '@/components/Loader.vue'
import PokemonList from '@/components/PokemonList.vue'

const mockPokemons = [
  {
    name: 'bulbasaur',
    height: 7,
    weigth: 69,
    sprites: {
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    },
    types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
  },
  {
    name: 'ivysaur',
    height: 10,
    weigth: 130,
    sprites: {
      front_default:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
    },
    types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
  },
]

describe('PokemonList.vue', () => {
  let store
  let router

  beforeEach(() => {
    store = createStore({
      state: {
        pokemons: mockPokemons,
        isLoading: false,
      },
      getters: {
        pokemons: (state) => state.pokemons,
        isLoading: (state) => state.isLoading,
      },
      actions: {
        fetchPokemons: jest.fn(),
      },
    })

    const routes = [
      { path: '/', name: 'Home', component: {} },
      { path: '/pokemons', component: PokemonList },
    ]
    router = createRouter({
      history: createMemoryHistory(),
      routes,
    })

    router.push = jest.fn()
  })

  it('renders pokemon list when not loading', async () => {
    const mockToast = { triggerToast: jest.fn() }
    const wrapper = mount(PokemonList, {
      global: {
        plugins: [store, router],
        provide: {
          toast: mockToast,
        },
        stubs: { Loader },
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Pokemon List')
    expect(wrapper.findAll('.pokemon-item').length).toBe(mockPokemons.length)
  })

  it('shows loader when isLoading is true', () => {
    const mockToast = { triggerToast: jest.fn() }
    store.state.isLoading = true
    const wrapper = mount(PokemonList, {
      global: {
        plugins: [store, router],
        provide: {
          toast: mockToast,
        },
        stubs: { Loader },
      },
    })

    expect(wrapper.findComponent(Loader).exists()).toBe(true)
  })

  it('navigates to Pokemon detail page on item click', async () => {
    const mockToast = { triggerToast: jest.fn() }
    const wrapper = mount(PokemonList, {
      global: {
        plugins: [store, router],
        provide: {
          toast: mockToast,
        },
        stubs: { Loader },
      },
    })

    await wrapper.find('.pokemon-item').trigger('click')
    expect(router.push).toHaveBeenCalledWith({
      name: 'PokemonDetail',
      params: { name: 'bulbasaur' },
    })
  })

  it('shows no Pokemons message when list is empty', () => {
    store.state.pokemons = []
    const mockToast = { triggerToast: jest.fn() }
    const wrapper = mount(PokemonList, {
      global: {
        plugins: [store, router],
        provide: {
          toast: mockToast,
        },
        stubs: { Loader },
      },
    })

    expect(wrapper.text()).toContain('No Pokemons available')
  })

  it('displays correct number of pokemon items', async () => {
    const mockToast = { triggerToast: jest.fn() }
    const wrapper = mount(PokemonList, {
      global: {
        plugins: [store, router],
        provide: {
          toast: mockToast,
        },
        stubs: { Loader },
      },
    })

    await wrapper.vm.$nextTick()

    const items = wrapper.findAll('.pokemon-item')
    expect(items.length).toBe(store.state.pokemons.length)
  })

  it('hides loader after pokemons are loaded', async () => {
    const mockToast = { triggerToast: jest.fn() }
    const wrapper = mount(PokemonList, {
      global: {
        plugins: [store, router],
        provide: {
          toast: mockToast,
        },
        stubs: { Loader },
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(Loader).exists()).toBe(false)
  })
  it('navigates to Pokemon detail page on item click', async () => {
    const mockToast = { triggerToast: jest.fn() }
    const wrapper = mount(PokemonList, {
      global: {
        plugins: [store, router],
        provide: {
          toast: mockToast,
        },
        stubs: { Loader },
      },
    })

    await wrapper.findAll('.pokemon-item')[0].trigger('click')
    expect(router.push).toHaveBeenCalledWith({
      name: 'PokemonDetail',
      params: { name: mockPokemons[0].name },
    })
  })
})
