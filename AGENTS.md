# AGENTS.md

## Purpose

This repository contains the Spontaine marketing website and supporting PageBuilder infrastructure.

The primary goal of current development is the redesign and implementation of the Spontaine website described in `DESIGN.md`.

---

# Document Hierarchy

When instructions conflict, follow this order:

1. `DESIGN.md`
2. `docs/ARCHITECTURE.md`
3. Existing implementation patterns
4. Historical documentation

`DESIGN.md` is the authoritative source for:

- Brand
- Messaging
- Information architecture
- Motion
- Visual design
- Component behavior
- Homepage structure
- Accessibility requirements

Do not introduce design decisions that conflict with `DESIGN.md`.

---

# Working Principles

Before implementing any feature:

1. Read the relevant section of `DESIGN.md`.
2. Inspect existing implementations before creating new ones.
3. Prefer extending existing components over creating new abstractions.
4. Preserve accessibility and responsive behavior.
5. Keep implementation aligned with established architecture.

When uncertain:

- Prefer consistency over creativity.
- Prefer explicitness over abstraction.
- Prefer existing patterns over new patterns.

---

# Technology Stack

## Backend

- Laravel 11
- PHP 8.2
- Inertia.js

## Frontend

- React 18
- TypeScript
- Tailwind CSS
- Radix UI
- Motion (motion.dev)
- GSAP (only where justified)

---

# Architecture Overview

The application uses two page systems:

## Static Marketing Pages

Purpose-built React pages.

Examples:

- Homepage
- Architecture
- Solutions
- Pricing
- Company pages

These pages are handcrafted and should not be forced into PageBuilder patterns.

## Dynamic PageBuilder Pages

CMS-managed content pages powered by PageBuilder.

Used when content editing by non-developers is required.

Maintain compatibility with existing PageBuilder architecture.

---

# Design System Rules

All design decisions must come from:

- `DESIGN.md`
- design tokens
- shared UI components

Do not:

- Hardcode colors
- Hardcode spacing systems
- Invent typography scales
- Invent animation timings
- Invent motion curves

If a required token does not exist, document the gap instead of creating an arbitrary value.

---

# Styling Rules

## Tailwind First

Use Tailwind utilities whenever possible.

Avoid:

- Feature-specific CSS files
- Page-specific CSS systems
- Large custom stylesheets
- Inline styles

Custom CSS should be limited to:

- Design tokens
- Global styles
- Utilities that cannot reasonably be expressed in Tailwind

---

# React Standards

- Use TypeScript strict typing.
- Use PascalCase component names.
- Use readonly props.
- Extract business logic into hooks.
- Keep components focused on a single responsibility.
- Prefer composition over inheritance.
- Prefer reusable primitives over duplicated markup.

---

# Laravel Standards

- Use strict typing.
- Use Form Requests or DTOs for validation.
- Use dependency injection.
- Use Eloquent over raw queries.
- Keep business logic in services.
- Keep controllers thin.

---

# PageBuilder Rules

When working inside PageBuilder:

- Preserve existing data structures.
- Preserve multilingual content structures.
- Preserve reducer patterns.
- Do not directly mutate block data.

Required reducer actions:

- INSERT
- UPDATE
- INSERT_INTO_LIST
- REMOVE_LIST_ITEM

Follow existing patterns from similar blocks.

---

# Navigation System

The navigation system is managed through:

- NavMenuRepository
- ManageNavMenu
- NavEditorController

Navigation data is globally shared through Inertia.

Do not bypass established menu management flows.

---

# Accessibility Requirements

Minimum target:

- WCAG 2.2 AA

Always maintain:

- Keyboard accessibility
- Focus visibility
- Touch targets ≥44px
- Semantic markup
- Reduced-motion support

Accessibility regressions are considered bugs.

---

# Performance Requirements

Maintain:

- Fast initial page load
- Minimal layout shift
- Mobile-first responsiveness
- Efficient animations

Do not introduce:

- Scroll-jank
- Excessive client-side state
- Large animation libraries
- Unnecessary re-renders

---

# Testing Expectations

For meaningful changes:

- Add or update tests where appropriate.
- Preserve existing test coverage.
- Verify responsive behavior.
- Verify accessibility behavior.

Run:

- php artisan test
- npm run build

before considering work complete.

---

# Development Commands

## Frontend

npm run dev
npm run build
npm run lint

## Backend

composer dev
php artisan serve
php artisan test

---

# Open Decisions

Do not invent values for unresolved business or design decisions.

Refer to `DESIGN.md` open decisions section.

If implementation depends on an unresolved decision:

- Use a clearly documented placeholder.
- Call out the dependency.
- Do not make the decision on behalf of the business.

---

# Documentation Maintenance

When introducing a significant new pattern:

- Update relevant documentation.
- Keep architecture documents current.
- Do not duplicate information across multiple files.

`DESIGN.md` remains the single source of truth for design and product experience.
