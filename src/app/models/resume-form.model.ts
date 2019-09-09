export class ResumeFormModel {
    public fio?: string;
    public gender?: string;
    public dateBirth?: Date;
    public maritalStatus: string;
    public children: number;
    public email: string;
    public comment: string;

    constructor(obj?: ResumeFormModel) {
        if (obj) {
            this.fio = obj.fio;
            this.gender = obj.gender;
            this.dateBirth = obj.dateBirth;
            this.maritalStatus = obj.maritalStatus;
            this.children = obj.children;
            this.email = obj.email;
            this.comment = obj.comment;
        }
    }

    public equals(obj: ResumeFormModel) {
        return Object.is(this, obj);
    }

}
