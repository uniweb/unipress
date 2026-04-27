import { describe, it, expect } from 'vitest'
import {
  resolveTaxEntry,
  computeTaxAmount,
  DEFAULT_TAX_REGISTRY,
} from '../src/utils/tax-registry.js'

describe('tax-registry', () => {
  it('resolves built-in HST', () => {
    const entry = resolveTaxEntry('HST')
    expect(entry).toEqual({ rate: 0.13, label: 'HST' })
  })

  it('returns NONE for unknown jurisdictions', () => {
    expect(resolveTaxEntry('UNKNOWN')).toEqual(DEFAULT_TAX_REGISTRY.NONE)
  })

  it('returns NONE when jurisdiction is missing', () => {
    expect(resolveTaxEntry(null)).toEqual(DEFAULT_TAX_REGISTRY.NONE)
    expect(resolveTaxEntry(undefined)).toEqual(DEFAULT_TAX_REGISTRY.NONE)
    expect(resolveTaxEntry('')).toEqual(DEFAULT_TAX_REGISTRY.NONE)
  })

  it('site overrides shadow built-in entries', () => {
    const entry = resolveTaxEntry('HST', { HST: { rate: 0.15, label: 'HST-NB' } })
    expect(entry).toEqual({ rate: 0.15, label: 'HST-NB' })
  })

  it('site overrides extend the registry with new keys', () => {
    const entry = resolveTaxEntry('VAT-EU', { 'VAT-EU': { rate: 0.2, label: 'VAT' } })
    expect(entry).toEqual({ rate: 0.2, label: 'VAT' })
  })

  it('computes tax amount with two-decimal rounding', () => {
    expect(computeTaxAmount(100, 'HST')).toBe(13)
    // 99.99 × 0.13 = 12.9987 → 13.00
    expect(computeTaxAmount(99.99, 'HST')).toBe(13)
    // 100.50 × 0.05 = 5.025 → 5.03 (banker's rounding not required)
    expect(computeTaxAmount(100.5, 'GST')).toBe(5.03)
  })

  it('returns zero tax for NONE / unknown jurisdiction', () => {
    expect(computeTaxAmount(1000, null)).toBe(0)
    expect(computeTaxAmount(1000, 'NONE')).toBe(0)
    expect(computeTaxAmount(1000, 'UNKNOWN')).toBe(0)
  })
})
