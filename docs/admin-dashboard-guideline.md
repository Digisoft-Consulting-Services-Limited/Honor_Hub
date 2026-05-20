# Honor Hub Admin Dashboard and Memorial Workflow Guideline

This guideline is based on Honor Hub's current project structure and the public workflow visible on ForeverMissed.

## Reference Workflow From ForeverMissed

ForeverMissed uses a simple public-to-private model:

- A public landing page invites users to create a memorial with the loved one's first and last name.
- Visitors can browse public memorials through a memorial gallery.
- Each gallery item shows the honoree name, memorial URL, creator, created date, and a short memorial description.
- A memorial page is built around sections such as tributes, life story, photos/media, stories, program details, hymns/music, and remembrance messages.
- Visitors can participate by leaving tributes, sharing stories, uploading media, or being invited to collaborate.
- The creator/admin controls privacy, who can post, who can edit, notifications, and collaborator roles.

For Honor Hub, the same idea should be adapted into a respectful memorial platform with a clear separation between:

- Public visitor experience
- Guest contributor experience
- Memorial creator dashboard
- Platform/system admin dashboard

## Public Visitor Flow

Unauthenticated users should be able to view memorials without creating an account.

Recommended flow:

1. User lands on the homepage.
2. User can browse featured memorials or search by name.
3. User opens `/memorial/:slug`.
4. App fetches public memorial data using a guest token.
5. User sees the memorial profile header and public sections:
   - Tributes
   - Life
   - Stories
   - Gallery
   - Program
   - Hymns
6. If the memorial allows guest contribution, user can submit a tribute/story/photo.
7. Submitted content should enter a moderation state unless the memorial creator has enabled auto-publish.

Public visitors should never see admin actions such as edit, delete, publish, invite, role management, billing, or privacy controls.

## Guest Contributor Flow

A guest contributor is still unauthenticated, but they can perform limited actions.

Recommended guest actions:

- View public memorials.
- Submit tribute.
- Submit story.
- Upload photo, if enabled.
- RSVP or view program details, if your product later supports events.
- Share memorial link.

Recommended submission rules:

- Require guest name.
- Optional guest email, but recommended if you want notifications or abuse handling.
- Use captcha/rate limiting on public submission forms.
- Store guest content as `pending` by default.
- Allow creator/admin to approve, reject, hide, or delete.

## Memorial Creator Flow

The memorial creator is the person who creates and manages one memorial.

Recommended flow:

1. Creator registers or logs in.
2. Creator starts memorial setup.
3. Creator enters honoree details:
   - First name
   - Last name
   - Date of birth
   - Date of passing
   - Country/location
   - Short memorial message
   - Profile image
   - Cover image
4. Creator chooses visibility:
   - Public
   - Private link only
   - Invite-only
5. Creator chooses contribution settings:
   - Anyone can submit tributes
   - Only invited guests can submit
   - All submissions require approval
   - Auto-publish submissions
6. Creator publishes the memorial.
7. Creator lands in the memorial admin dashboard.

## Creator Admin Dashboard Structure

The creator dashboard should focus on managing one memorial at a time.

Recommended route:

`/dashboard/memorials/:memorialId`

Recommended sidebar sections:

- Overview
- Memorial Profile
- Tributes
- Stories
- Gallery
- Program
- Hymns
- Guests and Invites
- Moderation
- Privacy and Permissions
- Notifications
- Settings

## Dashboard Pages

### Overview

Show the creator the health of the memorial.

Useful cards:

- Total views
- Tributes count
- Pending submissions count
- Gallery items count
- Invited guests count
- Recent activity

Primary actions:

- View public memorial
- Edit memorial
- Invite guests
- Review pending posts

### Memorial Profile

This page edits the main memorial identity.

Fields:

- Honoree full name
- Birth date
- Passing date
- Memorial designation/category
- Biography or short message
- Profile image
- Cover image
- Slug/custom URL

Slug changes should be handled carefully. Keep old slugs as redirects if possible.

### Tributes

This page manages tribute messages.

Actions:

- View all tributes
- Filter by published, pending, rejected, hidden
- Approve pending tribute
- Edit tribute
- Hide tribute
- Delete tribute
- Pin featured tribute

### Stories

Stories are longer than tributes and may include media.

Actions:

- Create story
- Approve guest-submitted story
- Edit story
- Reorder stories
- Feature story
- Hide/delete story

### Gallery

Gallery manages photos and videos.

Actions:

- Upload media
- Approve guest uploads
- Add captions
- Create albums later if needed
- Reorder images
- Set cover/profile image from gallery
- Hide/delete media

### Program

Program is for funeral, memorial service, or celebration-of-life details.

Fields:

- Event title
- Date and time
- Venue
- Address
- Map link
- Order of service
- Speakers
- Livestream link
- Downloadable program file

### Hymns

Hymns can support memorial songs, lyrics, or embedded audio links.

Fields:

- Title
- Artist/composer
- Lyrics or notes
- Audio URL
- Display order

### Guests and Invites

This page manages people invited to view or collaborate.

Actions:

- Invite by email or shareable invite link
- Assign role
- Revoke invite
- Resend invite
- See invitation status

Suggested roles:

- Owner: full control, billing, delete memorial.
- Manager: edit content, approve submissions, invite guests.
- Contributor: add stories/photos/tributes.
- Viewer: view private memorial only.

### Moderation

This should be a focused queue for all guest submissions.

