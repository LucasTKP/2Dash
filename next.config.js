/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    FIREBASE_PRIVATE_KEY_ID: '4633f3f3dc4f69b1ab669068c34a7ca09c688fa2',
    FIREBASE_PRIVATE_KEY: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCoyM8at++n4/DQ\nFnBCm7i+/d01FB+2XY5JycldFAzzpWZoeDvVPAjg9dS7dUe+gXXUaTwybIH9AtsP\nzxgQMrRzzEfOn70DHedsnrqtLQ5SYZUG4uCZvC4bCySmVH8wPa1aFKz0kmZO3/5U\n+fVKjng19Mr4Z0Uetnm8VR63o5vIkRVx0Ba6Ary36bPyxHxcvu6vTcKoHCWnJAo6\nI9kaSfBJpdhhIeQpgpiZzlg8mlXsT7z6E1DPH/vczcQIGWV21JPfonf/S//CTINm\nGJjZsfKOnlwIGBas3kuk1wJJr6wNtxqnSrz9xh7kW65pA9fCnv+4N3DNO7eYWeg0\n4d9KrPbzAgMBAAECggEACxSLtrb72QC3brcFDZ+yxCRe9jy+TDbeFW1VdnJ6MIXb\nhYuHGgYulbNtu2oFQ2C0/zRytY4MBokTynjk8oNG92ciEP10PL/Pe9ZRGPdL6Q/r\nkZ/T8M5lacm/JoWGMquJ4CUFVFTxZHIt/HQgVzxScJsDtsTzc621ANkcWB/keokj\nG8Gcm3igX6P/IkL9STQmvxoT1RTHlB47VyatGrw2TYETD66tEE+8kx7n6Zav14IS\nmMh+TzktwMU4faKtHJUc3BMrEXeNCPSxfoNb5BblHUnYC7pmXAqnqhaz4DVbuS0Z\nNDKW0m2azTRIb6ijfZt374kLYxTy4WlQxu+gG+kyMQKBgQDUd2HJi/1ocGRMdm7F\nyU1kkhFIeiFn7xVzlTKBmhN4mgJYM+ttOnFEGx2RRu1BeDcrxcvpyvA68BoCwaeL\nJa5EnrtaGheqqb4a4iw41FZrPZwma8/TZB9YsTQ917AUnIyNs4V9oZwV9Jiapgcx\ntpDZlJE1qr5eWtUgvoDARYdY+QKBgQDLXidunYPIDjfJXzX8TS9Brzn2VQ5bhqQ1\nz5DA/omrc0zpHS65enRZYfEoMnjPngK+S8HabbcQXRWU3/29FfiLrVrC8ARS2Cam\nDG5YKOSwlJsmnxeQjUCaU/LcJwfyIcK8UYoAZ73nr5z6LdRMBl2DUfGLyvsjqqJ/\n2JMKigSWSwKBgQCYx3fDzCxeq2MUMJ2bEBPc28Qdz+SxrhRI1uJIm5igwm4pKryC\nAOJtzOnIC66Tw3Q4v7TP2yQ/3WN20/Y8cs4LffDO67BVAlY3Uqfl/Zpe5yCf6Cq7\noWWBC3u7dJujVqcjRhIZstpgV1Bc9EJ8FwG108VPSAY4JyzWrOY8XELlUQKBgQCy\n8xK3nxsKupgUNheG/1QJ9GqIe6e6met8/jxd1pzFpRuUNP2ccEhZLnnJ6T+tUVkQ\nohDeZ5SibYZEDiV0cRTXs58d0Z28WD8J9f5SzQkO6HTtsyhFJkYmhqA5YI75XQPC\nOe25FZBhgoIbEqCwlRlMKJrna6E5bTi4TpZ0u6X1qQKBgB2ew55Lr8GEoCawCfSm\nEPklVJBkGuW/hP6e0hK2Fnqi/dkxFc0DDKaSBCkPgc/MrhEJlyeDSgcXq45/QsMH\nqyB3UjGA7JsDgYxJveaGysmu1g6Mt0WILjodEEM5B3FEwUUJ1DK42JzI0mk4LLm9\nQJGe0XJUCyPyO68VYDNVpiQX\n-----END PRIVATE KEY-----\n'
  },
  experimental: {
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: ['firebasestorage.googleapis.com', 'ui-avatars.com'],
  },
  output: 'standalone'
}

module.exports = nextConfig
