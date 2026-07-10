# ARCHITECTURE.md

## Purpose

This document describes the technical architecture of the Spontaine website.

Design, branding, messaging, visual language, motion design, and information architecture are documented exclusively in `DESIGN.md`.

This document focuses on:

- Application architecture
- Data flow
- Page systems
- Component organization
- PageBuilder architecture
- Navigation architecture
- Shared infrastructure
- Development conventions

---

# Technology Stack

## Backend

- Laravel 11
- PHP 8.2
- Inertia.js
- Pest PHP

## Frontend

- React 18
- TypeScript
- Tailwind CSS
- Radix UI
- motion.dev
- GSAP (selectively)

## Build Tooling

- Vite
- ESLint
- Composer

---

# Application Architecture

The website consists of two distinct page systems:

## 1. Static Marketing Pages

Purpose-built React pages.

Examples:

- Homepage
- Architecture
- Pricing
- Solutions
- Company pages

Characteristics:

- Handcrafted layouts
- Design-system driven
- Optimized for marketing and conversion
- Not constrained by PageBuilder architecture

Use this approach by default for core marketing experiences.

---

## 2. Dynamic PageBuilder Pages

CMS-managed content pages.

Characteristics:

- Database-driven
- Editor-managed
- Built from reusable blocks
- Multilingual

Use PageBuilder when non-technical content editing is required.

---

# Routing Architecture

## Static Pages

Handled by dedicated controllers.

Example:

```php
Route::get('/', HomePageController::class)
```

## Dynamic Pages

Handled through:

```php
ViewBuilderController
```

Example:

```php
Route::get('{slug}', ViewBuilderController::class)
```

Responsibilities:

- Resolve page by slug
- Verify publication status
- Render PageBuilder content
- Return 404 when page does not exist

The homepage should never be served through the PageBuilder route.

---

# Backend Structure

## Application Code

```text
app/
├── Http/
├── Models/
├── Services/
├── Repositories/
├── Data/
├── Enums/
└── ValueObjects/
```

## Modules

Large self-contained features are located in:

```text
modules/
```

Examples:

```text
modules/
├── PageBuilder/
├── Permission/
└── OTP/
```

Each module may contain:

- Controllers
- Models
- Migrations
- Routes
- Services
- Configuration

---

# Frontend Structure

```text
resources/js/
├── Pages/
├── Layouts/
├── components/
├── Modules/
├── hooks/
├── typography/
└── lib/
```

## Pages

Top-level route components.

```text
resources/js/Pages/
```

Examples:

- HomePage
- ResourcesList
- Pricing

---

## Layouts

Shared page layouts.

```text
resources/js/Layouts/
```

Examples:

- AppLayout
- Navbar
- Footer

---

## Components

Reusable application-wide components.

```text
resources/js/components/
```

Examples:

- Button
- Modal
- Form controls
- Shared UI primitives

---

## Modules

Feature-specific components.

```text
resources/js/Modules/
```

Examples:

- PageBuilder
- Resource systems
- Lead capture

---

## Hooks

Reusable business logic.

```text
resources/js/hooks/
```

Components should remain focused on rendering.

Business logic belongs in hooks whenever possible.

---

# PageBuilder Architecture

## Purpose

PageBuilder enables non-technical users to create and maintain pages.

---

## Data Model

Pages store structured content as JSON.

```typescript
{
  lastUUID: number,
  blocks: []
}
```

Each block:

```typescript
{
  id: number,
  blockName: string,
  configuration: {},
  data: {}
}
```

---

## Block Requirements

Every block must provide:

### 1. Typed Interface

Defined in:

```text
page_interfaces.ts
```

---

### 2. Safe Defaults

New blocks must include valid default content.

---

### 3. Builder UI

Editor experience.

---

### 4. Renderer

Public-facing output.

---

### 5. Registry Entry

Must be registered in block resolution systems.

---

## State Management

PageBuilder uses reducer-driven state.

Supported actions:

```text
INSERT
UPDATE
INSERT_INTO_LIST
REMOVE_LIST_ITEM
```

Never mutate block data directly.

All updates must flow through reducer actions.

---

## Multilingual Content

Standard structure:

