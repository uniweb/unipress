/**
 * Invoice slice — renders one of the four sub-sections of an invoice
 * document (cover / line-items / totals / payment) with a layout
 * appropriate to the slice. The foundation's `props` handler pre-
 * computes `content.__bd` with the raw invoice data, computed totals,
 * and the inferred slice `kind`; this component branches on that.
 *
 * Stage 6.0b — typography roles. This section emits NO inline font /
 * size / color attributes on text runs. Every run carries a role
 * (`<TextRun role="Label">`, `<Paragraph role="Title">`) that
 * resolves to an OOXML named style at compile time. Brand colors
 * still flow through Press's theme channel for shading / table
 * borders where named styles don't apply.
 *
 * The shared JSX feeds the React preview AND the docx fragment
 * registered via useDocumentOutput.
 *
 * Stage 5b + 6.0b of kb/framework/plans/press-professional-docx.md.
 */
import { Fragment } from 'react'
import { useDocumentOutput } from '@uniweb/press'
import {
  Paragraph,
  TextRun,
  Table,
  Tr,
  Td,
  cm,
} from '@uniweb/press/docx'
import { getChildBlockRenderer } from '@uniweb/kit'
import { formatCurrency, formatDateRange } from '../../utils/format.js'

function preItemSequence(sequence) {
  if (!Array.isArray(sequence)) return []
  const out = []
  for (const el of sequence) {
    if (el.type === 'heading' && el.level === 2) break
    if (el.type === 'paragraph' || el.type === 'inset') out.push(el)
  }
  return out
}

const borderless = () => ({
  top: { style: 'none', size: 0, color: 'FFFFFF' },
  bottom: { style: 'none', size: 0, color: 'FFFFFF' },
  left: { style: 'none', size: 0, color: 'FFFFFF' },
  right: { style: 'none', size: 0, color: 'FFFFFF' },
  insideHorizontal: { style: 'none', size: 0, color: 'FFFFFF' },
  insideVertical: { style: 'none', size: 0, color: 'FFFFFF' },
})

const themedGrid = () => ({
  top: { style: 'single', size: 4, color: 'softBorder' },
  bottom: { style: 'single', size: 4, color: 'softBorder' },
  left: { style: 'single', size: 4, color: 'softBorder' },
  right: { style: 'single', size: 4, color: 'softBorder' },
  insideHorizontal: { style: 'single', size: 4, color: 'softBorder' },
  insideVertical: { style: 'single', size: 4, color: 'softBorder' },
})

// ---------------------------------------------------------------------------
// Slice renderers — each returns a JSX tree used as both the React preview
// and the docx fragment.
// ---------------------------------------------------------------------------

function CoverSlice({ bd }) {
  const { invoice, vendor } = bd
  const client = invoice?.client || {}
  return (
    <>
      <Paragraph role="Title">
        <TextRun>INVOICE</TextRun>
      </Paragraph>

      <Table widths={[50, 50]} borders={borderless()}>
        <Tr>
          <Td borderBottom="none">
            <Paragraph><TextRun role="Label">From</TextRun></Paragraph>
            {vendor?.organization && (
              <Paragraph>
                <TextRun role="BodyStrong">{vendor.organization}</TextRun>
              </Paragraph>
            )}
            {vendor?.address && (
              <Paragraph>
                <TextRun>{vendor.address}</TextRun>
              </Paragraph>
            )}
          </Td>
          <Td borderBottom="none">
            <Paragraph><TextRun role="Label">Bill to</TextRun></Paragraph>
            {client.organization && (
              <Paragraph>
                <TextRun role="BodyStrong">{client.organization}</TextRun>
              </Paragraph>
            )}
            {client.contact && (
              <Paragraph><TextRun>{client.contact}</TextRun></Paragraph>
            )}
            {client.email && (
              <Paragraph>
                <TextRun role="Caption">{client.email}</TextRun>
              </Paragraph>
            )}
          </Td>
        </Tr>
      </Table>

      {/* Invoice metadata — labels in muted small caps, values in
          Display (bigger, bolder body). Lays out as a 3-col table to
          keep the labels and values aligned. */}
      <Paragraph data-spacing-before={200} />
      <Table widths={[33, 33, 34]} borders={borderless()}>
        <Tr>
          {invoice?.number && (
            <Td borderBottom="none">
              <Paragraph><TextRun role="Label">Invoice number</TextRun></Paragraph>
              <Paragraph><TextRun role="Display">{invoice.number}</TextRun></Paragraph>
            </Td>
          )}
          {invoice?.issued && (
            <Td borderBottom="none">
              <Paragraph><TextRun role="Label">Issued</TextRun></Paragraph>
              <Paragraph><TextRun>{formatInvoiceDate(invoice.issued)}</TextRun></Paragraph>
            </Td>
          )}
          {invoice?.due && (
            <Td borderBottom="none">
              <Paragraph><TextRun role="Label">Due</TextRun></Paragraph>
              <Paragraph><TextRun>{formatInvoiceDate(invoice.due)}</TextRun></Paragraph>
            </Td>
          )}
        </Tr>
      </Table>

      {invoice?.period && (
        <>
          <Paragraph data-spacing-before={120}>
            <TextRun role="Label">Period</TextRun>
          </Paragraph>
          <Paragraph>
            <TextRun>{formatDateRange(invoice.period, { locale: 'en-CA' })}</TextRun>
          </Paragraph>
        </>
      )}
    </>
  )
}

