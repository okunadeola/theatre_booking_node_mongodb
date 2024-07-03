import UserModel from "../user/user.model";
import WalletModel from "./wallet.model";







class WalletService {
    private walletModel = WalletModel
    private userModel = UserModel


    public async updateWallet(
        userId: string,
        amount: number,
        isInflow: boolean,
        note: string,
        paymentMethod: string,
        currency: string,
        status: string
    ): Promise<Object | Error>{
            try {

                const snapshot = await this.userModel.findById(userId) 

                const userBalance = snapshot?.toJSON()?.account_balance

                const currentBalance = this.deriveBalnce(Number(userBalance), amount, isInflow)

                const wallet = await this.walletModel.create({
                    userId, amount, isInflow, note, paymentMethod, currency, status, prevBalance:userBalance, currentBalance
                })


                await snapshot?.updateOne({$set: {   account_balance:currentBalance} })

                return wallet.toJSON();

            } catch (error: any) {
                return Error("unable to update wallet");
            }
    }

    public async getWallet(userId: string): Promise<Object | Error>{
        try {
            const wallet = await this.walletModel.findById(userId).sort({createdAt: -1})
            return {wallet}
        } catch (error) {
            return Error("unable to get wallet");
        }
    }

    public async  getAllWallet(userId: string):Promise<Array<any> | Error>{
        try {
            const wallets = await this.walletModel.find({userId}).sort({createdAt: -1})

            return wallets
        } catch (error) {
            return Error("unable to get wallet");
        }
    }









    public async  getWalletBalance():Promise<Array<any> | Error>{
        try {
            const balance = await this.userModel.aggregate([
                {
                  $group: {
                    _id: null,
                    totalBalance: { $sum: "$account_balance" }
                  },
    
                }
              ]);
              
            return balance
        } catch (error) {
            return Error("unable to get wallet");
        }
    }

    public async  getUserWalletBalance(userId:string):Promise< Object | undefined  | Error>{
        try {
            const user = await this.userModel.findOne({_id:userId})

            return user?.toJSON()
        } catch (error) {
            return Error("unable to get user");
        }
    }





    public deriveBalnce(userBalance: number | null, amount: number, isInflow: boolean){
        if(isInflow){
            return  parseInt((userBalance || 0).toString()) +  parseInt(amount.toString())
        }else{
            return  parseInt((userBalance || 0).toString()) -  parseInt(amount.toString())
        }
    }
}


export default WalletService