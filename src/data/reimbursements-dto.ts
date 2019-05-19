import { Reimbursement } from './model'

export { ReimbursementDTO, reimbursementFromDTO, reimbursementToDTO }

class ReimbursementDTO {

    reimbrs_id: number
    author: number
    amount: number
    date_submit: number
    date_resolve: number
    description: string
    resolver: number
    status_id: number
    type_id: number

    constructor(reimbrs_id: number, author: number, amount: number, date_submit: number, date_resolve: number, description: string, resolver: number, status_id: number, type_id: number) {
        this.reimbrs_id = reimbrs_id
        this.author = author
        this.amount = amount
        this.date_submit = date_submit
        this.date_resolve = date_resolve
        this.description = description
        this.resolver = resolver
        this.status_id = status_id
        this.type_id = type_id
    }
}

function reimbursementFromDTO(dto: ReimbursementDTO) {

    const { reimbrs_id, author, amount, date_submit, date_resolve, description, resolver, status_id, type_id } = dto;

    return new Reimbursement(reimbrs_id, author, amount, date_submit, date_resolve, description, resolver, status_id, type_id);
}

function reimbursementToDTO(reim: Reimbursement) {

    const { reimbursementId, author, amount, dateSubmitted, dateResolved, description, resolver, status, type } = reim;

    return new ReimbursementDTO(reimbursementId, author, amount, dateSubmitted, dateResolved, description, resolver, status, type);
}
