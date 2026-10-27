const BasePage = require('./BasePage')
const { expect } = require('@playwright/test')

class ProfilePage extends BasePage {
    constructor(page) {
        super(page)
        this.page = page

        this.updateResume = '//input[@value="Update resume"]'
        this.updatedText = '.msg'
        this.headlineCard = this.page.locator('.card.mt15').filter({
            has: this.page.locator('.widgetTitle', { hasText: 'Resume headline' })
        })
        this.profileMenuButton = this.page.getByRole('button', { name: 'Open profile menu' })
        this.profileLink = this.page.locator('a[href*="/mnjuser/profile"]').first()
        this.saveButton = this.page.getByRole('button', { name: 'Save', exact: true })
        this.cancelLink = this.page.getByRole('link', { name: 'Cancel', exact: true })
        this.keySkillsQuickLink = this.page.getByRole('button', { name: 'Key skills', exact: true })
        this.keySkillsHeading = this.page.getByRole('heading', { name: 'Key skills', exact: true })
        this.editKeySkillsButton = this.page.getByRole('button', { name: 'Edit key skills', exact: true })
        this.keySkillsForm = this.page.locator('form[name="keySkillsForm"]')
        this.addSkillsInput = this.page.getByRole('combobox', { name: 'Add skills' })
        this.savedSkills = this.page.locator('#lazyKeySkills')
        this.employmentEditButtons = this.page.getByRole('button', { name: /^Edit employment:/ })
        this.jobProfileInput = this.page.getByRole('textbox', { name: /job profile/i })
        this.projectsQuickLink = this.page.getByRole('button', { name: 'Projects', exact: true })
        this.projectEditButtons = this.page.getByRole('button', { name: /^Edit project/i })
        this.projectDetailsInput = this.page.getByRole('textbox', { name: 'Details of project' })
        this.teamSizeSelect = this.page.getByRole('combobox', { name: 'Select team size' })
        this.teamSizeOptions = this.page.locator('#listbox_teamSize')
        this.profileSummaryQuickLink = this.page.getByRole('button', { name: 'Profile summary', exact: true })
        this.profileSummarySection = this.page.getByRole('heading', { name: 'Profile summary', exact: true })
        this.profileSummaryEditButton = this.page.getByRole('button', { name: /Edit profile summary/i })
        this.profileSummaryInput = this.page.getByRole('textbox', { name: /profile summary/i })
    }

    async navigateToProfile() {
        await this.profileMenuButton.click()
        await this.profileLink.click()
    }

    async replaceKeySkill(addSkill, removeSkill) {
        await this.editKeySkillsButton.click()
        await expect(this.addSkillsInput).toBeVisible()

        const addSkillTag = this.keySkillsForm.getByText(new RegExp(`^${addSkill}$`, 'i'))
        if (await addSkillTag.count() === 0) {
            await this.addSkillsInput.fill(addSkill)
            await this.page.getByRole('button', { name: `Add ${addSkill}`, exact: true }).click()
        }

        const removeSkillTag = this.keySkillsForm.getByText(new RegExp(`^${removeSkill}$`, 'i'))
        if (await removeSkillTag.count() > 0) {
            await removeSkillTag.last().locator('xpath=..').getByRole('link', { name: 'Cross' }).click()
        }

        await this.saveButton.click()
        await expect(this.savedSkills.getByText(new RegExp(`^${addSkill}$`, 'i'))).toBeVisible()
        await expect(this.savedSkills.getByText(new RegExp(`^${removeSkill}$`, 'i'))).toHaveCount(0)
    }

    async updateCv(filePath) {
        const [fileChooser] = await Promise.all([
            this.page.waitForEvent('filechooser'),
            this.page.locator(this.updateResume).click()
        ])
        await fileChooser.setFiles(filePath)
    }

    getUpdateMessage() {
        return this.page.locator(this.updatedText)
    }

    async toggleHeadlineFinalPeriod() {
        await this.headlineCard.locator('[aria-label="Edit resume headline"]').click()
        const headlineInput = this.page.locator('textarea[aria-label="Resume headline"]')
        const currentHeadline = (await headlineInput.inputValue()).trimEnd()
        const updatedHeadline = currentHeadline.endsWith('.')
            ? currentHeadline.slice(0, -1)
            : `${currentHeadline}.`

        if (updatedHeadline !== currentHeadline) {
            await headlineInput.fill(updatedHeadline)
        }

        await this.saveButton.click()
        return { currentHeadline, updatedHeadline }
    }

