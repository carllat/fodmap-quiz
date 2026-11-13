# DaySteady — Essential Diabetes Charts

Print-ready **8″ × 11″** PDF chart pack for online sale (Etsy, Gumroad, Shopify, etc.).

## What’s included

| # | File | Topic |
|---|------|--------|
| 00 | `00-cover.pdf` | Product cover / pack intro |
| 01 | `01-blood-glucose-targets.pdf` | Blood glucose target ranges |
| 02 | `02-hypoglycemia-action.pdf` | Low blood sugar quick action (15–15) |
| 03 | `03-hyperglycemia-warning.pdf` | High blood sugar & DKA warning signs |
| 04 | `04-carb-counting.pdf` | Carb counting pocket guide |
| 05 | `05-glycemic-index.pdf` | Glycemic index food guide |
| 06 | `06-diabetes-plate.pdf` | Diabetes plate method |
| 07 | `07-a1c-converter.pdf` | A1C ↔ estimated average glucose |
| 08 | `08-insulin-types.pdf` | Insulin types & timing |
| 09 | `09-sick-day-rules.pdf` | Sick day rules |
| 10 | `10-foot-care.pdf` | Daily foot care checklist |
| — | `DaySteady-Essential-Diabetes-Charts-Complete.pdf` | Cover + all 10 charts |

PDFs live in `output/pdf/`.

## Brand

- **Name:** DaySteady  
- **Palette:** deep teal, soft amber, coral alerts, sage accents on warm paper  
- **Type:** Fraunces (display) + Source Sans 3 (body)

## Regenerate PDFs

Requires Google Chrome.

```bash
node charts/generate.mjs
# then optionally rebuild the complete pack:
node charts/bundle.mjs
```

## Selling notes

- Each page includes an educational disclaimer — keep it when you list.
- Market as **educational printables**, not medical advice or treatment plans.
- Suggested listing angles: “diabetes fridge charts”, “T1D/T2D reference pack”, “printable glucose guides”.
- Suggested formats to sell: individual chart PDFs, or the complete 11-page pack.
