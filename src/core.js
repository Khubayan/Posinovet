/* 
    TODO:
    What you need to do is:
        - Refactoring to readable and maintainable code.
        - Make an UI by Bootsrap 5 or TailwindCss 2.
        - Deploy!!!.
*/


const regex = /^[0-9a-fA-F ]+$/
const regexBin = /^[2-9][0-9]*$/
const regexSpace = /^[ ]+$/
// const fullNums = /^[0-9][0-9]*$/
let typeDigits
let convertTo


// function kosongState() {
//     let alert = document.getElementsByClassName('k')
//     let year = new Date()
//     alert[0].className += ' alert-dark text-center'
//     document.getElementById('k').innerHTML = ``
// }

// do {
//     kosongState()
// } while (document.getElementById('k').length == 0)


(typeSelect = () => {
    let option = document.getElementById('convertTo')
    typeDigits = document.getElementById('typeFrom').value
    if(typeDigits == 'biner') {
        option.innerHTML = `<option value="decimal">Desimal</option>`
    }
    else if(typeDigits == 'decimal') {
        option.innerHTML = `<option value="biner">Biner</option>
                            <option value="decimal">Desimal</option>
                            <option value="hexa">Hexa</option>
                            <option value="oktal">Oktal</option>`
    }
    else if(typeDigits == 'hexa') {
        option.innerHTML = `<option value="decimal">Desimal</optio>`
    }
    else if(typeDigits == 'oktal') {
        option.innerHTML = `<option value="decimal">Desimal</option>`
    }
})()

typeDigitsFunc = () => {
    const k = document.getElementById('k')
    k.innerHTML = ''
    let typeDigits
    let convertTo
    convertTo = document.getElementById('convertTo').value
    typeDigits = document.getElementById('typeFrom').value
    let rawDigit = document.getElementById('data').value
    if(convertTo === 'decimal') {
        if(typeDigits === 'biner') {
            if(regexBin.test(rawDigit) && !regexSpace.test(rawDigit)) {
                k.innerText = (`Nilai ${rawDigit} bukan bilangan ${typeDigits}`)
            } else {
            return multiplyDigits(2, typeDigits)
            }
        }
        else if(typeDigits === 'hexa') {
            return multiplyDigits(16, typeDigits)
        }
        else if(typeDigits === 'oktal') {
            return multiplyDigits(8, typeDigits)
        } 
        else if(typeDigits == 'decimal') {
            return multiplyDigits(10, typeDigits)
        }
    }
    else if(convertTo == 'biner') {
        if(typeDigits == 'decimal') {
            return dividerDigits(2)
        }
    }
    else if(convertTo == 'hexa') {
        return dividerDigits(16)
    }
    else if(convertTo == 'oktal') {
        return dividerDigits(8)
    }
}



multiplyDigits = (multiplier, typeDigits) => {
    const k = document.getElementById('k')
    let result = 0
    let hexArray = ['A','B','C','D','E','F']
    let rawDigit = document.getElementById('data').value
    let digits = Array.from(rawDigit).reverse()
    for(let i = 0; i <= digits.length - 1; i++) {
        // console.log(parseInt(digits[i]))

        // if(regexBin.test(rawDigit)) {
        //     console.log(`Nilai ${rawDigit} bukan nilai biner`)
        //     return 0
        // }

        // let digits = Array.from(rawDigit)
        for(let i = 0; i <= digits.length - 1; i++) {
            // if(regexSpace.test(digits[i])) {
                //     digits.splice(i, 1)
                
                // }
                digits = digits.filter(digits => regexSpace.test(digits[i]) == ' ')
                // console.log(digits)
                if(typeDigits == 'biner') {
                    if(regexBin.test(digits[i]) || isNaN(digits[i])) {
                        k.innerText = `${rawDigit} gagal dikonversi!`
                        return 0
                    }
                }
                else if(typeDigits == 'oktal') {
                    if(digits[i] < 0 || digits[i] > 7 || isNaN(digits[i])) {
                        k.innerText = `${rawDigit} gagal dikonversi!`
                        return 0
                    }
                }
                else if(typeDigits == 'hexa') {
                    if(!regex.test(digits[i])) {
                        k.innerText = `${rawDigit} gagal dikonversi!`
                        return 0
                    }
                }
                else if(typeDigits == 'decimal') {
                    if(isNaN(digits[i] || !fullNums.test(digits[i]))) {
                        k.innerText = `${rawDigit} gagal dikonversi!`
                        return 0
                    }
                }
            }


        if(typeDigits == 'hexa') {
            for(let j = 0; j <= hexArray.length -1; j++) {
                if(digits[i] == 'A' || digits[i] == 'a') {
                    digits[i] = 10
                }
                else if(digits[i] == 'B' || digits[i] == 'b') {
                    digits[i] = 11
                }
                else if(digits[i] == 'C' || digits[i] == 'c') {
                    digits[i] = 12
                }
                else if(digits[i] == 'D' || digits[i] == 'd') {
                    digits[i] = 13
                }
                else if(digits[i] == 'E' || digits[i] == 'e') {
                    digits[i] = 14
                }
                else if(digits[i] == 'F' || digits[i] == 'f') {
                    digits[i] = 15
                }
                
            }
        }


        if(isNaN(result)) {
            k.innerText += (`Nilai ${rawDigit} bukan merupakan nilai dari ${typeDigits}`)
            return 0
        } 
        else if(!isNaN(result)) {
            k.innerHTML += `${digits[i]} x ${multiplier}<sup>${i}</sup> = ${digits[i] * multiplier ** i} </br>`
            // k.innerHTML += ''
            result += digits[i] * multiplier ** i
            if(i === digits.length - 1) {
                k.innerHTML += '---------------- +'
                k.innerHTML += '</br>'
                k.innerHTML += `Desimal dari (${rawDigit})<sub>${multiplier}</sub> adalah = ${result}` 
            }
        }
        
        }
}