function LineItemsSlice({ bd }) {
  const { items, invoice } = bd
  if (!Array.isArray(items) || items.length === 0) return null
  const currency = invoice?.currency || 'CAD'
  const fmt = (n) => formatCurrency(n, { currency })

  return (
    <Table
      columnWidths={[cm(10), cm(2), cm(2.5), cm(2.5)]}
      borders={themedGrid()}
    >
      <Tr header>
        {['Description', 'Qty', 'Unit price', 'Amount'].map((label, i) => (
          <Td key={i} shading="accent" valign="center">
            <Paragraph data-alignment={i === 0 ? 'left' : 'right'}>
              <TextRun role="TableHeader">{label}</TextRun>
            </Paragraph>
          </Td>
        ))}
      </Tr>
      {items.map((item, i) => (
        <Tr key={i}>
          <Td valign="center">
            <Paragraph><TextRun>{item.description}</TextRun></Paragraph>
            {item.period && (
              <Paragraph>
                <TextRun role="Caption">
                  {formatDateRange(item.period, { locale: 'en-CA' })}
                </TextRun>
              </Paragraph>
            )}
          </Td>
          <Td valign="center">
            <Paragraph data-alignment="right">
              <TextRun>{String(item.qty ?? '')}</TextRun>
            </Paragraph>
          </Td>
          <Td valign="center">
            <Paragraph data-alignment="right">
              <TextRun>{fmt(item.unit_price)}</TextRun>
            </Paragraph>
          </Td>
          <Td valign="center">
            <Paragraph data-alignment="right">
              <TextRun>{fmt(item.amount)}</TextRun>
            </Paragraph>
          </Td>
        </Tr>
      ))}
    </Table>
  )
}

function TotalsSlice({ bd }) {
  const { totals, invoice } = bd
  if (!totals) return null
  const currency = invoice?.currency || 'CAD'
  const fmt = (n) => formatCurrency(n, { currency })

  return (
    <Table
      columnWidths={[cm(10), cm(2), cm(2.5), cm(2.5)]}
      borders={borderless()}
    >
      <Tr>
        <Td colSpan={3} borderBottom="none">
          <Paragraph data-alignment="right">
            <TextRun role="Label">Subtotal</TextRun>
          </Paragraph>
        </Td>
        <Td borderBottom="none">
          <Paragraph data-alignment="right">
            <TextRun role="BodyStrong">{fmt(totals.subtotal)}</TextRun>
          </Paragraph>
        </Td>
      </Tr>
      {totals.tax_amount > 0 && (
        <Tr>
          <Td colSpan={3} borderBottom="none">
            <Paragraph data-alignment="right">
              <TextRun role="Label">{totals.tax_label}</TextRun>
            </Paragraph>
          </Td>
          <Td borderBottom="none">
            <Paragraph data-alignment="right">
              <TextRun role="BodyStrong">{fmt(totals.tax_amount)}</TextRun>
            </Paragraph>
          </Td>
        </Tr>
      )}
      <Tr>
        <Td colSpan={3} shading="accent" borderBottom="none" valign="center">
          <Paragraph data-alignment="right">
            <TextRun role="TotalLine">Total</TextRun>
          </Paragraph>
        </Td>
        <Td shading="accent" borderBottom="none" valign="center">
          <Paragraph data-alignment="right">
            <TextRun role="TotalLine">{fmt(totals.total)}</TextRun>
          </Paragraph>
        </Td>
      </Tr>
    </Table>
  )
}

