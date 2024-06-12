import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTotalWalletBalanceAction, updateWalletBalanceAction } from './wallet';
import { getAllBookingUsersForAdminAction } from './booking';

export const useGetUserData = ({ enabled = true } = {}) => {
  return useQuery({
    queryKey: ['userdata'],
    queryFn: async () => {
      const res = await getAllBookingUsersForAdminAction();
      return res;
    },
    enabled,
    retry: false
  });
};

export const useGetTotalWalletBalance = ({ enabled = true } = {}) => {
  return useQuery({
    queryKey: ['totalbalance'],
    queryFn: async () => {
      const res = await getTotalWalletBalanceAction();
      return res[0]?.totalBalance ?? null;
    },
    enabled,
    retry: false
  });
};

export const useTransferFundMutation = () => {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body) => {
        const res = await updateWalletBalanceAction(body)
      return  res;
    },
    onSuccess: ()=> {
        queryClient.invalidateQueries({
            queryKey: ['userdata']
        })
        queryClient.invalidateQueries(['totalbalance']);
    }
  });
};
