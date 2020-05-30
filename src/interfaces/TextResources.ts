export interface ITextResources {
    bannerMessageHtml?: string;
    acceptAllLabel?: string;
    rejectAllLabel?: string;
    moreInfoLabel?: string;
    preferencesDialogTitle?: string;
    preferencesDialogDescHtml?: string;
    acceptLabel?: string;
    rejectLabel?: string;
    saveLabel?: string;
    resetLabel?: string;
}

// only the passed text resources should be replaced in the control.
// If any string is not passed the control should keep the default value
export class TextResources implements ITextResources {
    bannerMessageHtml: string = "We use optional cookies to provide... read <a href='link'>here<a>.";
    acceptAllLabel: string = "Accept all";
    rejectAllLabel: string = "Reject all";
    moreInfoLabel: string = "More info";
    preferencesDialogTitle: string = "Manage cookie preferences";
    preferencesDialogDescHtml: string = "Most Microsoft sites...";
    acceptLabel: string = "Accept";
    rejectLabel: string = "Reject";
    saveLabel: string = "Save changes";
    resetLabel: string = "Reset all";

    constructor(param?: ITextResources) {
        if (param) {
            if (param.bannerMessageHtml) {
                this.bannerMessageHtml = param.bannerMessageHtml;
            }
            if (param.acceptAllLabel) {
                this.acceptAllLabel = param.acceptAllLabel;
            }
            if (param.rejectAllLabel) {
                this.rejectAllLabel = param.rejectAllLabel;
            }
            if (param.moreInfoLabel) {
                this.moreInfoLabel = param.moreInfoLabel;
            }
            if (param.preferencesDialogTitle) {
                this.preferencesDialogTitle = param.preferencesDialogTitle;
            }
            if (param.preferencesDialogDescHtml) {
                this.preferencesDialogDescHtml = param.preferencesDialogDescHtml;
            }
            if (param.acceptLabel) {
                this.acceptLabel = param.acceptLabel;
            }
            if (param.rejectLabel) {
                this.rejectLabel = param.rejectLabel;
            }
            if (param.saveLabel) {
                this.saveLabel = param.saveLabel;
            }
            if (param.resetLabel) {
                this.resetLabel = param.resetLabel;
            }
        }
    }; 
}