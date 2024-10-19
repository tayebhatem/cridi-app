import { config, databases } from "@/libs/appwrite"
import { PaymentsType } from "@/types"
import { Query } from "react-native-appwrite"

export const getPayments=async(accountUser:string,limit:number)=>{
    try {
      const data=await  databases.listDocuments(
        config.database,
        config.transactions,
        [
            Query.limit(limit),
            Query.orderDesc('$createdAt'),
            Query.and([
                Query.equal('accountUser',accountUser),
                Query.equal('hidden',false),
                Query.isNotNull('payment'),
            ])

        ]
      )

      const payments=data.documents.map((item)=>{
        const transaction:PaymentsType={
            id:item.$id,
            amount:item.amount,
            date:item.date,
            time:item.time,
            read:item.read,
            newAmount:item.payment.newAmount,
            oldAmount:item.payment.oldAmount
        }

        return transaction
      })

      return payments
    } catch (error) {
      console.log(error)
    }
  }