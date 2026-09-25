# Headless & Batch Execution Safety Guardrail

## Purpose
Prevents automated pipelines, scheduled tasks (e.g. Windows Task Scheduler, cron), and background batch runners from freezing indefinitely on interactive user prompts or browser OAuth flows.

## Mandatory Invariants

1. **Non-Interactive Detection**:
   - Any script executed via a background runner, scheduled task, or shell redirect (`>> log.txt 2>&1`) must check if it is running in non-interactive mode:
     ```python
     is_headless = not sys.stdin.isatty() or os.environ.get("NON_INTERACTIVE") == "1" or args.non_interactive
     ```

2. **No Infinite OAuth Local Server Waits**:
   - Never call `flow.run_local_server()` without an explicit timeout.
   - Always supply `timeout_seconds=60` (or lower):
     ```python
     creds = flow.run_local_server(port=0, timeout_seconds=60)
     ```

3. **Graceful Degradation When Credentials Are Missing**:
   - In headless mode, if an OAuth token (`token.json`) is missing or invalid, **do not attempt to open a browser window or launch an unmonitored server**.
   - Log a descriptive error advising the user to run the script interactively once in a terminal, and exit or skip gracefully (`sys.exit(0)` with skip warning or clean error code) so subsequent workflow steps can proceed without hanging.

4. **Task Scheduler Hygiene**:
   - When registering automated tasks in Windows Task Scheduler, verify that duplicate tasks targeting the same script do not exist.
   - Configure tasks to kill existing instances if they exceed expected runtimes (e.g. stop after 2 hours).