Moderation statuses:

- Pending
- Approved
- Rejected
- Hidden

Moderation actions:

- Approve
- Reject
- Hide
- Delete
- Mark as spam

### Privacy and Permissions

This page controls who can view and who can contribute.

Visibility options:

- Public: appears in search/gallery.
- Unlisted: accessible by direct link, hidden from public gallery.
- Invite-only: requires invite or login.

Contribution options:

- Anyone can submit
- Only invited guests can submit
- No public submissions

Publishing options:

- Auto-publish
- Require approval

### Notifications

Recommended notification controls:

- Notify creator when a tribute is submitted.
- Notify guests when new content is published.
- Birthday reminder.
- Passing anniversary reminder.
- Memorial service reminder.

### Settings

Settings should include destructive and advanced actions.

Fields/actions:

- Memorial status: draft, published, archived.
- Transfer ownership.
- Export memorial data.
- Delete memorial.

## Platform Admin Dashboard

This is different from the creator dashboard. It is for Honor Hub staff/system administrators.

Recommended route:

`/admin`

Platform admin sections:

- All memorials
- All users
- Reported content
- Guest submissions
- Categories/designations
- System analytics
- Abuse/spam controls
- Billing/plans, if needed later

Do not mix platform-admin controls into the creator dashboard.

## Recommended Data Model

Core tables/entities:

- `users`
- `memorials`
- `memorial_members`
- `invites`
- `tributes`
- `stories`
- `gallery_items`
- `program_items`
- `hymns`
- `guest_submissions`
- `notifications`
- `activity_logs`

Important fields:

`memorials`

- `id`
- `owner_id`
- `slug`
- `first_name`
- `last_name`
- `birth_date`
- `death_date`
- `bio`
- `profile_image_url`
- `cover_image_url`
- `visibility`
- `contribution_policy`
- `moderation_policy`
- `status`
- `created_at`
- `updated_at`

`memorial_members`

- `id`
- `memorial_id`
- `user_id`
- `role`
- `created_at`

`tributes`, `stories`, and `gallery_items`

- `id`
- `memorial_id`
- `author_user_id`
- `guest_name`
- `guest_email`
- `content`
- `media_url`
- `status`
- `approved_by`
- `approved_at`
- `created_at`
- `updated_at`

## Data Flow

### Viewing a Memorial

1. Browser opens `/memorial/:slug`.
2. Frontend asks for a guest token if no token exists.
3. Frontend calls memorial API with guest token.
4. API returns only public-safe memorial data.
5. UI renders memorial sections.

### Submitting a Tribute as Guest

1. Guest opens tribute form.
2. Frontend validates name and message.
3. Frontend sends submission with guest token.
4. Backend stores content as `pending`.
5. Creator receives notification.
6. Creator approves or rejects from dashboard.
7. Approved tribute becomes visible on public memorial.

### Creator Editing Memorial

1. Creator logs in.
2. Backend issues authenticated user session/token.
3. Creator opens dashboard.
4. Frontend fetches private memorial management data.
5. Creator updates content/settings.
6. Backend verifies creator role before saving.
7. Public memorial updates after save or publish.

## Guest Token Recommendation

For Honor Hub, keep the guest access token in memory by default.

Your current `src/lib/GuestUserAuth.ts` approach is good because:

- The token disappears on reload.
- It is not exposed through persistent browser storage.
- It avoids `localStorage`, which is readable by JavaScript if XSS ever happens.
- It keeps `API_KEY` and `APP_SECRET` on the server through `/api/guest-token`.

Use memory storage when:

- The token is only for public/guest API access.
- It can be regenerated easily.
- Losing it on reload is acceptable.
- The token does not represent a real user account.

Use an HttpOnly secure cookie when:

- You need a guest session to survive reloads.
- You want the backend to identify the same anonymous visitor over time.
- You need stronger protection from JavaScript access.
- You are comfortable handling CSRF protection.

Avoid localStorage for access tokens unless there is a strong reason.

Recommended final design:

- Guest API token: in memory.
- Logged-in creator session: HttpOnly, Secure, SameSite cookie if your backend supports it.
- Guest draft form data: sessionStorage only if you want to prevent losing typed text on accidental refresh.
- Invite token from URL: exchange it immediately with the backend, then store resulting session in an HttpOnly cookie or memory depending on whether the invite creates a real session.

## Build Order

Recommended implementation order:

1. Finish public memorial view.
2. Ensure guest token flow is stable through `apiFetch`.
3. Add guest tribute submission with pending moderation.
4. Create creator login/register flow.
5. Add `/dashboard/memorials/:id/overview`.
6. Add profile editing.
7. Add tribute moderation.
8. Add gallery management.
9. Add stories/program/hymns management.
10. Add guests/invites.
11. Add privacy and permissions.
12. Add notifications.
13. Add platform admin dashboard last.

## UX Advice

The dashboard should feel calm, direct, and respectful.

Use:

- A left sidebar for dashboard sections.
- A top bar with memorial name, public/private status, and "View memorial".
- Tables for moderation and content management.
- Small status badges for draft, published, pending, hidden, private, public.
- Confirmation modals for delete/archive actions.
- Empty states that invite action without feeling noisy.

Avoid:

- Marketing-style hero sections inside the dashboard.
- Too many decorative cards.
- Hiding moderation inside each content section only.
- Making visitors create accounts before they can read public memorials.

