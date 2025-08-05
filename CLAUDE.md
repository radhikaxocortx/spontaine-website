# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Spontaine Website Design brief

To design for Spontaine’s website, first understand the world of our user: a business leader (CEO, COO, GM) drowning in fragmented data from a dozen different systems. They make multi-million dollar decisions based on slow, conflicting, and untrustworthy reports compiled manually by their teams. Spontaine is the intervention. We are a Decision Intelligence platform that plugs into this chaos and unifies it. Our core technology, an AI Semantic Layer, makes sense of their unique business logic, providing trustworthy, hallucination-free answers, enabling not just a single source of truth, but infinite extensions into a world of SI driven transformation. We are ruthlessly focused on the 80/20 principle—delivering 80% of the business value from 20% of initiatives, and our unification, KPI design and advanced ML workflows are structured to deliver results in weeks, not years. Your design must embody this transformation from chaos to clarity, from anxiety to confident control.

## Our Design Philosophy (The Strategic 'Why')

Our design is a direct reflection of our product's ethos: Intelligence, Confidence, and Precision. We believe true intelligence is the art of elimination—removing all noise to reveal the essential signal. We are confident in our product's value, so our design doesn't need to shout with flashy effects or marketing gimmicks. We believe in precision, meaning every element has a purpose and a place, creating a sense of subconscious trust and reliability. Most importantly, we respect our users' time and intelligence; we don't waste their clicks or their cognitive load. Therefore, our design is not just minimalist; it is intentionally reductive. It is engineered to be a calm, authoritative, and powerful experience.

## The Single Most Important Message

Go from Data Chaos to Decision Clarity. In Weeks.

## The Design Mandates (The Rules of the Road)

Layout & Space: Negative Space is the Luxury. The design will feel open, uncluttered, and structured on a flawless grid. We will use huge margins and padding to show confidence and focus the user's attention on what matters.
Imagery & Motion: Abstract, Not Literal. Fluid, Not Flashy.
Imagery:We will use bespoke, beautifully rendered abstract data visualizations and minimalist line icons.
Motion should be subtle and physics-based. It must feel fluid, responsive, and reassuring, like the closing of a luxury car door.

## Target Audience & Desired Perception

SME CXO: Must feel "Finally, clarity and control."
Partner Leader: Must feel "This is a credible, high-value asset."
Investor: Must feel "This is a defensible, scalable vision."

### Execution:

A Strong Grid: The underlying structure must be flawless, like a chassis. Content blocks must align perfectly. This subconscious order creates a feeling of stability and trust.
Subtle, Physics-Based Animation: Finesse is in the motion. Elements should fade in smoothly, not just appear. Buttons should have a subtle, satisfying micro-interaction on hover. Page transitions should be swift and fluid, not jarring. The animation shouldn't be flashy; it should feel like a perfectly weighted car door closing—solid, smooth, and reassuring.
Embrace Emptiness: Don't be afraid of huge margins and padding. A single, powerful sentence in the middle of a vast dark space is far more impactful than a dense paragraph. It shows you value the user's attention.

## Development Commands

### Frontend Development

- `npm run dev` - Start Vite development server
- `npm run build` - Build production assets (both client and SSR)
- `npm run lint` - Run ESLint on frontend code

### Backend Development

- `composer dev` - Start complete development environment (server, queue worker, logs, and Vite)
- `php artisan serve` - Start Laravel development server only
- `php artisan queue:listen --tries=1` - Start queue worker
- `php artisan pail --timeout=0` - View application logs in real-time

### Testing

- `php artisan test` - Run all tests using Pest PHP
- Tests are located in `tests/Feature/` and `tests/Unit/`

### Database

- `php artisan migrate` - Run database migrations
- `php artisan db:seed` - Run database seeders

## Architecture Overview

### Backend Structure

- **Laravel 11** with PHP 8.2
- **Modular Architecture**: Core functionality organized in `modules/` directory

  - `PageBuilder/` - No-code website builder
  - `Permission/` - Role-based access control

- **Main App**: Standard Laravel structure in `app/` with organized controllers, models, and services
- **Spatie Packages**: Uses `laravel-data` for DTOs and `laravel-permission` for authorization

### Frontend Structure

- **React 18** with TypeScript and Inertia.js 2
- **Styling**: Tailwind CSS 3 with Radix UI components and Shadcn
- **Component Organization**:
  - `resources/js/Pages/` - Page components
  - `resources/js/Layouts/` - Layout components
  - `resources/js/components/` - Reusable UI components
  - `resources/js/Modules/` - Feature-specific components
  - `resources/js/hooks/` - Custom React hooks
  - `resources/js/typography/` - Typography components

### Modular System

The project uses a custom module system where each module contains:

