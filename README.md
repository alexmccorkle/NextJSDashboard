## Next.js Christmas Practice

Will be messing around trying to create a dashboard where user's can submit a text, and have it scored for how likely it is that it is AI-generated.

Admin's can see user uploads and scores and flag(?) uploads.

User's can upload or write in text and receive a score for AI probability that is saved to DB.
User can also manage uploads (CRUD)

### Currently Implemented:

User can upload .txt files or write/paste text and receive a score
User can navigate to /uploads page and see their previous uploads
Uploads are more compact -> View Text Button opens modal with text instead of displaying by default

Admin can see all users
Admin can see user's uploads
When clicking View Text, the full submission text is displayed as a modal, which includes Date, Username and Word Count.

### Backlog:

USER:
User can edit/delete uploads
User can see Admin flags
Dashboard Button Notification if unread flags?

ADMIN:

- Will implement sorting soon!
- Will add a button(s) for option of flagging as "Suspicious" or "Definitely human!"
