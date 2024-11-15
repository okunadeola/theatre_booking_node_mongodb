"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../user/user.model"));
const wallet_model_1 = __importDefault(require("./wallet.model"));
class WalletService {
    constructor() {
        this.walletModel = wallet_model_1.default;
        this.userModel = user_model_1.default;
    }
    async updateWallet(userId, amount, isInflow, note, paymentMethod, currency, status) {
        try {
            const snapshot = await this.userModel.findById(userId);
            const userBalance = snapshot?.toJSON()?.account_balance;
            const currentBalance = this.deriveBalnce(Number(userBalance), amount, isInflow);
            const wallet = await this.walletModel.create({
                userId, amount, isInflow, note, paymentMethod, currency, status, prevBalance: userBalance, currentBalance
            });
            await snapshot?.updateOne({ $set: { account_balance: currentBalance } });
            return wallet.toJSON();
        }
        catch (error) {
            return Error("unable to update wallet");
        }
    }
    async getWallet(userId) {
        try {
            const wallet = await this.walletModel.findById(userId).sort({ createdAt: -1 });
            return { wallet };
        }
        catch (error) {
            return Error("unable to get wallet");
        }
    }
    async getAllWallet(userId) {
        try {
            const wallets = await this.walletModel.find({ userId }).sort({ createdAt: -1 });
            return wallets;
        }
        catch (error) {
            return Error("unable to get wallet");
        }
    }
    async getWalletBalance() {
        try {
            const balance = await this.userModel.aggregate([
                {
                    $group: {
                        _id: null,
                        totalBalance: { $sum: "$account_balance" }
                    },
                }
            ]);
            return balance;
        }
        catch (error) {
            return Error("unable to get wallet");
        }
    }
    async getUserWalletBalance(userId) {
        try {
            const user = await this.userModel.findOne({ _id: userId });
            return user?.toJSON();
        }
        catch (error) {
            return Error("unable to get user");
        }
    }
    deriveBalnce(userBalance, amount, isInflow) {
        if (isInflow) {
            return parseInt((userBalance || 0).toString()) + parseInt(amount.toString());
        }
        else {
            return parseInt((userBalance || 0).toString()) - parseInt(amount.toString());
        }
    }
}
exports.default = WalletService;