- Controllers, Models, Migrations
- Service Providers for registration
- Dedicated routes and configurations
- Self-contained database migrations

## Development Guidelines

### Laravel Best Practices

- Always use Form Requests or Laravel Data DTOs for validation
- Controllers should be final and read-only classes
- Use dependency injection instead of manual instantiation
- Wrap database operations in try-catch blocks
- Queue long-running processes like email sending
- Use `Gate::authorize()` for authorization checks
- Prefer Eloquent ORM over raw queries

### React Best Practices

- Use PascalCase for component files
- All props should be marked as readonly
- Create custom hooks for business logic and complex useEffect operations
- Use object destructuring for props
- Follow single responsibility principle for components
- Use logical AND (&&) for conditional rendering
- Organize layouts as dedicated components

### Code Quality

- Follow PSR-12 coding standards for PHP
- Use strict typing: `declare(strict_types=1)`
- TypeScript strict mode enabled for frontend
- ESLint configured for code consistency
- Pest PHP for testing with feature and unit test separation

## Key Workflows

### Page Builder System

- Dynamic page creation with React blocks
- Responsive design controls
- Multilingual content support (English/Malayalam)
- Rich media integration (images, videos)
- Custom form builder capabilities

## Important Configuration Files

- `vite.config.js` - Frontend build configuration with React and Inertia
- `tailwind.config.js` - Design system colors and typography
- `composer.json` - PHP dependencies and custom dev script
- `phpunit.xml` - Test configuration using Pest
- `.cursor/rules/` - Contains detailed coding standards and best practices

## Testing Strategy

- Feature tests for HTTP endpoints and user workflows
- Unit tests for individual components and services
- Use Pest PHP syntax for clean, readable test cases
- Database transactions for test isolation

## Laravel Project Structure

### Project Structure

- **Use Laravel's default folders (Controllers, Models, Services, Requests, etc.). Inside each folder, group files by feature using subfolders. This keeps related files together and improves maintainability.**

```php
// ❌ Bad: All files mixed together in each folder
app/
  Controllers/
    UserController.php
    PostController.php
    AuthController.php
  Models/
    User.php
    Post.php
    Comment.php
  Services/
    UserService.php
    PostService.php
    AuthService.php
  Requests/
    StoreUserRequest.php
    UpdatePostRequest.php
    LoginRequest.php

// ✅ Good: Grouping by feature within each default folder
app/
  Controllers/
    User/
      UserController.php
      AuthController.php
    Post/
      PostController.php
    Comment/
      CommentController.php
  Models/
    User/
      User.php
    Post/
      Post.php
    Comment/
      Comment.php
  Services/
    User/
      UserService.php
    Post/
      PostService.php
    Auth/
      AuthService.php
  Dtos/
    User/
      UserData.php
    Post/
      PostData.php
    Auth/
      LoginData.php
  Requests/
    User/
      StoreUserRequest.php
    Post/
      UpdatePostRequest.php
    Auth/
      LoginRequest.php
```

### When to Use Modules

