/**
 * Stage 5b — Invoice section structural output.
 *
 * Builds a fake block + content payload for each slice kind, mounts
 * the rewritten Invoice section under a Press DocumentProvider, and
 * inspects the rendered HTML output. The full IR -> docx pipeline is
 * already covered by @uniweb/press's tests; this test verifies that
 * the section emits the right Press-builder shape (Td shading, Tr
 * header, theme keys preserved) for each slice.
 */
import { describe, it, expect } from 'vitest'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { DocumentProvider } from '@uniweb/press'
import Invoice from '../src/sections/Invoice/index.jsx'

const PROXIMIFY_THEME = {
  colors: {
    accent: '4775B2',
    body: '3B3B3B',
    muted: '757575',
    softBorder: 'BFD3ED',
    surface: 'FFFFFF',
  },
}

const SAMPLE_INVOICE = {
  number: 'INV-0001',
  issued: '2026-03-01',
  due: '2026-03-31',
  client: { organization: 'Globex Corp', contact: 'Jane Example' },
  items: [
    { description: 'Hosting (Year 1)', qty: 1, unit_price: 8000, amount: 8000 },
    { description: 'Support', qty: 1, unit_price: 24000, amount: 24000 },
  ],
}

const VENDOR = {
  organization: 'Proximify Inc.',
  address: '170 Cathcart St, Ottawa, ON',
}

const TOTALS = {
  subtotal: 32000,
  tax_amount: 4160,
  tax_rate: 0.13,
  tax_label: 'HST (13%)',
  total: 36160,
}

function makeBlock() {
  return { id: 'b1', getInset: () => null }
}

function renderInvoice(content) {
  return renderToStaticMarkup(
    <DocumentProvider theme={PROXIMIFY_THEME}>
      <Invoice content={content} block={makeBlock()} />
    </DocumentProvider>,
  )
}

describe('Invoice section: per-slice structural output', () => {
  it('cover slice emits the branded INVOICE title + 2-col borderless cover table', () => {
    const html = renderInvoice({
      title: 'Invoice',
      paragraphs: [],
      items: [],
      sequence: [],
      __bd: {
        kind: 'cover',
        invoice: SAMPLE_INVOICE,
        items: SAMPLE_INVOICE.items,
        totals: TOTALS,
        vendor: VENDOR,
        defaults: {},
      },
    })
    // Branded title text + theme-resolved accent color emitted as data-color.
    expect(html).toContain('INVOICE')
    expect(html).toContain('data-color="4775B2"')
    // 2-column cover table with vendor / client.
    expect(html).toMatch(/data-type="table"/)
    expect(html).toContain('Proximify Inc.')
    expect(html).toContain('Globex Corp')
    // Cover slice does not emit a header row.
    expect(html).not.toContain('data-row-header')
  })

  it('line-items slice emits a fixed-layout table with shaded header row', () => {
    const html = renderInvoice({
      title: 'Line items',
      paragraphs: [],
      items: [],
      sequence: [],
      __bd: {
        kind: 'line-items',
        invoice: SAMPLE_INVOICE,
        items: SAMPLE_INVOICE.items,
        totals: TOTALS,
        vendor: VENDOR,
        defaults: {},
      },
    })
    // Fixed table layout with 4 cm column widths.
    // Column widths are floor-rounded twips: cm(10)=5669, cm(2)=1133, cm(2.5)=1417.
    expect(html).toContain('data-table-column-widths="5669,1133,1417,1417"')
    expect(html).toContain('data-table-layout="fixed"')
    // Repeating header row.
    expect(html).toContain('data-row-header')
    // Header cells shaded with theme-resolved accent.
    expect(html).toContain('data-shading-fill="4775B2"')
    // Soft-blue grid borders applied at the table level.
    expect(html).toContain('data-table-borders-top-color="BFD3ED"')
    // Per-item rows reach the docx (description + formatted amounts).
    expect(html).toContain('Hosting (Year 1)')
    expect(html).toContain('$8,000.00')
  })

  it('totals slice uses colSpan=3 label cells and an accent Total row', () => {
    const html = renderInvoice({
      title: 'Totals',
      paragraphs: [],
      items: [],
      sequence: [],
      __bd: {
        kind: 'totals',
        invoice: SAMPLE_INVOICE,
        items: SAMPLE_INVOICE.items,
        totals: TOTALS,
        vendor: VENDOR,
        defaults: {},
      },
    })
    // Three colSpan=3 label cells (subtotal, tax, total label).
    const colSpan3 = (html.match(/data-grid-span="3"/g) || []).length
    expect(colSpan3).toBe(3)
    // Total row carries the brand accent fill.
    expect(html).toContain('data-shading-fill="4775B2"')
    // Computed totals reach the docx.
    expect(html).toContain('$32,000.00')
    expect(html).toContain('$4,160.00')
    expect(html).toContain('$36,160.00')
  })

  it('falls back to flat-paragraph rendering when __bd is absent', () => {
    const html = renderInvoice({
      title: 'Payment',
      paragraphs: ['Wire to account 0001-2345.'],
      items: [],
      sequence: [
        { type: 'paragraph', text: 'Wire to account 0001-2345.' },
      ],
    })
    expect(html).toContain('Payment')
    expect(html).toContain('Wire to account 0001-2345.')
    // Fallback path emits the existing <section> wrapper, not a Td.
    expect(html).toContain('class="invoice-section')
    expect(html).not.toContain('data-row-header')
  })

  it('uses kind="body" fallback for unknown slice kinds', () => {
    const html = renderInvoice({
      title: 'Custom slice',
      paragraphs: ['hello'],
      items: [],
      sequence: [{ type: 'paragraph', text: 'hello' }],
      __bd: {
        kind: 'something-unknown',
        invoice: null,
        items: [],
        totals: null,
        vendor: VENDOR,
        defaults: {},
      },
    })
    expect(html).toContain('hello')
    expect(html).toContain('class="invoice-section')
  })
})
