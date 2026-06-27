# Story Magic — Product Requirements Document

## Overview

Story Magic is an AI-powered storybook creator for children aged 6–12. Users choose a character, setting, and theme, and the app generates a fully illustrated story using Claude AI for text and DALL-E 3 for images, exported as a printable PDF storybook.

## Goals

- Make storytelling accessible and fun for kids and parents
- Produce a visually polished, downloadable storybook with illustrations
- Keep the creation experience magical and easy (under 5 clicks to a story)

## Target Users

- Parents creating personalised stories for their children
- Teachers wanting custom reading material
- Kids aged 6–12 exploring creative storytelling

## User Stories

| As a... | I want to... | So that... |
|---|---|---|
| Parent | Select a character and setting | The story feels personal to my child |
| Parent | Choose a theme or moral | The story teaches something valuable |
| User | See illustrations on each page | The storybook feels like a real book |
| User | Download the story as a PDF | I can print it or read it offline |
| User | View my story history | I can re-read or re-download past stories |

## Features

### Core (Complete)
- Character, setting, and theme selection
- Multi-page story generation via Claude AI
- Per-page illustration generation via DALL-E 3
- Magic book UI with CSS animations (twinkle stars, floating book, shimmer)
- PDF export in landscape A4 storybook format (ReportLab)
- Story history tracker saved to Excel
- Stories saved as JSON files locally

### Planned
- Custom character name and description input
- Age-appropriate reading level selector
- Audio narration via text-to-speech
- Print-on-demand integration

## Non-Goals

- Not suitable for adult content — strictly kid-safe prompts
- Does not store images server-side after PDF generation

## Tech Stack

Python · Streamlit · Anthropic Claude API · OpenAI DALL-E 3 · ReportLab · openpyxl

## Design System

Deep space magic theme: `#0d0520` → `#1a0a3e` radial gradient. Fonts: Fredoka One (headings), Nunito (body), Cinzel (buttons). Gold accent `#d4af37`, purple `#7b2fa8`.
