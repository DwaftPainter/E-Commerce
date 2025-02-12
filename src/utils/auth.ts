import crypto from 'crypto'

const base64url = (str: string) => {
    return btoa(str).replace(/\+/, '-').replace(/\//, '-').replace(/=+$/, '')
}

export function jwt(_id: string) {
    const header = {
        alg: 'HS256',
        typ: 'JWT'
    }
    const payload = {
        sub: _id
    }

    const encodedHeader = base64url(JSON.stringify(header))
    const encodedPayload = base64url(JSON.stringify(payload))
    const tokenDate = `${encodedHeader}.${encodedPayload}`
    const hmac = crypto.createHmac('sha256', process.env.JWT_SECRET_KEY!)
    const signature = hmac.update(tokenDate).digest('base64url')
    const token = `${tokenDate}.${signature}`

    return token
}

export function verifyJWT(token: string) {
    const [encodedHeader, encodedPayload, tokenSignature] = token.split('.')
    const tokenData = `${encodedHeader}.${encodedPayload}`

    const hmac = crypto.createHmac('sha256', process.env.JWT_SECRET_KEY!)
    const signature = hmac.update(tokenData).digest('base64url')

    if (signature === tokenSignature) {
        return JSON.parse(atob(encodedPayload)).sub
    }

    return null
}
