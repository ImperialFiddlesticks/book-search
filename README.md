# FOLIO – A Book Search App

FOLIO is a mobile application built with React Native and Expo that allows the user to search for books through text, voice recordings (exclusively on iOS) or by scanning barcodes. The user can also save favorites, create collections of books, and keep a reading list.

## Techniques and Libraries

- React Native – framework for mobile development
- Expo – development platform
- TypeScript – static typing
- Expo Router – filebased navigation
- Zustand – global state management
- React Query (TanStack Query) – data fetching and caching
- React Native Paper – UI Component Library
- Open Library API – external API for book data
- ApiHub Speech to Text API - external API for speech-to-text conversion

## Project Structure

The app is organized according to Expo Router's file based routing system, where every file in the app/-folder is a screen.

```text
app/
index.tsx # Home Page
details.tsx # Book Details
searchResults.tsx # Search Results
profilePage.tsx # Profile page with Favorites and Collections
scanner.tsx # Barcode Scanner
author/[key].tsx # Author Details

components/ # Reusable UI Components
BookCard.tsx
BookCover.tsx
BookBar.tsx
BookDetails.tsx
Header.tsx
ActionButton.tsx
Save.tsx
Booksearchbar.tsx
Subjects.tsx
Sorting.tsx
Language.tsx
PreviousSearched.tsx

store/ # Zustand-stores for global state
hooks/ # Custom hooks for API calls
types/ # TypeScript type definitions
```

## Functions

- Book Search – search for books by title, author or genre
- Voice-to-text Search – supported on iOS
- Barcode Scanner – scan a book's ISBN barcode with the camera
- Favorites and Collections – save books and sort them into your own collections
- Reading List – keep track of the books you want to read
- Filtering and sorting – filter books by genre and language, sort by relevance, rating or year of publication
- Paginering – search results are displayed with pagination
- Author Pages – see information and works by a specific author
- Book Pages - see information about specific books with links to buy, loan or share with friends.

## Workflow

The project was developed as a group using Git and GitHub for version control and Trello for project planning and task distribution.
The work was divided component-wise where each group member was responsible for different parts of the app. Pull requests were used for code review before changes were merged into the main branch.

## Accessibility

Accessibility was a central part of the project and one of the biggest challenges. Below we list the principles and techniques that were implemented.

### `accessibilityRole`

All interactive elements have been given the correct semantic role:

- "header" on page titles and section headings so screen readers can navigate by headings
- "link" on elements that navigate to another screen (e.g. author names, list titles)
- "togglebutton" on buttons with an on/off state (e.g. the favorite and reading list button)
- "alert" on error messages and empty states so they are announced immediately
- "progressbar" on loading indicators

### `accessibilityLabel` and `accessibilityHint`

Descriptive labels have been added to all interactive elements:

- Book covers get dynamic labels that include title and author: "The Hobbit by J.R.R. Tolkien, 1 of 10"
- Buttons without visible text (icon buttons) have clear labels
- accessibilityHint is used to explain what happens when you tap, e.g. "Opens book details"
- The role name is omitted from the label since the screen reader announces it automatically

### `accessibilityState`

State is communicated to screen readers for interactive elements:

- The favorite and reading list buttons use { checked: true/false } to indicate whether they are active
- The sort menu's open/closed state is communicated with { expanded: true/false }
- The subject filters' selected state is communicated with { checked: true/false }

### `accessibilityLiveRegion`

Dynamic content changes are announced automatically without the user needing to navigate there:

- "polite" on loading indicators – announced when the screen reader is idle
- "assertive" on error messages – interrupts and is announced immediately

### Other accessibility features

- Pagination instead of infinite scroll – a deliberate design choice since pagination is more predictable and easier to navigate for screen reader users. With infinite scroll it is difficult to know where you are in the list.
- Decorative elements are hidden – icons and images that are already described by a surrounding label are hidden with accessibilityElementsHidden and importantForAccessibility="no-hide-descendants" to avoid redundant information
- accessibilityViewIsModal – set on modal dialogs so the screen reader cannot navigate to content behind the modal
- List positions – books in horizontal lists are announced with their position, e.g. "1 of 10", so the user knows how many books there are
- Text and elements follow the WCAG 2.2 contrast checker, making it easy for the user to read texts and elements without straining their eyes. This is beneficial for all potential users but also for individuals with visual impairments.

## Installation and Setup

Install dependencies

```bash
npm install
```

Start the development server

```bash
npx expo start
```
