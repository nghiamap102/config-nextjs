export interface VoucherInitState {
    listVoucher?: VoucherData[]
    loading?: boolean
}

export interface VoucherData {
    voucherID?: string
    name?: string
    timeTo?: Date
    TimeFrom?: Date
}