    getHeadlineText() {
        return this.headlineCard
    }

    async toggleProfileSummaryFinalPipe() {
        await this.profileSummaryQuickLink.click()
        await this.profileSummarySection.scrollIntoViewIfNeeded()
        await expect(this.profileSummaryEditButton).toBeVisible()
        await this.profileSummaryEditButton.click()
        await expect(this.profileSummaryInput).toBeVisible()
        await this.profileSummaryInput.scrollIntoViewIfNeeded()

        const currentSummary = await this.profileSummaryInput.inputValue()
        const trimmedSummary = currentSummary.trimEnd()
        const updatedSummary = `${trimmedSummary.endsWith('|')
            ? trimmedSummary.slice(0, -1)
            : `${trimmedSummary}|`}`

        await this.profileSummaryInput.fill(updatedSummary)
        await this.saveButton.click()
        await expect(this.profileSummaryInput).toBeHidden()
        await this.profileSummaryEditButton.click()
        await expect(this.profileSummaryInput).toHaveValue(updatedSummary)
        await this.cancelLink.click()

        return { currentSummary, updatedSummary }
    }

    async toggleFirstEmploymentJobProfilePeriod() {
        await this.employmentEditButtons.first().click()
        await expect(this.jobProfileInput).toBeVisible()

        const currentText = await this.jobProfileInput.inputValue()
        const trimmedText = currentText.trimEnd()
        const finalLineStart = trimmedText.lastIndexOf('\n') + 1
        const finalLine = trimmedText.slice(finalLineStart)
        const updatedFinalLine = finalLine.endsWith('.')
            ? finalLine.slice(0, -1)
            : `${finalLine}.`
        const updatedText = `${trimmedText.slice(0, finalLineStart)}${updatedFinalLine}`

        await this.jobProfileInput.fill(updatedText)
        await this.saveButton.click()
        await this.employmentEditButtons.first().click()
        await expect(this.jobProfileInput).toHaveValue(updatedText)
        await this.cancelLink.click()
    }

    async toggleFirstProjectDetailsPeriodAndTeamSize() {
        await this.projectsQuickLink.click()
        const firstProjectEdit = this.projectEditButtons.first()
        await expect(firstProjectEdit).toBeVisible()
        await firstProjectEdit.scrollIntoViewIfNeeded()
        await firstProjectEdit.click()
        await expect(this.projectDetailsInput).toBeVisible()

        const currentDetails = await this.projectDetailsInput.inputValue()
        const trimmedDetails = currentDetails.trimEnd()
        expect(trimmedDetails).not.toBe('')
        const trailingWhitespace = currentDetails.slice(trimmedDetails.length)
        const lastLineStart = trimmedDetails.lastIndexOf('\n') + 1
        const lastLine = trimmedDetails.slice(lastLineStart)
        const updatedLastLine = lastLine.endsWith('.')
            ? lastLine.slice(0, -1)
            : `${lastLine}.`
        const updatedDetails =
            `${trimmedDetails.slice(0, lastLineStart)}${updatedLastLine}${trailingWhitespace}`
        await this.projectDetailsInput.fill(updatedDetails)

        await this.teamSizeSelect.evaluate((select) =>
            select.scrollIntoView({ behavior: 'instant', block: 'center' })
        )
        const currentTeamSize = await this.teamSizeSelect.inputValue()
        expect(['7', '8']).toContain(currentTeamSize)
        const updatedTeamSize = currentTeamSize === '7' ? '8' : '7'
        await this.teamSizeSelect.click()
        await this.teamSizeOptions.getByText(updatedTeamSize, { exact: true }).click()

        await this.saveButton.click()
        await expect(this.projectDetailsInput).toBeHidden()
        await firstProjectEdit.click()
        await expect(this.projectDetailsInput).toHaveValue(updatedDetails)
        await expect(this.teamSizeSelect).toHaveValue(updatedTeamSize)
        await this.cancelLink.click()
    }

}

module.exports = ProfilePage