dividerDigits = (divider) => {
    let result = ''
    const k = document.getElementById('k')
    convertTo = document.getElementById('convertTo').value
    // let hexArray = ['A','B','C','D','E','F']
    let rawDigit = document.getElementById('data').value
    typeDigits = document.getElementById('typeFrom').value
    let valueAfterDivided = 0
    let digits = []
    // parseInt(rawDigit)
    
           
    if(convertTo == 'biner') {
        if(regexBin.test(Math.floor(rawDigit % divider)) || isNaN(Math.floor(rawDigit % divider))) {
            k.innerText = `${rawDigit} gagal dikonversi!`
            return 0
        }
    }
    else if(convertTo == 'oktal') {
        if(Math.floor(rawDigit % divider) < 0 || Math.floor(rawDigit % divider) > 7 || isNaN(Math.floor(rawDigit % divider))) {
            k.innerText = `${rawDigit} gagal dikonversi!`
            return 0
        }
    }
    else if(convertTo == 'hexa') {
        if(!regex.test(Math.floor(rawDigit % divider))) {
            k.innerText = `${rawDigit} gagal dikonversi!`
            return 0
        }
    }
    else if(convertTo == 'decimal') {
        if(isNaN(Math.floor(rawDigit % divider)) || !fullNums.test(Math.floor(rawDigit % divider))) {
            k.innerText = `${rawDigit} gagal dikonversi!`
            return 0
        }
    }

    


    while(rawDigit >= 1) {
        // console.log(`${rawDigit} / ${divider} = ${Math.floor(rawDigit / divider)}, sisa ${valueAfterDivided = Math.floor(rawDigit % divider)}`)
        // valueAfterDivided
        valueAfterDivided = Math.floor(rawDigit % divider)

        
        if(convertTo == 'hexa') {
            // for(let j = 0; j <= hexArray.length -1; j++) {
                if(valueAfterDivided == 10) {
                    valueAfterDivided = 'A'
                    digits.push(valueAfterDivided)
                }
                else if(valueAfterDivided == 11) {
                    valueAfterDivided = 'B'
                    digits.push(valueAfterDivided)
                }
                else if(valueAfterDivided == 12) {
                    valueAfterDivided = 'C'
                    digits.push(valueAfterDivided)
                }
                else if(valueAfterDivided == 13) {
                    valueAfterDivided = 'D'
                    digits.push(valueAfterDivided)
                }
                else if(valueAfterDivided == 14) {
                    valueAfterDivided = 'E'
                    digits.push(valueAfterDivided)
                }
                else if(valueAfterDivided == 15) {
                    valueAfterDivided = 'F'
                    digits.push(valueAfterDivided)
                } else {
                    digits.push(valueAfterDivided)
                }
                
            // }
        } else {
            digits.push(valueAfterDivided)
        }
                
                // console.log(valueAfterDivided)
        
        const k = document.getElementById('k')
        if(convertTo == 'hexa' && isNaN(valueAfterDivided)) {
            if(Math.floor(rawDigit / divider) < 1) {
                k.innerHTML += `s${rawDigit} / ${divider} = ${Math.floor(rawDigit / divider)}, sisa ${Math.floor(rawDigit % divider)}, ${Math.floor(rawDigit % divider)} = <span class="text-danger">${valueAfterDivided}</span>`
            } else {
                k.innerHTML += `${rawDigit} / ${divider} = ${Math.floor(rawDigit / divider)}, sisa ${Math.floor(rawDigit % divider)}, ${Math.floor(rawDigit % divider)} = ${valueAfterDivided}`
            }
            k.innerHTML += '</br>'
        } else {
            if(Math.floor(rawDigit / divider) < 1) {
                k.innerHTML += `${rawDigit} / ${divider} = ${Math.floor(rawDigit / divider)}, sisa <span class="text-danger">${Math.floor(rawDigit % divider)}</span>`
            } else {
                k.innerHTML += `${rawDigit} / ${divider} = ${Math.floor(rawDigit / divider)}, sisa ${Math.floor(rawDigit % divider)}`
            }
            k.innerHTML += '</br>'
        }

        rawDigit = Math.floor(rawDigit / divider)
        // console.log(valueAfterDivided)
        // console.log(`sisa ${rawDigit}`)
    }
    rawDigit = document.getElementById('data').value
    digits.reverse()
    for(let i = 0; i <= digits.length - 1; i++) {
        

        
        result += digits[i]
        
    }

    
    k.innerHTML += '---------------------'
    k.innerHTML += '</br>'
    if(rawDigit == '0') {
        k.innerHTML += `${convertTo} dari ${rawDigit} adalah = ${rawDigit}`
    } else {
        k.innerHTML += `${convertTo} dari ${rawDigit} adalah = ${result}`
    }

}





                                    // ! THIS IS MY LINE 300TH CODE LOL ! //