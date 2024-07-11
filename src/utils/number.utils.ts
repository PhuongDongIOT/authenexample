const toNumber = (value: any): number => {
    let returnAnswer: number = 0
    if (value) returnAnswer = parseInt(value) ?? 0

    return returnAnswer
}

export { toNumber }
