// Turning the CV parser's error code into something a seafarer can act on.
//
// `api/cv-parse` answers with a code, never with prose: the route is one
// endpoint serving five languages, and the phrase belongs where the reader's
// language is known. The codes are the ones that route returns.
//
// Each message says what to do next, because "could not read this CV" leaves
// the reader pressing the same button on the same file — which is exactly what
// the log showed happening, six times in a row.
//
// Kept apart from lib/cvParse.ts on purpose: that file carries the schema
// prompt, and importing it from a client component would ship three kilobytes
// of instructions to the browser for nothing.

import type { Dict } from "@/lib/langs";

export function cvParseError(code: unknown, t: Dict): string {
  switch (code) {
    // Old binary .doc: mammoth reads .docx only, and the file is not broken —
    // it is the wrong format, which the reader can fix in one save.
    case "word_unreadable":
      return t.cvp_doc_old;
    // Parsed fine, held no text: almost always a scan or an image-only PDF.
    case "word_empty":
      return t.cvp_no_text;
    case "unsupported_file":
      return t.cvp_bad_type;
    // Ours, not theirs: the model answered with something unusable, or not at
    // all. Both leave the profile fillable by hand, which the message says.
    case "parse_failed":
      return t.cvp_failed;
    case "api_failed":
    case "request_failed":
      return t.cvp_busy;
    case "missing_api_key":
      return t.sp_cv_missing_key;
    default:
      return t.sp_cv_unreadable;
  }
}
