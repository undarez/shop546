import{createEnv} from '@t3-oss/env-nextjs'
import {z} from "zod"
export  const env = createEnv({
    server: {
        GOOGLE_CLIENT_ID:z.string().min(1),
        GOOGLE_CLIENT_SECRET: z.string().min(1),
        EMAIL_SUBJECT:z.string().min(1),

    },
    client:{},
    runtimeEnv:{
        GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        EMAIL_SUBJECT: process.env.EMAIL_SUBJECT,
    },
})