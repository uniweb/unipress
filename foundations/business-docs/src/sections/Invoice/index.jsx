/**
 * Invoice slice — renders one of the four sub-sections of an invoice
 * document (cover / line-items / totals / payment) with a layout
 * appropriate to the slice. The foundation's `props` handler pre-
 * computes `content.__bd` with the raw invoice data, computed totals,
 * and the inferred slice `kind`; this component branches on that.
 *
 * Same JSX feeds the React preview and the docx fragment registered
 * via useDocumentOutput. Brand colors flow through Press's theme
 * channel — no inline hex literals here.
 *
 * Stage 5b of kb/framework/plans/press-professional-docx.md.
 */
import { Fragment } from 'react'
import { useDocumentOutput } from '@uniweb/press'
import {
  H1,
  H2,
  Paragraph,
  TextRun,
  Table,
  Tr,
  Td,
  cm,
} from '@uniweb/press/docx'
import { getChildBlockRenderer } from '@uniweb/kit'
import { formatCurrency, formatDateRange } from '../../utils/format.js'

// Default Proximify-aligned palette. Site-level theme.yml or document
// configuration can override. The Stage 5a Press theme channel reads
// these keys; the foundation passes them through compile options.
// (Wiring the per-site theme override is in compile-options.js.)
const FALLBACK_HEX = {
  accent: '4775B2',
  body: '3B3B3B',
  muted: '757575',
  softBorder: 'BFD3ED',
  surface: 'FFFFFF',
}

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
      <Paragraph data-spacing-after={240}>
        <TextRun bold size={56} color="accent" font="heading">
          INVOICE
        </TextRun>
      </Paragraph>

      <Table widths={[50, 50]} borders={borderless()}>
        <Tr>
          <Td borderBottom="none">
            <Paragraph>
              <TextRun bold color="muted">FROM</TextRun>
            </Paragraph>
            {vendor?.organization && (
              <Paragraph>
                <TextRun bold color="body">{vendor.organization}</TextRun>
              </Paragraph>
            )}
            {vendor?.address && (
              <Paragraph>
                <TextRun color="body">{vendor.address}</TextRun>
              </Paragraph>
            )}
          </Td>
          <Td borderBottom="none">
            <Paragraph>
              <TextRun bold color="muted">BILL TO</TextRun>
            </Paragraph>
            {client.organization && (
              <Paragraph>
                <TextRun bold color="body">{client.organization}</TextRun>
              </Paragraph>
            )}
            {client.contact && (
              <Paragraph>
                <TextRun color="body">{client.contact}</TextRun>
              </Paragraph>
            )}
            {client.email && (
              <Paragraph>
                <TextRun color="body">{client.email}</TextRun>
              </Paragraph>
            )}
          </Td>
        </Tr>
      </Table>

      <Paragraph data-spacing-before={200} data-spacing-after={120}>
        {invoice?.number && (
          <>
            <TextRun bold color="muted">INVOICE NUMBER</TextRun>{' '}
            <TextRun bold color="body">{invoice.number}</TextRun>
            {'   '}
          </>
        )}
        {invoice?.issued && (
          <>
            <TextRun bold color="muted">ISSUED</TextRun>{' '}
            <TextRun color="body">{String(invoice.issued)}</TextRun>
            {'   '}
          </>
        )}
        {invoice?.due && (
          <>
            <TextRun bold color="muted">DUE</TextRun>{' '}
            <TextRun color="body">{String(invoice.due)}</TextRun>
          </>
        )}
      </Paragraph>

      {invoice?.period && (
        <Paragraph data-spacing-after={120}>
          <TextRun bold color="muted">PERIOD</TextRun>{' '}
          <TextRun color="body">
            {formatDateRange(invoice.period, { locale: 'en-CA' })}
          </TextRun>
        </Paragraph>
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
              <TextRun bold color="surface">{label}</TextRun>
            </Paragraph>
          </Td>
        ))}
      </Tr>
      {items.map((item, i) => (
        <Tr key={i}>
          <Td valign="center">
            <Paragraph>
              <TextRun color="body">{item.description}</TextRun>
            </Paragraph>
            {item.period && (
              <Paragraph>
                <TextRun color="muted">
                  {formatDateRange(item.period, { locale: 'en-CA' })}
                </TextRun>
              </Paragraph>
            )}
          </Td>
          <Td valign="center">
            <Paragraph data-alignment="right">
              <TextRun color="body">{String(item.qty ?? '')}</TextRun>
            </Paragraph>
          </Td>
          <Td valign="center">
            <Paragraph data-alignment="right">
              <TextRun color="body">{fmt(item.unit_price)}</TextRun>
            </Paragraph>
          </Td>
          <Td valign="center">
            <Paragraph data-alignment="right">
              <TextRun color="body">{fmt(item.amount)}</TextRun>
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
            <TextRun color="muted">Subtotal</TextRun>
          </Paragraph>
        </Td>
        <Td borderBottom="none">
          <Paragraph data-alignment="right">
            <TextRun bold color="body">{fmt(totals.subtotal)}</TextRun>
          </Paragraph>
        </Td>
      </Tr>
      {totals.tax_amount > 0 && (
        <Tr>
          <Td colSpan={3} borderBottom="none">
            <Paragraph data-alignment="right">
              <TextRun color="muted">{totals.tax_label}</TextRun>
            </Paragraph>
          </Td>
          <Td borderBottom="none">
            <Paragraph data-alignment="right">
              <TextRun bold color="body">{fmt(totals.tax_amount)}</TextRun>
            </Paragraph>
          </Td>
        </Tr>
      )}
      <Tr>
        <Td colSpan={3} shading="accent" borderBottom="none">
          <Paragraph data-alignment="right">
            <TextRun bold color="surface">Total</TextRun>
          </Paragraph>
        </Td>
        <Td shading="accent" borderBottom="none">
          <Paragraph data-alignment="right">
            <TextRun bold color="surface">{fmt(totals.total)}</TextRun>
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
      {title && <H1 data={title} data-spacing-after={240} />}
      {paragraphsForDocx.map((p, i) => (
        <Paragraph key={`p${i}`} data={p} data-spacing-after={120} />
      ))}
      {items.map((item, i) => (
        <Fragment key={i}>
          {item.title && (
            <H2 data={item.title} data-spacing-before={200} data-spacing-after={120} />
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

// Re-export the fallback hex palette so compile-options.js can pass it
// through Press's theme channel as the default theme.
export { FALLBACK_HEX as INVOICE_FALLBACK_THEME }
