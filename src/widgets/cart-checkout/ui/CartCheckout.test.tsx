import { render, screen, fireEvent } from '@testing-library/react'
import { CartCheckout } from './CartCheckout'
import { useDispatch, useSelector } from 'react-redux'
import { updateQuantity } from '@/entities/cart'
import type { CartItem } from '@/entities/cart'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}))

jest.mock('@/entities/tile', () => ({
  TileGraphic: ({ tile }: { tile: { name: string } }) => <div data-testid="tile-graphic" data-name={tile.name} />,
}))

jest.mock('@/shared/lib/cn', () => ({
  cn: (...args: (string | undefined | false | null)[]) => args.filter(Boolean).join(' '),
}))

const mockDispatch = jest.fn()
const mockUseDispatch = useDispatch as jest.Mock
const mockUseSelector = useSelector as jest.Mock

const createMockCartItem = (overrides: Partial<CartItem> = {}): CartItem => {
  const { tile: tileOverrides, ...rest } = overrides
  return {
    tile: {
      id: 'test-tile',
      name: 'Test Tile',
      price: 10.0,
      color: 'from-blue-400 to-blue-600',
      pattern: 'wave',
      image: '/test.png',
      ...tileOverrides,
    },
    quantity: 50,
    ...rest,
  }
}

