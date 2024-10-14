import { config, databases } from "@/libs/appwrite"
import { DebtsType } from "@/types"
import { Query } from "react-native-appwrite"


export const getDebsts=async(accountUser:string,limit:number)=>{
    try {
      const data=await  databases.listDocuments(
        config.database,
        config.transactions,
        [
            Query.limit(limit),
            Query.orderDesc('$createdAt'),
            Query.equal('accountUser',accountUser),

        ]
      )

      const dabts=data.documents.map((item)=>{
        const transaction:DebtsType={
            id:item.$id,
            amount:item.amount,
            date:item.date,
            time:item.time,
            archived:item.hidden,
            read:item.read
        }

        return transaction
      })

      return dabts
    } catch (error) {
      console.log(error)
    }
  }

export const getTotalDebts=async(accountUser:string)=>{
   try {
    const data=await databases.listDocuments(
        config.database,
        config.transactions,
        [
            Query.limit(100),
            Query.and([
                Query.equal('accountUser',accountUser),
                Query.equal('hidden',false)
            ])
        ]
    )

    const total=data.documents.reduce((total,item)=>{
    return total+item.amount
    },0)

   return total
   } catch (error) {
    
   }
}

