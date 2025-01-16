# Christmas Project: AI Probability Checker Dashboard

A Next.js project I'm messing around with in order to prepare for an upcoming Bachelor project where we will likely be using Next.js

I wanted to make something similar to the upcoming project, which will be a dashboard for thesis applications. Users would have to be able to apply and admin's would need the capabilities of managing applications. I thought it would be fun to make a Dashboard where users can submit text and recieve a score for their text, while Admin's could oversee users' applications and scores.

Still very much a work in progress, and still very much winging it. Just getting my feet wet before we get started on the real project!

## Deets:

## Tech Stack

- Next.js for the framework
- Prisma as the ORM
- SQLite for the database
- NextAuth.js for authentication

### Users:

- Submit text (or upload a .txt file) and get an AI probability score
- Keep track of all your submissions in your uploads page
- Manage your submissions (full CRUD capabilities coming soon!)
- Uploads have a badge indicator based Admin's flag: Either Human or Definitely AI

### Admins:

- Overview of all users and their submissions
- Compact view of submission details (when it was submitted, who wrote it, word count)
- View More to see the full text that was submitted
- Two-way flagging:
  - "Human"
  - "Definitely AI!"

## Current Features:

- Submit text and get your AI probability score
- Check out your submission history
- Simple, clean interface with modal popups for text viewing
- Admin dashboard with user management

## WIP:

### Users:

- Edit/delete your submissions
- Cooler dashboard features

### Admins:

- Better sorting

---

This code is by no means perfect, but you gotta start somewhere right? :')
