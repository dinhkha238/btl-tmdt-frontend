import { addCustomer, addProduct, addToCart, checkLogin, createOrder, decreaseProduct, deleteAllCart, deleteCustomer, deleteOrder, deleteProduct, deleteToCart, getCustomer, getCustomers, getOrders, getOrdersById, getProducts, updateCustomer, updateProduct } from "@/services/app.service";
import { message } from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom";
export const CACHE_KEYS = {
  InforProducts: "INFOR_PRODUCTS",
  InforCustomer: "INFOR_CUSTOMER",
  InforCustomers: "INFOR_CUSTOMERS",
  InforOrders: "INFOR_ORDERS",
}

export const useMutationLogin =  () => {
    const navigate = useNavigate();
    
    return useMutation((data: any) => {
        return checkLogin(data)

      },
      {
        onSuccess:() => {
          localStorage.setItem('token', 'true');
            message.success("Login Success")
            navigate("/") // TODO: Fix Na
          },
        onError:() => {
            message.error("Login Failed")
        }
      }
      )
}

export const useMutationRegister =  () => {
    const navigate = useNavigate();

    return useMutation((data: any) => {
        return addCustomer(data)
      },
      {
        onSuccess:() => {
            message.success("Register Success")
            navigate("/login") // TODO: Fix Na
          },
        onError:() => {
            message.error("Username already exists")
        }
      }
      )
}

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation((data: any) => {
    return addCustomer(data)
  },
  {
    onSuccess:() => {
      queryClient.invalidateQueries(CACHE_KEYS.InforCustomers);
      message.success("Add user success")
    },
    onError:() => {
      message.error("Add user failed")
    }
  }
  )
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation((data: any) => {
    return updateCustomer(data)
  },
  {
    onSuccess:() => {
      queryClient.invalidateQueries(CACHE_KEYS.InforCustomer);
      message.success("Update user success")
    },
    onError:() => {
      message.error("Update user failed")
    }
  }
  )
}
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation((id: any) => {
    return deleteCustomer(id)
  },
  {
    onSuccess:() => {
      queryClient.invalidateQueries(CACHE_KEYS.InforCustomers);
      message.success("Delete user success")
    },
    onError:() => {
      message.error("Delete user failed")
    }
  }
  )
}


export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation((id: any) => {
    return addToCart(id)
  },
  {
    onSuccess:() => {
      queryClient.invalidateQueries(CACHE_KEYS.InforCustomer);
      message.success("Add to cart success")
    },
    onError:() => {
      message.error("Add to cart failed")
    }
  }
  )
}

export const useDecreaseToCart = () => {  
  const queryClient = useQueryClient();
  return useMutation((id: any) => {
    return decreaseProduct(id)
  },
  {
    onSuccess:() => {
      queryClient.invalidateQueries(CACHE_KEYS.InforCustomer);
      message.success("Decrease to cart success")
    },

    onError:() => {
      message.error("Decrease to cart failed")
    }
  }
  )
}

export const useDeleteToCart = () => {
  const queryClient = useQueryClient();

  return useMutation((id: any) => {
    return deleteToCart(id)
  },
  {
    onSuccess:() => {
      queryClient.invalidateQueries(CACHE_KEYS.InforCustomer);
      message.success("Delete to cart success")
    },
    onError:() => {
      message.error("Delete to cart failed")
    }
  }
  )
}
export const useDeleteAllToCart = () => {
  const queryClient = useQueryClient();
  return useMutation(() => {
    return deleteAllCart()
  },
  {
    onSuccess:() => {
      queryClient.invalidateQueries(CACHE_KEYS.InforCustomer);
    },
    onError:() => {
    }
  }
  )
}

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation((data: any) => {
    return addProduct(data)
  },
  {
    onSuccess:() => {
      queryClient.invalidateQueries(CACHE_KEYS.InforProducts);
      message.success("Add product success")
    },
    onError:() => {
      message.error("Add product failed")
    }
  }
  )
}
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation((data: any) => {
    return updateProduct(data)
  },
  {
    onSuccess:() => {
      queryClient.invalidateQueries(CACHE_KEYS.InforProducts);
      message.success("Update product success")
    },
    onError:() => {
      message.error("Update product failed")
    }
  }
  )
}
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation((id: any) => {
    return deleteProduct(id)
  },
  {
    onSuccess:() => {
      queryClient.invalidateQueries(CACHE_KEYS.InforProducts);
      message.success("Delete product success")
    },
    onError:() => {
      message.error("Delete product failed")
    }
  }
  )
}
export const useCreateOrder = () => {
  return useMutation((data: any) => {
    return createOrder(data)
  },
  {
    onSuccess:() => {
      message.success("Đặt hàng thành công")
    },
    onError:() => {
      message.error("Create order failed")
    }
  }
  )
}
export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation((id: any) => {
    return deleteOrder(id)
  },
  {

    onSuccess:() => {
      queryClient.invalidateQueries(CACHE_KEYS.InforOrders);
      message.success("Delete order success")
    },
    onError:() => {
      message.error("Delete order failed")
    }
  }
  )
}

// query
export const useProducts =  (select:any) => {
  return useQuery([CACHE_KEYS.InforProducts,select], () => getProducts(select));
}

export const useCustomer =  () => {
  return useQuery(CACHE_KEYS.InforCustomer, () => getCustomer());
}

export const useCustomers =  () => {
  return useQuery(CACHE_KEYS.InforCustomers, () => getCustomers());
}
export const useOrders =  (time:any) => {
  return useQuery([CACHE_KEYS.InforOrders,time], () => getOrders(time));
}
export const useOrdersById =  () => {
  return useQuery(CACHE_KEYS.InforOrders, () => getOrdersById());
}

