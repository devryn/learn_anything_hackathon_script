# Learning Budget Google Script (Q4 hackathon project)

Source: https://www.benlcollins.com/spreadsheets/marking-template/

This script is synced up to an internal google spreadsheet that details how much each employee
has spent out of their learning budget for the year.

The spreadsheet has a column for the name, slack handle, email address, budget spent, and budget
remaining along with other internal columns that aren't needed for the script to run.

The two columns that make the script run are Submit (Yes/No) and Submit Through (Slack/Email/Both).
Any employees with Yes in the Submit column will receive a notification. Submit Through lets you
choose whether they get a Slack message, an email, or both.

This script is tied to a custom button in the spreadsheet and when you click it, the script runs.
