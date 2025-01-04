## Next.js Christmas Practice

Will be messing around trying to create a dashboard where user's can submit a text, and have it scored for how likely it is that it is AI-generated.

Admin's can see user uploads and scores and flag(?) uploads.

User's can upload or write in text and receive a score for AI probability that is saved to DB.
User can also manage uploads (CRUD)

### Currently Implemented:

User can upload .txt files or write/paste text and receive a score
User can navigate to /uploads page and see their previous uploads

Admin can see all users

### Backlog:

USER:
Uploads are more compact -> View Text Button opens modal with text instead of displaying by default
User can edit/delete uploads
User can see Admin flags
Dashboard Button Notification if unread flags?

ADMIN:
Admin can see user's uploads
-> Admin clicks user's username
--> Modal opens showing uploads in compact version (this should show time/date + score)
---> Admin can click on View More on a specific upload and see that upload's full text
----> From here, admin can flag the upload to notify user that they need to check it etc.