describe('CartCheckout', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseDispatch.mockReturnValue(mockDispatch)
  })

  describe('Rendering', () => {
    it('renders table headers', () => {
      mockUseSelector.mockReturnValue([])
      
      render(<CartCheckout />)
      
      expect(screen.getByText('TILE COLLECTION')).toBeInTheDocument()
      expect(screen.getByText('ITEM')).toBeInTheDocument()
      expect(screen.getByText('QUANTITY (sq. ft.)')).toBeInTheDocument()
      expect(screen.getByText('UNIT PRICE ($)')).toBeInTheDocument()
      expect(screen.getByText('ACTIONS')).toBeInTheDocument()
    })

    it('renders cart items from Redux state', () => {
      const cartItems = [
        createMockCartItem({ tile: { id: 'tile-1', name: 'Tile One' } as any }),
        createMockCartItem({ tile: { id: 'tile-2', name: 'Tile Two' } as any }),
      ]
      mockUseSelector.mockReturnValue(cartItems)

      render(<CartCheckout />)

      expect(screen.getByText('Tile One')).toBeInTheDocument()
      expect(screen.getByText('Tile Two')).toBeInTheDocument()
    })

    it('displays tile price formatted to 2 decimals', () => {
      const cartItems = [createMockCartItem({ tile: { price: 25.5 } as any })]
      mockUseSelector.mockReturnValue(cartItems)

      render(<CartCheckout />)

      expect(screen.getByText('$25.50')).toBeInTheDocument()
    })

    it('displays tile image when available', () => {
      const cartItems = [createMockCartItem({ tile: { image: '/test-image.png' } as any })]
      mockUseSelector.mockReturnValue(cartItems)

      render(<CartCheckout />)

      const img = screen.getByAltText('Test Tile')
      expect(img).toHaveAttribute('src', '/test-image.png')
    })

    it('displays color gradient when no image', () => {
      const cartItems = [createMockCartItem({ tile: { image: undefined, color: 'from-red-400 to-red-600' } as any })]
      mockUseSelector.mockReturnValue(cartItems)

      render(<CartCheckout />)

      const gradientDiv = screen.getByText('Test Tile').closest('tr')?.querySelector('.bg-gradient-to-br')
      expect(gradientDiv).toBeInTheDocument()
    })
  })

  describe('Calculations', () => {
    it('calculates subtotal correctly', () => {
      const cartItems = [
        createMockCartItem({ tile: { id: 'tile-1', price: 10 }, quantity: 50 }),
        createMockCartItem({ tile: { id: 'tile-2', price: 20 }, quantity: 25 }),
      ]
      mockUseSelector.mockReturnValue(cartItems)

      render(<CartCheckout />)

      const matches = screen.getAllByText('$1000.00')
      expect(matches.length).toBeGreaterThanOrEqual(1)
    })

    it('calculates shipping as $0 when cart is empty', () => {
      mockUseSelector.mockReturnValue([])

      render(<CartCheckout />)

      expect(screen.getByText('FREE')).toBeInTheDocument()
    })

    it('calculates shipping as FREE when subtotal > $500', () => {
      const cartItems = [createMockCartItem({ tile: { price: 10 } as any, quantity: 100 })]
      mockUseSelector.mockReturnValue(cartItems)

      render(<CartCheckout />)

      expect(screen.getByText('FREE')).toBeInTheDocument()
    })

    it('calculates shipping as $25 when subtotal <= $500 and cart not empty', () => {
      const cartItems = [createMockCartItem({ tile: { price: 5 } as any, quantity: 50 })]
      mockUseSelector.mockReturnValue(cartItems)

      render(<CartCheckout />)

      expect(screen.getByText('$25.00')).toBeInTheDocument()
    })

    it('calculates grand total correctly', () => {
      const cartItems = [createMockCartItem({ tile: { price: 10 } as any, quantity: 50 })]
      mockUseSelector.mockReturnValue(cartItems)

      render(<CartCheckout />)

      expect(screen.getByText('$525.00')).toBeInTheDocument()
    })
  })

  describe('User Interactions', () => {
    it('dispatches updateQuantity when quantity input changes', () => {
      const cartItems = [createMockCartItem({ tile: { id: 'test-id' } as any, quantity: 50 })]
      mockUseSelector.mockReturnValue(cartItems)

      render(<CartCheckout />)

      const input = screen.getByDisplayValue('50')
      fireEvent.change(input, { target: { value: '75' } })

      expect(mockDispatch).toHaveBeenCalledWith(updateQuantity({ tileId: 'test-id', quantity: 75 }))
    })

    it('dispatches updateQuantity with 0 when input value is negative', () => {
      const cartItems = [createMockCartItem({ tile: { id: 'test-id' } as any, quantity: 50 })]
      mockUseSelector.mockReturnValue(cartItems)

      render(<CartCheckout />)

      const input = screen.getByDisplayValue('50')
      fireEvent.change(input, { target: { value: '-10' } })

      expect(mockDispatch).toHaveBeenCalledWith(updateQuantity({ tileId: 'test-id', quantity: 0 }))
    })

    it('dispatches updateQuantity with quantity + 25 when ADD button clicked', () => {
      const cartItems = [createMockCartItem({ tile: { id: 'test-id' } as any, quantity: 50 })]
      mockUseSelector.mockReturnValue(cartItems)

      render(<CartCheckout />)

      const addButton = screen.getByAltText('Add')
      fireEvent.click(addButton)

      expect(mockDispatch).toHaveBeenCalledWith(updateQuantity({ tileId: 'test-id', quantity: 75 }))
    })

    it('dispatches updateQuantity with 0 when REMOVE button clicked', () => {
      const cartItems = [createMockCartItem({ tile: { id: 'test-id' } as any, quantity: 50 })]
      mockUseSelector.mockReturnValue(cartItems)

      render(<CartCheckout />)

      const removeButton = screen.getByAltText('Remove')
      fireEvent.click(removeButton)

      expect(mockDispatch).toHaveBeenCalledWith(updateQuantity({ tileId: 'test-id', quantity: 0 }))
    })
  })

  describe('Empty State', () => {
    it('renders empty table when cart is empty', () => {
      mockUseSelector.mockReturnValue([])

      render(<CartCheckout />)

      expect(screen.queryByRole('row', { name: /test tile/i })).not.toBeInTheDocument()
    })

    it('shows $0.00 for all totals when cart is empty', () => {
      mockUseSelector.mockReturnValue([])

      render(<CartCheckout />)

      const zeros = screen.getAllByText('$0.00')
      expect(zeros.length).toBeGreaterThanOrEqual(2)
    })
  })
})
