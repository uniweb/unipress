import { describe, it, expect } from 'vitest'
import { validateCrossRefs } from '../src/utils/validate-cross-refs.js'

const SIGNED_SOW = {
  slug: 'platform-2024',
  number: 'platform-2024',
  status: 'signed',
  signed: '2024-08-12',
  expires: '2026-12-31',
}
const DRAFT_SOW = {
  slug: 'mobile-app-2026',
  status: 'draft',
}
const EXPIRED_SOW = {
  slug: 'old-thing-2020',
  status: 'expired',
}
const SIGNED_NO_DATE = {
  slug: 'forgot-date-2025',
  status: 'signed',
  signed: null,
}

const baseInvoice = (overrides) => ({
  slug: 'inv-0001',
  number: 'INV-0001',
  status: 'open',
  sow_ref: 'platform-2024',
  ...overrides,
})

function findCode(findings, code) {
  return findings.find((f) => f.code === code)
}

describe('validate-cross-refs — severity matrix', () => {
  describe('sow_ref references a slug not in collections/sows/', () => {
    it('issued invoice → error', () => {
      const findings = validateCrossRefs({
        invoices: [baseInvoice({ sow_ref: 'does-not-exist' })],
        sows: [SIGNED_SOW],
      })
      const f = findCode(findings, 'invoice-sow-not-found')
      expect(f?.severity).toBe('error')
    })
    it('draft invoice → warn', () => {
      const findings = validateCrossRefs({
        invoices: [baseInvoice({ status: 'draft', sow_ref: 'does-not-exist' })],
        sows: [SIGNED_SOW],
      })
      const f = findCode(findings, 'invoice-sow-not-found')
      expect(f?.severity).toBe('warn')
    })
  })

  describe('referenced SOW is draft / in-review', () => {
    it('issued invoice → error', () => {
      const findings = validateCrossRefs({
        invoices: [baseInvoice({ sow_ref: 'mobile-app-2026' })],
        sows: [DRAFT_SOW],
      })
      const f = findCode(findings, 'invoice-sow-not-signed')
      expect(f?.severity).toBe('error')
    })
    it('draft invoice → info', () => {
      const findings = validateCrossRefs({
        invoices: [baseInvoice({ status: 'draft', sow_ref: 'mobile-app-2026' })],
        sows: [DRAFT_SOW],
      })
      const f = findCode(findings, 'invoice-sow-not-signed')
      expect(f?.severity).toBe('info')
    })
  })

  describe('referenced SOW is expired / superseded', () => {
    it('warn regardless of invoice status', () => {
      const findings = validateCrossRefs({
        invoices: [baseInvoice({ sow_ref: 'old-thing-2020' })],
        sows: [EXPIRED_SOW],
      })
      const f = findCode(findings, 'invoice-sow-stale')
      expect(f?.severity).toBe('warn')
    })
  })

  describe('invoice has no sow_ref', () => {
    it('issued invoice → warn', () => {
      const findings = validateCrossRefs({
        invoices: [baseInvoice({ sow_ref: null })],
        sows: [],
      })
      const f = findCode(findings, 'invoice-missing-sow-ref')
      expect(f?.severity).toBe('warn')
    })
    it('draft invoice → info', () => {
      const findings = validateCrossRefs({
        invoices: [baseInvoice({ status: 'draft', sow_ref: null })],
        sows: [],
      })
      const f = findCode(findings, 'invoice-missing-sow-ref')
      expect(f?.severity).toBe('info')
    })
  })

  describe('SOW status: signed but no signed: date', () => {
    it('warn', () => {
      const findings = validateCrossRefs({
        invoices: [baseInvoice({ sow_ref: 'forgot-date-2025' })],
        sows: [SIGNED_NO_DATE],
      })
      const f = findCode(findings, 'sow-signed-without-date')
      expect(f?.severity).toBe('warn')
    })
  })

  describe('invoice line period extends past SOW expires', () => {
    it('issued invoice → warn', () => {
      const findings = validateCrossRefs({
        invoices: [
          baseInvoice({
            items: [
              { description: 'Year 4 hosting', period: { from: '2026-01-01', to: '2027-01-01' } },
            ],
          }),
        ],
        sows: [SIGNED_SOW],
      })
      const f = findCode(findings, 'invoice-period-past-expiry')
      expect(f?.severity).toBe('warn')
    })
    it('draft invoice → info', () => {
      const findings = validateCrossRefs({
        invoices: [
          baseInvoice({
            status: 'draft',
            items: [
              { description: 'Year 4 hosting', period: { from: '2026-01-01', to: '2027-01-01' } },
            ],
          }),
        ],
        sows: [SIGNED_SOW],
      })
      const f = findCode(findings, 'invoice-period-past-expiry')
      expect(f?.severity).toBe('info')
    })
  })

  describe('happy path', () => {
    it('issued invoice with valid signed SOW + in-range items produces no findings', () => {
      const findings = validateCrossRefs({
        invoices: [
          baseInvoice({
            items: [
              { description: 'Phase 1', period: { from: '2025-01-01', to: '2025-06-30' } },
            ],
          }),
        ],
        sows: [SIGNED_SOW],
      })
      expect(findings).toEqual([])
    })
  })
})
