import type { SupabaseClient } from "@supabase/supabase-js";
import {
  AlignmentType, BorderStyle, Document, HeadingLevel, Packer, Paragraph,
  Table, TableCell, TableRow, TextRun, WidthType,
} from "docx";
import { cvAvailability, cvDate, cvDocument, cvMonth, loadCvData, type CvData } from "@/lib/cvData";
import { type FleetId, FLEETS, fleetHighlights, formatSeaTime, isFleetVoyage } from "@/lib/cvFleets";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Db = SupabaseClient<any, any, any>;

// The seafarer's CV as a real .docx — the one thing the free exports cannot be.
//
// PDF and PNG are finished pictures: a crewing manager who asks for "the same
// CV but in Word" cannot be served from them, and neither can a seafarer who
// wants to change two lines for one application. So this is not a second
// rendering of the same product, it is the editable one.
//
// Built with the `docx` package rather than by writing HTML with a .doc
// extension. Word opens that too, but it is not a Word file: styles collapse,
// tables lose their widths, and what the buyer gets is visibly worse than the
// free PDF they already had.
//
// The data comes from lib/cvData, the same loader the e-mail and the /cv page
// use, so the three cannot drift apart.

const NAVY = "16324F";
const BRASS = "B8860B";
const RULE = "E3E8EE";
const INK = "111827";
const MUTED = "334155";

function heading(text: string): Paragraph {
  return new Paragraph({
    spacing: { before: 280, after: 120 },
    children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 22, color: NAVY })],
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY, space: 4 } },
  });
}

function line(label: string, value: string): TableRow {
  return new TableRow({
    children: [
      new TableCell({
        width: { size: 34, type: WidthType.PERCENTAGE },
        margins: { top: 60, bottom: 60, left: 120, right: 120 },
        borders: cellBorders(),
        children: [new Paragraph({ children: [new TextRun({ text: label, size: 20, color: MUTED })] })],
      }),
      new TableCell({
        width: { size: 66, type: WidthType.PERCENTAGE },
        margins: { top: 60, bottom: 60, left: 120, right: 120 },
        borders: cellBorders(),
        children: [new Paragraph({ children: [new TextRun({ text: value, size: 20, color: INK })] })],
      }),
    ],
  });
}

function cellBorders() {
  const edge = { style: BorderStyle.SINGLE, size: 2, color: RULE };
  return { top: edge, bottom: edge, left: edge, right: edge };
}

function table(rows: TableRow[]): Table {
  return new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows });
}

/** A row of the sea-service table. `head` renders the column titles in bold. */
function voyageRow(cells: string[], head = false, strong = false): TableRow {
  return new TableRow({
    tableHeader: head,
    children: cells.map((text) => new TableCell({
      margins: { top: 60, bottom: 60, left: 100, right: 100 },
      borders: cellBorders(),
      children: [new Paragraph({ children: [new TextRun({ text, size: 18, bold: head || strong, color: head ? MUTED : INK })] })],
    })),
  });
}

