export default function titleFromNoteExtractor(note) {
  return note.length <= 55 ? note : `${note.substring(0, 52)}...`
}
