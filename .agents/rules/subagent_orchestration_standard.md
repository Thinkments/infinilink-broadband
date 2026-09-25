# Standardized 5-Agent Workspace Orchestration

## Purpose
Establishes a uniform subagent architecture across all Thinkments and client workspaces so that every project shares identical role boundaries, delegation chains, and tool scoping.

## Core Subagent Suite

| Handle | Name | Domain & Mission | Allowed Tools |
| :--- | :--- | :--- | :--- |
| **`@scout`** | `scout_intelligence_ingestion` | Web search, link content extraction, resume parsing, competitor recon, and structured JSON formatting. | `search_web`, `read_url_content`, `view_file`, `search_directory`, `find_file` |
| **`@vault`** | `vault_google_drive_sync` | Google Drive API, Docs, Sheets, and SQLite knowledge vault sync. Validates tokens prior to execution. | `view_file`, `create_file`, `edit_file`, `run_command`, `list_directory` |
| **`@creative`** | `creative_media_synthesizer` | Marketing copy, landing page sections, HeyGen avatar video briefs, social posts (GBP/YouTube), and SVG visual assets. | `view_file`, `create_file`, `edit_file`, `generate_image` |
| **`@sentinel`** | `sentinel_health_security_auditor` | Process auditor, headless safety validator, `.env` / OAuth key verifier, and repository health inspector. | `view_file`, `search_directory`, `run_command`, `list_directory` |
| **`@dispatcher`** | `dispatcher_deployment_publisher` | Deployment to Netlify/Git, video uploading to YouTube, updating run ledgers, and firing notification webhooks. | `view_file`, `run_command`, `create_file`, `edit_file` |

## Standard Delegation Chain
1. **Intake / Recon**: Route raw external research, document parsing, or data ingestion to `@scout`.
2. **Asset Synthesis**: Hand scout output to `@creative` for media, copy, or UI generation.
3. **Storage & Sync**: Ensure `@vault` deposits deliverables into the Google Drive taxonomy and updates tracker sheets.
4. **Health Gate**: Verify via `@sentinel` that all background tasks and scripts follow non-blocking headless safety.
5. **Publishing**: Route final code or media deployment through `@dispatcher`.

## Scaffolding Protocol for New Workspaces
Whenever a new workspace is created, run:
```powershell
python standard_subagents.py --scaffold <path_to_workspace>
```
to automatically scaffold `.agents/rules/standard_subagents.md` and `.agents/subagents_manifest.json`.
