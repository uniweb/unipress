import { describe, it, expect } from 'vitest'
import {
  computeLineAmount,
  computeSubtotal,
  computeTaxBlock,
  computeInvoiceTotals,
} from '../src/utils/compute-totals.js'

describe('compute-totals', () => {
  it('coerces missing or non-numeric values to 0', () => {
    expect(computeLineAmount({})).toBe(0)
    expect(computeLineAmount({ qty: 1 })).toBe(0)
    expect(computeLineAmount({ qty: 'x', unit_price: 5 })).toBe(0)
  })

  it('sums a multi-line invoice', () => {
    const items = [
      { qty: 1, unit_price: 100 },
      { qty: 2, unit_price: 50.5 },
      { qty: 1, unit_price: 0.99 },
    ]
    expect(computeSubtotal(items)).toBe(201.99)
  })

  it('returns the registry rate when invoice rate is unset', () => {
    const block = computeTaxBlock(
      { items: [{ qty: 1, unit_price: 100 }], tax: { jurisdiction: 'HST' } },
      {},
      {},
    )
    expect(block.rate).toBe(0.13)
    expect(block.amount).toBe(13)
    expect(block.label).toBe('HST')
  })

  it('honours per-record rate override even when jurisdiction is set', () => {
    const block = computeTaxBlock(
      { items: [{ qty: 1, unit_price: 100 }], tax: { jurisdiction: 'HST', rate: 0.05 } },
      {},
      {},
    )
    expect(block.rate).toBe(0.05)
    expect(block.amount).toBe(5)
  })

  it('honours per-record amount override (skips computation)', () => {
    const block = computeTaxBlock(
      {
        items: [{ qty: 1, unit_price: 100 }],
        tax: { jurisdiction: 'HST', amount: 7.77 },
      },
      {},
      {},
    )
    expect(block.amount).toBe(7.77)
  })

  it('falls back to defaults.tax_jurisdiction when invoice has none set', () => {
    const block = computeTaxBlock(
      { items: [{ qty: 1, unit_price: 100 }] },
      { tax_jurisdiction: 'GST' },
      {},
    )
    expect(block.label).toBe('GST')
    expect(block.amount).toBe(5)
  })

  it('produces a zero tax block when no jurisdiction can be resolved', () => {
    const block = computeTaxBlock({ items: [{ qty: 1, unit_price: 100 }] }, {}, {})
    expect(block.rate).toBe(0)
    expect(block.amount).toBe(0)
    expect(block.jurisdiction).toBe(null)
  })

  it('computes totals consistently across the namespace', () => {
    const totals = computeInvoiceTotals(
      {
        items: [
          { qty: 1, unit_price: 100 },
          { qty: 2, unit_price: 50 },
        ],
        tax: { jurisdiction: 'HST' },
      },
      {},
      {},
    )
    expect(totals.subtotal).toBe(200)
    expect(totals.tax_amount).toBe(26)
    expect(totals.total).toBe(226)
  })
})