/** Build the document. Exported separately from the loader so it can be exercised with fixture data. */
export function cvDocument_(data: CvData, fleet: FleetId | null = null): Document {
  const sf = data.seafarer;
  const body: (Paragraph | Table)[] = [];
  // A fleet turns the general CV into one aimed at that fleet's crewing desk:
  // what they hire on goes to the top, and their vessel types stand out in the
  // sea-service table. Built only from the seafarer's own data.
  const hl = fleet ? fleetHighlights(fleet, data.certificates, data.experience) : null;

  body.push(new Paragraph({
    heading: HeadingLevel.TITLE,
    spacing: { after: 40 },
    children: [new TextRun({ text: data.name.toUpperCase(), bold: true, size: 40, color: NAVY })],
  }));
  if (sf?.rank) {
    body.push(new Paragraph({
      spacing: { after: 160 },
      children: [new TextRun({ text: sf.rank.toUpperCase(), bold: true, size: 24, color: BRASS })],
    }));
  }

  const contacts = [
    data.email ? `Email: ${data.email}` : null,
    sf?.phone ? `Phone / WhatsApp: ${sf.phone}` : null,
    `Availability: ${cvAvailability(sf)}${sf?.nationality ? ` · ${sf.nationality}` : ""}`,
  ].filter(Boolean) as string[];
  for (const c of contacts) {
    body.push(new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: c, size: 20, color: INK })] }));
  }

  if (sf?.about) {
    body.push(new Paragraph({
      spacing: { before: 160, after: 40 },
      children: [new TextRun({ text: sf.about, size: 20, color: MUTED, italics: true })],
    }));
  }

  if (hl && !hl.empty) {
    body.push(heading(`Key qualifications — ${hl.label}`));
    const rows: [string, string][] = [];
    if (hl.months > 0) {
      rows.push([`${hl.label} sea service`, `${formatSeaTime(hl.months)} on the voyages below${hl.vesselTypes.length ? ` (${hl.vesselTypes.join(", ")})` : ""}`]);
    }
    for (const c of hl.certs) {
      rows.push([c.name ?? "—", [c.issuing_authority, cvMonth(c.expiry_date) ? `exp. ${cvMonth(c.expiry_date)}` : null].filter(Boolean).join(" · ") || "valid"]);
    }
    body.push(table(rows.map(([l, v]) => line(l, v))));
  }

  const personal = [
    ["Date of birth", cvDate(sf?.date_of_birth)],
    ["Citizenship", sf?.nationality],
    ["Availability", cvAvailability(sf)],
    ["Rank / Position", sf?.rank],
    ["Phone", sf?.phone],
    ["Email", data.email],
  ].filter(([, v]) => v) as [string, string][];
  if (personal.length) {
    body.push(heading("Personal information"));
    body.push(table(personal.map(([l, v]) => line(l, v))));
  }

  const pushDocuments = () => {
    const documents = [
      ["Foreign passport", cvDocument(sf?.passport_no, sf?.passport_expiry)],
      ["Seaman's book", cvDocument(sf?.seamans_book, sf?.seamans_book_expiry)],
      ["Medical certificate", cvDocument(sf?.medical, sf?.medical_expiry)],
      ["Diploma / CoC", cvDocument(sf?.diploma, sf?.diploma_expiry)],
      ["Schengen visa", sf?.schengen_visa],
      ["US visa", sf?.us_visa],
    ].filter(([, v]) => v) as [string, string][];
    if (documents.length) {
      body.push(heading("Identity documents & visas"));
      body.push(table(documents.map(([l, v]) => line(l, v))));
    }
  };
  const pushCertificates = () => {
    if (data.certificates.length) {
      body.push(heading("Competency & STCW certificates"));
      body.push(table(data.certificates.map((c) => line(
        c.name ?? "—",
        [c.issuing_authority, cvMonth(c.expiry_date) ? `exp. ${cvMonth(c.expiry_date)}` : null].filter(Boolean).join(" · ") || "—",
      ))));
    }
  };
  // Where endorsements decide the hire, they are what is read first.
  if (fleet && FLEETS[fleet].certsFirst) { pushCertificates(); pushDocuments(); }
  else { pushDocuments(); pushCertificates(); }

  if (data.experience.length) {
    body.push(heading(`Sea service history — last ${data.experience.length} voyages`));
    body.push(table([
      voyageRow(["Vessel", "Type", "DWT", "Rank", "Company", "Period"], true),
      ...data.experience.map((e) => voyageRow([
        e.vessel_name ?? "—",
        e.vessel_type ?? "—",
        e.dwt !== null && e.dwt !== undefined ? String(e.dwt) : "—",
        e.rank ?? "—",
        e.company ?? "—",
        e.from_date ? `${cvMonth(e.from_date)} – ${e.to_date ? cvMonth(e.to_date) : "present"}` : "—",
      ], false, !!fleet && isFleetVoyage(fleet, e.vessel_type))),
    ]));
  }

  body.push(new Paragraph({
    spacing: { before: 400 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "seajobs.pro", size: 16, color: MUTED })],
  }));

  return new Document({
    creator: "SeaJobs.pro",
    title: `${data.name} — ${hl ? `${hl.label} CV` : "CV"}`,
    description: "Maritime CV generated on SeaJobs.pro",
    styles: { default: { document: { run: { font: "Calibri", size: 20 } } } },
    sections: [{
      properties: { page: { margin: { top: 720, bottom: 720, left: 720, right: 720 } } },
      children: body,
    }],
  });
}

/** The finished file, ready to hand to the browser. */
export async function buildCvDocx(
  admin: Db,
  seafarerId: string,
  email: string | null,
  fleet: FleetId | null = null,
): Promise<{ buffer: Buffer; filename: string }> {
  const data = await loadCvData(admin, seafarerId, email);
  const buffer = await Packer.toBuffer(cvDocument_(data, fleet));
  // The agency reads the filename before it opens anything, so it says who and
  // for what rather than "cv (3).docx".
  const safe = data.name.replace(/[^\p{L}\p{N} .-]/gu, "").trim() || "Seafarer";
  const rank = data.seafarer?.rank ? ` - ${data.seafarer.rank.replace(/[^\p{L}\p{N} .-]/gu, "")}` : "";
  return { buffer, filename: `${safe}${rank} - CV.docx` };
}
