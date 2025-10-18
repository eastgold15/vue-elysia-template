
import { PartnersModel } from "@elysiajs/libs/schema";
import { useApiWithToast } from "./useApiWithToast";

/**
 * 使用Toast的简化版API
 */
export const useApi = () => {
  const api = useApiWithToast();

  return {
    // 合作伙伴
    partners: {
      // list: (params: PartnersModel.ListQueryInput) =>
      // 	api.callPaginated(() =>
      // 		api.client.api.partners.list.get({ query: params }),
      // 	),


    },
    // 原始toast方法（如果需要自定义提示）
    toast: {
      error: api.showError,
      success: api.showSuccess,
      warning: api.showWarning,
    },
  };
};

