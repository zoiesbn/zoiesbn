---
title: "From Color Values to Design Decisions"
description: "How to turn recurring choices about color, spacing, and type into useful design tokens that designers and developers can choose and update with confidence."
author: Zoha Sobhani
lang: en
series: "Building a Design System That Teams Can Actually Use"
series_id: practical-design-systems
series_order: 3
series_total: 10
translation_key: design-system-03-from-color-values-to-design-decisions
previous_article_title: "Before You Build, Audit What You Already Have"
previous_article_url: /blog/audit-before-you-build/
next_article_title: "Building a Button Without Creating Every Possible Variant"
next_article_url: /blog/building-a-button/
reading_time: "7 min read"
layout: blog-series
permalink: /blog/from-color-values-to-design-decisions/
english_url: /blog/from-color-values-to-design-decisions/
persian_url: /fa/blog/from-color-values-to-design-decisions/
image: /assets/media/rightel-design-system-hero.png
article_date: "2026-09-29"
display_date: "September 29, 2026"
cover_alt: "Interface components in the Rightel design system"
---

Imagine a link and a primary button that use the same purple. You want to make links darker so they're easier to read against the page. You change the shared color, and the button changes too.

They happened to use the same color, but you only wanted to change one of them.

I want token names to make those connections clear. When I update a link color, I should know which parts of the interface will change with it.

In the previous post, I covered comparing screens with the component library and deciding which gaps to address first. Once you've identified a recurring problem, the next step is to give its solution a clear rule that other components can use.

## Agree on the rule before naming the token

Working on Rightel's library meant learning the structure behind Material's components, then considering how our additions should fit. Using an existing foundation still left us with decisions about our own product.

Color, spacing, type, and shape are part of that foundation. But a page of swatches and numbers doesn't explain when to choose one over another.

Take a form error. Before choosing a red, decide what needs to communicate the error: the field border, the message, an icon, or a combination. Decide what should stay consistent across forms. Then define values for those roles and check them in context.

A design token gives a reusable value a name; it can also refer to another token instead of repeating the value. That's the basic name-and-value model described by the [Design Tokens Community Group](https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/). It helps you share a decision once you've made it. It won't decide whether the error message is clear.

The names and values below are teaching examples, not an export of Rightel's tokens or Material's naming scheme.

## Separate the color from its job

Suppose the palette contains `palette/purple/600`, with the value `#6B3FA0`. That name identifies a shade. It doesn't tell me whether to use it for a link, a background, or an icon.

I can give those uses separate names:

<div class="audit-table-scroll" role="region" aria-label="Example color tokens and their roles" tabindex="0" markdown="1">

| Token | Value or reference | Purpose |
| --- | --- | --- |
| `palette/purple/600` | `#6B3FA0` | A reusable shade in the palette |
| `color/text/link` | `palette/purple/600` | Text links in their default state |
| `color/background/action` | `palette/purple/600` | The background of the primary action in its default state |

</div>

The palette entry is often called a primitive or reference token. The two names describing a job are semantic tokens. Giving one token the value of another is called an alias.

Now I can point `color/text/link` to a darker shade while leaving the action background alone. If I change the underlying `palette/purple/600` value instead, both roles still change. The connection hasn't disappeared; it's become explicit.

I wouldn't merge roles just because their colors happen to match today. I'd ask whether they should continue changing together.

This also explains why I prefer `color/text/default` over `text/black` for body text. The text has the same job in light and dark themes even when its color changes. The name should survive that change. Each theme still needs its own review of text, background, and contrast.

## Give spacing a reason too

A spacing scale limits the values available. For example, a small system might start with 4, 8, 12, 16, 24, and 32 pixels. These are example choices, not a rule every product must follow.

The scale alone doesn't tell me how far a label should sit from its field.

If that gap repeatedly needs the same treatment, I might define `space/field/label-gap` and connect it to the 8-pixel value. For this example, I'd use it for labels positioned above fields. If later testing calls for a wider gap, I can change that role without also changing every unrelated 8-pixel gap.

But I wouldn't create a new name for every distance on a screen. I'd add a separate token when the same choice comes up repeatedly and needs to change independently of other values. A one-off layout adjustment may only need an existing spacing value and a note explaining the exception.

## A text style needs more than a font size

Two pieces of text can both be 16 pixels and still behave very differently. Weight, line height, font choice, and available width affect how they read and wrap.

I'd start with where the text appears, such as body copy, a field label, or supporting text. Then I'd define the font, size, weight, and line height together. A name like `type/body/default` is useful only if people can tell when to choose it.

In Figma, a text style can hold several typography settings together. Variables can supply reusable values to supported properties, and aliases can connect those variables. Styles and variables can work together; you don't need to replace every style with a variable. [Figma's guide explains that distinction](https://help.figma.com/hc/en-us/articles/15871097384471-The-difference-between-variables-and-styles).

For Persian and English, I'd test actual text in both languages. Matching numeric settings doesn't guarantee matching readability. Check a long label, a two-line message, and mixed text such as a phone number inside a Persian sentence before calling the typography ready.

## Connect the names to an actual screen

I wouldn't start by naming every possible token. I'd take the form from the audit and define around five or six color roles that it actually needs, alongside its repeated spacing and text styles.

Apply them to the component layers, then try changing one decision at a time. Change the link color. Increase the gap between labels and fields. Adjust the supporting-text style. Check both what changes and what stays the same.

If an unrelated element moves or changes color, investigate the shared reference. If nothing changes, check whether that layer is still using a manually entered value.

Only add a component-specific token when it solves a real need. A button may eventually need a separately managed background for a particular state, but a third naming layer isn't a requirement for every value. More tokens mean more choices for someone to understand and maintain.

## Make the connection to code explicit

Creating a variable in Figma doesn't automatically update the website. Agree with a developer on how each role appears in code and how changes move between the two.

For example, `color/text/link` in Figma might map to `--color-text-link` in CSS. The punctuation can differ; the intended use and resolved value should agree. Write down the mapping, which source the team maintains, and how an update reaches the product.

Then review one implemented screen together. Is the link using the intended token? Does the error message use its own text role? Does a longer label still fit? Check the result where people will use it.

For the first pass, I'd keep a small table with the token's name, purpose, value or reference, and an example of where it belongs. If another designer can't choose between two entries, I'd check whether their uses are clearly explained or whether both entries are needed.

In the next post, **Building a Button Without Creating Every Possible Variant**, I'll use these decisions inside a component: which choices belong in variants, which should be properties, and which combinations don't need to exist at all.