```typescript
{
  english: string
  malayalam: string
}
```

Always preserve both keys.

Never replace multilingual fields with plain strings.

---

# Navigation Architecture

## Overview

Navigation is database-driven.

Navigation data is globally shared through Inertia.

---

## Core Components

Backend:

```text
NavEditorController
ManageNavMenu
NavMenuRepository
```

Frontend:

```text
Navbar
NavbarLinks
NavMegaMenu
MobileNav
```

---

## Homepage Architecture

Homepage-specific storytelling components live under:

resources/js/Homepage/

Homepage components are not PageBuilder blocks.

Homepage components may consume shared UI primitives from:

resources/js/components/ui/

Homepage components should not be placed under:

resources/js/Modules/PageBuilder/

## unless they are genuinely reusable editor-managed blocks.

## Data Model

Navigation items support:

- Direct links
- Dropdowns
- Nested menu structures
- Multilingual content

---

## Rules

Do not bypass:

- ManageNavMenu
- Repository layer
- Existing navigation workflows

Menu data must remain compatible with editor tooling.

---

# Shared Inertia Data

Global data is provided through:

```php
HandleInertiaRequests
```

Examples:

- Navigation
- Footer
- Auth state
- Ziggy routes
- Language information

When adding globally shared data:

1. Add to middleware.
2. Update corresponding TypeScript types.
3. Avoid duplicate client requests.

---

# Media Architecture

## Storage

Public website assets use:

```text
public disk
```

Folders:

```text
images/
videos/
documents/
```

---

## Media Management

Primary UI:

```text
ManageMedia
ManageMediaPage
```

Capabilities:

- Upload
- View
- Download
- Delete

---

## Security Rules

Use secure UUID-based filenames.

Do not expose database IDs in file URLs.

Validate MIME types server-side.

---

# Lead Capture Architecture

## Flow

```text
Lead Form
→ Controller
→ Validation
→ Mail
→ Download / Next Step
```

Primary endpoint:

```text
/send-lead-capture-mail
```

Handled by:

```text
LeadsCaptureController
```

Do not reuse ContactController for lead capture.

---

# SEO Architecture

Public pages provide SEO metadata through:

```php
withViewData([
    'seo' => [...]
])
```

Rendered server-side in:

```text
resources/views/app.blade.php
```

Standard payload:

```php
title
description
image
url
type
noIndex
```

---

# Development Standards

## Laravel

- Use strict typing.
- Use dependency injection.
- Use Form Requests or DTOs.
- Keep controllers thin.
- Use services for business logic.
- Prefer Eloquent over raw SQL.

---

## React

- Use TypeScript strict mode.
- Use readonly props.
- Use PascalCase components.
- Prefer composition.
- Extract business logic into hooks.

---

## Styling

- Tailwind first.
- Reuse design tokens.
- Avoid feature-specific CSS systems.
- Avoid inline styles.

---

# Testing Strategy

## Backend

Use Pest.

Structure:

```text
tests/
├── Feature/
└── Unit/
```

---

## Frontend

Verify:

- Responsive behavior
- Accessibility
- Shared component compatibility

---

# Performance Principles

Maintain:

- Low layout shift
- Mobile responsiveness
- Minimal client-side state
- Efficient animations

Avoid:

- Scroll jank
- Excessive re-renders
- Duplicate data fetching
- Unnecessary abstractions

---

# Extension Recipes

## Add a New Marketing Page

1. Create page component.
2. Add route.
3. Use existing layouts.
4. Use design system components.
5. Follow DESIGN.md.

---

## Add a New PageBuilder Block

1. Create TypeScript interface.
2. Create default data.
3. Create builder component.
4. Create renderer.
5. Register block.
6. Verify multilingual support.

---

## Add Shared Inertia Data

1. Update HandleInertiaRequests.
2. Update TypeScript types.
3. Use shared props.
4. Avoid duplicate API requests.

---

# Source of Truth

Design decisions belong in:

```text
DESIGN.md
```

Technical architecture decisions belong in:

```text
ARCHITECTURE.md
```

When the two documents appear to overlap:

- DESIGN.md governs user experience.
- ARCHITECTURE.md governs implementation.
