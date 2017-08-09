UPDATE decks
SET name = $2, deck_notes = $3, deck_list = $4
WHERE id = $1;