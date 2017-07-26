INSERT into users (facebook_id, username)
VALUES ($1, $2)
RETURNING id;