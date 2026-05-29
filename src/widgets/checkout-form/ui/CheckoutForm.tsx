'use client';

import { useForm } from '@tanstack/react-form';
import { useAppDispatch, useAppSelector } from '@/app-layer/store/hooks';
import { clearCart, selectGrandTotal, selectShipping, selectSubtotal } from '@/entities/cart';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';

const radioInput = 'w-5 h-5 border-3 border-ink bg-surface-field rounded-full accent-ink cursor-pointer';
const paymentOption =
  'flex-1 bordered p-4 flex flex-col items-center justify-center gap-2 rounded-sm cursor-pointer select-none transition-colors';
const summaryLabel = 'text-right pr-2';
const summaryValue = 'text-right font-sans font-bold text-heading-sm pr-1';
const summaryBracket = 'font-bebas';

const getFieldError = (meta: { isTouched: boolean; errors: (string | undefined)[] }) =>
  meta.isTouched && meta.errors.length ? meta.errors.filter(Boolean).join(', ') : undefined;

export function CheckoutForm() {
  const dispatch = useAppDispatch();
  const subtotal = useAppSelector((state) => selectSubtotal(state.cart));
  const shipping = useAppSelector((state) => selectShipping(state.cart));
  const grandTotal = useAppSelector((state) => selectGrandTotal(state.cart));

  const form = useForm({
    defaultValues: {
      customerName: '',
      phone: '',
      email: '',
      shippingAddress: '',
      projectNotes: '',
      paymentMethod: 'card',
      cardNumber: '',
      cardExpiration: '',
      cardCvv: '',
    },
    onSubmit: async ({ value }) => {
      console.info('Order submitted:', { ...value, subtotal, shipping, grandTotal });
      dispatch(clearCart());
      form.reset();
    },
  });

  return (
    <form onSubmit={form.handleSubmit} className="flex flex-col gap-6 w-full" noValidate>
      <div className="hidden md:flex items-end w-full select-none mb-2">
        <div className="px-5 py-2 border-3 border-b-0 border-ink rounded-t-[8px] bg-surface-table-head font-bebas text-heading-lg text-ink leading-none">
          ORDER SUMMARY
        </div>
        <div className="flex-1 border-b-3 border-ink" />
      </div>

      <div>
        <form.Field
          name="customerName"
          validators={{
            onChange: ({ value }) => (!value ? 'Customer name is required' : undefined),
          }}
        >
          {(field) => (
            <Input
              label="CUSTOMER NAME:"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              error={getFieldError(field.state.meta)}
            />
          )}
        </form.Field>

        <form.Field
          name="phone"
          validators={{
            onChange: ({ value }) => (!value ? 'Phone is required' : undefined),
          }}
        >
          {(field) => (
            <Input
              label="PHONE:"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              error={getFieldError(field.state.meta)}
            />
          )}
        </form.Field>

        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              if (!value) return 'Email is required';
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email address';
              return undefined;
            },
          }}
        >
          {(field) => (
            <Input
              label="EMAIL:"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              error={getFieldError(field.state.meta)}
            />
          )}
        </form.Field>

        <form.Field
          name="shippingAddress"
          validators={{
            onChange: ({ value }) => (!value ? 'Shipping address is required' : undefined),
          }}
        >
          {(field) => (
            <Input
              label="SHIPPING ADDRESS:"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              error={getFieldError(field.state.meta)}
            />
          )}
        </form.Field>

        <form.Field name="projectNotes">
          {(field) => (
            <Input
              label="PROJECT NOTES:"
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              error={getFieldError(field.state.meta)}
            />
          )}
        </form.Field>
      </div>

      <div className="hidden md:block">
        <hr className="border-t-3 border-ink mb-2 mt-7" />
        <div className="flex flex-col items-end w-full select-none font-bebas text-ink">
          <div className="grid grid-cols-[auto_12px_120px_12px] items-center gap-y-1 text-heading-md leading-none">
            <div className={summaryLabel}>SUBTOTAL:</div>
            <div className={cn(summaryBracket, 'text-left')}>[</div>
            <div className={summaryValue}>${subtotal.toFixed(2)}</div>
            <div className={cn(summaryBracket, 'text-right')}>]</div>

            <div className={summaryLabel}>SHIPPING:</div>
            <div className={cn(summaryBracket, 'text-left')}>[</div>
            <div className={summaryValue}>${shipping.toFixed(2)}</div>
            <div className={cn(summaryBracket, 'text-right')}>]</div>

            <div className={summaryLabel}>GRAND TOTAL:</div>
            <div className={cn(summaryBracket, 'text-left')}>[</div>
            <div className={summaryValue}>${grandTotal.toFixed(2)}</div>
            <div className={cn(summaryBracket, 'text-right')}>]</div>
          </div>
        </div>
      </div>

      <form.Field name="paymentMethod">
        {(field) => {
          const currentMethod = field.state.value;
          return (
            <div className="flex flex-col gap-4 mt-2">
              <div className="w-fit border-3 border-ink rounded-sm p-1 leading-none bg-surface-table heading text-heading-md select-none">
                SELECT PAYMENT METHOD:
              </div>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-4 select-none font-bebas text-heading-sm text-ink">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={currentMethod === 'card'}
                    onChange={() => field.handleChange('card')}
                    className={radioInput}
                  />
                  <span>CREDIT/DEBIT CARD</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={currentMethod === 'paypal'}
                    onChange={() => field.handleChange('paypal')}
                    className={radioInput}
                  />
                  <img src="/ppal.png" alt="PayPal" className="h-6 object-contain" />
                  <span>PAYPAL</span>
                </label>
              </div>

              {currentMethod === 'card' && (
                <div className="bordered bg-surface-accent p-4 flex flex-col gap-4 rounded-sm">
                  <div className="flex items-center gap-3 select-none">
                    <div className="w-5 h-5 border-3 border-ink rounded-full flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-ink rounded-full" />
                    </div>
                    <img src="/ccard.png" alt="Credit Cards" className="h-[28px] object-contain" />
                  </div>

                  <form.Field
                    name="cardNumber"
                    validators={{
                      onChange: ({ value }) => {
                        if (field.state.value !== 'card') return undefined;
                        if (!value) return 'Card number is required';
                        if (!/^\d{13,19}$/.test(value.replace(/\s/g, ''))) {
                          return 'Invalid card number (must be 13-19 digits)';
                        }
                        return undefined;
                      },
                    }}
                  >
                    {(subField) => (
                      <Input
                        variant="stacked"
                        label="CARD NUMBER"
                        type="text"
                        placeholder="1234 4566 7723 8990"
                        id={subField.name}
                        name={subField.name}
                        value={subField.state.value}
                        onBlur={subField.handleBlur}
                        onChange={(e) => subField.handleChange(e.target.value)}
                        error={getFieldError(subField.state.meta)}
                      />
                    )}
                  </form.Field>

                  <div className="grid grid-cols-2 gap-4 w-full">
                    <form.Field
                      name="cardExpiration"
                      validators={{
                        onChange: ({ value }) => {
                          if (field.state.value !== 'card') return undefined;
                          if (!value) return 'Required';
                          if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
                            return 'Format MM/YY';
                          }
                          return undefined;
                        },
                      }}
                    >
                      {(subField) => (
                        <Input
                          variant="stacked"
                          type="text"
                          placeholder="EXPIRATION /"
                          id={subField.name}
                          name={subField.name}
                          value={subField.state.value}
                          onBlur={subField.handleBlur}
                          onChange={(e) => subField.handleChange(e.target.value)}
                          error={getFieldError(subField.state.meta)}
                        />
                      )}
                    </form.Field>

                    <form.Field
                      name="cardCvv"
                      validators={{
                        onChange: ({ value }) => {
                          if (field.state.value !== 'card') return undefined;
                          if (!value) return 'Required';
                          if (!/^\d{3,4}$/.test(value)) {
                            return '3-4 digits';
                          }
                          return undefined;
                        },
                      }}
                    >
                      {(subField) => (
                        <Input
                          variant="stacked"
                          type="text"
                          placeholder="CVV"
                          id={subField.name}
                          name={subField.name}
                          value={subField.state.value}
                          onBlur={subField.handleBlur}
                          onChange={(e) => subField.handleChange(e.target.value)}
                          error={getFieldError(subField.state.meta)}
                        />
                      )}
                    </form.Field>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-6 w-full">
                <div
                  className={cn(paymentOption, currentMethod === 'apple' ? 'bg-surface-accent' : 'bg-transparent')}
                  onClick={() => field.handleChange('apple')}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="apple"
                      checked={currentMethod === 'apple'}
                      onChange={() => field.handleChange('apple')}
                      className={radioInput}
                    />
                    <img src="/logo_apple_pay.png" alt="Apple Pay" className="h-8 object-contain" />
                  </div>
                  <span className="font-bebas text-heading-sm text-ink tracking-wide">APPLE PAY</span>
                </div>

                <div
                  className={cn(paymentOption, currentMethod === 'bank' ? 'bg-surface-accent' : 'bg-transparent')}
                  onClick={() => field.handleChange('bank')}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={currentMethod === 'bank'}
                      onChange={() => field.handleChange('bank')}
                      className={radioInput}
                    />
                    <img src="/icon_payment_bank.png" alt="Bank Transfer" className="h-8 object-contain" />
                  </div>
                  <span className="font-bebas text-heading-sm text-ink tracking-wide whitespace-nowrap">BANK TRANSFER</span>
                </div>
              </div>
            </div>
          );
        }}
      </form.Field>

      <Button type="submit" size="xl">
        PLACE SECURE ORDER
      </Button>
    </form>
  );
}
