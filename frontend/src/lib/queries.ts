import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {api} from './axios';
import {Todo} from './types';

export const useTodos = () => {
    return useQuery<Todo[]>({
        queryKey: ['todos'],
        queryFn: async () => {
            const {data} = await api.get<Todo[]>('/todo');
            return data;
        },
    });
};

export const useAddTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: { title: string; description?: string }) => {
            const {data} = await api.post<Todo>('/todo', payload);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todos']});
        },
    });
};

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            await api.delete(`/todo/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todos']});
        },
    });
};

export const useUpdateTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (todo: { id: number; title: string; description?: string }) => {
            const {data} = await api.patch<Todo>(`/todo/${todo.id}`, {
                title: todo.title,
                description: todo.description,
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todos']});
        },
    });
};

export const useLogin = () => {
    return useMutation({
        mutationFn: async (payload: { email: string; password: string }) => {
            await api.post('/auth/login', payload);
        },
    });
};

export const useRegister = () => {
    return useMutation({
        mutationFn: async (payload: { name: string; email: string; password: string }) => {
            await api.post('/auth/register', payload);
        },
    });
};
