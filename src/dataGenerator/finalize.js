

export const finalize = (db) => {
    // set contact status according to latest note
    db.contactNotes
        .sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf())
        .forEach(note => {
            db.contacts[note.contact_id].status = note.status;
        });
};
