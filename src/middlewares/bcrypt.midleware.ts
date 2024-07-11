import * as bcrypt from 'bcrypt'

interface IBcryptMidleware {
    hash(value: string): unknown
    compare(valueHash: string, value: string): unknown
}

class BcryptMidleware implements IBcryptMidleware {
    private bcrypt = bcrypt
    private saltRounds: number

    constructor(saltRounds: number) {
        this.saltRounds = saltRounds
    }

    hash(value: string) {
        const hash = this.bcrypt.hash(value, this.saltRounds)
        return hash
    }

    compare(valueHash: string, value: string) {
        const checkHash = this.bcrypt.compare(valueHash, value)
        return checkHash
    }

}

function fuctionBcryptMidleware() {
    const saltRounds = 10;
    const bcryptMidleware: BcryptMidleware = new BcryptMidleware(saltRounds)
    return bcryptMidleware
}

export {
    BcryptMidleware,
    fuctionBcryptMidleware
}