/**
 * Default fallback — flat paragraph rendering of the existing
 * semantic content. Used for 'payment', 'body', and any unknown kind.
 */
function PlainProseSlice({ content, block }) {
  const { title, items, sequence } = content
  // childBlockRenderer is set up by the runtime; fall back to a no-op
  // so unit tests that mount the section directly don't crash.
  const Renderer = (() => {
    try {
      return getChildBlockRenderer()
    } catch {
      return null
    }
  })()
  const preItems = preItemSequence(sequence)

  const paragraphsForDocx = preItems
    .filter((el) => el.type === 'paragraph')
    .map((el) => el.text)

  const docxBody = (
    <>
      {title && (
        <Paragraph role="Heading1" data-spacing-after={240}>
          <TextRun>{title}</TextRun>
        </Paragraph>
      )}
      {paragraphsForDocx.map((p, i) => (
        <Paragraph key={`p${i}`} data={p} data-spacing-after={120} />
      ))}
      {items.map((item, i) => (
        <Fragment key={i}>
          {item.title && (
            <Paragraph
              role="Heading2"
              data-spacing-before={200}
              data-spacing-after={120}
            >
              <TextRun>{item.title}</TextRun>
            </Paragraph>
          )}
          {item.paragraphs.map((p, j) => (
            <Paragraph key={`${i}-${j}`} data={p} data-spacing-after={100} />
          ))}
        </Fragment>
      ))}
    </>
  )

  const previewJsx = (
    <section className="invoice-section">
      {title && <h1 className="invoice-title">{title}</h1>}
      {preItems.map((el, i) => {
        if (el.type === 'paragraph') {
          return <p key={`p${i}`} dangerouslySetInnerHTML={{ __html: el.text }} />
        }
        if (el.type === 'inset') {
          if (!Renderer) return null
          const insetBlock = block.getInset(el.refId)
          if (!insetBlock) return null
          return <Renderer key={`i${i}`} blocks={[insetBlock]} />
        }
        return null
      })}
      {items.length > 0 && (
        <div className="invoice-items">
          {items.map((item, i) => (
            <Fragment key={i}>
              {item.title && <h2 className="invoice-item-title">{item.title}</h2>}
              {item.paragraphs.map((p, j) => (
                <p
                  key={`${i}-${j}`}
                  className="invoice-item-detail"
                  dangerouslySetInnerHTML={{ __html: p }}
                />
              ))}
            </Fragment>
          ))}
        </div>
      )}
    </section>
  )

  return { docxBody, previewJsx }
}

/**
 * Format a date value for invoice display. Coerces JS Date objects
 * (yaml-parsed ISO strings get auto-promoted) to ISO YYYY-MM-DD before
 * formatting. Stage 6.0b safety net — Stage 6.1 will replace this
 * with a `<DateText>` builder + IR-level Date coercion.
 */
function formatInvoiceDate(value) {
  if (value == null) return ''
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return ''
    // YYYY-MM-DD using UTC components so dates that came from a YAML
    // `2026-03-31` (no time) don't get shifted by the local timezone.
    const y = value.getUTCFullYear()
    const m = String(value.getUTCMonth() + 1).padStart(2, '0')
    const d = String(value.getUTCDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }
  return String(value)
}

// ---------------------------------------------------------------------------
// Section component
// ---------------------------------------------------------------------------

export default function Invoice({ content, block }) {
  const bd = content?.__bd
  const kind = bd?.kind || 'body'

  // The cover/line-items/totals slices share the same JSX tree for
  // preview and docx — no per-format duplication.
  let unifiedTree = null
  if (bd) {
    if (kind === 'cover') unifiedTree = <CoverSlice bd={bd} />
    else if (kind === 'line-items') unifiedTree = <LineItemsSlice bd={bd} />
    else if (kind === 'totals') unifiedTree = <TotalsSlice bd={bd} />
  }

  if (unifiedTree) {
    useDocumentOutput(block, 'docx', unifiedTree)
    useDocumentOutput(block, 'html', unifiedTree)
    return <section className={`invoice-section invoice-${kind}`}>{unifiedTree}</section>
  }

  // Fallback: payment / body / unknown — flat paragraphs of the rendered prose.
  const { docxBody, previewJsx } = PlainProseSlice({ content, block })
  useDocumentOutput(block, 'docx', docxBody)
  useDocumentOutput(block, 'html', previewJsx)
  return previewJsx
}
