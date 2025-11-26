# Frequently Asked Questions (FAQ)

## General Questions

### What is EaseSplit?

EaseSplit is a privacy-first, client-side bill splitting application that helps you manage shared expenses with friends, roommates, or travel companions. It runs entirely in your browser without requiring accounts or sending data to servers.

### Is EaseSplit free?

Yes, EaseSplit is completely free and open-source under the MIT License.

### Do I need to create an account?

No! EaseSplit works without any account creation. Just open the app and start splitting bills immediately.

### Where is my data stored?

All your data is stored locally in your browser's local storage. Nothing is sent to external servers (except optional email notifications).

### Can I use EaseSplit offline?

Yes! EaseSplit works completely offline once loaded. All features are available without an internet connection.

## Features & Usage

### How do I create a group?

1. Open EaseSplit
2. Click "Create New Group" or the "+" button
3. Enter group name and description
4. Add members
5. Start adding expenses

### How do I add an expense?

1. Select your group
2. Click "Add Expense"
3. Fill in the details:
   - Description
   - Amount
   - Who paid
   - How to split
   - Category
   - Date
4. Click "Add Expense"

### What splitting methods are available?

- **Equal**: Split evenly among all members
- **Percentage**: Split by custom percentages
- **Shares**: Split by shares (e.g., 2 shares for John, 1 for Jane)
- **Custom**: Specify exact amounts for each person

### How do settlements work?

EaseSplit calculates the optimal way to settle debts with minimum transactions. Go to the "Settlement" tab to see who owes whom and how much.

### Can I export my data?

Yes! You can export your group data in three formats:
- **PDF**: Formatted report for printing
- **CSV**: For use in spreadsheets
- **JSON**: Complete data backup

### How do I import data?

1. Go to Settings tab
2. Click "Import Data"
3. Select your JSON export file
4. Your data will be restored

### Can I edit or delete expenses?

Yes! Click on any expense to edit it, or use the delete button to remove it.

### What categories are available?

EaseSplit includes common categories like:
- Food & Dining
- Transportation
- Accommodation
- Entertainment
- Shopping
- Utilities
- Other

You can also create custom categories in the Category Manager.

## Technical Questions

### What browsers are supported?

EaseSplit works on all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

### What happens if I clear my browser data?

Your EaseSplit data will be deleted. Always export your data regularly as a backup!

### Can I sync data across devices?

Currently, EaseSplit stores data locally per browser. To transfer data:
1. Export from first device (JSON)
2. Import to second device

We're considering cloud sync in future versions.

### Does EaseSplit work on mobile?

Yes! EaseSplit is fully responsive and works great on mobile browsers. There's no native app yet, but you can add it to your home screen as a PWA (Progressive Web App).

### How secure is my data?

Very secure! Your data never leaves your device (except optional email features). Since everything is client-side, there's no server to hack or breach.

## Email & Notifications

### How do email notifications work?

EaseSplit can send email notifications for:
- Expense breakdowns
- Settlement reminders
- Group updates

You need to configure SMTP settings (see [ENVIRONMENT.md](./ENVIRONMENT.md))

### Do I need to provide my email?

No. Email is completely optional. All core features work without email.

### Can I disable emails?

Yes. Simply don't configure SMTP settings, and no emails will be sent.

### What email providers are supported?

Any SMTP provider works:
- Gmail
- Outlook/Office365
- SendGrid
- Mailgun
- Custom SMTP servers

## Privacy & Security

### Do you track my data?

No. EaseSplit has:
- No analytics
- No cookies (except essential ones)
- No tracking pixels
- No data collection

### Is my financial data safe?

Yes! Since everything runs in your browser and nothing is sent to servers, your financial data is completely private.

### Can others see my groups?

No. Your groups and expenses are only visible to you on your device.

### What happens to my data if the site goes down?

Your data is on your device, not our servers. Even if the website is unavailable, your data remains safe in your browser.

## Troubleshooting

### My data disappeared!

Possible causes:
- Browser data was cleared
- Using a different browser or device
- Incognito/private mode (data doesn't persist)

**Solution**: Import your last export backup (if available)

### Calculations seem wrong

1. Check that all members are included in splits
2. Verify split percentages add up to 100%
3. Check for duplicate expenses
4. Try refreshing the page

Still wrong? Report an issue on GitHub with details.

### Export not working

1. Check your browser allows downloads
2. Try a different browser
3. Disable browser extensions temporarily
4. Check browser console for errors

### Can't add expenses

1. Ensure all required fields are filled
2. Check that amount is a valid number
3. Verify at least one member exists
4. Try refreshing the page

### Settlement calculations confusing

The settlement algorithm minimizes transactions. For example:
- John owes $20 to Jane
- Jane owes $20 to Bob
- Settlement: John pays Bob $20 (instead of 2 transactions)

## Contribution & Development

### How can I contribute?

1. Fork the repository
2. Make your changes
3. Submit a pull request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

### I found a bug!

Please report it on [GitHub Issues](https://github.com/your-username/easesplit/issues) with:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Browser and OS version

### Can I request a feature?

Yes! Open a [feature request](https://github.com/your-username/easesplit/issues/new) on GitHub.

### Is there a public roadmap?

Check the GitHub repository for:
- Milestones
- Project boards
- Issues labeled "enhancement"

## Advanced Usage

### Can I customize categories?

Yes! Go to Settings → Category Manager to:
- Add new categories
- Edit existing ones
- Change category colors

### How do I handle complex splits?

For complex scenarios:
1. Use "Custom" split type
2. Specify exact amounts for each person
3. EaseSplit will validate that amounts match the total

### Can I split by different amounts for different people?

Yes! Use the "Custom" or "Shares" split type.

### How do I track recurring expenses?

Currently, you need to add recurring expenses manually each time. Automatic recurring expenses are on the roadmap.

### Can I add notes to expenses?

Yes! When adding/editing an expense, there's a "Notes" field for additional details.

### How do I handle partial payments?

Track partial payments as separate expenses:
1. Create expense for full amount
2. When someone makes partial payment, add it as a payment expense
3. Settlement tab will reflect the updated balance

## Performance

### Why is the app slow?

Possible reasons:
- Large number of expenses (1000+)
- Browser extensions interfering
- Older device or browser

**Try**:
- Export old data and start fresh group
- Disable extensions temporarily
- Use a newer browser version

### How many expenses can I add?

There's no hard limit, but performance may degrade after 1000+ expenses per group. Consider archiving old groups.

### Does EaseSplit use a lot of storage?

No. Even with 100 expenses, data is typically under 1MB.

## Future Plans

### What features are coming?

Planned features:
- PWA (Progressive Web App)
- Cloud sync (optional, encrypted)
- Mobile apps (iOS/Android)
- Multi-currency support
- Recurring expenses
- Receipt photo upload
- Bill splitting from photos (OCR)

### Will there be a paid version?

No plans for a paid version. EaseSplit will remain free and open-source.

### Can I self-host EaseSplit?

Yes! See [DEPLOYMENT.md](./DEPLOYMENT.md) for self-hosting instructions.

## Still Have Questions?

- Check the [Documentation](./README.md)
- Visit [GitHub Discussions](https://github.com/your-username/easesplit/discussions)
- Email us at hello@easesplit.app
- Open an [issue](https://github.com/your-username/easesplit/issues)