- **For very large projects, multi-team environments, or when features are highly independent, consider using a modular structure.**
- Modules help encapsulate all files related to a feature (controllers, models, services, requests, etc.) in a single directory, improving scalability and separation of concerns.
- Laravel modules can be managed manually or with packages like [`nwidart/laravel-modules`](https://nwidart.com/laravel-modules/).

```php
// ✅ Example: Modular structure for large/complex projects
app/
  Modules/
    Blog/
      Controllers/
        BlogController.php
        PostController.php
        CommentController.php
      Models/
        Blog.php
        Post.php
        Comment.php
      Services/
        BlogService.php
        PostService.php
        CommentService.php
      Dtos/
        BlogData.php
        PostData.php
        CommentData.php
      ValueObjects/
        Email.php
        Money.php
      Enums/
        UserRole.php
        Status.php
      Requests/
        StoreBlogRequest.php
        CreatePostRequest.php
        UpdateCommentRequest.php
    Auth/
      Controllers/
        AuthController.php
      Services/
        AuthService.php
      Dtos/
        LoginData.php
      ValueObjects/
        Uuid.php
      Enums/
        AuthStatus.php
      Requests/
        LoginRequest.php
```

> Use modules when your project is large enough that feature boundaries are clear and teams or developers can work independently on different modules.

```php
// ✅ Example: Flat structure for smaller projects
app/
  Controllers/
    User/
      UserController.php
      AuthController.php
    Post/
      PostController.php
    Comment/
      CommentController.php
  Models/
    User/
      User.php
    Post/
      Post.php
    Comment/
      Comment.php
  Services/
    User/
      UserService.php
    Post/
      PostService.php
    Auth/
      AuthService.php
  Dtos/
    User/
      UserData.php
    Post/
      PostData.php
    Auth/
      LoginData.php
  ValueObjects/
    Email.php
    Money.php
  Enums/
    UserRole.php
    Status.php
  Requests/
    User/
      StoreUserRequest.php
    Post/
      UpdatePostRequest.php
    Auth/
      LoginRequest.php
```

---

## React + Inertia Best Practices

- Use **PascalCase** for all components
- All props must be **Readonly** with strict types
- Abstract logic into **custom hooks** (`/hooks`)
- Keep components **stateless** where possible
- Separate **UI** vs **logic** layers (e.g., use `UIBuilderPage.tsx` vs logic hook)
- Structure UI into **atomic design**: Page → Section → Block → Element
- Animate using **Framer Motion** or **GSAP** with physics-based curves
- Favor **server-side rendering** via Inertia to maintain SSR benefits

---

## Page Builder Architecture

### Data Model

- `PageBuilderCreate.tsx`: Metadata, blocks array, status, multilingual content
- `page_interfaces.ts`:
  - `PageBlock`: ID, position, block name
  - `BlockConfiguration`: padding, margin, responsive sizes
  - `TextData`: English + Malayalam
  - `BlockImage`, `BlockVideo`, `ItemListField`, `LinkData` for typed content

### Directory Layout

```
/resources/js/Modules/PageBuilder
├── Blocks                # Each block UI + config
├── Components            # Reusable components
├── Pages                 # PageBuilderCreate, Edit, Index, etc.
├── hooks                 # Custom logic for drag-drop, config, etc.
```

### Key Components

- `UIBuilderPage.tsx`: Block UI creation
- `ViewBuilderPage.tsx`: Read-only page preview

### Features

- Fully responsive controls (mobile → desktop)
- Padding, margin, alignment, flex/grid toggles
- Block reordering, deletion, duplication
- Deep multilingual support

---

## Custom Navbar Architecture

The navbar system is a sophisticated, multilingual, hierarchical navigation with both content management and responsive rendering capabilities.

### Data Structure

**Database Model** (`modules/PageBuilder/Models/UIBuilder/NavMenuItem.php`):
```php
protected $fillable = [
    'title',              // English menu title
    'title_malayalam',    // Malayalam translation
    'is_link',           // 1=direct button/link, 0=dropdown with subitems
    'link_info',         // JSON: {link: string, external: boolean}
    'items',             // JSON: nested menu structure
    'position',          // Display order
    'created_by',
    'updated_by',
];
```

**TypeScript Interfaces** (`resources/js/Modules/PageBuilder/page_interfaces.ts`):
```typescript
interface NavMenu extends Model {
  title: string
  title_malayalam: string | null
  items: NavMenuSection        // Nested menu structure
  is_link: 1 | 0              // Link vs dropdown
  link_info: LinkData | null   // URL and external flag
  position: number
}

interface NavMenuSection {
  lastUUID: number
  items: NavSectionLinks[]     // Sub-sections with links
}
```

### Component Structure

**Main Navigation Components**:
- `resources/js/Layouts/Navbar/Navbar.tsx` - Root container with logo, auth state
- `resources/js/Layouts/Navbar/NavbarLinks.tsx` - Desktop navigation renderer
- `resources/js/Layouts/Navbar/DropdownMenu.tsx` - Handles dropdowns vs direct links
- `resources/js/Layouts/Navbar/NavLinkItem.tsx` - Individual menu item renderer
- `resources/js/Layouts/Navbar/NavMegaMenu.tsx` - Complex multi-column dropdowns
- `resources/js/Layouts/Navbar/MobileNav/` - Mobile-specific navigation

**Admin Management Interface**:
- `resources/js/Pages/PageBuilder/NavEditorPage.tsx` - Admin entry point
- `resources/js/Modules/PageBuilder/NavEditor/NavEditor.tsx` - Visual editor
- `resources/js/Modules/PageBuilder/NavEditor/Forms/` - CRUD forms for menu items

### Backend Management

**Controllers & Services**:
- `modules/PageBuilder/Controllers/NavEditor/NavEditorController.php` - CRUD operations
- `modules/PageBuilder/Repository/NavMenu/NavMenuRepository.php` - Database layer
- `app/Services/NavMenu/ManageNavMenu.php` - Business logic

**Data Sharing**:
Navigation data is globally shared via `app/Http/Middleware/HandleInertiaRequests.php`:
```php
'nav' => fn () => app(NavMenuRepository::class)->getAll()
```

### Key Features

**Multilingual Support**:
- Full English/Malayalam content management
- `Localization` component handles dynamic text rendering
- Language switching in admin interface

**Responsive Design**:
- Separate desktop (`NavbarLinks`) and mobile (`MobileNav`) implementations
- Mega menus with dynamic positioning to stay within viewport
- Touch-friendly mobile interactions

**Content Management**:
- Visual drag-and-drop editor for menu structure
- Real-time preview and section management
- Form validation via `NavMenuFormRequest.php`
- Soft deletes for menu items

**Rendering Logic**:
- Menu items with `is_link=1` render as buttons/direct links
- Menu items with `is_link=0` and subitems render as dropdowns
- Hover-based mega menus with intelligent positioning
- Accessibility-compliant markup with ARIA labels

**Architecture Benefits**:
- Clean separation between data management (Laravel) and presentation (React)
- Type-safe interfaces throughout the stack
- Modular component structure for maintainability
- Global state management via Inertia shared props

---

## CSS and Styling Guidelines

### General Principles
- **Use px instead of rem** as much as possible for precise, predictable sizing
- **Use Tailwind classes** as much as possible before creating custom CSS
- **Create responsive blocks** as a general rule - all components should work across screen sizes
- **Avoid inline styles** - create CSS classes in `resources/css/app.css` instead

### Responsive Design Rules
- Always implement responsive breakpoints: `sm:` (640px+), `md:` (768px+), `lg:` (1024px+), `xl:` (1280px+)
- Use responsive Tailwind classes for spacing, typography, and layout
- Test components on mobile, tablet, and desktop viewports
- Use `clamp()` for fluid typography when necessary, but prefer discrete breakpoints

### CSS Organization
1. **Tailwind First**: Use existing Tailwind utilities before writing custom CSS
2. **Custom Classes**: When custom CSS is needed, create semantic class names in `app.css`
3. **Component-Specific**: Group related styles under component-specific sections
4. **Responsive**: Include responsive variations for all custom classes

### Typography Guidelines
- Use px values for font sizes: `text-[14px]`, `text-[16px]`, `text-[24px]`
- Implement responsive typography with Tailwind breakpoints
- Leverage custom font families defined in `tailwind.config.js`
- Ensure proper line-height and letter-spacing for readability

### Layout Guidelines
- Use Tailwind grid and flexbox utilities
- Implement consistent spacing with px-based Tailwind classes
- Create responsive padding/margin with breakpoint prefixes
- Ensure proper alignment and distribution across screen sizes

---

## Static Home Page vs Dynamic Page Builder Architecture

### Overview

The application uses a dual approach: a static, hardcoded home page for performance and control, while enabling dynamic page creation through the page builder system for all other pages.

### Static Home Page System

**Purpose**: Maintain a fast, controlled home page experience with handcrafted sections.

**Key Components**:
- `StaticHomePage.tsx` - Contains all hardcoded home sections (Hero, CompanyLogos, SectionAI, etc.)
- `HomePage.tsx` - Simple wrapper component for the static home
- `HomePageController.php` - Dedicated controller returning static home page
- Route: `Route::get('/', HomePageController::class)->name('home')`

**Benefits**:
- Zero database queries for home page loading
- Complete design control over main landing experience
- Premium smooth scroll implementation
- Optimized performance

### Dynamic Page Builder System

**Purpose**: Enable creation and management of all other website pages through the admin interface.

**Key Components**:
- `ViewBuilderController.php` - Handles dynamic page rendering from database
- `ViewBuilderPage.tsx` - Renders pages built with the page builder
- `AppLayout.tsx` - Generic layout wrapper accepting children
- Route: `Route::get('{slug}', ViewBuilderController::class)`

**Features**:
- Database-driven content management
- Block-based page construction
- Multilingual support (English/Malayalam)
- Admin editing interface
- Published/draft status control

### Routing Architecture

```php
// Static home page - no database lookup
Route::get('/', HomePageController::class)->name('home');

// Dynamic pages - database-driven content
Route::get('{slug}', ViewBuilderController::class)->name('view-builder');
```

**ViewBuilderController Logic**:
- Redirects any home page requests to static route
- Only serves published pages to public users
- Returns 404 for non-existent pages

### Layout Separation Strategy

**AppLayout**: Generic layout for dynamic pages
- Accepts `children` prop for page builder content
- Provides consistent Navbar/Footer across all dynamic pages
- Maintains smooth scroll functionality

**StaticHomePage**: Self-contained home page layout  
- Includes all hardcoded sections in specific order
- Independent styling and behavior
- No dependency on page builder system

### Development Workflow

**For Home Page Changes**: Edit `StaticHomePage.tsx` directly
**For Other Pages**: Use page builder admin interface (`/pages`)
**For New Blocks**: Add to `resources/js/Modules/PageBuilder/Blocks/`
**For New Static Pages**: Create dedicated controller + component pattern

This architecture ensures optimal performance for the main landing page while providing maximum flexibility for all other content management needs.
