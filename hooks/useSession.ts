import { getSession } from "@/libs/appwrite"
import { useEffect, useState } from "react"
import {Models} from 'react-native-appwrite'

export const useSession=()=>{
    const [session, setSession] = useState<Models.Document | undefined>()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const getCurrentSession=async()=>{
            setIsLoading(true)
        try {
            const session=await getSession()
            if(session) setSession(session)
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
        }

       }
       getCurrentSession()
    }, [])
    

    return {session,isLoading}
}